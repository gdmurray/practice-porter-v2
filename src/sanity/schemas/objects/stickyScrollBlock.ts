import { defineField, defineType } from "sanity";
import { ThListIcon } from "@sanity/icons";

export const stickyScrollBlock = defineType({
  name: "stickyScrollBlock",
  title: "Sticky Scroll",
  type: "object",
  icon: ThListIcon,
  description:
    "Sticky image column that cross-fades between steps as you scroll past their text — collapses to a plain stacked image-then-text list on mobile.",
  fields: [
    defineField({
      name: "items",
      title: "Steps",
      type: "array",
      of: [{ type: "stickyScrollStep" }],
      validation: (Rule) => Rule.required().min(2).max(5),
    }),
  ],
  preview: {
    select: { items: "items" },
    prepare: ({ items }) => ({
      title: "Sticky Scroll",
      subtitle: `${items?.length ?? 0} steps`,
      media: ThListIcon,
    }),
  },
});
