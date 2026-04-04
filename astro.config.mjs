// @ts-check
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'url';
import path from 'path';

import cloudflare from '@astrojs/cloudflare';

import sanity from '@sanity/astro';
import react from '@astrojs/react';
import tailwindcss from "@tailwindcss/vite";
import { FontaineTransform } from "fontaine";



const __dirname = path.dirname(fileURLToPath(import.meta.url));


// https://astro.build/config
export default defineConfig({
  site: "https://practiceporter.com",
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    },

    imageService: "cloudflare"
  }),

  integrations: [sanity({
    projectId: "u06m8vwg",
    dataset: "production",
    useCdn: false,
    apiVersion: "2026-03-10",
    studioBasePath: "/studio",
    // Always register the studioUrl so per-request stega: true calls in
    // load-query.ts don't throw "config.studioUrl must be defined".
    // load-query.ts is the actual gatekeeper — it only enables stega when
    // both PUBLIC_SANITY_VISUAL_EDITING_ENABLED and the preview flag are true.
    stega: { studioUrl: "/studio" },
  }), react()],
  vite: {
    plugins: [
      tailwindcss(),
      FontaineTransform.vite({
        // Only the first fallback is used for metric calculations.
        // Arial covers sans-serif (Inter); Georgia covers serif (Playfair Display).
        fallbacks: ["Arial", "Georgia"],
        resolvePath: (id) => new URL("." + id, import.meta.url),
      }),
    ],
    resolve: {
      alias: {
        "react-compiler-runtime": path.resolve(
          __dirname,
          "src/shims/react-compiler-runtime.js"
        ),
      },
    },
    optimizeDeps: {
      include: ["@sanity/visual-editing", "@sanity/visual-editing/react"],
    },
  }
});