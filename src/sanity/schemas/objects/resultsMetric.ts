import { defineField, defineType } from "sanity";

export const resultsMetric = defineType({
  name: "resultsMetric",
  title: "Results Metric",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "industryValue",
      title: "Industry Average",
      type: "string",
    }),
    defineField({
      name: "industryBarWidth",
      title: "Industry Bar Width (%)",
      type: "string",
    }),
    defineField({
      name: "porterValue",
      title: "Practice Porter Value",
      type: "string",
    }),
    defineField({
      name: "porterBarWidth",
      title: "Porter Bar Width (%)",
      type: "string",
    }),
  ],
});
