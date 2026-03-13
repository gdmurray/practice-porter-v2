/**
 * Create siteSettings document with _id "siteSettings" for Studio singleton.
 * Requires SANITY_AUTH_TOKEN for write access.
 * Run: SANITY_AUTH_TOKEN=xxx pnpm exec tsx scripts/create-site-settings.ts
 */
import { createClient } from "@sanity/client";

const token = process.env.SANITY_AUTH_TOKEN;
const client = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID ?? "u06m8vwg",
  dataset: process.env.PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2026-03-10",
  useCdn: false,
  token,
});

const doc = {
  _id: "siteSettings",
  _type: "siteSettings",
  navigation: {
    links: [
      { _type: "navLink", _key: "nav1", label: "Services", href: "#solution" },
      { _type: "navLink", _key: "nav2", label: "How It Works", href: "#process" },
      { _type: "navLink", _key: "nav3", label: "Results", href: "#results" },
      { _type: "navLink", _key: "nav4", label: "Report Card", href: "#scorecard" },
      { _type: "navLink", _key: "nav5", label: "Pricing", href: "#pricing" },
    ],
    ctaLabel: "Book a Consultation",
    ctaHref: "#cta",
  },
  footer: {
    brandDescription:
      "Intelligence behind every call. Boutique new-patient call answering and performance analytics for dental practices across North America.",
    copyright: "© 2026 Practice Porter Inc. All rights reserved.",
  },
};

async function main() {
  if (!token) {
    console.error("Set SANITY_AUTH_TOKEN in .env.local for write access.");
    process.exit(1);
  }
  const result = await client.createOrReplace(doc);
  console.log("Created/updated siteSettings:", result._id);
}

main().catch(console.error);
