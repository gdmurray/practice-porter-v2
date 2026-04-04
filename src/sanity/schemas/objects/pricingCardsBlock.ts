import { defineField, defineType } from "sanity";

export const pricingCardsBlock = defineType({
  name: "pricingCardsBlock",
  title: "Pricing Cards",
  type: "object",
  fields: [
    defineField({
      name: "items",
      title: "Pricing Cards",
      type: "array",
      of: [{ type: "pricingCard" }],
    }),
  ],
  preview: {
    select: { items: "items" },
    prepare: ({ items }) => ({
      title: `Pricing Cards (${items?.length ?? 0})`,
    }),
  },
});
