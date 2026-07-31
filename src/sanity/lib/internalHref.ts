export const SANITY_API_VERSION = "2026-03-10";

export const PAGE_LIST_QUERY = `*[_type == "page" && defined(slug.current)]{
  "slug": slug.current,
  title
} | order(slug asc)`;

export function isExternalHref(href: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(href);
}

export function isAnchorOnlyHref(href: string): boolean {
  return href.startsWith("#");
}

/** Returns a page slug when `href` points at an on-site route; otherwise null. */
export function hrefPathToSlug(href: string): string | null {
  if (isExternalHref(href) || isAnchorOnlyHref(href)) return null;

  const [urlPath] = href.split("#");
  if (!urlPath) return null;
  if (urlPath === "/") return "home";

  const slug = urlPath.replace(/^\/+/, "");
  return slug || null;
}

type SanityFetchClient = {
  fetch: <T>(query: string, params?: Record<string, string>) => Promise<T>;
};

export async function validatePageHrefExists(
  href: string,
  getClient: (config: { apiVersion: string }) => SanityFetchClient
): Promise<true | string> {
  const slug = hrefPathToSlug(href);
  if (slug === null) return true;

  const client = getClient({ apiVersion: SANITY_API_VERSION });
  const matchCount = await client.fetch<number>(
    `count(*[_type == "page" && slug.current == $slug])`,
    { slug }
  );

  if (!matchCount) {
    const [urlPath] = href.split("#");
    return `No page found at "${urlPath || href}". Pick a page from the dropdown or fix the URL.`;
  }

  return true;
}
