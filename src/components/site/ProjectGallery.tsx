import type { GalleryItem } from "@/lib/gallery";

/**
 * Mixed photo and video gallery. Uses CSS columns so portrait and landscape
 * media sit together without cropping. Videos load nothing until played.
 */
export function ProjectGallery({ items }: { items: GalleryItem[] }) {
  return (
    <ul className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>li]:mb-6">
      {items.map((item) => (
        <li key={item.src} className="break-inside-avoid">
          <figure className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
            {item.type === "image" ? (
              <img
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                loading="lazy"
                className="h-auto w-full"
              />
            ) : (
              <video
                controls
                playsInline
                preload="none"
                poster={item.poster}
                width={item.width}
                height={item.height}
                aria-label={item.alt}
                className="h-auto w-full bg-ink"
              >
                <source src={item.src} type="video/mp4" />
              </video>
            )}
            <figcaption className="px-5 py-4 text-sm text-muted-foreground">{item.caption}</figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
