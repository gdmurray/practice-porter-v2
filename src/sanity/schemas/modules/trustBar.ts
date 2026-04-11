import { defineField, defineType } from "sanity";
import { themeField } from "../objects/theme";
import { moduleLayoutField } from "../objects/moduleLayout";

export const trustBar = defineType({
  name: "trustBar",
  title: "Trust Bar",
  type: "object",
  fields: [
    themeField("white"),
    moduleLayoutField(),
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
