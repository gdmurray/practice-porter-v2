import { defineField, defineType } from "sanity";

const ICONS = ["phone", "calendar", "message-circle", "pie-chart", "shield", "activity", "users"];

export const solutionCard = defineType({
  name: "solutionCard",
  title: "Solution Card",
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
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
  ],
});
