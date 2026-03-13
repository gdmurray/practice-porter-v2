import { defineField, defineType } from "sanity";
import { themeField } from "../objects/theme";

export const hero = defineType({
  name: "hero",
  title: "Hero",
  type: "object",
  fields: [
    themeField("dark"),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      initialValue: "Boutique Dental Call Intelligence",
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      initialValue: "Every Missed Call Is a New Patient You'll Never Meet",
    }),
    defineField({
      name: "headlineHighlight",
      title: "Headline Highlight",
      type: "string",
      description: "Text to emphasize (e.g. 'Never')",
      initialValue: "Never",
    }),
    defineField({
      name: "sub",
      title: "Subheadline",
      type: "text",
      rows: 3,
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
      initialValue: { label: "See Our Results", href: "#results" },
    }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [{ type: "heroStat" }],
      validation: (Rule) => Rule.max(3),
    }),
  ],
  preview: {
    select: { headline: "headline" },
    prepare: ({ headline }) => ({ title: "Hero", subtitle: headline }),
  },
});
