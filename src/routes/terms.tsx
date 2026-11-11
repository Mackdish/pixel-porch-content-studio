import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { pageHead } from "@/lib/seo";

// [Placeholder] Replace with the full legal text.
export const Route = createFileRoute("/terms")({
  head: () => pageHead("Terms of Service", "Clisanco Technologies Terms of Service: the terms that apply when you use this website and our services."),
  component: () => (
    <>
      <PageHero eyebrow="Legal" title="Terms of Service" intro="This page explains the terms that apply when you use this website and our services." />
      <Section>
        <p className="max-w-3xl text-muted-foreground">The full Terms of Service is being finalised. For any questions in the meantime, email info@clisancotechnologies.org.</p>
      </Section>
    </>
  ),
});
