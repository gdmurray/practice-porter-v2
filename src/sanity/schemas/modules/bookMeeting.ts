import { defineField, defineType } from "sanity";
import { themeField } from "../objects/theme";
import { moduleLayoutField } from "../objects/moduleLayout";

export const bookMeeting = defineType({
  name: "bookMeeting",
  title: "Book a Meeting",
  type: "object",
  fields: [
    themeField("white"),
    moduleLayoutField(),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({
      title: "Book a Meeting",
      subtitle: title ?? "",
    }),
  },
});
