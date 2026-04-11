// @ts-check
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'url';
import path from 'path';

import cloudflare from '@astrojs/cloudflare';

import sanity from '@sanity/astro';
import react from '@astrojs/react';
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";
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
    build: {
      // Studio chunks are intentionally large (Sanity Studio at /studio only).
      // Raise the limit to suppress warnings for those; user-facing chunks are small.
      chunkSizeWarningLimit: 6000,
    },
    plugins: [
      process.env.VISUALIZE && visualizer({
        emitFile: true,
        filename: "stats.html",
      }),
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
      exclude: ["@sanity/astro"],
    },
    ssr: {
      // nodejs_compat in wrangler.jsonc handles these at runtime;
      // marking them external here silences Vite's automatic-externalization warnings.
      external: ["node:fs/promises", "node:path", "node:url", "node:crypto"],
    },
  }
});