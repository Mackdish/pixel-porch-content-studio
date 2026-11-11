import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero, Section, SectionHeading } from "@/components/site/Section";
import { CtaBand } from "@/components/site/Blocks";
import { SERVICES } from "@/lib/services";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/solutions/$service")({
  head: ({ params }) => {
    const service = SERVICES.find((item) => item.slug === params.service);
    return pageHead(
      service ? `${service.title} | Clisanco Technologies` : "Technology Services | Clisanco Technologies",
      service?.summary || "Explore professional ICT services from Clisanco Technologies Limited."
    );
  },
  component: ServiceDetail,
});

function ServiceDetail() {
  const { service: slug } = Route.useParams();
  const service = SERVICES.find((item) => item.slug === slug);

  if (!service) {
    return (
      <>
        <PageHero eyebrow="Service not found" title="We couldn't find that service." intro="Browse our full service catalogue to find the right technology solution for your organisation.">
          <Button asChild><Link to="/solutions">Explore all services</Link></Button>
        </PageHero>
      </>
    );
  }

  const Icon = service.icon;
  return (
    <>
      <PageHero eyebrow="Our services" title={service.title} intro={service.summary}>
        <Button asChild size="lg"><Link to="/contact">Request this service</Link></Button>
        <Button asChild size="lg" variant="outline"><Link to="/solutions">All services</Link></Button>
      </PageHero>

      <Section>
        <div className="grid items-start gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="mb-6 inline-flex size-14 items-center justify-center rounded-2xl bg-brand-soft text-brand">
              <Icon className="size-7" />
            </div>
            <SectionHeading eyebrow="Overview" title="A practical solution built around your needs." />
            <p className="-mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">{service.overview}</p>
          </div>
          <aside className="rounded-3xl border border-border bg-card p-7 md:p-8">
            <h2 className="text-xl font-bold">What we can help with</h2>
            <ul className="mt-6 space-y-4">
              {service.points.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-relaxed">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading eyebrow="The value" title="What you can expect." intro="We focus on outcomes that make technology easier to use, manage and grow with." />
        <div className="grid gap-5 md:grid-cols-3">
          {service.outcomes.map((outcome, index) => (
            <div key={outcome} className="rounded-3xl border border-border bg-card p-7">
              <span className="text-sm font-bold text-brand">0{index + 1}</span>
              <h3 className="mt-4 text-lg font-semibold leading-snug">{outcome}</h3>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-ink p-8 text-ink-foreground md:flex-row md:items-center md:p-12">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">Let's get started</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Need {service.title.toLowerCase()}?</h2>
            <p className="mt-4 text-ink-foreground/75">Tell us about your requirements. Our team will help you identify the right approach and prepare a clear proposal.</p>
          </div>
          <Button asChild size="lg" variant="secondary">
            <Link to="/contact" search={{ service: service.title }}>Talk to our team <ArrowRight className="ml-2 size-4" /></Link>
          </Button>
        </div>
      </Section>
      <CtaBand title="Explore more ways we can help." text="Combine services into one coordinated technology solution for your organisation." />
    </>
  );
}
