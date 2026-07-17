import { defineField, defineType } from "sanity";
import { IconPickerInput } from "@/sanity/components/IconPickerInput";

export const navSubLink = defineType({
  name: "navSubLink",
  title: "Nav Sub Link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "href",
      title: "URL",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      components: { input: IconPickerInput },
    }),
  ],
  preview: {
    select: { label: "label", icon: "icon" },
    prepare: ({ label, icon }) => ({ title: label, subtitle: icon }),
  },
});
