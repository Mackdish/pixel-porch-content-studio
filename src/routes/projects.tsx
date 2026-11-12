import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, SectionHeading } from "@/components/site/Section";
import { CtaBand } from "@/components/site/Blocks";
import { ProjectCard } from "@/components/site/Cards";
import { ProjectGallery } from "@/components/site/ProjectGallery";
import { Reveal } from "@/components/site/Reveal";
import { NETWORKING_GALLERY } from "@/lib/gallery";
import { PROJECTS } from "@/lib/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/projects")({
  head: () => pageHead("Projects", "Selected network installation, Wi-Fi and server-room projects delivered by Clisanco Technologies across Kenya."),
  component: () => (
    <>
      <PageHero eyebrow="Projects" title="Networks we've built." intro="A selection of recent installations for schools, businesses and organisations." />
      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          {PROJECTS.map((p, i) => <div key={p.title} className={"img" in p ? "md:col-span-3" : ""}><Reveal delay={i * 60}><ProjectCard project={p} /></Reveal></div>)}
        </div>
      </Section>
      <Section tone="surface">
        <SectionHeading eyebrow="On site" title="Networking Installations, in the field." intro="Photos and video from the project, from cabling under the desks to the wall-mounted network cabinet." />
        <ProjectGallery items={NETWORKING_GALLERY} />
      </Section>
      <CtaBand />
    </>
  ),
});
