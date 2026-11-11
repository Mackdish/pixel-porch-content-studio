import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Cable, HardDrive, Server, Wifi, Wrench, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Section, SectionHeading } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { CtaBand, FaqList, ProcessTimeline, TextLink } from "@/components/site/Blocks";
import { ProjectCard, PostCard } from "@/components/site/Cards";
import { PROJECTS, POSTS, STATS, TESTIMONIALS } from "@/lib/site";
import { getPublishedProjects } from "@/lib/content.functions";
import { pageHead } from "@/lib/seo";
import heroImg from "@/assets/hero-rack.jpg";
import designImg from "@/assets/network-design.jpg";
import cablingImg from "@/assets/cabling-engineer.jpg";
import wifiImg from "@/assets/wifi-office.jpg";

export const Route = createFileRoute("/")({
  loader: () => getPublishedProjects(),
  head: () => pageHead("LAN & Network Installation in Kisumu, Kenya", "Structured cabling, LAN, Wi-Fi and server-room installation for offices, schools, hospitals and enterprises across Kenya, by certified engineers in Kisumu."),
  component: Home,
});

const TILES = [
  { icon: Cable, title: "LAN & Structured Cabling", text: "Cat6/Cat6A runs and fibre backbones, tested and certified." },
  { icon: Wifi, title: "Wi-Fi & Wireless Design", text: "Site surveys, heatmaps and high-density coverage." },
  { icon: HardDrive, title: "Network Hardware Supply", text: "Switches, routers, firewalls, racks and UPS." },
  { icon: Server, title: "Server Room & Rack Setup", text: "Clean racks, cooling-aware layouts and power." },
  { icon: Wrench, title: "Managed IT Support", text: "SLA-backed maintenance that keeps you online." },
];

const SEGMENTS = [
  { title: "Schools & Institutions", text: "Campus-wide cabling and Wi-Fi that handles hundreds of learners at once." },
  { title: "Businesses & Offices", text: "Reliable, tidy networks that grow with your team, from 5 desks to 5 floors." },
  { title: "Hospitals, NGOs & Government", text: "Secure, segmented and fully documented networks for critical work." },
];

const FEATURES = [
  { title: "Designed before it's installed", text: "Every project starts with a site survey and a network design. You get a clear bill of quantities so you know exactly what's going in and why.", img: designImg, cta: "See our process", to: "/process" as const },
  { title: "Clean, labelled, certified cabling", text: "Every run is tested and certified, neatly managed and fully labelled. At handover you receive as-built documentation, so nothing is a mystery later.", img: cablingImg, cta: "Explore network installation", to: "/network-installation" as const },
  { title: "Fast, reliable Wi-Fi in every corner", text: "We plan coverage, place access points where they actually perform, and separate guest and staff networks for speed and safety.", img: wifiImg, cta: "Talk to an engineer", to: "/contact" as const },
  { title: "Secure by default", text: "VLANs, firewall configuration and access control come built in, with the option to add CCTV and cybersecurity services on the same network.", img: heroImg, cta: "View all solutions", to: "/solutions" as const },
];

function Home() {
  const managedProjects = Route.useLoaderData();
  const projects = managedProjects.length > 0 ? managedProjects : PROJECTS;
  return (
    <>
      {/* Hero */}
      <section className="pb-16 pt-28 md:pb-24 md:pt-36">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2">
          <div>
            <h1 className="text-5xl font-extrabold leading-[1.02] md:text-7xl">Network infrastructure, built to last.</h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl">
              Structured cabling, LAN, Wi-Fi and server-room installation for offices, schools, hospitals, and enterprises across Kenya, designed and installed by certified engineers.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg"><Link to="/contact">Get a Free Site Survey</Link></Button>
              <Button asChild size="lg" variant="outline"><Link to="/projects">See Our Work</Link></Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-brand-soft" aria-hidden="true" />
            <img src={heroImg} alt="Network rack with neatly labelled blue Cat6 patch cables and switches" width={1280} height={1024} fetchPriority="high" className="aspect-[5/4] w-full rounded-3xl object-cover shadow-lift" />
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-border py-10">
        <div className="mx-auto max-w-7xl px-5 text-center md:px-8">
          <p className="text-sm text-muted-foreground">Trusted by schools, NGOs, healthcare and businesses across Kenya and beyond</p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-14 gap-y-4 text-2xl font-bold text-muted-foreground/60">
            {["Cisco", "Microsoft", "Google", "AWS"].map((n) => <li key={n}>{n}</li>)}
          </ul>
        </div>
      </section>

      {/* Everything your network needs */}
      <Section>
        <SectionHeading eyebrow="What we do" title="Everything your network needs." intro="One accountable partner from the first cable to the last access point." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {TILES.map((t, i) => (
            <Reveal key={t.title} delay={i * 60}>
              <div className="card-lift h-full rounded-3xl border border-border bg-card p-7">
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-brand-soft text-brand"><t.icon className="size-6" /></span>
                <h3 className="mt-6 text-lg font-bold leading-snug">{t.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Segments */}
      <Section tone="surface">
        <SectionHeading eyebrow="Who we serve" title="Solutions for every kind of organisation." />
        <div className="grid gap-6 md:grid-cols-3">
          {SEGMENTS.map((s, i) => (
            <Reveal key={s.title} delay={i * 80}>
              <Link to="/solutions" className="card-lift group flex h-full min-h-72 flex-col justify-between rounded-3xl border border-border bg-card p-8 md:p-10">
                <div>
                  <h3 className="text-2xl font-bold">{s.title}</h3>
                  <p className="mt-3 text-muted-foreground">{s.text}</p>
                </div>
                <span className="mt-8 inline-flex items-center gap-1.5 font-semibold text-brand">Learn more <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Alternating features */}
      <Section>
        <div className="space-y-24 md:space-y-32">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title}>
              <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
                <div className={i % 2 ? "lg:order-2" : ""}>
                  <img src={f.img} alt={f.title} loading="lazy" width={1200} height={960} className="aspect-[5/4] w-full rounded-3xl object-cover shadow-soft" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold leading-tight md:text-5xl">{f.title}</h2>
                  <p className="mt-5 text-lg text-muted-foreground">{f.text}</p>
                  <div className="mt-7"><TextLink to={f.to}>{f.cta}</TextLink></div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Stats */}
      <Section tone="surface">
        <div className="grid gap-10 text-center md:grid-cols-3">
          {STATS.map((s) => (
            <Reveal key={s.label}>
              <p className="text-6xl font-extrabold tracking-tight text-brand md:text-7xl">{s.value}</p>
              <p className="mt-3 text-lg font-medium">{s.label}</p>
            </Reveal>
          ))}
        </div>
        <p className="mt-10 text-center text-xs text-muted-foreground">Based on internal company records.</p>
      </Section>

      {/* Process */}
      <Section>
        <SectionHeading eyebrow="Our process" title="Six steps. No black boxes." intro="You always know what's happening, what's next and what it costs." />
        <ProcessTimeline />
      </Section>

      {/* Projects */}
      <Section tone="surface">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Recent projects" title="Work we're proud of." />
          <div className="mb-12 md:mb-16"><TextLink to="/projects">All projects</TextLink></div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => <Reveal key={"id" in p ? p.id : p.title} delay={i * 60}><ProjectCard project={p} /></Reveal>)}
        </div>
      </Section>

      {/* Testimonials */}
      <Section>
        <SectionHeading eyebrow="Testimonials" title="What our clients say." />
        <Carousel opts={{ align: "start" }} className="mx-auto max-w-6xl">
          <CarouselContent>
            {TESTIMONIALS.map((t) => (
              <CarouselItem key={t.quote} className="md:basis-1/2 lg:basis-1/3">
                <figure className="flex h-full flex-col justify-between rounded-3xl border border-border bg-card p-8 shadow-soft">
                  <div>
                    <Quote className="size-8 text-brand" aria-hidden="true" />
                    <blockquote className="mt-5 text-lg font-medium leading-relaxed">"{t.quote}"</blockquote>
                  </div>
                  <figcaption className="mt-8 text-sm"><span className="font-bold">{t.name}</span><br /><span className="text-muted-foreground">{t.role}</span></figcaption>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-8 flex justify-center gap-3 lg:hidden">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>
      </Section>

      {/* FAQ */}
      <Section tone="surface">
        <SectionHeading center eyebrow="FAQ" title="Questions about LAN installation." />
        <FaqList />
      </Section>

      <CtaBand />

      {/* Insights */}
      <Section className="pt-4 md:pt-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Insights" title="Practical guides for better networks." />
          <div className="mb-12 md:mb-16"><Link to="/blog" className="inline-flex items-center gap-1.5 font-semibold text-brand">All articles <ArrowRight className="size-4" /></Link></div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {POSTS.map((p) => <PostCard key={p.title} post={p} />)}
        </div>
      </Section>
    </>
  );
}

