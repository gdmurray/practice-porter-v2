import { defineField, defineType } from "sanity";
import { ComponentIcon } from "@sanity/icons";

export const featureCardsBlock = defineType({
  name: "featureCardsBlock",
  title: "Feature Cards",
  type: "object",
  icon: ComponentIcon,
  fields: [
    defineField({
      name: "columns",
      title: "Columns",
      type: "number",
      options: {
        list: [
          { value: 2, title: "2 Columns" },
          { value: 3, title: "3 Columns" },
          { value: 4, title: "4 Columns" },
        ],
      },
      initialValue: 3,
    }),
    defineField({
      name: "items",
      title: "Feature Cards",
      type: "array",
      of: [{ type: "featureCard" }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { items: "items" },
    prepare: ({ items }) => ({
      title: "Feature Cards",
      subtitle: `${items?.length ?? 0} cards`,
    }),
  },
});
