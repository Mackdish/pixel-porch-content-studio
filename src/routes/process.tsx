import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { CtaBand, ProcessTimeline } from "@/components/site/Blocks";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/process")({
  head: () => pageHead("Our Process", "How Clisanco delivers network projects in Kenya: discovery, assessment, proposal within 3 working days, delivery, handover and support."),
  component: () => (
    <>
      <PageHero eyebrow="Our process" title="Clear steps. No black boxes." intro="From a free 30-minute call to a signed handover, here's exactly how we work with you." />
      <Section><ProcessTimeline /></Section>
      <CtaBand />
    </>
  ),
});
