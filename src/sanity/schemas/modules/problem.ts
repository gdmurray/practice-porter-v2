import { defineField, defineType } from "sanity";
import { themeField } from "../objects/theme";

export const problem = defineType({
  name: "problem",
  title: "Problem Section",
  type: "object",
  fields: [
    themeField("cream"),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      initialValue: "The Problem",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Your Marketing Is Working. Your Front Desk Isn't.",
    }),
    defineField({
      name: "titleHighlight",
      title: "Title Highlight",
      type: "string",
      description: "Text to emphasize (e.g. 'Front Desk')",
      initialValue: "Front Desk",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "bigStat",
      title: "Big Background Stat",
      type: "string",
      description: "e.g. '45%' - large decorative number",
      initialValue: "45%",
    }),
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "statCards",
      title: "Stat Cards",
      type: "array",
      of: [{ type: "problemStatCard" }],
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({ title: "Problem Section", subtitle: title }),
  },
});
