import { defineField, defineType } from "sanity";

export const inlineStat = defineType({
  name: "inlineStat",
  title: "Stat",
  type: "object",
  fields: [
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      description: 'e.g. "$142", "94", "By Hour"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "suffix",
      title: "Suffix",
      type: "string",
      description: 'Superscript appended to the value, e.g. "%", "*", "%*"',
    }),
    defineField({
      name: "suffixColor",
      title: "Suffix Color",
      type: "string",
      options: {
        list: [
          { value: "gold", title: "Gold" },
          { value: "teal", title: "Teal" },
          { value: "navy", title: "Navy" },
        ],
        layout: "radio",
      },
      initialValue: "gold",
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: 'Small uppercase label below the value, e.g. "COST PER APPT"',
    }),
  ],
  preview: {
    select: { value: "value", suffix: "suffix", label: "label" },
    prepare: ({ value, suffix, label }) => ({
      title: `${value ?? ""}${suffix ?? ""}`,
      subtitle: label ?? "",
    }),
  },
});
