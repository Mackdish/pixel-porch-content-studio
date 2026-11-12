import { ArrowUpRight } from "lucide-react";
import type { PROJECTS, POSTS } from "@/lib/site";
import { PHOTOS } from "@/lib/gallery";

// Only projects with a real photo get one; the rest render as text-only cards.
const IMGS = { exterior: PHOTOS.exterior } as const;

export function ProjectCard({ project }: { project: (typeof PROJECTS)[number] }) {
  const photo = "img" in project ? IMGS[project.img] : null;
  return (
    <article className={`card-lift group h-full overflow-hidden rounded-3xl border border-border bg-card ${photo ? "md:grid md:grid-cols-2" : ""}`}>
      {photo && (
        <div className="overflow-hidden">
          <img src={photo.src} alt={photo.alt} loading="lazy" width={photo.width} height={photo.height} className="aspect-[16/10] h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
        </div>
      )}
      <div className={photo ? "flex flex-col justify-center p-7 md:p-12" : "p-7"}>
        <p className="text-xs font-semibold uppercase tracking-wider text-brand">{project.tag}</p>
        <h3 className={`mt-2 font-bold ${photo ? "text-2xl md:text-3xl" : "text-xl"}`}>{project.title}</h3>
        <p className="mt-2 text-muted-foreground">{project.text}</p>
      </div>
    </article>
  );
}

export function PostCard({ post }: { post: (typeof POSTS)[number] }) {
  return (
    <article className="card-lift flex h-full flex-col justify-between rounded-3xl border border-border bg-card p-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-brand">{post.tag}</p>
        <h3 className="mt-3 text-xl font-bold leading-snug">{post.title}</h3>
        <p className="mt-3 text-muted-foreground">{post.excerpt}</p>
      </div>
      <p className="mt-8 flex items-center justify-between text-sm text-muted-foreground">{post.date}<ArrowUpRight className="size-4" /></p>
    </article>
  );
}
