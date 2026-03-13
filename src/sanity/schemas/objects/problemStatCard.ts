import { defineField, defineType } from "sanity";

const ICONS = ["phone-off", "dollar-sign", "users", "clock", "alert-circle", "trending-down"];

export const problemStatCard = defineType({
  name: "problemStatCard",
  title: "Problem Stat Card",
  type: "object",
  fields: [
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: {
        list: ICONS.map((i) => ({ value: i, title: i })),
      },
    }),
    defineField({
      name: "number",
      title: "Number",
      type: "string",
      description: "e.g. '45%', '$180K+', '33.4%', '24hrs'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "color",
      title: "Color",
      type: "string",
      options: {
        list: [
          { value: "red", title: "Red" },
          { value: "amber", title: "Amber" },
          { value: "navy", title: "Navy" },
          { value: "teal", title: "Teal" },
        ],
      },
      initialValue: "teal",
    }),
    defineField({
      name: "desc",
      title: "Description",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
