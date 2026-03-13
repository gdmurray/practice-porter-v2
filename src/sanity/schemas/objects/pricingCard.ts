import { defineField, defineType } from "sanity";

export const pricingCard = defineType({
  name: "pricingCard",
  title: "Pricing Card",
  type: "object",
  fields: [
    defineField({
      name: "tag",
      title: "Tag",
      type: "string",
      description: "e.g. 'Call Answering', 'Performance Report Card'",
    }),
    defineField({
      name: "amount",
      title: "Amount",
      type: "string",
      description: "e.g. '$150', '$495'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "period",
      title: "Period",
      type: "string",
      description: "e.g. '/ patient booked', '/ month'",
    }),
    defineField({
      name: "desc",
      title: "Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Label",
      type: "string",
      initialValue: "Book Consultation",
    }),
    defineField({
      name: "ctaHref",
      title: "CTA URL",
      type: "string",
      initialValue: "#cta",
    }),
    defineField({
      name: "variant",
      title: "Card Variant",
      type: "string",
      options: {
        list: [
          { value: "light", title: "Light (Cream)" },
          { value: "dark", title: "Dark (Navy)" },
        ],
      },
      initialValue: "light",
    }),
  ],
});
