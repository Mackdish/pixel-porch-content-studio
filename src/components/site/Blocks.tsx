import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FAQS, PROCESS, SITE } from "@/lib/site";
import { Reveal } from "./Reveal";

export function CtaBand({ title = "Ready to make technology work better for your organisation?", text = "Tell us what you want to achieve. We'll help you identify a practical solution and the right next step." }: { title?: string; text?: string }) {
  return (
    <section className="px-5 py-20 md:px-8">
      <Reveal className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-ink px-8 py-16 text-center text-ink-foreground md:px-16 md:py-24">
        <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight md:text-5xl">{title}</h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-ink-foreground/70">{text}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" variant="accent"><Link to="/contact">Book Free Consultation</Link></Button>
          <Button asChild size="lg" variant="outline-inverse"><Link to="/contact">Request a Quote</Link></Button>
        </div>
      </Reveal>
    </section>
  );
}

export function FaqList({ items = FAQS }: { items?: typeof FAQS }) {
  return (
    <Accordion type="single" collapsible className="mx-auto max-w-3xl">
      {items.map((f, i) => (
        <AccordionItem key={f.q} value={`f${i}`}>
          <AccordionTrigger className="py-6 text-left text-base font-semibold md:text-lg">{f.q}</AccordionTrigger>
          <AccordionContent className="pb-6 text-base text-muted-foreground">{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function ProcessTimeline() {
  return (
    <ol className="grid gap-6 md:grid-cols-3 lg:grid-cols-6 lg:gap-4">
      {PROCESS.map((s, i) => (
        <Reveal key={s.title} delay={i * 70}>
          <li className="relative h-full">
            <div className="flex items-center gap-3">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-brand-foreground">{i + 1}</span>
              {i < PROCESS.length - 1 && <span className="hidden h-px flex-1 bg-border lg:block" aria-hidden="true" />}
            </div>
            <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
          </li>
        </Reveal>
      ))}
    </ol>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((t) => (
        <li key={t} className="flex gap-3 rounded-2xl border border-border bg-card p-4 text-sm font-medium">
          <Check className="size-5 shrink-0 text-brand" />
          {t}
        </li>
      ))}
    </ul>
  );
}

export function TextLink({ to, children }: { to: "/contact" | "/solutions" | "/projects" | "/process"; children: string }) {
  return (
    <Link to={to} className="group inline-flex items-center gap-1.5 font-semibold text-brand">
      {children}
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

export const WHATSAPP = SITE.whatsapp;
