import { defineField, defineType } from "sanity";

const ICONS = [
  "phone-off",
  "dollar-sign",
  "users",
  "clock",
  "alert-circle",
  "trending-down",
  "trending-up",
  "bar-chart",
  "check-circle",
  "star",
];

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
        list: ICONS.map((i) => ({ value: i, title: i })),
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
          { value: "navy", title: "Navy" },
          { value: "red", title: "Red" },
          { value: "gold", title: "Gold" },
          { value: "teal", title: "Teal" },
        ],
      },
      initialValue: "navy",
    }),
  ],
  preview: {
    select: { value: "value", label: "label" },
    prepare: ({ value, label }) => ({ title: value, subtitle: label }),
  },
});
