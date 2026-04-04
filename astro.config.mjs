// @ts-check
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'url';
import path from 'path';

import cloudflare from '@astrojs/cloudflare';

import sanity from '@sanity/astro';
import react from '@astrojs/react';
import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

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
    stega: {
      studioUrl: "/studio",
    },
  }), react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
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