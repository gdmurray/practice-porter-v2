/**
 * Backfill ctaType on all CTA objects in the home page document.
 * Run: SANITY_AUTH_TOKEN=xxx pnpm exec tsx scripts/patch-cta-types.ts
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

async function main() {
  if (!token) {
    console.error("Set SANITY_AUTH_TOKEN in .env.local for write access.");
    process.exit(1);
  }

  const homeId = "e5244255-1f1f-44cf-bda4-dd6a94fe7f0e";

  // Patch via the draft so it doesn't go live until published
  const result = await client
    .patch(`drafts.${homeId}`)
    .set({
      "modules[_key==\"db45db58c882\"].primaryCta.ctaType": "internal",
      "modules[_key==\"db45db58c882\"].secondaryCta.ctaType": "internal",
      "modules[_key==\"785e781b33f7\"].primaryCta.ctaType": "internal",
      "modules[_key==\"785e781b33f7\"].secondaryCta.ctaType": "external",
    })
    .commit({ autoGenerateArrayKeys: true });

  console.log("Patched document:", result._id);
}

main().catch(console.error);
