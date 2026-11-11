import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { CtaBand, FaqList } from "@/components/site/Blocks";
import { FAQS } from "@/lib/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/faq")({
  head: () => ({
    ...pageHead("LAN Installation FAQ", "Answers about LAN installation in Kenya: timelines, pricing, cable standards, hardware, warranty, coverage outside Kisumu and documentation."),
    scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }) }],
  }),
  component: () => (
    <>
      <PageHero eyebrow="FAQ" title="Frequently asked questions." intro="Can't find what you need? Call or WhatsApp us on +254 791 491636." />
      <Section><FaqList /></Section>
      <CtaBand />
    </>
  ),
});
