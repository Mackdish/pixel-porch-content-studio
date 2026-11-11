import { describe, expect, it } from "vitest";

import {
  collectMediaPaths,
  parseContent,
  randomSuffix,
  saveInputSchema,
  slugify,
} from "@/lib/content-types";
import { validateMediaFile } from "@/lib/media";

const image = {
  path: "image/2026/a.jpg",
  url: "https://example.com/a.jpg",
  type: "image",
  alt: "",
};
const video = {
  path: "video/2026/b.mp4",
  url: "https://example.com/b.mp4",
  type: "video",
  alt: "",
};

describe("slugify", () => {
  it("lowercases, strips accents and collapses punctuation", () => {
    expect(slugify("  Café Wi-Fi: Campus Rollout!  ")).toBe("cafe-wi-fi-campus-rollout");
  });

  it("returns an empty string when nothing usable remains", () => {
    expect(slugify("!!!")).toBe("");
  });
});

describe("randomSuffix", () => {
  it("produces url-safe strings of the requested length", () => {
    const s = randomSuffix(8);
    expect(s).toMatch(/^[a-z0-9]{8}$/);
  });
});

describe("parseContent", () => {
  it("fills defaults for empty or missing content", () => {
    expect(parseContent("faq", null)).toEqual({ answer: "" });
    expect(parseContent("project", {})).toEqual({ tag: "", location: "", summary: "", media: [] });
    expect(parseContent("post", undefined).cover).toBeNull();
  });

  it("falls back to defaults instead of throwing on malformed stored data", () => {
    expect(parseContent("service", { features: "not-an-array" })).toEqual({
      summary: "",
      details: "",
      features: [],
    });
  });

  it("keeps valid stored data", () => {
    const parsed = parseContent("project", { tag: "Education", media: [image, video] });
    expect(parsed.tag).toBe("Education");
    expect(parsed.media.map((m) => m.type)).toEqual(["image", "video"]);
  });
});

describe("saveInputSchema", () => {
  const base = {
    kind: "faq",
    title: "How long?",
    slug: "faq-abc123",
    published: false,
    sort_order: 0,
    content: {},
  };

  it("accepts a valid payload", () => {
    expect(saveInputSchema.safeParse(base).success).toBe(true);
  });

  it("rejects unknown kinds and bad slugs", () => {
    expect(saveInputSchema.safeParse({ ...base, kind: "admin" }).success).toBe(false);
    expect(saveInputSchema.safeParse({ ...base, slug: "Has Spaces" }).success).toBe(false);
    expect(saveInputSchema.safeParse({ ...base, slug: "double--hyphen" }).success).toBe(false);
  });

  it("rejects an empty title", () => {
    expect(saveInputSchema.safeParse({ ...base, title: "   " }).success).toBe(false);
  });
});

describe("collectMediaPaths", () => {
  it("lists every project file for cleanup", () => {
    expect(collectMediaPaths("project", { media: [image, video] })).toEqual([
      image.path,
      video.path,
    ]);
  });

  it("lists a post cover and ignores kinds without media", () => {
    expect(collectMediaPaths("post", { cover: image })).toEqual([image.path]);
    expect(collectMediaPaths("post", {})).toEqual([]);
    expect(collectMediaPaths("faq", { answer: "x" })).toEqual([]);
  });
});

describe("validateMediaFile", () => {
  const file = (name: string, type: string, bytes = 10) =>
    new File([new Uint8Array(bytes)], name, { type });

  it("accepts supported images and videos", () => {
    expect(validateMediaFile(file("a.jpg", "image/jpeg"), ["image", "video"])).toBeNull();
    expect(validateMediaFile(file("a.mp4", "video/mp4"), ["image", "video"])).toBeNull();
  });

  it("rejects unsupported types", () => {
    expect(validateMediaFile(file("a.pdf", "application/pdf"), ["image", "video"])).toMatch(
      /unsupported/,
    );
  });

  it("rejects a kind the field does not allow", () => {
    expect(validateMediaFile(file("a.mp4", "video/mp4"), ["image"])).toMatch(/only accepts image/);
  });

  it("enforces size limits", () => {
    const big = file("big.jpg", "image/jpeg", 11 * 1024 * 1024);
    expect(validateMediaFile(big, ["image"])).toMatch(/too large/);
  });
});
