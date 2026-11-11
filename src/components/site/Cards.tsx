import { ArrowUpRight } from "lucide-react";
import type { PROJECTS, POSTS } from "@/lib/site";
import rack from "@/assets/hero-rack.jpg";
import wifi from "@/assets/wifi-office.jpg";
import engineer from "@/assets/cabling-engineer.jpg";
import design from "@/assets/network-design.jpg";

const IMGS = { rack, wifi, engineer, design };

export function ProjectCard({ project }: { project: (typeof PROJECTS)[number] }) {
  return (
    <article className="card-lift group h-full overflow-hidden rounded-3xl border border-border bg-card">
      <div className="overflow-hidden">
        <img src={IMGS[project.img]} alt={project.title} loading="lazy" width={1200} height={960} className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
      </div>
      <div className="p-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand">{project.tag}</p>
        <h3 className="mt-2 text-xl font-bold">{project.title}</h3>
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
