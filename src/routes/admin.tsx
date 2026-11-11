import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink, Loader2, ShieldAlert } from "lucide-react";

import { ContentManager } from "@/components/admin/ContentManager";
import {
  FaqEditor,
  PageEditor,
  PostEditor,
  ProjectEditor,
  ServiceEditor,
} from "@/components/admin/editors";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/sonner";
import { getAdminAccess } from "@/lib/content.functions";
import { parseContent } from "@/lib/content-types";
import { useAuth } from "@/lib/auth-context";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/admin")({
  head: () => {
    const base = pageHead("Admin Dashboard", "Manage the Clisanco Technologies website content.");
    return { meta: [...base.meta, { name: "robots", content: "noindex, nofollow" }] };
  },
  component: AdminPage,
});

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-screen bg-surface pb-24 pt-28 md:pt-36">
      <div className="mx-auto max-w-6xl px-5 md:px-8">{children}</div>
    </section>
  );
}

function Notice({
  icon,
  title,
  text,
  children,
}: {
  icon?: React.ReactNode;
  title: string;
  text: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-md rounded-3xl border border-border bg-card p-8 text-center shadow-soft">
      {icon && (
        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-brand-soft text-brand">
          {icon}
        </div>
      )}
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="mt-2 text-muted-foreground">{text}</p>
      {children && <div className="mt-6 flex flex-wrap justify-center gap-3">{children}</div>}
    </div>
  );
}

function AdminPage() {
  const { user, ready, signOut } = useAuth();

  const access = useQuery({
    queryKey: ["admin-access", user?.id],
    queryFn: () => getAdminAccess(),
    enabled: Boolean(user),
    retry: false,
    staleTime: 60_000,
  });

  if (!ready || (user && access.isPending)) {
    return (
      <Shell>
        <div
          className="flex items-center justify-center gap-3 py-24 text-muted-foreground"
          role="status"
        >
          <Loader2 className="size-5 animate-spin" /> Checking your access…
        </div>
      </Shell>
    );
  }

  if (!user) {
    return (
      <Shell>
        <Notice
          title="Sign in to continue"
          text="The dashboard is for Clisanco administrators only."
        >
          <Button asChild variant="accent" size="lg">
            <Link to="/auth">Sign in</Link>
          </Button>
        </Notice>
      </Shell>
    );
  }

  if (access.isError) {
    return (
      <Shell>
        <Notice
          icon={<ShieldAlert className="size-6" />}
          title="Couldn't verify your access"
          text="Something went wrong while checking your permissions. Please try again."
        >
          <Button variant="outline" onClick={() => void access.refetch()}>
            Try again
          </Button>
        </Notice>
      </Shell>
    );
  }

  if (!access.data?.isAdmin) {
    return (
      <Shell>
        <Notice
          icon={<ShieldAlert className="size-6" />}
          title="No administrator access"
          text={`${user.email ?? "This account"} isn't an administrator. Sign in with an administrator account to manage the website.`}
        >
          <Button variant="outline" onClick={() => void signOut()}>
            Sign out
          </Button>
          <Button asChild variant="ghost">
            <Link to="/">Back to website</Link>
          </Button>
        </Notice>
      </Shell>
    );
  }

  return (
    <Shell>
      <Toaster position="top-right" richColors />
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">Admin</p>
          <h1 className="mt-1 text-3xl font-extrabold md:text-4xl">Content dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Signed in as {user.email}. Drafts stay hidden until you publish them.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm">
            <Link to="/">
              View site <ExternalLink />
            </Link>
          </Button>
          <Button variant="ghost" size="sm" onClick={() => void signOut()}>
            Sign out
          </Button>
        </div>
      </div>

      <Tabs defaultValue="project">
        <TabsList className="h-auto flex-wrap justify-start gap-1 rounded-2xl p-1.5">
          <TabsTrigger value="project" className="rounded-xl px-4 py-2">
            Projects
          </TabsTrigger>
          <TabsTrigger value="service" className="rounded-xl px-4 py-2">
            Services
          </TabsTrigger>
          <TabsTrigger value="page" className="rounded-xl px-4 py-2">
            Page text
          </TabsTrigger>
          <TabsTrigger value="faq" className="rounded-xl px-4 py-2">
            FAQs
          </TabsTrigger>
          <TabsTrigger value="post" className="rounded-xl px-4 py-2">
            Blog posts
          </TabsTrigger>
        </TabsList>

        <div className="mt-8 rounded-3xl border border-border bg-card p-5 shadow-soft md:p-8">
          <TabsContent value="project" className="mt-0">
            <ContentManager
              kind="project"
              singular="project"
              plural="projects"
              intro="Showcase installations with photos and videos. The first image becomes the cover."
              Editor={ProjectEditor}
              describe={(row) => {
                const c = parseContent("project", row.content);
                const files = c.media.length;
                return [c.tag, c.location, `${files} file${files === 1 ? "" : "s"}`]
                  .filter(Boolean)
                  .join(" · ");
              }}
              thumbnail={(row) =>
                parseContent("project", row.content).media.find((m) => m.type === "image")?.url ??
                null
              }
            />
          </TabsContent>

          <TabsContent value="service" className="mt-0">
            <ContentManager
              kind="service"
              singular="service"
              plural="services"
              intro="Edit the services you offer: names, summaries, descriptions and key features."
              Editor={ServiceEditor}
              describe={(row) => parseContent("service", row.content).summary || "No summary yet"}
            />
          </TabsContent>

          <TabsContent value="page" className="mt-0">
            <ContentManager
              kind="page"
              singular="page"
              plural="pages"
              intro="Edit the headline, intro and body text for pages across the website."
              Editor={PageEditor}
              describe={(row) =>
                `Key: ${row.slug}${parseContent("page", row.content).heading ? ` · ${parseContent("page", row.content).heading}` : ""}`
              }
            />
          </TabsContent>

          <TabsContent value="faq" className="mt-0">
            <ContentManager
              kind="faq"
              singular="FAQ"
              plural="FAQs"
              intro="Questions and answers for the FAQ page. Use the arrows to set the order."
              Editor={FaqEditor}
              describe={(row) => parseContent("faq", row.content).answer || "No answer yet"}
            />
          </TabsContent>

          <TabsContent value="post" className="mt-0">
            <ContentManager
              kind="post"
              singular="blog post"
              plural="blog posts"
              intro="Write and publish articles. Save as a draft until you're ready to go live."
              Editor={PostEditor}
              describe={(row) => {
                const c = parseContent("post", row.content);
                return [c.tag, c.excerpt].filter(Boolean).join(" · ") || "No excerpt yet";
              }}
              thumbnail={(row) => parseContent("post", row.content).cover?.url ?? null}
            />
          </TabsContent>
        </div>
      </Tabs>
    </Shell>
  );
}
