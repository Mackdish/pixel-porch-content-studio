import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowDown, ArrowLeft, ArrowUp, Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { useState, type ComponentType } from "react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import {
  deleteContent,
  listContent,
  reorderContent,
  setContentPublished,
} from "@/lib/content.functions";
import type { ContentKind, ContentRow } from "@/lib/content-types";
import type { EditorProps } from "./editors";

type Props = {
  kind: ContentKind;
  singular: string;
  plural: string;
  intro: string;
  Editor: ComponentType<EditorProps>;
  /** A short secondary line for each row. */
  describe: (row: ContentRow) => string;
  /** Optional thumbnail URL for each row. */
  thumbnail?: (row: ContentRow) => string | null;
};

type Mode = { type: "list" } | { type: "edit"; row: ContentRow | null };

export function ContentManager({
  kind,
  singular,
  plural,
  intro,
  Editor,
  describe,
  thumbnail,
}: Props) {
  const queryClient = useQueryClient();
  const queryKey = ["admin-content", kind] as const;
  const [mode, setMode] = useState<Mode>({ type: "list" });
  const [toDelete, setToDelete] = useState<ContentRow | null>(null);

  const query = useQuery({ queryKey, queryFn: () => listContent({ data: { kind } }) });
  const rows = query.data ?? [];
  const refresh = () => queryClient.invalidateQueries({ queryKey });

  const publish = useMutation({
    mutationFn: (v: { id: string; published: boolean }) => setContentPublished({ data: v }),
    onSuccess: (_d, v) => {
      toast.success(v.published ? "Published." : "Moved back to drafts.");
      void refresh();
    },
    onError: (e: unknown) =>
      toast.error("Couldn't update", { description: e instanceof Error ? e.message : undefined }),
  });

  const reorder = useMutation({
    mutationFn: (ids: string[]) => reorderContent({ data: { kind, ids } }),
    onSuccess: () => void refresh(),
    onError: (e: unknown) => {
      toast.error("Couldn't reorder", { description: e instanceof Error ? e.message : undefined });
      void refresh();
    },
  });

  const remove = useMutation({
    mutationFn: (id: string) => deleteContent({ data: { id } }),
    onSuccess: (res) => {
      toast.success(`${capitalise(singular)} deleted.`, {
        description:
          res.removedFiles > 0
            ? `${res.removedFiles} uploaded file${res.removedFiles === 1 ? "" : "s"} removed too.`
            : undefined,
      });
      setToDelete(null);
      void refresh();
    },
    onError: (e: unknown) => {
      setToDelete(null);
      toast.error("Couldn't delete", { description: e instanceof Error ? e.message : undefined });
    },
  });

  function move(index: number, delta: -1 | 1) {
    const target = index + delta;
    if (target < 0 || target >= rows.length) return;
    const ids = rows.map((r) => r.id);
    const [moved] = ids.splice(index, 1);
    if (!moved) return;
    ids.splice(target, 0, moved);
    reorder.mutate(ids);
  }

  if (mode.type === "edit") {
    return (
      <div>
        <Button
          variant="ghost"
          size="sm"
          className="-ml-3 mb-4"
          onClick={() => setMode({ type: "list" })}
        >
          <ArrowLeft /> Back to {plural}
        </Button>
        <h2 className="mb-6 text-2xl font-bold">
          {mode.row ? `Edit ${singular}` : `New ${singular}`}
        </h2>
        <div className="max-w-3xl">
          <Editor
            key={mode.row?.id ?? "new"}
            row={mode.row}
            nextOrder={rows.length}
            onCancel={() => setMode({ type: "list" })}
            onSaved={() => {
              void refresh();
              setMode({ type: "list" });
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <p className="max-w-xl text-muted-foreground">{intro}</p>
        <Button variant="accent" onClick={() => setMode({ type: "edit", row: null })}>
          <Plus /> New {singular}
        </Button>
      </div>

      <div className="mt-6">
        {query.isPending ? (
          <div className="space-y-3" aria-busy="true" aria-label={`Loading ${plural}`}>
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="h-20 w-full rounded-2xl" />
            ))}
          </div>
        ) : query.isError ? (
          <div
            role="alert"
            className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6"
          >
            <p className="font-semibold text-destructive">Couldn't load {plural}.</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {query.error instanceof Error ? query.error.message : "Please try again."}
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => void query.refetch()}
            >
              Try again
            </Button>
          </div>
        ) : rows.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-surface px-6 py-14 text-center">
            <p className="text-lg font-semibold">No {plural} yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Create your first {singular} to get started.
            </p>
            <Button
              variant="accent"
              className="mt-5"
              onClick={() => setMode({ type: "edit", row: null })}
            >
              <Plus /> New {singular}
            </Button>
          </div>
        ) : (
          <ul className="space-y-3">
            {rows.map((row, index) => {
              const thumb = thumbnail?.(row) ?? null;
              return (
                <li
                  key={row.id}
                  className="flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-card p-4"
                >
                  {thumbnail && (
                    <div className="size-16 shrink-0 overflow-hidden rounded-xl bg-muted">
                      {thumb && (
                        <img src={thumb} alt="" loading="lazy" className="size-full object-cover" />
                      )}
                    </div>
                  )}
                  <div className="min-w-0 flex-1 basis-48">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="truncate font-semibold">{row.title}</p>
                      <Badge variant={row.published ? "default" : "secondary"}>
                        {row.published ? "Published" : "Draft"}
                      </Badge>
                    </div>
                    <p className="mt-0.5 truncate text-sm text-muted-foreground">{describe(row)}</p>
                  </div>

                  <div className="flex items-center gap-1">
                    <Switch
                      checked={row.published}
                      disabled={publish.isPending && publish.variables?.id === row.id}
                      onCheckedChange={(published) => publish.mutate({ id: row.id, published })}
                      aria-label={`${row.published ? "Unpublish" : "Publish"} ${row.title}`}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`Move ${row.title} up`}
                      disabled={index === 0 || reorder.isPending}
                      onClick={() => move(index, -1)}
                    >
                      <ArrowUp />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`Move ${row.title} down`}
                      disabled={index === rows.length - 1 || reorder.isPending}
                      onClick={() => move(index, 1)}
                    >
                      <ArrowDown />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setMode({ type: "edit", row })}
                    >
                      <Pencil /> Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`Delete ${row.title}`}
                      className="text-destructive hover:text-destructive"
                      onClick={() => setToDelete(row)}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <AlertDialog
        open={toDelete !== null}
        onOpenChange={(open) => !open && !remove.isPending && setToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete “{toDelete?.title}”?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes the {singular}
              {toDelete && (kind === "project" || kind === "post")
                ? " and any images or videos uploaded for it"
                : ""}
              . This can't be undone. To hide it instead, switch it back to a draft.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={remove.isPending}>Keep it</AlertDialogCancel>
            <AlertDialogAction
              disabled={remove.isPending}
              onClick={(e) => {
                e.preventDefault();
                if (toDelete) remove.mutate(toDelete.id);
              }}
            >
              {remove.isPending && <Loader2 className="animate-spin" />}
              {remove.isPending ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function capitalise(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
