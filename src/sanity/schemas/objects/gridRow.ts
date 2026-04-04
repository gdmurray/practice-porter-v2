import { defineField, defineType } from "sanity";
import { getRowIcon } from "../../lib/gridIconRenderer";

export const gridRow = defineType({
  name: "gridRow",
  title: "Row",
  type: "object",
  fields: [
    defineField({
      name: "alignment",
      title: "Text Alignment",
      type: "string",
      options: {
        list: [
          { value: "left", title: "Left" },
          { value: "center", title: "Center" },
        ],
      },
      initialValue: "left",
    }),
    defineField({
      name: "columns",
      title: "Columns",
      type: "array",
      of: [{ type: "gridColumn" }],
      validation: (Rule) => Rule.required().min(1).max(4),
    }),
  ],
  preview: {
    select: { columns: "columns", alignment: "alignment" },
    prepare: ({ columns, alignment }) => ({
      title: `Row — ${columns?.length ?? 0} col${columns?.length === 1 ? "" : "s"}`,
      subtitle: alignment === "center" ? "Centered" : "Left aligned",
      media: getRowIcon(columns?.length ?? 2),
    }),
  },
});
