import { defineField, defineType } from "sanity";

const ICONS = ["activity", "users", "pie-chart", "monitor", "bar-chart"];

export const scorecardFeature = defineType({
  name: "scorecardFeature",
  title: "Scorecard Feature",
  type: "object",
  fields: [
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: {
        list: ICONS.map((i) => ({ value: i, title: i })),
      },
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "desc",
      title: "Description",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
  ],
});
