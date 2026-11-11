import { supabase } from "@/integrations/supabase/client";
import type { MediaItem } from "@/lib/content-types";
import {
  IMAGE_TYPES,
  MAX_IMAGE_MB,
  MAX_VIDEO_MB,
  MEDIA_BUCKET,
  VIDEO_TYPES,
} from "@/lib/media-config";

export type MediaKind = MediaItem["type"];

export function mediaKindOf(file: File): MediaKind | null {
  if ((IMAGE_TYPES as readonly string[]).includes(file.type)) return "image";
  if ((VIDEO_TYPES as readonly string[]).includes(file.type)) return "video";
  return null;
}

/** Returns a human-readable problem with the file, or null when it can be uploaded. */
export function validateMediaFile(file: File, allowed: readonly MediaKind[]): string | null {
  const kind = mediaKindOf(file);
  if (!kind) {
    return `${file.name}: unsupported file type. Use JPG, PNG, WebP, AVIF, GIF, MP4, WebM or MOV.`;
  }
  if (!allowed.includes(kind)) {
    return `${file.name}: this field only accepts ${allowed.join(" and ")} files.`;
  }
  const limitMb = kind === "image" ? MAX_IMAGE_MB : MAX_VIDEO_MB;
  if (file.size > limitMb * 1024 * 1024) {
    return `${file.name}: too large (${(file.size / 1024 / 1024).toFixed(1)} MB). The ${kind} limit is ${limitMb} MB.`;
  }
  return null;
}

function safeName(name: string): string {
  const dot = name.lastIndexOf(".");
  const base = (dot > 0 ? name.slice(0, dot) : name)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50);
  const ext =
    dot > 0
      ? name
          .slice(dot + 1)
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "")
          .slice(0, 5)
      : "";
  return `${base || "file"}${ext ? `.${ext}` : ""}`;
}

/**
 * Upload one file to the media bucket as the signed-in administrator.
 * Storage policies reject anyone else, so this cannot be used to bypass access control.
 */
export async function uploadMedia(file: File, allowed: readonly MediaKind[]): Promise<MediaItem> {
  const problem = validateMediaFile(file, allowed);
  if (problem) throw new Error(problem);
  const kind = mediaKindOf(file) as MediaKind;

  const year = new Date().getFullYear();
  const path = `${kind}s/${year}/${crypto.randomUUID()}-${safeName(file.name)}`;

  const { error } = await supabase.storage.from(MEDIA_BUCKET).upload(path, file, {
    contentType: file.type,
    cacheControl: "31536000",
    upsert: false,
  });
  if (error) {
    const msg = error.message.toLowerCase();
    if (msg.includes("bucket not found")) {
      throw new Error(
        "The project-images storage bucket doesn't exist yet. It needs to be created in Lovable Cloud before uploads can work.",
      );
    }
    if (msg.includes("mime") || msg.includes("not supported")) {
      throw new Error(`${file.name}: the storage bucket doesn't allow this file type yet.`);
    }
    if (msg.includes("exceeded") || msg.includes("too large") || msg.includes("payload")) {
      throw new Error(
        `${file.name}: rejected by storage as too large. The bucket's file size limit may need raising.`,
      );
    }
    if (
      msg.includes("row-level security") ||
      msg.includes("unauthorized") ||
      msg.includes("not authorized")
    ) {
      throw new Error(
        "Storage refused the upload. Make sure you're signed in as an administrator.",
      );
    }
    throw new Error(`${file.name}: ${error.message}`);
  }

  const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path);
  return { path, url: data.publicUrl, type: kind, alt: "" };
}
