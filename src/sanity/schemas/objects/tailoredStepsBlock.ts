import { defineField, defineType } from "sanity";
import { TransferIcon } from "@sanity/icons";

export const tailoredStepsBlock = defineType({
  name: "tailoredStepsBlock",
  title: "Tailored Steps",
  type: "object",
  icon: TransferIcon,
  description:
    "Two connected step cards (e.g. Consultation \u2192 Solutions) with an arrow connector between them.",
  fields: [
    defineField({
      name: "stepOne",
      title: "Step One",
      type: "tailoredStep",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "stepTwo",
      title: "Step Two",
      type: "tailoredStep",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { one: "stepOne.title", two: "stepTwo.title" },
    prepare: ({ one, two }) => ({
      title: "Tailored Steps",
      subtitle: [one, two].filter(Boolean).join(" \u2192 "),
    }),
  },
});
