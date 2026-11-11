import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { PostCard } from "@/components/site/Cards";
import { POSTS } from "@/lib/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/blog")({
  head: () => pageHead("Insights & Blog", "Practical guides on structured cabling, Wi-Fi planning and network upgrades for Kenyan schools and businesses."),
  component: () => (
    <>
      <PageHero eyebrow="Insights" title="Guides for better networks." intro="Plain-language advice from our engineers. New articles coming soon." />
      <Section><div className="grid gap-6 md:grid-cols-3">{POSTS.map((p) => <PostCard key={p.title} post={p} />)}</div></Section>
    </>
  ),
});
