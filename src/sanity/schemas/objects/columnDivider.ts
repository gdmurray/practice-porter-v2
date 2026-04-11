import { defineField, defineType } from "sanity";
import { EllipsisHorizontalIcon } from "@sanity/icons";

export const columnDivider = defineType({
  name: "columnDivider",
  title: "Divider",
  type: "object",
  icon: EllipsisHorizontalIcon,
  fields: [
    defineField({
      name: "style",
      title: "Style",
      type: "string",
      options: {
        list: [
          { value: "line", title: "Line" },
          { value: "spacer", title: "Spacer (no line)" },
        ],
        layout: "radio",
      },
      initialValue: "line",
    }),
  ],
  preview: {
    select: { style: "style" },
    prepare: ({ style }) => ({
      title: style === "spacer" ? "Spacer" : "Divider",
      media: EllipsisHorizontalIcon,
    }),
  },
});
