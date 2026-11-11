import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Cable, Wrench, GraduationCap, Code2, Cloud, Camera, Lightbulb, HardDrive, ShieldCheck, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { CtaBand, FaqList, ProcessTimeline, TextLink } from "@/components/site/Blocks";
import { ProjectCard, PostCard } from "@/components/site/Cards";
import { PROJECTS, POSTS, STATS, TESTIMONIALS } from "@/lib/site";
import { getPublishedProjects, getPublishedPage } from "@/lib/content.functions";
import { parseContent } from "@/lib/content-types";
import { useQuery } from "@tanstack/react-query";
import { pageHead } from "@/lib/seo";
import heroImg from "@/assets/hero-rack.jpeg";
import designImg from "@/assets/network-design.jpg";
import cablingImg from "@/assets/Cabling-engineer.jpeg";
import wifiImg from "@/assets/wifi-office.jpg";

export const Route = createFileRoute("/")({
  loader: () => getPublishedProjects(),
  head: () => pageHead("IT Solutions for the Future | Clisanco Technologies", "Clisanco Technologies provides ICT consultancy, custom software and website development, network infrastructure installation, ICT hardware supply, cloud solutions, cybersecurity, managed IT support, CCTV installation and practical digital skills training across Kenya."),
  component: Home,
});

const TILES = [
  { icon: Lightbulb, title: "ICT Consultancy", to: "/solutions/ict-consultancy" as const, text: "Technology assessments, practical IT advice and digital transformation roadmaps aligned with your goals and budget." },
  { icon: Code2, title: "Software Development", to: "/solutions/software-development" as const, text: "Custom business systems, management platforms, portals and workflow tools built around how your organisation works." },
  { icon: Globe, title: "Website Development", to: "/solutions/website-development" as const, text: "Professional, responsive business websites, e-commerce platforms and online experiences that turn visitors into enquiries." },
  { icon: HardDrive, title: "ICT Hardware Supply", to: "/solutions/ict-hardware-supply" as const, text: "Computers, servers, networking equipment and accessories selected for your operational and budget requirements." },
  { icon: Cloud, title: "Cloud Solutions", to: "/solutions/cloud-solutions" as const, text: "Cloud hosting, migration, storage, collaboration, backup and recovery solutions that support flexible working." },
  { icon: ShieldCheck, title: "Cybersecurity Services", to: "/solutions/cybersecurity-services" as const, text: "Security reviews and practical safeguards for your networks, devices, user accounts and business information." },
  { icon: Cable, title: "Network Infrastructure", to: "/solutions/network-infrastructure-installation" as const, text: "Structured cabling, fibre, LAN/WAN, Wi-Fi, switching and server-room infrastructure for dependable connectivity." },
  { icon: Wrench, title: "Managed IT Support", to: "/solutions/managed-it-support" as const, text: "Ongoing technical assistance, troubleshooting, maintenance and support to keep your systems working." },
  { icon: Camera, title: "CCTV Installation", to: "/solutions/cctv-system-installation" as const, text: "Video surveillance planning, camera installation, recording configuration and remote monitoring for your premises." },
  { icon: GraduationCap, title: "Digital Skills Training", to: "/solutions/digital-skills-training" as const, text: "Practical digital literacy, computer skills and productivity training for learners, employees and teams." },
];

const SEGMENTS = [
  { title: "Schools & Learning Institutions", text: "Equip educators, administrators and learners with dependable systems, connected campuses, digital platforms and practical technology skills." },
  { title: "Businesses & Growing Teams", text: "Build a stronger digital foundation with business software, professional websites, secure cloud tools, reliable hardware and responsive IT support." },
  { title: "NGOs, Public & Community Organisations", text: "Make technology easier to manage through fit-for-purpose ICT advice, connected infrastructure, secure information systems and staff training." },
];

const FEATURES = [
  { title: "Technology planned around your goals", text: "The right solution starts with understanding your organisation. We assess your needs, existing systems, users and budget before recommending an approach, whether you need a new platform, upgraded infrastructure or ongoing support.", img: designImg, cta: "See how we work", to: "/process" as const },
  { title: "Digital platforms that make work easier", text: "We develop custom software and responsive websites that help organisations serve customers, manage information and simplify everyday processes. From business websites to tailored management systems, we focus on usability and practical value.", img: heroImg, cta: "Explore software and web services", to: "/solutions" as const },
  { title: "Infrastructure you can depend on", text: "From structured cabling and Wi-Fi to cloud environments and ICT hardware, we help create a reliable technology foundation. Our work is planned for the way your people communicate, collaborate and access information.", img: cablingImg, cta: "Explore infrastructure solutions", to: "/solutions" as const },
  { title: "Protection, support and skills for the long term", text: "Technology needs attention after implementation. We help organisations strengthen security, maintain systems, monitor premises with CCTV and build staff confidence through practical digital skills training.", img: wifiImg, cta: "Talk to our team", to: "/contact" as const },
];

const HOME_FAQS = [
  { q: "What services does Clisanco Technologies provide?", a: "We provide ICT consultancy, custom software development, website development, ICT hardware supply, cloud solutions, cybersecurity, network infrastructure installation, managed IT support, CCTV system installation and digital skills training." },
  { q: "Can you recommend a solution if we're not sure what we need?", a: "Yes. Start with a consultation and tell us about your organisation, the challenge you want to solve and your budget. We can assess your requirements and recommend a practical way forward." },
  { q: "Do you work with schools, businesses and institutions?", a: "Yes. We support businesses, schools and learning institutions, NGOs, public organisations and other teams. We shape the scope of work around each organisation's needs." },
  { q: "Can you combine several services into one project?", a: "Yes. A project may combine consultancy, hardware supply, network infrastructure, cloud services, cybersecurity and staff training. We can help coordinate the services required for your objectives." },
  { q: "Do you provide support after a project is completed?", a: "Yes. Depending on the service, we can provide maintenance, troubleshooting, system updates and ongoing technical support after implementation." },
  { q: "Where do you provide your services?", a: "We are based in Kisumu and take on projects across Kenya. Contact us with your location and requirements so we can discuss availability and delivery." },
];

function Home() {
  const managedProjects = Route.useLoaderData();
  const homeCopy = useQuery({ queryKey: ["public-page-copy", "home"], queryFn: () => getPublishedPage({ data: { slug: "home" } }), staleTime: 60_000 });
  const copy = homeCopy.data ? parseContent("page", homeCopy.data.content) : null;
  const projects = managedProjects.length > 0 ? managedProjects : PROJECTS;
  return (
    <>
      {/* Hero */}
      <section className="pb-16 pt-28 md:pb-24 md:pt-36">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2">
          <div>
            <h1 className="text-5xl font-extrabold leading-[1.02] md:text-7xl">{copy?.heading || "IT Solutions for the Future"}</h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl">
              {copy?.intro || "Clisanco Technologies helps businesses and institutions put technology to work. We provide ICT consultancy, custom software, websites, hardware, cloud and cybersecurity solutions, network infrastructure, managed IT support, CCTV systems and practical digital skills training."}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg"><Link to="/contact">Book a Free Consultation</Link></Button>
              <Button asChild size="lg" variant="outline"><Link to="/projects">See Our Work</Link></Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-brand-soft" aria-hidden="true" />
            <img src={heroImg} alt="Network rack with neatly labelled blue Cat6 patch cables and switches" width={1280} height={1024} fetchPriority="high" className="aspect-[5/4] w-full rounded-3xl object-cover shadow-lift" />
          </div>
        </div>
      </section>

      {/* Full service portfolio */}
      <Section>
        <SectionHeading eyebrow="What we do" title="Everything you need to make technology work better." intro="From the first technology assessment to software development, infrastructure, security and ongoing support, we bring essential ICT services together under one roof." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TILES.map((t, i) => (
            <Reveal key={t.title} delay={i * 60}>
              <Link to={t.to} className="card-lift group block h-full rounded-3xl border border-border bg-card p-7 transition-colors hover:border-brand/50">
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-brand-soft text-brand"><t.icon className="size-6" /></span>
                <h3 className="mt-6 text-lg font-bold leading-snug group-hover:text-brand">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.text}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">Explore service <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Segments */}
      <Section tone="surface">
        <SectionHeading eyebrow="Who we serve" title="Technology that fits the way you work." intro="We work with organisations at different stages of their digital journey, shaping services around their people, priorities and operating environments." />
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
          <SectionHeading eyebrow="Our work" title="Practical solutions. Real-world needs." />
          <div className="mb-12 md:mb-16"><TextLink to="/projects">All projects</TextLink></div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => <Reveal key={"id" in p ? p.id : p.title} delay={i * 60}><ProjectCard project={p} /></Reveal>)}
        </div>
      </Section>

      {/* Testimonials */}
      <Section>
        <SectionHeading eyebrow="Testimonials" title="What our clients say." intro="Feedback from organisations and people who have worked with our team." />
        <div className="grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <Reveal key={testimonial.name}>
              <figure className="flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-soft">
                <blockquote className="flex-1 text-base leading-relaxed text-muted-foreground">“{testimonial.quote}”</blockquote>
                <figcaption className="mt-7 border-t border-border pt-5">
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{testimonial.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Trusted partners */}
      <Section tone="surface">
        <SectionHeading eyebrow="Trusted partners" title="Organisations we are proud to work alongside." intro="We value the relationships we build with organisations making a difference in their communities and industries." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {["Rongo NGCDF", "Nyando NGCDF", "Arianda Farms", "Youth Rise Initiative"].map((partner) => (
            <div key={partner} className="flex min-h-28 items-center justify-center rounded-3xl border border-border bg-card px-6 py-7 text-center text-lg font-bold tracking-tight shadow-soft">
              {partner}
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="surface">
        <SectionHeading center eyebrow="Frequently asked questions" title="A few things you may want to know." intro="Learn more about engaging Clisanco Technologies and the services we provide." />
        <FaqList items={HOME_FAQS} />
      </Section>

      <CtaBand title="Let’s find the right technology solution for your organisation." text="Whether you need a website, custom software, reliable infrastructure, stronger security or ongoing IT support, tell us what you want to achieve. We’ll help you map out the next step." />

      {/* Insights */}
      <Section className="pt-4 md:pt-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Insights" title="Ideas to help you get more from technology." intro="Explore practical perspectives on digital tools, business systems, infrastructure and safer ways of working." />
          <div className="mb-12 md:mb-16"><Link to="/blog" className="inline-flex items-center gap-1.5 font-semibold text-brand">All articles <ArrowRight className="size-4" /></Link></div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {POSTS.map((p) => <PostCard key={p.title} post={p} />)}
        </div>
      </Section>
    </>
  );
}

