import { defineField, defineType } from "sanity";

export const tailoredStep = defineType({
  name: "tailoredStep",
  title: "Tailored Step",
  type: "object",
  fields: [
    defineField({
      name: "badge",
      title: "Step Number",
      type: "string",
      initialValue: "1",
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      description: "e.g. \"Consultation\"",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cta",
      title: "CTA",
      type: "cta",
      description:
        "Use this when the step has a single call-to-action (e.g. \"Book Free Consultation\"). Leave empty if using Solution Links instead.",
    }),
    defineField({
      name: "links",
      title: "Solution Links",
      type: "array",
      of: [{ type: "tailoredSolutionLink" }],
      description:
        "Use this when the step lists multiple linked solutions instead of a single CTA (e.g. deep links to each product page).",
      validation: (Rule) => Rule.max(4),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "eyebrow" },
  },
});
