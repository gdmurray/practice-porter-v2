import { defineField, defineType } from "sanity";

export const navigationSettings = defineType({
  name: "navigationSettings",
  title: "Navigation",
  type: "object",
  fields: [
    defineField({
      name: "links",
      title: "Nav Links",
      type: "array",
      of: [{ type: "navLink" }],
    }),
    defineField({
      name: "cta",
      title: "CTA Button",
      type: "cta",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Navigation" }),
  },
});
