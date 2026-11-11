/**
 * Storage settings shared by the dashboard (browser) and the server functions.
 * Kept free of imports so it is safe to load from either side.
 *
 * Images and videos both go to the `project-images` bucket, which already has
 * public-read and administrator-only write policies. Videos need that bucket to
 * allow video MIME types and a file size limit of at least MAX_VIDEO_MB.
 */
export const MEDIA_BUCKET = "project-images";

export const IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
] as const;
export const VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime"] as const;

export const MAX_IMAGE_MB = 10;
export const MAX_VIDEO_MB = 50;
