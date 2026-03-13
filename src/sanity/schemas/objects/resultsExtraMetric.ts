import { defineField, defineType } from "sanity";

export const resultsExtraMetric = defineType({
  name: "resultsExtraMetric",
  title: "Extra Metric",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
