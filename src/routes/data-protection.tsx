import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { pageHead } from "@/lib/seo";

// [Placeholder] Replace with the full legal text.
export const Route = createFileRoute("/data-protection")({
  head: () => pageHead("Data Protection Notice", "Clisanco Technologies Data Protection Notice: how we handle personal data in line with the Kenya Data Protection Act, 2019."),
  component: () => (
    <>
      <PageHero eyebrow="Legal" title="Data Protection Notice" intro="This page explains how we handle personal data in line with the Kenya Data Protection Act, 2019." />
      <Section>
        <p className="max-w-3xl text-muted-foreground">The full Data Protection Notice is being finalised. For any questions in the meantime, email info@clisancotechnologies.org.</p>
      </Section>
    </>
  ),
});
