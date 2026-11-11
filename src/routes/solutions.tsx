import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Camera, HardDrive, Lightbulb, Network, ShieldCheck, Wrench } from "lucide-react";
import { PageHero, Section } from "@/components/site/Section";
import { CtaBand } from "@/components/site/Blocks";
import { Reveal } from "@/components/site/Reveal";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/solutions")({
  head: () => pageHead("ICT Solutions in Kenya", "Network installation, ICT hardware supply, CCTV, cybersecurity, managed IT support and ICT consultancy from Clisanco Technologies, Kisumu."),
  component: Page,
});

const OTHER = [
  { icon: HardDrive, title: "ICT Hardware Supply", text: "Switches, routers, firewalls, access points, racks, UPS and end-user devices from trusted vendors." },
  { icon: Camera, title: "CCTV Installation", text: "IP camera systems on your network, with recording, remote viewing and clean cabling." },
  { icon: ShieldCheck, title: "Cybersecurity", text: "Firewalls, access control, network segmentation and practical security reviews." },
  { icon: Wrench, title: "Managed IT Support", text: "SLA-backed maintenance, monitoring and on-call support for your network." },
  { icon: Lightbulb, title: "ICT Consultancy", text: "Independent advice on network strategy, upgrades and technology budgets." },
];

function Page() {
  return (
    <>
      <PageHero eyebrow="Solutions" title="One partner for your whole network." intro="Network installation is our core. Everything else is built around keeping it fast, safe and supported." />
      <Section>
        <Reveal>
          <Link to="/network-installation" className="card-lift group grid gap-6 rounded-3xl bg-ink p-10 text-ink-foreground md:grid-cols-[1fr_auto] md:items-end md:p-14">
            <div>
              <Network className="size-10 text-brand" />
              <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-brand">Featured</p>
              <h2 className="mt-2 text-3xl font-bold md:text-5xl">Network Installation</h2>
              <p className="mt-4 max-w-2xl text-lg text-ink-foreground/70">Structured cabling, fibre, switching, Wi-Fi, racks and firewalls, tested, certified and documented.</p>
            </div>
            <span className="inline-flex items-center gap-2 font-semibold text-brand">Explore <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
          </Link>
        </Reveal>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {OTHER.map((s, i) => (
            <Reveal key={s.title} delay={i * 60}>
              <div className="card-lift h-full rounded-3xl border border-border bg-card p-8">
                <s.icon className="size-8 text-brand" />
                <h3 className="mt-6 text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-muted-foreground">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
