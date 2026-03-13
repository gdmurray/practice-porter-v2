import { defineField, defineType } from "sanity";

export const heroStat = defineType({
  name: "heroStat",
  title: "Hero Stat",
  type: "object",
  fields: [
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      description: "e.g. '90+', '33', '3'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "suffix",
      title: "Suffix",
      type: "string",
      description: "e.g. '%', 'x' (optional)",
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "barWidth",
      title: "Bar Width (%)",
      type: "string",
      description: "e.g. '90' for 90%. Leave empty for no bar.",
    }),
    defineField({
      name: "barColor",
      title: "Bar Color",
      type: "string",
      options: {
        list: [
          { value: "gold", title: "Gold" },
          { value: "teal", title: "Teal" },
        ],
      },
    }),
  ],
});
