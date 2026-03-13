import { defineField, defineType } from "sanity";

export const footerColumn = defineType({
  name: "footerColumn",
  title: "Footer Column",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Column Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      of: [{ type: "footerLink" }],
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({ title: title || "Footer Column" }),
  },
});
