export const prerender = false;

import type { APIRoute } from "astro";
import { defineQuery } from "groq";
import { sanityClient } from "sanity:client";

const SITE = "https://practiceporter.com";

const slugsQuery = defineQuery(
  `*[_type == "page" && defined(slug.current)] | order(_updatedAt desc) {
    "slug": slug.current,
    title,
    "lastmod": _updatedAt
  }`
);

export const GET: APIRoute = async () => {
  const slugs = await sanityClient.fetch(slugsQuery);

  const urls = slugs.map(({ slug, title, lastmod }) => {
    const loc = slug === "home" ? SITE : `${SITE}/${slug}`;
    const lastmodDate = lastmod ? `\n    <lastmod>${lastmod.slice(0, 10)}</lastmod>` : "";
    const titleTag = title ? `\n    <title>${title}</title>` : "";
    return `  <url>\n    <loc>${loc}</loc>${lastmodDate}${titleTag}\n  </url>`;
  });

  const xml = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n");

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
};
