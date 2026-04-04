import { defineField, defineType } from "sanity";

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      description: "Override default SEO for this page",
    }),
    defineField({
      name: "modules",
      title: "Page Modules",
      type: "array",
      of: [
        { type: "gridSection" },
        { type: "trustBar" },
        { type: "faq" },
        { type: "bookMeeting" },
      ],
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({ title: title || "Untitled Page" }),
  },
});
