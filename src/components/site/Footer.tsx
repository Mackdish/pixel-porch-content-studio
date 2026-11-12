import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { SITE } from "@/lib/site";
import { Logo } from "./Logo";

function TikTok(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 1 1-2.59-2.59c.27 0 .53.04.77.12V9.77a5.7 5.7 0 1 0 4.91 5.64V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.3 4.3 0 0 1-3.24-1.48Z" />
    </svg>
  );
}

const linkCls = "text-sm text-ink-foreground/70 transition-colors hover:text-ink-foreground";

export function Footer() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-12 md:px-8 md:py-20">
        <div className="md:col-span-4">
          <Logo inverse />
          <p className="mt-5 max-w-xs text-sm text-ink-foreground/70">
            {SITE.tagline}. Kisumu-based specialists in LAN, Wi-Fi and server-room installation for organisations across Kenya.
          </p>
          <div className="mt-6 flex gap-3">
            <a href={SITE.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="inline-flex size-10 items-center justify-center rounded-full border border-ink-foreground/20 hover:bg-ink-foreground/10"><Instagram className="size-4" /></a>
            <a href={SITE.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="inline-flex size-10 items-center justify-center rounded-full border border-ink-foreground/20 hover:bg-ink-foreground/10"><Linkedin className="size-4" /></a>
            <a href={SITE.socials.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok" className="inline-flex size-10 items-center justify-center rounded-full border border-ink-foreground/20 hover:bg-ink-foreground/10"><TikTok className="size-4" /></a>
          </div>
        </div>
        <div className="md:col-span-3">
          <h3 className="mb-4 text-sm font-semibold">Solutions</h3>
          <ul className="space-y-3">
            <li><Link to="/solutions" className={linkCls}>Network Infrastructure</Link></li>
            <li><Link to="/solutions" className={linkCls}>ICT Hardware Supply</Link></li>
            <li><Link to="/solutions" className={linkCls}>CCTV Installation</Link></li>
            <li><Link to="/solutions" className={linkCls}>Cybersecurity</Link></li>
            <li><Link to="/solutions" className={linkCls}>Managed IT Support</Link></li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <h3 className="mb-4 text-sm font-semibold">Company</h3>
          <ul className="space-y-3">
            <li><Link to="/about" className={linkCls}>About</Link></li>
            <li><Link to="/process" className={linkCls}>Our Process</Link></li>
            <li><Link to="/projects" className={linkCls}>Projects</Link></li>
            <li><Link to="/blog" className={linkCls}>Blog</Link></li>
            <li><Link to="/faq" className={linkCls}>FAQ</Link></li>
            <li><Link to="/contact" className={linkCls}>Careers</Link></li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <h3 className="mb-4 text-sm font-semibold">Contact</h3>
          <ul className="space-y-3 text-sm text-ink-foreground/70">
            <li className="flex gap-2"><MapPin className="size-4 shrink-0 translate-y-0.5" />{SITE.location}</li>
            <li><a href={SITE.phoneHref} className="flex gap-2 hover:text-ink-foreground"><Phone className="size-4 shrink-0 translate-y-0.5" />{SITE.phone}</a></li>
            <li><a href={`mailto:${SITE.email}`} className="flex gap-2 break-all hover:text-ink-foreground"><Mail className="size-4 shrink-0 translate-y-0.5" />{SITE.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-xs text-ink-foreground/60 md:flex-row md:items-center md:justify-between md:px-8">
          <p>© 2026 Clisanco Technologies Limited. All rights reserved.</p>
          <div className="flex flex-wrap gap-5">
            <Link to="/privacy" className="hover:text-ink-foreground">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-ink-foreground">Terms of Service</Link>
            <Link to="/data-protection" className="hover:text-ink-foreground">Data Protection Notice</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
