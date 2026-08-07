export const prerender = false;

import type { APIRoute } from "astro";
import { defineQuery } from "groq";
import { sanityClient } from "sanity:client";
import type { LlmsQueryResult } from "../../sanity.types";

const SITE = "https://practiceporter.com";

const llmsQuery = defineQuery(`{
  "settings": *[_id == "siteSettings"][0] {
    seo { siteName, metaDescription },
    footer { brandDescription }
  },
  "pages": *[_type == "page" && defined(slug.current)] | order(title asc) {
    title,
    "slug": slug.current,
    "description": seo.metaDescription
  }
}`);

type LlmsPage = NonNullable<LlmsQueryResult["pages"]>[number];
type ResolvedPage = {
  title: string;
  slug: string;
  description: string | null;
};

function escapeMd(text: string): string {
  return text.replace(/[[\]()]/g, "\\$&").replace(/\s+/g, " ").trim();
}

function pageUrl(slug: string): string {
  return slug === "home" ? `${SITE}/` : `${SITE}/${slug}`;
}

function isOptionalPage(slug: string): boolean {
  return /privacy|terms|legal/.test(slug);
}

function resolvePage(page: LlmsPage): ResolvedPage | null {
  if (!page.slug || !page.title) return null;
  return {
    title: page.title,
    slug: page.slug,
    description: page.description,
  };
}

function linkLine({ title, slug, description }: ResolvedPage): string {
  const note = description ? `: ${escapeMd(description)}` : "";
  return `- [${escapeMd(title)}](${pageUrl(slug)})${note}`;
}

export const GET: APIRoute = async () => {
  const { settings, pages } =
    await sanityClient.fetch<LlmsQueryResult>(llmsQuery);

  const name = settings?.seo?.siteName?.trim() || "Practice Porter";
  const description =
    settings?.seo?.metaDescription?.trim() ||
    settings?.footer?.brandDescription?.trim() ||
    "Human-powered new patient solutions for dental practices.";

  const resolved = pages.flatMap((page) => {
    const next = resolvePage(page);
    return next ? [next] : [];
  });

  const primary = resolved.filter((p) => !isOptionalPage(p.slug));
  const optional = resolved.filter((p) => isOptionalPage(p.slug));

  const lines = [
    `# ${escapeMd(name)}`,
    `> ${escapeMd(description)}`,
    "",
    "## Pages",
    ...primary.map(linkLine),
  ];

  if (optional.length > 0) {
    lines.push("", "## Optional", ...optional.map(linkLine));
  }

  return new Response(lines.join("\n") + "\n", {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
