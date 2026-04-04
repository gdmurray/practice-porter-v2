import { defineField, defineType } from "sanity";
import { OlistIcon } from "@sanity/icons";

export const numberedStepBlock = defineType({
  name: "numberedStepBlock",
  title: "Numbered Steps",
  type: "object",
  icon: OlistIcon,
  fields: [
    defineField({
      name: "items",
      title: "Steps",
      type: "array",
      of: [{ type: "numberedStep" }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { items: "items" },
    prepare: ({ items }) => ({
      title: "Numbered Steps",
      subtitle: `${items?.length ?? 0} steps`,
    }),
  },
});
