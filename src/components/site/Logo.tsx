import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.webp";
import logoInverse from "@/assets/logo-inverse.webp";
import { cn } from "@/lib/utils";

// `inverse` is for dark backgrounds (the footer): same logo with the black text in white.
export function Logo({ inverse }: { inverse?: boolean }) {
  return (
    <Link to="/" className="inline-flex flex-col items-start gap-0.5" aria-label="Clisanco Technologies Limited, home">
      <img
        src={inverse ? logoInverse : logo}
        alt="Clisanco Technologies Limited"
        width={709}
        height={539}
        className={cn("w-auto", inverse ? "h-28" : "h-14 md:h-16")}
      />
      <span className={cn("text-[9px] font-semibold tracking-[0.12em] sm:text-[10px]", inverse ? "text-ink-foreground/80" : "text-foreground/75")}>IT Solutions for the Future</span>
    </Link>
  );
}
