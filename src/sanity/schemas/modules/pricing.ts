import { defineField, defineType } from "sanity";
import { themeField } from "../objects/theme";

export const pricing = defineType({
  name: "pricing",
  title: "Pricing Section",
  type: "object",
  fields: [
    themeField("white"),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      initialValue: "Simple Pricing",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Pay for Results, Not Promises",
    }),
    defineField({
      name: "titleHighlight",
      title: "Title Highlight",
      type: "string",
      initialValue: "Results",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "alignment",
      title: "Header Alignment",
      type: "string",
      options: {
        list: [
          { value: "center", title: "Center" },
          { value: "left", title: "Left" },
        ],
      },
      initialValue: "center",
    }),
    defineField({
      name: "cards",
      title: "Pricing Cards",
      type: "array",
      of: [{ type: "pricingCard" }],
    }),
    defineField({
      name: "note",
      title: "Note Below Cards",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    prepare: () => ({ title: "Pricing Section" }),
  },
});
