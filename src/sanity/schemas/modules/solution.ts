import { defineField, defineType } from "sanity";
import { themeField } from "../objects/theme";

export const solution = defineType({
  name: "solution",
  title: "Solution Section",
  type: "object",
  fields: [
    themeField("dark"),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      initialValue: "The Solution",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "A Dedicated Team That Turns Every Ring Into Revenue",
    }),
    defineField({
      name: "titleHighlight",
      title: "Title Highlight",
      type: "string",
      initialValue: "Revenue",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "cards",
      title: "Solution Cards",
      type: "array",
      of: [{ type: "solutionCard" }],
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({ title: "Solution Section", subtitle: title }),
  },
});
