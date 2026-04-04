import { defineField, defineType } from "sanity";
import { TaskIcon } from "@sanity/icons";

export const checkListBlock = defineType({
  name: "checkListBlock",
  title: "Checklist",
  type: "object",
  icon: TaskIcon,
  fields: [
    defineField({
      name: "lineSeparated",
      title: "Line Separated",
      description: "Add a border between each checklist item",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [
        {
          type: "object",
          name: "checkListItem",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "label" },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { items: "items" },
    prepare: ({ items }) => ({
      title: "Checklist",
      subtitle: `${items?.length ?? 0} items`,
    }),
  },
});
