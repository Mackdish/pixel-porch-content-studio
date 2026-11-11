import { createFileRoute, Link } from "@tanstack/react-router";
import { Cable, Network, Router, Wifi, Server, Shield, Gauge, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero, Section, SectionHeading } from "@/components/site/Section";
import { CheckList, CtaBand, FaqList, ProcessTimeline } from "@/components/site/Blocks";
import { Reveal } from "@/components/site/Reveal";
import { FAQS } from "@/lib/site";
import { pageHead } from "@/lib/seo";
import img from "@/assets/Cabling-engineer.jpeg";

export const Route = createFileRoute("/network-installation")({
  head: () => pageHead("LAN Installation Kisumu & Kenya", "End-to-end LAN installation in Kisumu and across Kenya: structured cabling, fibre, switches, Wi-Fi, racks, firewalls, testing, certification and documentation."),
  component: Page,
});

const SCOPE = [
  { icon: Cable, title: "Structured cabling", text: "Cat6 and Cat6A copper runs, patch panels and faceplates, routed and dressed properly." },
  { icon: Network, title: "Fibre backbone", text: "Fibre links between floors, buildings and server rooms for speed and distance." },
  { icon: Router, title: "Switching", text: "Managed switches configured with VLANs and sensible addressing." },
  { icon: Wifi, title: "Wi-Fi", text: "Surveyed access-point placement for coverage and capacity." },
  { icon: Server, title: "Racks & server rooms", text: "Rack builds, cable management, power and UPS." },
  { icon: Shield, title: "Firewall", text: "Perimeter firewall setup, access rules and guest separation." },
  { icon: Gauge, title: "Testing & certification", text: "Every run tested and certified before handover." },
  { icon: FileText, title: "Documentation", text: "As-built drawings, labelling schedules and configs." },
];

const DELIVERABLES = [
  "Site survey report", "Network design & topology diagram", "Itemised bill of quantities", "Cable test & certification results",
  "Labelling schedule for every point", "As-built drawings", "Device configuration backup", "Signed handover checklist",
];

function Page() {
  return (
    <>
      <PageHero eyebrow="Network installation" title="LAN installation, done properly the first time." intro="From a single office to a multi-building campus, we design, install, test and document networks that just work, across Kisumu and the rest of Kenya.">
        <Button asChild size="lg"><Link to="/contact">Get a Free Site Survey</Link></Button>
        <Button asChild size="lg" variant="outline"><Link to="/projects">See Our Work</Link></Button>
      </PageHero>
      <Section>
        <SectionHeading eyebrow="Scope" title="What's included." intro="Pick the full package or just the parts you need." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SCOPE.map((s, i) => (
            <Reveal key={s.title} delay={i * 40}>
              <div className="card-lift h-full rounded-3xl border border-border bg-card p-7">
                <s.icon className="size-7 text-brand" />
                <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
      <Section tone="surface">
        <SectionHeading eyebrow="Process" title="How the project runs." />
        <ProcessTimeline />
      </Section>
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <img src={img} alt="Engineer certifying an Ethernet cable run with a tester" loading="lazy" width={1200} height={960} className="aspect-[5/4] w-full rounded-3xl object-cover shadow-soft" />
          <div>
            <SectionHeading eyebrow="Deliverables" title="What you get at handover." intro="Everything you need to run, extend or audit your network later." />
            <CheckList items={DELIVERABLES} />
          </div>
        </div>
      </Section>
      <Section tone="surface">
        <SectionHeading center eyebrow="FAQ" title="Common questions." />
        <FaqList items={FAQS.slice(0, 6)} />
      </Section>
      <CtaBand title="Get a quote for your network." />
    </>
  );
}
