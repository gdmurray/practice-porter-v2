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
    // Only enable stega source-map encoding in preview deployments — it
    // pulls in the visual-editing client bundle which is ~180 KB on every page.
    stega: process.env.PUBLIC_SANITY_VISUAL_EDITING_ENABLED === "true"
      ? { studioUrl: "/studio" }
      : false,
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
  }
});