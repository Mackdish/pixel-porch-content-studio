import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({ children, className, tone = "default", id }: { children: ReactNode; className?: string; tone?: "default" | "surface" | "ink"; id?: string }) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 md:py-28",
        tone === "surface" && "bg-surface",
        tone === "ink" && "bg-ink text-ink-foreground",
        className,
      )}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-brand">{children}</p>;
}

export function SectionHeading({ eyebrow, title, intro, center }: { eyebrow?: string; title: ReactNode; intro?: ReactNode; center?: boolean }) {
  return (
    <div className={cn("mb-12 max-w-3xl md:mb-16", center && "mx-auto text-center")}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="text-3xl font-bold leading-[1.1] md:text-5xl">{title}</h2>
      {intro && <p className="mt-5 text-lg text-muted-foreground">{intro}</p>}
    </div>
  );
}

export function PageHero({ eyebrow, title, intro, children }: { eyebrow: string; title: ReactNode; intro: ReactNode; children?: ReactNode }) {
  return (
    <section className="border-b border-border bg-surface pb-16 pt-32 md:pb-24 md:pt-40">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.05] md:text-6xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">{intro}</p>
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}
