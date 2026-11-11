import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { useAuth } from "@/lib/auth-context";
import { SERVICES } from "@/lib/services";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const NAV = [
  { to: "/solutions", label: "Solutions" },
  { to: "/projects", label: "Projects" },
  { to: "/process", label: "Process" },
  { to: "/about", label: "About" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuth();
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all", scrolled || open ? "border-b border-border bg-background/90 backdrop-blur-md" : "bg-transparent")}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[state=open]:text-foreground">
              Solutions <ChevronDown className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="max-h-[75vh] w-72">
              <DropdownMenuItem asChild>
                <Link to="/solutions" className="font-semibold">All solutions</Link>
              </DropdownMenuItem>
              {SERVICES.map((service) => (
                <DropdownMenuItem key={service.slug} asChild>
                  <Link to="/solutions/$service" params={{ service: service.slug }}>{service.title}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {NAV.filter((n) => n.to !== "/solutions").map((n) => (
            <Link key={n.to} to={n.to} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" activeProps={{ className: "text-foreground" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/auth" className="hidden text-sm font-medium text-muted-foreground hover:text-foreground sm:inline">{user ? "Account" : "Sign in"}</Link>
          <Button asChild className="hidden sm:inline-flex">
            <Link to="/contact">Request a Quote</Link>
          </Button>
          <button className="inline-flex size-10 items-center justify-center rounded-full hover:bg-muted lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav aria-label="Mobile" className="border-t border-border bg-background px-5 pb-6 lg:hidden">
          <details className="border-b border-border py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between text-base font-medium">
              <Link to="/solutions" onClick={() => setOpen(false)}>Solutions</Link>
              <ChevronDown className="size-4" />
            </summary>
            <div className="mt-3 space-y-1 border-l border-border pl-4">
              {SERVICES.map((service) => (
                <Link key={service.slug} to="/solutions/$service" params={{ service: service.slug }} onClick={() => setOpen(false)} className="block py-2 text-sm text-muted-foreground hover:text-foreground">
                  {service.title}
                </Link>
              ))}
            </div>
          </details>
          {NAV.filter((n) => n.to !== "/solutions").map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="block border-b border-border py-4 text-base font-medium">
              {n.label}
            </Link>
          ))}
          <Link to="/auth" onClick={() => setOpen(false)} className="block border-b border-border py-4 text-base font-medium">{user ? "Account" : "Sign in"}</Link>
          <Button asChild className="mt-5 w-full" size="lg">
            <Link to="/contact" onClick={() => setOpen(false)}>Request a Quote</Link>
          </Button>
        </nav>
      )}
    </header>
  );
}
