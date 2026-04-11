import { defineField, defineType } from "sanity";
import { ThListIcon } from "@sanity/icons";

export const cardsBlock = defineType({
  name: "cardsBlock",
  title: "Cards",
  type: "object",
  icon: ThListIcon,
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
        layout: "radio",
      },
      initialValue: 3,
    }),
    defineField({
      name: "cardTheme",
      title: "Card Theme",
      type: "object",
      options: { collapsible: true, collapsed: false },
      groups: [
        { name: "appearance", title: "Appearance", default: true },
        { name: "spacing", title: "Spacing & Interaction" },
      ],
      fields: [
        defineField({
          name: "cardBg",
          title: "Card Background",
          type: "string",
          group: "appearance",
          options: {
            list: [
              { value: "cream", title: "Cream" },
              { value: "white", title: "White" },
              { value: "transparent", title: "Transparent" },
            ],
            layout: "radio",
          },
          initialValue: "cream",
        }),
        defineField({
          name: "bordered",
          title: "Bordered",
          type: "boolean",
          group: "appearance",
          description: "Add a border ring around each card",
          initialValue: false,
        }),
        defineField({
          name: "layout",
          title: "Content Alignment",
          type: "string",
          group: "appearance",
          options: {
            list: [
              { value: "left", title: "Left" },
              { value: "center", title: "Center" },
            ],
            layout: "radio",
          },
          initialValue: "left",
        }),
        defineField({
          name: "padding",
          title: "Card Padding",
          type: "string",
          group: "spacing",
          description: "Internal spacing inside each card",
          options: {
            list: [
              { value: "compact", title: "Compact (16px)" },
              { value: "default", title: "Default (32px)" },
              { value: "spacious", title: "Spacious (48px)" },
            ],
            layout: "radio",
          },
          initialValue: "default",
        }),
        defineField({
          name: "hoverEffect",
          title: "Hover Shadow",
          type: "boolean",
          group: "spacing",
          description: "Show a subtle shadow lift when hovering over a card",
          initialValue: false,
        }),
      ],
    }),
    defineField({
      name: "items",
      title: "Cards",
      type: "array",
      of: [{ type: "card" }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { items: "items", columns: "columns" },
    prepare: ({ items, columns }) => ({
      title: "Cards",
      subtitle: `${items?.length ?? 0} cards · ${columns ?? 3} columns`,
      media: ThListIcon,
    }),
  },
});
