import { defineField, defineType } from "sanity";
import { moduleLayoutField } from "../objects/moduleLayout";

export const stepBand = defineType({
  name: "stepBand",
  title: "Step Band",
  type: "object",
  fields: [
    moduleLayoutField(),
    defineField({
      name: "stepOne",
      title: "Step 1 (red)",
      type: "stepBandItem",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "stepTwo",
      title: "Step 2 (peach)",
      type: "stepBandItem",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { one: "stepOne.label", two: "stepTwo.label" },
    prepare: ({ one, two }: { one?: string; two?: string }) => ({
      title: "Step Band",
      subtitle: [one, two].filter(Boolean).join(" → "),
    }),
  },
});
