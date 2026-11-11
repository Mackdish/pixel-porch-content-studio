import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { pageHead } from "@/lib/seo";

// [Placeholder] Replace with the full legal text.
export const Route = createFileRoute("/privacy")({
  head: () => pageHead("Privacy Policy", "Clisanco Technologies Privacy Policy: how we collect, use and protect personal information."),
  component: () => (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" intro="This page explains how we collect, use and protect personal information." />
      <Section>
        <p className="max-w-3xl text-muted-foreground">The full Privacy Policy is being finalised. For any questions in the meantime, email info@clisancotechnologies.org.</p>
      </Section>
    </>
  ),
});
