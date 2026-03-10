// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

import sanity from '@sanity/astro';
import react from '@astrojs/react';
import tailwindcss from "@tailwindcss/vite";


// https://astro.build/config
export default defineConfig({
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    },

    imageService: "cloudflare"
  }),

  integrations: [sanity({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    useCdn: false, 
    apiVersion: "2026-03-10", 
    studioBasePath: '/studio'
  }), react()],
  vite: {
    plugins: [tailwindcss()]
  }
});