import { ArrowUpRight } from "lucide-react";
import type { PROJECTS, POSTS } from "@/lib/site";
import { parseContent, type ContentRow } from "@/lib/content-types";
import { PHOTOS } from "@/lib/gallery";
import { Reveal } from "./Reveal";

// Photos that ship with the site, referenced by name from the static project list.
const LOCAL_PHOTOS = { exterior: PHOTOS.exterior } as const;

type StaticProject = (typeof PROJECTS)[number];
type AnyProject = ContentRow | StaticProject;
type Photo = { src: string; alt: string; width: number; height: number };

/** The picture for a project, or null when it has none (it then renders as a text-only card). */
function photoOf(project: AnyProject): Photo | null {
  if ("content" in project) {
    const cover = parseContent("project", project.content).media.find((item) => item.type === "image");
    return cover ? { src: cover.url, alt: cover.alt || project.title, width: 1200, height: 960 } : null;
  }
  if (!("img" in project)) return null;
  if (project.img.startsWith("http")) return { src: project.img, alt: `${project.title} website preview`, width: 1200, height: 800 };
  return LOCAL_PHOTOS[project.img as keyof typeof LOCAL_PHOTOS] ?? null;
}

/** The lead project, which is shown as one wide card using a photo from the site itself. */
function isFeatured(project: AnyProject): boolean {
  return !("content" in project) && "img" in project && project.img in LOCAL_PHOTOS;
}

export function ProjectCard({ project }: { project: AnyProject }) {
  const isManaged = "content" in project;
  const content = isManaged ? parseContent("project", project.content) : null;
  const photo = photoOf(project);
  const featured = isFeatured(project);
  const tag = content?.tag || (!isManaged ? project.tag : "Project");
  const description = content?.summary || (!isManaged ? project.text : "Project delivered by Clisanco Technologies.");
  const url = !isManaged && "url" in project ? project.url : undefined;
  return (
    <article className={`card-lift group h-full overflow-hidden rounded-3xl border border-border bg-card ${featured ? "md:grid md:grid-cols-2" : ""}`}>
      {photo && (
        <div className="overflow-hidden">
          <img src={photo.src} alt={photo.alt} loading="lazy" width={photo.width} height={photo.height} className={`w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] ${featured ? "aspect-[16/10] h-full" : "aspect-[16/10]"}`} />
        </div>
      )}
      <div className={featured ? "flex flex-col justify-center p-7 md:p-12" : "p-7"}>
        <p className="text-xs font-semibold uppercase tracking-wider text-brand">{tag}</p>
        <h3 className={`mt-2 font-bold ${featured ? "text-2xl md:text-3xl" : "text-xl"}`}>{project.title}</h3>
        {content?.location && <p className="mt-1 text-xs text-muted-foreground">{content.location}</p>}
        <p className="mt-2 text-muted-foreground">{description}</p>
        {url && <a href={url} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline">Visit website <ArrowUpRight className="size-4" /></a>}
      </div>
    </article>
  );
}

/**
 * Lays projects out in three groups: the wide lead project, then cards that have
 * a picture, then text-only cards. Keeping them apart stops a text-only card
 * stretching to the height of a neighbouring photo card.
 */
export function ProjectGrid({ projects }: { projects: AnyProject[] }) {
  const rest = projects.filter((p) => !isFeatured(p));
  const groups = {
    featured: projects.filter(isFeatured),
    withPhoto: rest.filter((p) => photoOf(p)),
    textOnly: rest.filter((p) => !photoOf(p)),
  };
  let n = 0;
  const item = (p: AnyProject) => (
    <Reveal key={"id" in p ? p.id : p.title} delay={n++ * 60}>
      <ProjectCard project={p} />
    </Reveal>
  );
  return (
    <div className="space-y-6">
      {groups.featured.map(item)}
      {groups.withPhoto.length > 0 && <div className="grid gap-6 md:grid-cols-2">{groups.withPhoto.map(item)}</div>}
      {groups.textOnly.length > 0 && <div className="grid gap-6 md:grid-cols-3">{groups.textOnly.map(item)}</div>}
    </div>
  );
}

export function PostCard({ post }: { post: (typeof POSTS)[number] }) {
  return (
    <article className="card-lift flex h-full flex-col justify-between rounded-3xl border border-border bg-card p-8"><div><p className="text-xs font-semibold uppercase tracking-wider text-brand">{post.tag}</p><h3 className="mt-3 text-xl font-bold leading-snug">{post.title}</h3><p className="mt-3 text-muted-foreground">{post.excerpt}</p></div><p className="mt-8 flex items-center justify-between text-sm text-muted-foreground">{post.date}<ArrowUpRight className="size-4" /></p></article>
  );
}
