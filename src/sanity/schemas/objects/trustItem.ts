import { defineField, defineType } from "sanity";

const LUCIDE_ICONS = [
  "shield",
  "shield-check",
  "globe",
  "check-circle",
  "star",
  "phone",
  "calendar",
  "message-circle",
  "bar-chart",
  "users",
  "clock",
];

export const trustItem = defineType({
  name: "trustItem",
  title: "Trust Item",
  type: "object",
  fields: [
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: {
        list: LUCIDE_ICONS.map((i) => ({ value: i, title: i })),
      },
      initialValue: "shield",
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
