import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { CtaBand } from "@/components/site/Blocks";
import { ProjectCard } from "@/components/site/Cards";
import { Reveal } from "@/components/site/Reveal";
import { PROJECTS } from "@/lib/site";
import { getPublishedProjects } from "@/lib/content.functions";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/projects")({
  loader: () => getPublishedProjects(),
  head: () => pageHead("Projects", "Selected network installation, Wi-Fi and server-room projects delivered by Clisanco Technologies across Kenya."),
  component: ProjectsPage,
});

function ProjectsPage() {
  const managedProjects = Route.useLoaderData();
  const projects = managedProjects.length > 0 ? managedProjects : PROJECTS;
  return (
    <>
      <PageHero eyebrow="Projects" title="Networks we've built." intro="A selection of recent installations for schools, businesses and organisations." />
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => <Reveal key={"id" in p ? p.id : p.title} delay={i * 60}><ProjectCard project={p} /></Reveal>)}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
