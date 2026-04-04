export const prerender = false;

import type { APIRoute } from "astro";
import { sanityClient } from "sanity:client";

const SITE = "https://practiceporter.com";

export const GET: APIRoute = async () => {
  const slugs: { slug: string }[] = await sanityClient.fetch(
    `*[_type == "page" && defined(slug.current)]{ "slug": slug.current }`
  );

  const urls = slugs.map(({ slug }) => {
    const loc = slug === "home" ? SITE : `${SITE}/${slug}`;
    return `  <url><loc>${loc}</loc></url>`;
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
