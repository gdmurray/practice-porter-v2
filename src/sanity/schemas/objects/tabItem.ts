import { defineField, defineType } from "sanity";
import { SelectIcon } from "@sanity/icons";
import { IconPickerInput } from "@/sanity/components/IconPickerInput";

export const tabItem = defineType({
  name: "tabItem",
  title: "Tab",
  type: "object",
  icon: SelectIcon,
  fields: [
    defineField({
      name: "title",
      title: "Tab Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Tab Icon",
      type: "string",
      components: { input: IconPickerInput },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Tab Content",
      type: "solutionCard",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", icon: "icon" },
    prepare: ({ title, icon }) => ({
      title: title || "Tab",
      subtitle: icon,
      media: SelectIcon,
    }),
  },
});
