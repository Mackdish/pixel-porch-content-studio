import { ImagePlus, Loader2, Star, Trash2, Video } from "lucide-react";
import { useId, useRef, useState, type DragEvent } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { MediaItem } from "@/lib/content-types";
import { IMAGE_TYPES, MAX_IMAGE_MB, MAX_VIDEO_MB, VIDEO_TYPES } from "@/lib/media-config";
import { uploadMedia, type MediaKind } from "@/lib/media";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  hint?: string;
  value: MediaItem[];
  onChange: (next: MediaItem[]) => void;
  allow: readonly MediaKind[];
  /** When false, a new upload replaces the current file. */
  multiple?: boolean;
};

export function MediaField({ label, hint, value, onChange, allow, multiple = true }: Props) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const latest = useRef(value);
  latest.current = value;

  const [uploading, setUploading] = useState<string[]>([]);
  const [dragging, setDragging] = useState(false);

  const accept = [
    ...(allow.includes("image") ? IMAGE_TYPES : []),
    ...(allow.includes("video") ? VIDEO_TYPES : []),
  ].join(",");

  const limits = [
    allow.includes("image") ? `images up to ${MAX_IMAGE_MB} MB` : null,
    allow.includes("video") ? `videos up to ${MAX_VIDEO_MB} MB` : null,
  ]
    .filter(Boolean)
    .join(", ");

  async function handleFiles(fileList: FileList | File[]) {
    const files = Array.from(fileList);
    if (files.length === 0) return;
    const queue = multiple ? files : files.slice(0, 1);

    setUploading((u) => [...u, ...queue.map((f) => f.name)]);
    const results = await Promise.allSettled(queue.map((f) => uploadMedia(f, allow)));
    setUploading((u) => u.filter((name) => !queue.some((f) => f.name === name)));

    const uploaded: MediaItem[] = [];
    results.forEach((r) => {
      if (r.status === "fulfilled") uploaded.push(r.value);
      else toast.error(r.reason instanceof Error ? r.reason.message : "Upload failed.");
    });

    if (uploaded.length > 0) {
      onChange(multiple ? [...latest.current, ...uploaded] : uploaded.slice(0, 1));
      toast.success(
        uploaded.length === 1 ? "File uploaded." : `${uploaded.length} files uploaded.`,
        {
          description: "Remember to save to attach them.",
        },
      );
    }
    if (inputRef.current) inputRef.current.value = "";
  }

  function onDrop(e: DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    setDragging(false);
    void handleFiles(e.dataTransfer.files);
  }

  function update(index: number, patch: Partial<MediaItem>) {
    onChange(value.map((m, i) => (i === index ? { ...m, ...patch } : m)));
  }

  function remove(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  function makeFirst(index: number) {
    const item = value[index];
    if (!item) return;
    onChange([item, ...value.filter((_, i) => i !== index)]);
  }

  const busy = uploading.length > 0;
  const firstImageIndex = value.findIndex((m) => m.type === "image");

  return (
    <div>
      <span className="text-sm font-medium">{label}</span>
      {hint && <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>}

      <label
        htmlFor={inputId}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={cn(
          "mt-2 flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-2xl border-2 border-dashed px-4 py-8 text-center transition-colors",
          dragging
            ? "border-brand bg-brand-soft"
            : "border-border bg-surface hover:border-brand/60",
          busy && "pointer-events-none opacity-70",
        )}
      >
        {busy ? (
          <Loader2 className="size-6 animate-spin text-brand" />
        ) : (
          <ImagePlus className="size-6 text-brand" />
        )}
        <span className="text-sm font-semibold">
          {busy
            ? `Uploading ${uploading.length} file${uploading.length === 1 ? "" : "s"}…`
            : "Drop files here or click to browse"}
        </span>
        <span className="text-xs text-muted-foreground">{limits}</span>
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={busy}
          className="sr-only"
          onChange={(e) => e.target.files && void handleFiles(e.target.files)}
        />
      </label>

      {value.length > 0 && (
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {value.map((item, index) => (
            <li
              key={item.path}
              className="overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div className="relative aspect-video bg-muted">
                {item.type === "image" ? (
                  <img
                    src={item.url}
                    alt={item.alt}
                    loading="lazy"
                    className="size-full object-cover"
                  />
                ) : (
                  <video
                    src={item.url}
                    controls
                    preload="metadata"
                    className="size-full bg-black object-contain"
                  />
                )}
                <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-background/90 px-2 py-0.5 text-xs font-semibold">
                  {item.type === "video" ? (
                    <Video className="size-3" />
                  ) : (
                    <ImagePlus className="size-3" />
                  )}
                  {item.type === "video"
                    ? "Video"
                    : index === firstImageIndex
                      ? "Cover image"
                      : "Image"}
                </span>
              </div>
              <div className="space-y-2 p-3">
                <Input
                  value={item.alt}
                  maxLength={300}
                  onChange={(e) => update(index, { alt: e.target.value })}
                  placeholder={
                    item.type === "image" ? "Describe the image (alt text)" : "Video caption"
                  }
                  aria-label={item.type === "image" ? "Alt text" : "Video caption"}
                />
                <div className="flex items-center justify-between gap-2">
                  {multiple && item.type === "image" && index !== firstImageIndex ? (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => makeFirst(index)}
                    >
                      <Star /> Make cover
                    </Button>
                  ) : (
                    <span />
                  )}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => remove(index)}
                  >
                    <Trash2 /> Remove
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
