import { defineField, defineType } from "sanity";
import { ComponentIcon } from "@sanity/icons";

export const iconFeatureBlock = defineType({
  name: "iconFeatureBlock",
  title: "Icon Features",
  type: "object",
  icon: ComponentIcon,
  fields: [
    defineField({
      name: "items",
      title: "Features",
      type: "array",
      of: [{ type: "iconFeature" }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { items: "items" },
    prepare: ({ items }) => ({
      title: "Icon Features",
      subtitle: `${items?.length ?? 0} features`,
    }),
  },
});
