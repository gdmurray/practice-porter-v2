import { defineField, defineType } from "sanity";
import { themeField } from "../objects/theme";

export const faq = defineType({
  name: "faq",
  title: "FAQ Section",
  type: "object",
  fields: [
    themeField("cream"),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "items",
      title: "FAQ Items",
      type: "array",
      of: [{ type: "faqItem" }],
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({ title: "FAQ Section", subtitle: title }),
  },
});
