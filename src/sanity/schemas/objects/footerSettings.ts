import { defineField, defineType } from "sanity";

export const footerSettings = defineType({
  name: "footerSettings",
  title: "Footer",
  type: "object",
  fields: [
    defineField({
      name: "brandDescription",
      title: "Brand Description",
      type: "text",
      rows: 3,
      initialValue: "New Patient Solutions for Dental Practices.",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      description:
        "Not rendered as icons in the footer (matches the reference design, which has none) — used only for the Organization sameAs structured-data links.",
      type: "array",
      of: [{ type: "socialLink" }],
    }),
    defineField({
      name: "columns",
      title: "Link Columns",
      description:
        "Renders as a fixed 4-column grid alongside the brand block (matches the reference footer layout) — keep this at exactly 3 columns.",
      type: "array",
      of: [{ type: "footerColumn" }],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: "legalLinks",
      title: "Legal Links",
      description:
        "Optional extra links shown next to the copyright line. The reference design leaves this row copyright-only and links Privacy Policy / Terms of Use from the Resources column instead.",
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
  preview: {
    prepare: () => ({ title: "Footer" }),
  },
});
