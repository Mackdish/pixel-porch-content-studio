import { ArrowUpRight } from "lucide-react";
import type { PROJECTS, POSTS } from "@/lib/site";
import { parseContent, type ContentRow } from "@/lib/content-types";
import rack from "@/assets/hero-rack.jpg";
import wifi from "@/assets/wifi-office.jpg";
import engineer from "@/assets/cabling-engineer.jpg";
import design from "@/assets/network-design.jpg";

const IMGS = { rack, wifi, engineer, design };
type StaticProject = (typeof PROJECTS)[number];

export function ProjectCard({ project }: { project: ContentRow | StaticProject }) {
  const isManaged = "content" in project;
  const content = isManaged ? parseContent("project", project.content) : null;
  const cover = content?.media.find((item) => item.type === "image");
  const image = cover?.url ?? (isManaged ? rack : IMGS[project.img]);
  const tag = content?.tag || (!isManaged ? project.tag : "Project");
  const description = content?.summary || (!isManaged ? project.text : "Project delivered by Clisanco Technologies.");
  return (
    <article className="card-lift group h-full overflow-hidden rounded-3xl border border-border bg-card">
      <div className="overflow-hidden"><img src={image} alt={cover?.alt || project.title} loading="lazy" width={1200} height={960} className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" /></div>
      <div className="p-7"><p className="text-xs font-semibold uppercase tracking-wider text-brand">{tag}</p><h3 className="mt-2 text-xl font-bold">{project.title}</h3>{content?.location && <p className="mt-1 text-xs text-muted-foreground">{content.location}</p>}<p className="mt-2 text-muted-foreground">{description}</p></div>
    </article>
  );
}

export function PostCard({ post }: { post: (typeof POSTS)[number] }) {
  return (
    <article className="card-lift flex h-full flex-col justify-between rounded-3xl border border-border bg-card p-8"><div><p className="text-xs font-semibold uppercase tracking-wider text-brand">{post.tag}</p><h3 className="mt-3 text-xl font-bold leading-snug">{post.title}</h3><p className="mt-3 text-muted-foreground">{post.excerpt}</p></div><p className="mt-8 flex items-center justify-between text-sm text-muted-foreground">{post.date}<ArrowUpRight className="size-4" /></p></article>
  );
}
