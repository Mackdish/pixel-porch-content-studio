import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/auth")({
  head: () => pageHead("Sign In", "Sign in to manage the Clisanco Technologies website."),
  component: AuthPage,
});

function AuthPage() {
  const { user, ready, signOut } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (error) setError("That email and password didn't match. Please try again.");
    else setPassword("");
  }

  return (
    <section className="bg-surface pb-24 pt-32 md:pt-40">
      <div className="mx-auto max-w-md px-5">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
          {!ready ? (
            <p className="text-muted-foreground">Loading…</p>
          ) : user ? (
            <div>
              <h1 className="text-3xl font-bold">You're signed in</h1>
              <p className="mt-3 text-muted-foreground">Signed in as {user.email}.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild><Link to="/">Go to website</Link></Button>
                <Button variant="outline" onClick={() => void signOut()}>Sign out</Button>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <h1 className="text-3xl font-bold">Sign in</h1>
                <p className="mt-2 text-muted-foreground">For Clisanco staff only.</p>
              </div>
              <label className="block">
                <span className="text-sm font-medium">Email</span>
                <input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5 h-11 w-full rounded-xl border border-input bg-background px-3 outline-none focus:ring-2 focus:ring-ring" />
              </label>
              <label className="block">
                <span className="text-sm font-medium">Password</span>
                <input type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1.5 h-11 w-full rounded-xl border border-input bg-background px-3 outline-none focus:ring-2 focus:ring-ring" />
              </label>
              {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
              <Button type="submit" size="lg" className="w-full" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
