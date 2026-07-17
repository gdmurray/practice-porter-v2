import { defineField, defineType } from "sanity";
import { ICON_LIST } from "@/lib/iconNames";

export const statCard = defineType({
  name: "statCard",
  title: "Stat Card",
  type: "object",
  fields: [
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: {
        list: ICON_LIST,
      },
    }),
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      description: 'e.g. "45%", "$150K+", "3-5x"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: "Description line below the value",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "compareText",
      title: "Compare Text",
      type: "string",
      description: 'e.g. "Industry avg: 33%"',
    }),
    defineField({
      name: "valueColor",
      title: "Value Color",
      type: "string",
      options: {
        list: [
          { value: "ink", title: "Ink (dark)" },
          { value: "red", title: "Burnt Red" },
          { value: "terra", title: "Terracotta" },
          { value: "muted", title: "Muted" },
        ],
      },
      initialValue: "ink",
    }),
  ],
  preview: {
    select: { value: "value", label: "label" },
    prepare: ({ value, label }) => ({ title: value, subtitle: label }),
  },
});
