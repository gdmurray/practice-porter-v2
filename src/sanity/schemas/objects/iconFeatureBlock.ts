import { defineField, defineType } from "sanity";
import { ComponentIcon } from "@sanity/icons";

export const iconFeatureBlock = defineType({
  name: "iconFeatureBlock",
  title: "Icon Features",
  type: "object",
  icon: ComponentIcon,
  fields: [
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      options: {
        list: [
          { value: "feature", title: "Feature (square icon, bold title)" },
          { value: "detail", title: "Detail (circle icon, uppercase label)" },
        ],
        layout: "radio",
      },
      initialValue: "feature",
    }),
    defineField({
      name: "items",
      title: "Features",
      type: "array",
      of: [{ type: "iconFeature" }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { items: "items", variant: "variant" },
    prepare: ({ items, variant }) => ({
      title: variant === "detail" ? "Icon Details" : "Icon Features",
      subtitle: `${items?.length ?? 0} items`,
    }),
  },
});

