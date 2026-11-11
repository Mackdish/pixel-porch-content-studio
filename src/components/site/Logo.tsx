import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

// [Placeholder] Swap this mark for the official Clisanco logo file when available.
export function Logo({ inverse }: { inverse?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="Clisanco Technologies, home">
      <svg viewBox="0 0 32 32" className="size-8" aria-hidden="true">
        <rect width="32" height="32" rx="8" className={inverse ? "fill-brand" : "fill-primary"} />
        <circle cx="10" cy="16" r="3" className="fill-brand-foreground" />
        <circle cx="22" cy="9" r="2.5" className="fill-brand-foreground" />
        <circle cx="22" cy="23" r="2.5" className="fill-brand-foreground" />
        <path d="M12.5 14.5 20 10M12.5 17.5 20 22" strokeWidth="1.8" className="stroke-brand-foreground" />
      </svg>
      <span className={cn("text-lg font-extrabold tracking-tight", inverse ? "text-ink-foreground" : "text-foreground")}>
        Clisanco<span className="font-medium text-brand"> Technologies</span>
      </span>
    </Link>
  );
}
