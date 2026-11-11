import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero, Section, SectionHeading } from "@/components/site/Section";
import { CtaBand } from "@/components/site/Blocks";
import { Reveal } from "@/components/site/Reveal";
import { pageHead } from "@/lib/seo";
import { SERVICES } from "@/lib/services";

export const Route = createFileRoute("/solutions")({
  head: () => pageHead(
    "Technology Services & ICT Solutions in Kenya",
    "ICT consultancy, custom software and website development, network infrastructure, hardware supply, cloud solutions, cybersecurity, managed IT support, CCTV installation and digital skills training from Clisanco Technologies."
  ),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Technology solutions that move your organisation forward."
        intro="Explore our full range of technology services, including network infrastructure, custom software and websites, ICT consultancy, hardware supply, cloud, cybersecurity, CCTV, managed support and digital skills training."
      >
        <Button asChild size="lg"><Link to="/contact">Discuss Your Project</Link></Button>
        <Button asChild size="lg" variant="outline"><Link to="/projects">View Our Projects</Link></Button>
      </PageHero>
      <Section>
        <div className="mt-4">
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
                    {service.points.slice(0, 4).map((point) => (
                      <li key={point} className="flex gap-2 text-sm text-foreground/80">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-7">
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/solutions/$service" params={{ service: service.slug }}>View service details<ArrowRight className="ml-2 size-4" /></Link>
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
