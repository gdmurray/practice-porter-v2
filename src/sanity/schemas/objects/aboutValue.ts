import { defineField, defineType } from "sanity";

export const aboutValue = defineType({
  name: "aboutValue",
  title: "About Value",
  type: "object",
  fields: [
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
