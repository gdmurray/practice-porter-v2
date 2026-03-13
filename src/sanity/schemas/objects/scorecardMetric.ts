import { defineField, defineType } from "sanity";

export const scorecardMetric = defineType({
  name: "scorecardMetric",
  title: "Scorecard Metric",
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
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      options: {
        list: [
          { value: "default", title: "Default" },
          { value: "gold", title: "Gold" },
          { value: "up", title: "Green (Up)" },
          { value: "down", title: "Red (Down)" },
        ],
      },
    }),
  ],
});
