import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useId, useState, type FormEvent, type ReactNode } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { saveContent } from "@/lib/content.functions";
import {
  parseContent,
  randomSuffix,
  slugify,
  type ContentByKind,
  type ContentKind,
  type ContentRow,
} from "@/lib/content-types";
import { MediaField } from "./MediaField";

export type EditorProps = {
  row: ContentRow | null;
  /** The sort order a brand-new item should get (end of the list). */
  nextOrder: number;
  onSaved: (row: ContentRow) => void;
  onCancel: () => void;
};

/* ------------------------------------------------------------------ */
/* Small form helpers                                                  */
/* ------------------------------------------------------------------ */

export function Field({
  label,
  hint,
  children,
  htmlFor,
}: {
  label: string;
  hint?: string | undefined;
  children: ReactNode;
  htmlFor?: string | undefined;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
      </label>
      {hint && <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>}
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Shared shell: title, slug, publish toggle and save                  */
/* ------------------------------------------------------------------ */

type ShellProps<K extends ContentKind> = EditorProps & {
  kind: K;
  /** Current kind-specific content, owned by the specific editor. */
  content: ContentByKind[K];
  titleLabel: string;
  titleHint?: string;
  slugLabel?: string;
  slugHint?: string;
  /** "auto" hides the slug field and generates a unique one (used for FAQs). */
  slugMode?: "editable" | "auto";
  children: ReactNode;
};

function EditorShell<K extends ContentKind>({
  kind,
  row,
  nextOrder,
  onSaved,
  onCancel,
  content,
  titleLabel,
  titleHint,
  slugLabel = "URL slug",
  slugHint = "Lowercase letters, numbers and hyphens. Must be unique across all content.",
  slugMode = "editable",
  children,
}: ShellProps<K>) {
  const titleId = useId();
  const slugId = useId();
  const [title, setTitle] = useState(row?.title ?? "");
  const [slug, setSlug] = useState(row?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(row));
  const [published, setPublished] = useState(row?.published ?? false);
  const [autoSlug] = useState(() => `${kind}-${randomSuffix()}`);
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: (input: { title: string; slug: string }) =>
      saveContent({
        data: {
          ...(row ? { id: row.id } : {}),
          kind,
          title: input.title,
          slug: input.slug,
          published,
          sort_order: row?.sort_order ?? nextOrder,
          content,
        },
      }),
    onSuccess: (saved) => {
      setError(null);
      toast.success(saved.published ? "Saved and published." : "Saved as a draft.", {
        description: saved.published
          ? "It is now live on the public site."
          : "It is hidden from visitors until you publish it.",
      });
      onSaved(saved);
    },
    onError: (e: unknown) => {
      const message = e instanceof Error ? e.message : "Something went wrong while saving.";
      setError(message);
      toast.error("Couldn't save", { description: message });
    },
  });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const finalSlug = slugMode === "auto" ? (row?.slug ?? autoSlug) : slug.trim() || slugify(title);
    mutation.mutate({ title: title.trim(), slug: finalSlug });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <Field label={titleLabel} hint={titleHint} htmlFor={titleId}>
        <Input
          id={titleId}
          required
          maxLength={200}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (slugMode === "editable" && !slugTouched) setSlug(slugify(e.target.value));
          }}
        />
      </Field>

      {slugMode === "editable" && (
        <Field label={slugLabel} hint={slugHint} htmlFor={slugId}>
          <Input
            id={slugId}
            required
            maxLength={120}
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(e.target.value);
            }}
            pattern="[a-z0-9]+(-[a-z0-9]+)*"
            title="Lowercase letters, numbers and single hyphens"
          />
        </Field>
      )}

      {children}

      <div className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-surface p-4">
        <div>
          <p className="text-sm font-semibold">{published ? "Published" : "Draft"}</p>
          <p className="text-xs text-muted-foreground">
            {published ? "Visible to visitors once saved." : "Only administrators can see drafts."}
          </p>
        </div>
        <Switch checked={published} onCheckedChange={setPublished} aria-label="Published" />
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
        >
          {error}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        <Button type="submit" variant="accent" size="lg" disabled={mutation.isPending}>
          {mutation.isPending && <Loader2 className="animate-spin" />}
          {mutation.isPending ? "Saving…" : row ? "Save changes" : "Create"}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={onCancel}
          disabled={mutation.isPending}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/* Projects: images and videos                                         */
/* ------------------------------------------------------------------ */

export function ProjectEditor(props: EditorProps) {
  const [content, setContent] = useState(() => parseContent("project", props.row?.content));
  const tagId = useId();
  const locId = useId();
  const sumId = useId();
  return (
    <EditorShell {...props} kind="project" content={content} titleLabel="Project name">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label="Category tag"
          hint="For example Education, Business or Healthcare."
          htmlFor={tagId}
        >
          <Input
            id={tagId}
            maxLength={60}
            value={content.tag}
            onChange={(e) => setContent({ ...content, tag: e.target.value })}
          />
        </Field>
        <Field label="Location" hint="Town or region (optional)." htmlFor={locId}>
          <Input
            id={locId}
            maxLength={120}
            value={content.location}
            onChange={(e) => setContent({ ...content, location: e.target.value })}
          />
        </Field>
      </div>
      <Field label="Summary" hint="One or two sentences shown on the project card." htmlFor={sumId}>
        <Textarea
          id={sumId}
          rows={4}
          maxLength={600}
          value={content.summary}
          onChange={(e) => setContent({ ...content, summary: e.target.value })}
        />
      </Field>
      <MediaField
        label="Images and videos"
        hint="The first image is used as the cover. Add alt text so the site stays accessible."
        allow={["image", "video"]}
        value={content.media}
        onChange={(media) => setContent({ ...content, media })}
      />
    </EditorShell>
  );
}

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export function ServiceEditor(props: EditorProps) {
  const [content, setContent] = useState(() => parseContent("service", props.row?.content));
  const [featuresText, setFeaturesText] = useState(() => content.features.join("\n"));
  const sumId = useId();
  const detId = useId();
  const featId = useId();
  return (
    <EditorShell {...props} kind="service" content={content} titleLabel="Service name">
      <Field label="Short summary" hint="Shown on service cards." htmlFor={sumId}>
        <Textarea
          id={sumId}
          rows={3}
          maxLength={400}
          value={content.summary}
          onChange={(e) => setContent({ ...content, summary: e.target.value })}
        />
      </Field>
      <Field label="Full description" hint="Separate paragraphs with a blank line." htmlFor={detId}>
        <Textarea
          id={detId}
          rows={9}
          maxLength={8000}
          value={content.details}
          onChange={(e) => setContent({ ...content, details: e.target.value })}
        />
      </Field>
      <Field label="Key features" hint="One feature per line." htmlFor={featId}>
        <Textarea
          id={featId}
          rows={6}
          value={featuresText}
          onChange={(e) => {
            setFeaturesText(e.target.value);
            setContent({
              ...content,
              features: e.target.value
                .split("\n")
                .map((l) => l.trim())
                .filter(Boolean),
            });
          }}
        />
      </Field>
    </EditorShell>
  );
}

/* ------------------------------------------------------------------ */
/* Page text                                                           */
/* ------------------------------------------------------------------ */

export function PageEditor(props: EditorProps) {
  const [content, setContent] = useState(() => parseContent("page", props.row?.content));
  const headId = useId();
  const introId = useId();
  const bodyId = useId();
  return (
    <EditorShell
      {...props}
      kind="page"
      content={content}
      titleLabel="Page name"
      titleHint="Only you see this, for example “Home page” or “About”."
      slugLabel="Page key"
      slugHint="A short identifier for the page, such as home, about or process."
    >
      <Field label="Heading" htmlFor={headId}>
        <Input
          id={headId}
          maxLength={200}
          value={content.heading}
          onChange={(e) => setContent({ ...content, heading: e.target.value })}
        />
      </Field>
      <Field label="Intro" hint="The short paragraph under the heading." htmlFor={introId}>
        <Textarea
          id={introId}
          rows={3}
          maxLength={800}
          value={content.intro}
          onChange={(e) => setContent({ ...content, intro: e.target.value })}
        />
      </Field>
      <Field label="Body text" hint="Separate paragraphs with a blank line." htmlFor={bodyId}>
        <Textarea
          id={bodyId}
          rows={12}
          maxLength={20000}
          value={content.body}
          onChange={(e) => setContent({ ...content, body: e.target.value })}
        />
      </Field>
    </EditorShell>
  );
}

/* ------------------------------------------------------------------ */
/* FAQs                                                                */
/* ------------------------------------------------------------------ */

export function FaqEditor(props: EditorProps) {
  const [content, setContent] = useState(() => parseContent("faq", props.row?.content));
  const ansId = useId();
  return (
    <EditorShell {...props} kind="faq" content={content} titleLabel="Question" slugMode="auto">
      <Field label="Answer" htmlFor={ansId}>
        <Textarea
          id={ansId}
          required
          rows={6}
          maxLength={4000}
          value={content.answer}
          onChange={(e) => setContent({ ...content, answer: e.target.value })}
        />
      </Field>
    </EditorShell>
  );
}

/* ------------------------------------------------------------------ */
/* Blog posts                                                          */
/* ------------------------------------------------------------------ */

export function PostEditor(props: EditorProps) {
  const [content, setContent] = useState(() => parseContent("post", props.row?.content));
  const tagId = useId();
  const excId = useId();
  const bodyId = useId();
  return (
    <EditorShell {...props} kind="post" content={content} titleLabel="Post title">
      <Field label="Category tag" hint="For example Cabling, Wi-Fi or Planning." htmlFor={tagId}>
        <Input
          id={tagId}
          maxLength={60}
          value={content.tag}
          onChange={(e) => setContent({ ...content, tag: e.target.value })}
        />
      </Field>
      <Field label="Excerpt" hint="One or two sentences shown on the blog listing." htmlFor={excId}>
        <Textarea
          id={excId}
          rows={3}
          maxLength={400}
          value={content.excerpt}
          onChange={(e) => setContent({ ...content, excerpt: e.target.value })}
        />
      </Field>
      <MediaField
        label="Cover image"
        allow={["image"]}
        multiple={false}
        value={content.cover ? [content.cover] : []}
        onChange={(items) => setContent({ ...content, cover: items[0] ?? null })}
      />
      <Field label="Article" hint="Separate paragraphs with a blank line." htmlFor={bodyId}>
        <Textarea
          id={bodyId}
          rows={16}
          maxLength={60000}
          value={content.body}
          onChange={(e) => setContent({ ...content, body: e.target.value })}
        />
      </Field>
    </EditorShell>
  );
}
