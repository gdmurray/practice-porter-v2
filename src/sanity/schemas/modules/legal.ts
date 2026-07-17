import { defineField, defineType } from "sanity";
import { themeField } from "../objects/theme";
import { moduleLayoutField } from "../objects/moduleLayout";
import { legalPortableTextBlock } from "../objects/legalPortableTextEditor";

export const legal = defineType({
  name: "legal",
  title: "Legal Content",
  type: "object",
  fields: [
    themeField("white"),
    moduleLayoutField(),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "dateSource",
      title: "Date Label",
      type: "string",
      options: {
        list: [
          { value: "updated", title: "Last Updated" },
          { value: "effective", title: "Effective Date" },
        ],
        layout: "radio",
      },
      initialValue: "updated",
    }),
    defineField({
      name: "effectiveDate",
      title: "Date",
      type: "date",
      description: "Shown next to the label above. Leave blank to hide.",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [legalPortableTextBlock],
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({ title: "Legal Content", subtitle: title }),
  },
});
