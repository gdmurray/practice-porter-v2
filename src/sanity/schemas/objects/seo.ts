import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      description: "Title for search engines and social sharing",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      description: "Description for search engines and social sharing",
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      description: "Image for social sharing (recommended 1200x630)",
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
      description: "Override canonical URL (leave empty to use page URL)",
    }),
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      description: "Used for site-level SEO (e.g. 'Practice Porter')",
    }),
  ],
});
