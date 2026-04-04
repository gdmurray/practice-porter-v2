import { defineField, defineType } from "sanity";
import { themeField } from "../objects/theme";

export const bookMeeting = defineType({
  name: "bookMeeting",
  title: "Book a Meeting",
  type: "object",
  fields: [
    themeField("white"),
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
    defineField({
      name: "calendlyUrl",
      title: "Calendly URL",
      type: "url",
      description:
        "Your Calendly scheduling page URL (e.g. https://calendly.com/yourname/meeting-type)",
      validation: (Rule) => Rule.required().uri({ scheme: ["https"] }),
    }),
  ],
  preview: {
    select: { title: "title", url: "calendlyUrl" },
    prepare: ({ title, url }) => ({
      title: "Book a Meeting",
      subtitle: title ?? url ?? "",
    }),
  },
});
