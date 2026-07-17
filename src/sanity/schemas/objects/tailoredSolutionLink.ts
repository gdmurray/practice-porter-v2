import { defineField, defineType } from "sanity";
import { IconPickerInput } from "@/sanity/components/IconPickerInput";

export const tailoredSolutionLink = defineType({
  name: "tailoredSolutionLink",
  title: "Solution Link",
  type: "object",
  fields: [
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      components: { input: IconPickerInput },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cta",
      title: "Link",
      type: "cta",
      description: "The link's own label is shown as the visible link text.",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "cta.label", subtitle: "icon" },
    prepare: ({ title, subtitle }) => ({
      title: title || "Solution Link",
      subtitle,
    }),
  },
});
