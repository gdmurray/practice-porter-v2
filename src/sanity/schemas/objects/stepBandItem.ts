import { defineField, defineType } from "sanity";

export const stepBandItem = defineType({
  name: "stepBandItem",
  title: "Step",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: "Short step name shown as the uppercase label (e.g. \"Consulting\")",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "description" },
  },
});
