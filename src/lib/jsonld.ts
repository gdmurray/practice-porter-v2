import type { PAGE_QUERY_RESULT, SITE_SETTINGS_QUERY_RESULT } from "sanity.types";

// All local types are derived from the GROQ query result types, not raw schema document types.
// Query result types reflect the exact projected shape (nullability, dereferenced assets, etc.).
type PageModules = NonNullable<PAGE_QUERY_RESULT>["modules"];
type PageModule = NonNullable<PageModules>[number];
type FaqModule = Extract<PageModule, { _type: "faq" }>;
type FaqItem = NonNullable<FaqModule["items"]>[number];
type PtBlock = NonNullable<FaqItem["answer"]>[number];

export type SocialLink = NonNullable<
  NonNullable<NonNullable<SITE_SETTINGS_QUERY_RESULT>["footer"]>["socialLinks"]
>[number];

/** Convert portable-text blocks to a plain string for JSON-LD */
function blocksToText(blocks?: FaqItem["answer"]): string {
  return (blocks ?? [])
    .map((b) => b.children?.map((c) => c.text ?? "").join("") ?? "")
    .filter(Boolean)
    .join(" ");
}

/**
 * Build a FAQPage JSON-LD object from the modules array.
 * Returns null if no faq module or no items are present.
 */
export function buildFaqJsonLd(modules: PageModules): object | null {
  const faqModule = (modules ?? []).find(
    (m): m is FaqModule => m._type === "faq"
  );

  if (!faqModule?.items?.length) return null;

  const entities = faqModule.items
    .filter((item) => item.question)
    .map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: blocksToText(item.answer),
      },
    }));

  if (!entities.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entities,
  };
}

interface WebSiteOptions {
  siteName?: string | null;
  siteUrl: string;
  description?: string | null;
}

/**
 * Build a WebSite JSON-LD object.
 * This is a base-level schema Google expects on every site.
 */
export function buildWebSiteJsonLd({ siteName, siteUrl, description }: WebSiteOptions): object {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName ?? "Practice Porter",
    url: siteUrl,
  };
  if (description) schema.description = description;
  return schema;
}

interface OrganizationOptions {
  siteName?: string | null;
  siteUrl: string;
  logoUrl?: string | null;
  socialLinks?: SocialLink[] | null;
}

/**
 * Build an Organization JSON-LD object.
 * Includes sameAs links from footer social links for cross-platform entity association.
 */
export function buildOrganizationJsonLd({
  siteName,
  siteUrl,
  logoUrl,
  socialLinks,
}: OrganizationOptions): object {
  const sameAs = (socialLinks ?? [])
    .map((s) => s.url)
    .filter((url): url is string => Boolean(url));

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName ?? "Practice Porter",
    url: siteUrl,
  };

  if (logoUrl) {
    schema.logo = {
      "@type": "ImageObject",
      url: logoUrl,
    };
  }

  if (sameAs.length) {
    schema.sameAs = sameAs;
  }

  return schema;
}
