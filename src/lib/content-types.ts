import { z } from "zod";

import type { Json } from "@/integrations/supabase/types";

/**
 * Shared content model for the admin dashboard.
 *
 * Everything lives in the normalized `public.site_content` table. The `kind`
 * column says what a row is, and the `content` JSONB column holds the
 * kind-specific fields validated by the schemas below.
 */

export const KINDS = ["project", "service", "page", "faq", "post"] as const;
export type ContentKind = (typeof KINDS)[number];

export const mediaItemSchema = z.object({
  /** Object path inside the storage bucket. */
  path: z.string().min(1).max(500),
  /** Public URL used to display the file. */
  url: z.string().url().max(2000),
  type: z.enum(["image", "video"]),
  /** Alt text for images, a caption for videos. */
  alt: z.string().max(300).default(""),
});
export type MediaItem = z.infer<typeof mediaItemSchema>;

const text = (max: number) => z.string().trim().max(max).default("");

export const projectContentSchema = z.object({
  tag: text(60),
  location: text(120),
  summary: text(600),
  media: z.array(mediaItemSchema).max(40).default([]),
});

export const serviceContentSchema = z.object({
  summary: text(400),
  details: text(8000),
  features: z.array(z.string().trim().min(1).max(200)).max(30).default([]),
});

export const pageContentSchema = z.object({
  heading: text(200),
  intro: text(800),
  body: text(20000),
});

export const faqContentSchema = z.object({
  answer: text(4000),
});

export const postContentSchema = z.object({
  tag: text(60),
  excerpt: text(400),
  body: text(60000),
  cover: mediaItemSchema.nullable().default(null),
});

export type ProjectContent = z.infer<typeof projectContentSchema>;
export type ServiceContent = z.infer<typeof serviceContentSchema>;
export type PageContent = z.infer<typeof pageContentSchema>;
export type FaqContent = z.infer<typeof faqContentSchema>;
export type PostContent = z.infer<typeof postContentSchema>;

export const contentSchemas = {
  project: projectContentSchema,
  service: serviceContentSchema,
  page: pageContentSchema,
  faq: faqContentSchema,
  post: postContentSchema,
} as const;

export type ContentByKind = {
  project: ProjectContent;
  service: ServiceContent;
  page: PageContent;
  faq: FaqContent;
  post: PostContent;
};

/** A row from `site_content`. `content` is raw JSON until parsed with `parseContent`. */
export type ContentRow = {
  id: string;
  kind: ContentKind;
  title: string;
  slug: string;
  content: Json;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export const saveInputSchema = z.object({
  id: z.string().uuid().optional(),
  kind: z.enum(KINDS),
  title: z.string().trim().min(1, "A title is required.").max(200),
  slug: z
    .string()
    .trim()
    .min(1, "A URL slug is required.")
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and single hyphens only."),
  published: z.boolean(),
  sort_order: z.number().int().min(0).max(100000),
  content: z.unknown(),
});
export type SaveInput = z.infer<typeof saveInputSchema>;

/** Parse stored JSON for a kind, falling back to defaults when it is empty or malformed. */
export function parseContent<K extends ContentKind>(kind: K, raw: unknown): ContentByKind[K] {
  const schema = contentSchemas[kind] as unknown as z.ZodType<
    ContentByKind[K],
    z.ZodTypeDef,
    unknown
  >;
  const parsed = schema.safeParse(raw ?? {});
  if (parsed.success) return parsed.data;
  return schema.parse({});
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function randomSuffix(length = 6): string {
  const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("");
}

/** Every storage object path referenced by a row's content, used for cleanup on delete. */
export function collectMediaPaths(kind: ContentKind, raw: unknown): string[] {
  if (kind === "project") return parseContent("project", raw).media.map((m) => m.path);
  if (kind === "post") {
    const cover = parseContent("post", raw).cover;
    return cover ? [cover.path] : [];
  }
  return [];
}
