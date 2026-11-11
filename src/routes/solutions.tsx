import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Camera, Cloud, Code2, HardDrive, Lightbulb, Network, ShieldCheck, Wrench, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero, Section, SectionHeading } from "@/components/site/Section";
import { CtaBand } from "@/components/site/Blocks";
import { Reveal } from "@/components/site/Reveal";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/solutions")({
  head: () => pageHead(
    "Technology Services & ICT Solutions in Kenya",
    "Software and website development, ICT consultancy, network installation, hardware supply, cloud solutions, cybersecurity, managed IT support and CCTV installation from Clisanco Technologies."
  ),
  component: Page,
});

const SERVICES = [
  {
    icon: Lightbulb,
    title: "ICT Consultancy",
    text: "Practical technology advisory to align your IT investments with business goals. We assess existing systems, recommend improvements and help plan scalable technology roadmaps.",
    points: ["IT assessments and audits", "Technology strategy and roadmaps", "Digital transformation planning"],
  },
  {
    icon: Code2,
    title: "Software Development",
    text: "Custom software built around the way your organisation works. We develop secure, scalable platforms that streamline operations, improve service delivery and turn manual processes into efficient digital workflows.",
    points: ["Business and enterprise systems", "School, hospital and management platforms", "CRM, portals and workflow automation", "API integrations and database solutions"],
  },
  {
    icon: HardDrive,
    title: "ICT Hardware Supply",
    text: "Genuine, warrantied ICT equipment sourced, configured and delivered to meet your operational needs.",
    points: ["Computers, laptops and peripherals", "Servers, storage and UPS systems", "Routers, switches and access points"],
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    text: "Move to the cloud with a clear migration and management plan. We help organisations run reliable, secure and cost-aware workloads.",
    points: ["Cloud migration and deployment", "Cloud hosting and infrastructure setup", "Backup, recovery and optimisation"],
  },
  {
    icon: ShieldCheck,
    title: "Cybersecurity Services",
    text: "Protect your systems, networks and information with practical security measures that reduce risk and strengthen resilience.",
    points: ["Security assessments and hardening", "Firewall and access-control configuration", "Endpoint protection and security awareness"],
  },
  {
    icon: Globe,
    title: "Website Development",
    text: "Fast, responsive and search-engine-ready websites that help organisations build credibility, reach customers and grow online.",
    points: ["Corporate and business websites", "E-commerce and booking platforms", "SEO, performance and accessibility", "Website maintenance and hosting"],
  },
  {
    icon: Wrench,
    title: "Managed IT Support",
    text: "Reliable outsourced IT support that keeps your people productive and your technology running smoothly, without the cost of a full in-house team.",
    points: ["Helpdesk and remote support", "Preventive maintenance and monitoring", "System updates and troubleshooting"],
  },
  {
    icon: Camera,
    title: "CCTV System Installation",
    text: "End-to-end video surveillance solutions for homes, offices, schools and commercial premises, with secure recording and remote monitoring.",
    points: ["Site assessment and camera planning", "HD and IP camera installation", "DVR/NVR configuration and storage", "Secure mobile and web remote viewing"],
  },
];

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Technology solutions that move your organisation forward."
        intro="From reliable network infrastructure to custom software, cloud, cybersecurity and ongoing IT support, Clisanco brings the expertise to plan, build and support your technology."
      >
        <Button asChild size="lg"><Link to="/contact">Discuss Your Project</Link></Button>
        <Button asChild size="lg" variant="outline"><Link to="/projects">View Our Projects</Link></Button>
      </PageHero>
      <Section>
        <Reveal>
          <Link to="/network-installation" className="card-lift group grid gap-6 rounded-3xl bg-ink p-8 text-ink-foreground md:grid-cols-[1fr_auto] md:items-end md:p-12">
            <div>
              <Network className="size-10 text-brand" />
              <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-brand">Core infrastructure service</p>
              <h2 className="mt-2 text-3xl font-bold md:text-5xl">Network Infrastructure Installation</h2>
              <p className="mt-4 max-w-2xl text-lg text-ink-foreground/70">Structured cabling, fibre, LAN/WAN, switching, Wi-Fi, racks and firewalls—designed, installed, tested and documented by our team.</p>
            </div>
            <span className="inline-flex items-center gap-2 font-semibold text-brand">Explore network installation <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
          </Link>
        </Reveal>

        <div className="mt-16">
          <SectionHeading
            eyebrow="More ways we can help"
            title="One technology partner. Multiple capabilities."
            intro="Choose a service or combine several into one coordinated solution tailored to your organisation."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, i) => (
              <Reveal key={service.title} delay={i * 50}>
                <article className="card-lift flex h-full flex-col rounded-3xl border border-border bg-card p-7 md:p-8">
                  <service.icon className="size-8 text-brand" />
                  <h3 className="mt-5 text-xl font-bold">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.text}</p>
                  <ul className="mt-5 space-y-2">
                    {service.points.map((point) => (
                      <li key={point} className="flex gap-2 text-sm text-foreground/80">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-7">
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/contact">Enquire about {service.title}<ArrowRight className="ml-2 size-4" /></Link>
                    </Button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>
      <CtaBand
        title="Not sure which service you need?"
        text="Book a free consultation. Tell us what you want to achieve and we'll recommend a practical approach and provide a clear proposal."
      />
    </>
  );
}
