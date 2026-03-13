import { defineField, defineType } from "sanity";
import { themeField } from "../objects/theme";

export const about = defineType({
  name: "about",
  title: "About Section",
  type: "object",
  fields: [
    themeField("cream"),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      initialValue: "About Practice Porter",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Boutique Service, Enterprise Results",
    }),
    defineField({
      name: "titleHighlight",
      title: "Title Highlight",
      type: "string",
      initialValue: "Enterprise",
    }),
    defineField({
      name: "lead",
      title: "Lead Paragraph",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "image",
      title: "Image / Founder",
      type: "object",
      fields: [
        defineField({
          name: "image",
          title: "Image",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "name",
          title: "Name",
          type: "string",
          initialValue: "Shaan Brach",
        }),
        defineField({
          name: "role",
          title: "Role",
          type: "string",
          initialValue: "Founder, Practice Porter",
        }),
        defineField({
          name: "initials",
          title: "Avatar Initials",
          type: "string",
          description: "Fallback when no image (e.g. 'S')",
          initialValue: "S",
        }),
      ],
    }),
    defineField({
      name: "values",
      title: "Values",
      type: "array",
      of: [{ type: "aboutValue" }],
    }),
  ],
  preview: {
    prepare: () => ({ title: "About Section" }),
  },
});
