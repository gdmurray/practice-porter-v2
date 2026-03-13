import { defineField, defineType } from "sanity";
import { themeField } from "../objects/theme";

export const process = defineType({
  name: "process",
  title: "Process / How It Works",
  type: "object",
  fields: [
    themeField("cream"),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      initialValue: "How It Works",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "From First Ring to Booked Patient in Four Simple Steps",
    }),
    defineField({
      name: "titleHighlight",
      title: "Title Highlight",
      type: "string",
      initialValue: "Booked Patient",
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
      name: "layout",
      title: "Steps Layout",
      type: "string",
      options: {
        list: [
          { value: "alternating", title: "Alternating (zigzag)" },
          { value: "stacked", title: "Stacked" },
        ],
      },
      initialValue: "alternating",
    }),
    defineField({
      name: "steps",
      title: "Steps",
      type: "array",
      of: [{ type: "processStep" }],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Process / How It Works" }),
  },
});
