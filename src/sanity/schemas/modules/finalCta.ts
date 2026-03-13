import { defineField, defineType } from "sanity";
import { themeField } from "../objects/theme";

export const finalCta = defineType({
  name: "finalCta",
  title: "Final CTA",
  type: "object",
  fields: [
    themeField("dark"),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      initialValue: "Get Started",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Stop Losing Patients to Missed Calls",
    }),
    defineField({
      name: "titleHighlight",
      title: "Title Highlight",
      type: "string",
      initialValue: "Missed Calls",
    }),
    defineField({
      name: "sub",
      title: "Subheadline",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "primaryCta",
      title: "Primary CTA",
      type: "cta",
      initialValue: { label: "Book Free Consultation", href: "#cta" },
    }),
    defineField({
      name: "secondaryCta",
      title: "Secondary CTA",
      type: "cta",
      initialValue: { label: "Or email us directly", href: "mailto:info@practiceporter.ca" },
    }),
    defineField({
      name: "note",
      title: "Note",
      type: "string",
      initialValue: "No contracts. No setup fees. Just results.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Final CTA" }),
  },
});
