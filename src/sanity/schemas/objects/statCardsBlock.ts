import { defineField, defineType } from "sanity";
import { BarChartIcon } from "@sanity/icons";

export const statCardsBlock = defineType({
  name: "statCardsBlock",
  title: "Stat Cards",
  type: "object",
  icon: BarChartIcon,
  fields: [
    defineField({
      name: "theme",
      title: "Card Background Theme",
      type: "string",
      description: "Override the section theme for card backgrounds",
      options: {
        list: [
          { value: "cream", title: "Cream" },
          { value: "white", title: "White" },
        ],
      },
    }),
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
      initialValue: 2,
    }),
    defineField({
      name: "items",
      title: "Stat Cards",
      type: "array",
      of: [{ type: "statCard" }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { items: "items" },
    prepare: ({ items }) => ({
      title: "Stat Cards",
      subtitle: `${items?.length ?? 0} cards`,
    }),
  },
});
