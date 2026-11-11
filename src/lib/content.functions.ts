import { createServerFn } from "@tanstack/react-start";
import type { SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database, Json } from "@/integrations/supabase/types";
import {
  KINDS,
  collectMediaPaths,
  contentSchemas,
  saveInputSchema,
  type ContentRow,
} from "@/lib/content-types";
import { MEDIA_BUCKET } from "@/lib/media-config";

/**
 * Administrator-only content management.
 *
 * Authorization is enforced twice: here, by checking the caller's role with the
 * database `has_role` function, and again by row level security on
 * `site_content` and the storage policies, because every query below runs with
 * the caller's own token rather than the service role.
 */

type Db = SupabaseClient<Database>;

async function isAdmin(supabase: Db, userId: string): Promise<boolean> {
  const { data, error } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
  return !error && data === true;
}

async function assertAdmin(supabase: Db, userId: string): Promise<void> {
  if (!(await isAdmin(supabase, userId))) {
    throw new Error("Administrator access is required for this action.");
  }
}

function friendlyDbError(error: { code?: string; message: string }): Error {
  if (error.code === "23505")
    return new Error(
      "That URL slug is already used by another item. Please choose a different one.",
    );
  if (error.code === "42501") return new Error("You don't have permission to change this content.");
  return new Error(error.message);
}

export const getAdminAccess = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const supabase = context.supabase as Db;
    return { isAdmin: await isAdmin(supabase, context.userId) };
  });

export const listContent = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .validator(z.object({ kind: z.enum(KINDS) }))
  .handler(async ({ data, context }): Promise<ContentRow[]> => {
    const supabase = context.supabase as Db;
    await assertAdmin(supabase, context.userId);

    const { data: rows, error } = await supabase
      .from("site_content")
      .select("*")
      .eq("kind", data.kind)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) throw friendlyDbError(error);
    return (rows ?? []) as ContentRow[];
  });

export const saveContent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator(saveInputSchema)
  .handler(async ({ data, context }): Promise<ContentRow> => {
    const supabase = context.supabase as Db;
    await assertAdmin(supabase, context.userId);

    const parsed = contentSchemas[data.kind].safeParse(data.content ?? {});
    if (!parsed.success) {
      throw new Error(parsed.error.issues[0]?.message ?? "Some fields are not valid.");
    }
    const content = parsed.data as Json;
    const now = new Date().toISOString();

    if (data.id) {
      const { data: row, error } = await supabase
        .from("site_content")
        .update({
          title: data.title,
          slug: data.slug,
          published: data.published,
          sort_order: data.sort_order,
          content,
          updated_at: now,
        })
        .eq("id", data.id)
        .eq("kind", data.kind)
        .select("*")
        .single();
      if (error) throw friendlyDbError(error);
      return row as ContentRow;
    }

    const { data: row, error } = await supabase
      .from("site_content")
      .insert({
        kind: data.kind,
        title: data.title,
        slug: data.slug,
        published: data.published,
        sort_order: data.sort_order,
        content,
      })
      .select("*")
      .single();
    if (error) throw friendlyDbError(error);
    return row as ContentRow;
  });

export const setContentPublished = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator(z.object({ id: z.string().uuid(), published: z.boolean() }))
  .handler(async ({ data, context }): Promise<{ id: string; published: boolean }> => {
    const supabase = context.supabase as Db;
    await assertAdmin(supabase, context.userId);

    const { data: row, error } = await supabase
      .from("site_content")
      .update({ published: data.published, updated_at: new Date().toISOString() })
      .eq("id", data.id)
      .select("id, published")
      .single();
    if (error) throw friendlyDbError(error);
    return row;
  });

export const reorderContent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator(z.object({ kind: z.enum(KINDS), ids: z.array(z.string().uuid()).min(1).max(500) }))
  .handler(async ({ data, context }): Promise<{ ok: true }> => {
    const supabase = context.supabase as Db;
    await assertAdmin(supabase, context.userId);

    const results = await Promise.all(
      data.ids.map((id, index) =>
        supabase
          .from("site_content")
          .update({ sort_order: index })
          .eq("id", id)
          .eq("kind", data.kind),
      ),
    );
    const failed = results.find((r) => r.error);
    if (failed?.error) throw friendlyDbError(failed.error);
    return { ok: true };
  });

export const deleteContent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator(z.object({ id: z.string().uuid() }))
  .handler(async ({ data, context }): Promise<{ ok: true; removedFiles: number }> => {
    const supabase = context.supabase as Db;
    await assertAdmin(supabase, context.userId);

    const { data: existing, error: readError } = await supabase
      .from("site_content")
      .select("kind, content")
      .eq("id", data.id)
      .maybeSingle();
    if (readError) throw friendlyDbError(readError);
    if (!existing) return { ok: true, removedFiles: 0 };

    const { error } = await supabase.from("site_content").delete().eq("id", data.id);
    if (error) throw friendlyDbError(error);

    // Best-effort cleanup: the row is already gone, so a storage failure must not fail the delete.
    const paths = collectMediaPaths(existing.kind as ContentRow["kind"], existing.content);
    let removedFiles = 0;
    if (paths.length > 0) {
      const { data: removed, error: storageError } = await supabase.storage
        .from(MEDIA_BUCKET)
        .remove(paths);
      if (!storageError) removedFiles = removed?.length ?? 0;
    }
    return { ok: true, removedFiles };
  });
