import { defineField, defineType } from "sanity";
import { themeField } from "../objects/theme";
import { getGridIcon } from "../../lib/gridIconRenderer";

export const gridSection = defineType({
  name: "gridSection",
  title: "Grid Section",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Section Name",
      type: "string",
      description: "Display label in Studio (e.g. 'Problem Section')",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sectionId",
      title: "Section ID",
      type: "string",
      description: "HTML anchor id for navigation (e.g. 'problem')",
    }),
    themeField("cream"),
    defineField({
      name: "rows",
      title: "Rows",
      type: "array",
      of: [{ type: "gridRow" }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { name: "name", rows: "rows" },
    prepare: ({ name, rows }) => ({
      title: name || "Grid Section",
      subtitle: `${rows?.length ?? 0} row${rows?.length === 1 ? "" : "s"}`,
      media: getGridIcon(rows ?? []),
    }),
  },
});
