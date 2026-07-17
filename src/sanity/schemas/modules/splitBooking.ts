import { defineField, defineType } from "sanity";
import { CalendarIcon } from "@sanity/icons";
import { themeField } from "../objects/theme";
import { moduleLayoutField } from "../objects/moduleLayout";
import { splitBookingPortableTextBlock } from "../objects/splitBookingPortableTextEditor";

export const splitBooking = defineType({
  name: "splitBooking",
  title: "Split Booking",
  type: "object",
  icon: CalendarIcon,
  description:
    "Two-column booking card: a red rich-text panel (heading, copy, checklist, founder credit) beside an embedded Google Calendar scheduler.",
  fields: [
    themeField("cream"),
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
    defineField({
      name: "content",
      title: "Left Panel Content",
      type: "array",
      of: [
        splitBookingPortableTextBlock,
        { type: "checkListBlock" },
        { type: "avatarBlock" },
      ],
      description:
        "Renders inside the card's red left panel. The right panel is always the Google Calendar embed (from the PUBLIC_GOOGLE_CALENDAR_BOOKING_URL environment variable).",
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({
      title: "Split Booking",
      subtitle: title ?? "",
    }),
  },
});
