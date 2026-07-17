import { defineField, defineType } from "sanity";

export const statBandItem = defineType({
  name: "statBandItem",
  title: "Stat",
  type: "object",
  description:
    "Single stat within a Stat Band. Unlike inlineStat (used in cards, which sit on light backgrounds), the suffix color options here are theme-aware so they work on both light sections and full-bleed red/gradient bands.",
  fields: [
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      description: 'e.g. "$142", "94", "By Hour"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "suffix",
      title: "Suffix",
      type: "string",
      description: 'Superscript appended to the value, e.g. "%", "*", "%*"',
    }),
    defineField({
      name: "suffixColor",
      title: "Suffix Color",
      type: "string",
      options: {
        list: [
          { value: "accent", title: "Theme Accent (default)" },
          { value: "text", title: "Match Value / White" },
          { value: "red", title: "Burnt Red" },
          { value: "terra", title: "Terracotta" },
          { value: "ink", title: "Ink (dark)" },
        ],
        layout: "radio",
      },
      description:
        '"Theme Accent" and "Match Value" adapt automatically to the section theme (e.g. white on a red band, red on a light one) — prefer these over the fixed brand colors on themed bands.',
      initialValue: "accent",
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: 'Small caption below the value, e.g. "Average new patient conversion rate"',
    }),
  ],
  preview: {
    select: { value: "value", suffix: "suffix", label: "label" },
    prepare: ({ value, suffix, label }) => ({
      title: `${value ?? ""}${suffix ?? ""}`,
      subtitle: label ?? "",
    }),
  },
});
