import { defineField, defineType } from "sanity";
import { UsersIcon } from "@sanity/icons";

export const comparisonBlock = defineType({
  name: "comparisonBlock",
  title: "Comparison",
  type: "object",
  icon: UsersIcon,
  description:
    "Paired dark/light stat cards (each with a 5-icon fill comparison) plus a CTA banner underneath. Card colors are fixed, not theme-driven.",
  fields: [
    defineField({
      name: "leftCard",
      title: "Left Card (dark)",
      type: "comparisonCard",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "rightCard",
      title: "Right Card (light)",
      type: "comparisonCard",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "banner",
      title: "CTA Banner",
      type: "object",
      fields: [
        defineField({
          name: "headline",
          title: "Headline",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "headlineEmphasis",
          title: "Headline Emphasis",
          type: "string",
          description: "Emphasized trailing portion of the headline, e.g. \"$280,000 every year.\"",
        }),
        defineField({
          name: "subtext",
          title: "Subtext",
          type: "string",
        }),
        defineField({
          name: "cta",
          title: "CTA",
          type: "cta",
        }),
      ],
    }),
  ],
  preview: {
    select: { left: "leftCard.value", right: "rightCard.value" },
    prepare: ({ left, right }) => ({
      title: "Comparison",
      subtitle: left && right ? `${left} vs ${right}` : "Comparison cards",
      media: UsersIcon,
    }),
  },
});
