import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, SectionHeading } from "@/components/site/Section";
import { CtaBand } from "@/components/site/Blocks";
import { ProjectGrid } from "@/components/site/Cards";
import { ProjectGallery } from "@/components/site/ProjectGallery";
import { NETWORKING_GALLERY } from "@/lib/gallery";
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
<ProjectGrid projects={projects} />
      </Section>
      <Section tone="surface">
        <SectionHeading eyebrow="On site" title="Networking Installations, in the field." intro="Photos and video from the project, from cabling under the desks to the wall-mounted network cabinet." />
        <ProjectGallery items={NETWORKING_GALLERY} />
      </Section>
      <CtaBand />
    </>
  );
}
