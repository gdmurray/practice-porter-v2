import { defineField, defineType } from "sanity";

export const footerLink = defineType({
  name: "footerLink",
  title: "Footer Link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "href",
      title: "URL",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { label: "label" },
    prepare: ({ label }) => ({ title: label }),
  },
});
