import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { CheckCircle2, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageHero, Section } from "@/components/site/Section";
import { SITE } from "@/lib/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => pageHead("Request a Quote", "Request a quote for LAN installation, Wi-Fi, hardware supply or CCTV in Kisumu and across Kenya. Call or WhatsApp +254 791 491636."),
  component: Page,
});

const SERVICES = ["LAN installation", "Wi-Fi", "Hardware supply", "CCTV", "Other"];
const CONTACT_FIELDS = [
  ["name", "Full name"],
  ["organisation", "Organisation"],
  ["email", "Email"],
  ["phone", "Phone"],
] as const;

function Page() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const err: Record<string, string> = {};
    if (!d["name"]?.trim()) err["name"] = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(d["email"] ?? "")) err["email"] = "Please enter a valid email.";
    if (!/^[+\d\s()-]{9,}$/.test(d["phone"] ?? "")) err["phone"] = "Please enter a valid phone number.";
    if (!d["service"]) err["service"] = "Please choose a service.";
    if (!d["message"]?.trim()) err["message"] = "Please tell us a little about the project.";
    setErrors(err);
    if (!Object.keys(err).length) setSent(true);
  }
  const field = "mt-2 h-11 rounded-xl";
  return (
    <>
      <PageHero eyebrow="Contact" title="Request a quote." intro="Tell us about your site and we'll reply with next steps. Prefer to talk? Call or WhatsApp us.">
        <Button asChild size="lg"><a href={SITE.phoneHref}><Phone /> Call {SITE.phone}</a></Button>
        <Button asChild size="lg" variant="outline"><a href={SITE.whatsapp} target="_blank" rel="noreferrer"><MessageCircle /> WhatsApp us</a></Button>
      </PageHero>
      <Section>
        <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-8 shadow-soft md:p-12">
          {sent ? (
            <div className="py-10 text-center" role="status">
              <CheckCircle2 className="mx-auto size-12 text-brand" />
              <h2 className="mt-5 text-2xl font-bold">Thank you, we've got your request.</h2>
              <p className="mt-3 text-muted-foreground">Our team will be in touch shortly. For anything urgent, call {SITE.phone}.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="grid gap-6 md:grid-cols-2">
              {[["name", "Full name"], ["organisation", "Organisation"], ["email", "Email"], ["phone", "Phone"]].map(([n, l]) => (
                <div key={n}>
                  <Label htmlFor={n}>{l}</Label>
                  <Input id={n} name={n} type={n === "email" ? "email" : n === "phone" ? "tel" : "text"} className={field} aria-invalid={!!errors[n]} />
                  {errors[n] && <p className="mt-1 text-sm text-destructive">{errors[n]}</p>}
                </div>
              ))}
              <div>
                <Label htmlFor="service">Service needed</Label>
                <select id="service" name="service" defaultValue="" className="mt-2 h-11 w-full rounded-xl border border-input bg-background px-3 text-sm" aria-invalid={!!errors.service}>
                  <option value="" disabled>Choose a service</option>
                  {SERVICES.map((s) => <option key={s}>{s}</option>)}
                </select>
                {errors.service && <p className="mt-1 text-sm text-destructive">{errors.service}</p>}
              </div>
              <div>
                <Label htmlFor="size">Number of users / floors</Label>
                <Input id="size" name="size" placeholder="e.g. 40 users, 2 floors" className={field} />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" rows={5} className="mt-2 rounded-xl" aria-invalid={!!errors.message} />
                {errors.message && <p className="mt-1 text-sm text-destructive">{errors.message}</p>}
              </div>
              <Button type="submit" size="lg" className="md:col-span-2">Send request</Button>
            </form>
          )}
        </div>
      </Section>
    </>
  );
}
