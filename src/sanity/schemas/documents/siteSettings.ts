import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "navigation", title: "Navigation" },
    { name: "footer", title: "Footer" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "navigation",
      title: "Navigation",
      type: "object",
      group: "navigation",
      fields: [
        defineField({
          name: "links",
          title: "Nav Links",
          type: "array",
          of: [{ type: "navLink" }],
        }),
        defineField({
          name: "ctaLabel",
          title: "CTA Button Label",
          type: "string",
          initialValue: "Book a Consultation",
        }),
        defineField({
          name: "ctaHref",
          title: "CTA Button URL",
          type: "string",
          initialValue: "#cta",
        }),
        defineField({
          name: "theme",
          title: "Nav Theme",
          type: "string",
          initialValue: "cream",
          options: {
            list: [
              { title: "Cream (light)", value: "cream" },
              { title: "Dark (navy)", value: "dark" },
            ],
            layout: "radio",
          },
          description: "Background color of the navigation bar when filled.",
        }),
      ],
    }),
    defineField({
      name: "footer",
      title: "Footer",
      type: "object",
      group: "footer",
      fields: [
        defineField({
          name: "brandDescription",
          title: "Brand Description",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "socialLinks",
          title: "Social Links",
          type: "array",
          of: [{ type: "socialLink" }],
        }),
        defineField({
          name: "columns",
          title: "Link Columns",
          type: "array",
          of: [{ type: "footerColumn" }],
        }),
        defineField({
          name: "legalLinks",
          title: "Legal Links",
          type: "array",
          of: [{ type: "footerLink" }],
        }),
        defineField({
          name: "copyright",
          title: "Copyright Text",
          type: "string",
          initialValue: "© 2026 Practice Porter Inc. All rights reserved.",
        }),
      ],
    }),
    defineField({
      name: "seo",
      title: "Default SEO",
      type: "seo",
      group: "seo",
      description: "Default values for pages without custom SEO",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
