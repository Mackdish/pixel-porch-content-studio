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
  head: () => pageHead("Projects", "A selection of websites, digital platforms, e-commerce experiences and ICT projects delivered by Clisanco Technologies."),
  component: ProjectsPage,
});

function ProjectsPage() {
  const managedProjects = Route.useLoaderData();
  const projects = [...PROJECTS, ...managedProjects.filter((managed) => !PROJECTS.some((project) => project.title === managed.title))];
  return (
    <>
      <PageHero eyebrow="Projects" title="Digital solutions in action." intro="Explore websites, online platforms, e-commerce experiences and ICT projects created to solve practical business and organisational needs." />
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => <Reveal key={"id" in p ? p.id : p.title} delay={i * 60}><ProjectCard project={p} /></Reveal>)}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
