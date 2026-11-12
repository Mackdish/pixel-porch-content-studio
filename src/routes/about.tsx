import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, SectionHeading } from "@/components/site/Section";
import { CtaBand } from "@/components/site/Blocks";
import { STATS } from "@/lib/site";
import { pageHead } from "@/lib/seo";
import { PHOTOS } from "@/lib/gallery";

export const Route = createFileRoute("/about")({
  head: () => pageHead("About Us", "Clisanco Technologies Limited is a Kisumu-based ICT company and Africa's digital transformation partner, specialising in network infrastructure."),
  component: () => (
    <>
      <PageHero eyebrow="About" title="Africa's Digital Transformation Partner." intro="We're a Kisumu-based ICT company focused on one thing above all: network infrastructure that organisations can rely on." />
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading title="Practical, honest, documented." />
            <div className="space-y-5 text-lg text-muted-foreground">
              <p>Clisanco Technologies Limited designs and installs LAN, Wi-Fi and server-room infrastructure for schools, businesses, hospitals, NGOs and government offices across Kenya.</p>
              <p>We believe in no black boxes. You get clear proposals, regular progress notes and full documentation, so your network is yours to understand and grow.</p>
            </div>
          </div>
          <img src={PHOTOS.teamBriefing.src} alt={PHOTOS.teamBriefing.alt} loading="lazy" width={1200} height={960} className="aspect-[5/4] w-full rounded-3xl object-cover object-[50%_38%] shadow-soft" />
        </div>
      </Section>
      <Section tone="surface">
        <div className="grid gap-10 text-center md:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.label}><p className="text-6xl font-extrabold text-brand">{s.value}</p><p className="mt-3 text-lg font-medium">{s.label}</p></div>
          ))}
        </div>
        <p className="mt-10 text-center text-xs text-muted-foreground">Based on internal company records.</p>
      </Section>
      <CtaBand />
    </>
  ),
});
