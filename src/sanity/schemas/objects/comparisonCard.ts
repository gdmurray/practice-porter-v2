import { defineField, defineType } from "sanity";

export const comparisonCard = defineType({
  name: "comparisonCard",
  title: "Comparison Card",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: "e.g. \"Industry Average\" or \"Practice Porter Clients\"",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "overLabel",
      title: "Over Label",
      type: "string",
      description: "Optional small italic label shown above the value, e.g. \"OVER\"",
    }),
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      description: "e.g. \"2 / 5\"",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      description: "e.g. \"new patient calls booked as appointments\"",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "filledCount",
      title: "Filled Icons (of 5)",
      type: "number",
      validation: (Rule) => Rule.required().min(0).max(5),
      initialValue: 2,
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "value" },
  },
});
