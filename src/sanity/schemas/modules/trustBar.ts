import { defineField, defineType } from "sanity";
import { themeField } from "../objects/theme";

export const trustBar = defineType({
  name: "trustBar",
  title: "Trust Bar",
  type: "object",
  fields: [
    themeField("white"),
    defineField({
      name: "items",
      title: "Trust Items",
      type: "array",
      of: [{ type: "trustItem" }],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Trust Bar" }),
  },
});
