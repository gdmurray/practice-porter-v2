import { defineField, defineType } from "sanity";
import { BoltIcon } from "@sanity/icons";

export const ctaBlock = defineType({
  name: "ctaBlock",
  title: "CTA Buttons",
  type: "object",
  icon: BoltIcon,
  fields: [
    defineField({
      name: "items",
      title: "Buttons",
      type: "array",
      of: [{ type: "cta" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "alignment",
      title: "Alignment",
      type: "string",
      options: {
        list: [
          { value: "left", title: "Left" },
          { value: "center", title: "Center" },
        ],
      },
    }),
  ],
  preview: {
    select: { items: "items" },
    prepare: ({ items }) => ({
      title: "CTA Buttons",
      subtitle: items?.map((i: { label?: string }) => i.label).join(", ") ?? "",
    }),
  },
});
