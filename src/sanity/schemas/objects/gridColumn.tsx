import { defineField, defineType } from "sanity";
import { getColumnIcon } from "../../lib/gridIconRenderer";
import { portableTextBlock } from "./portableTextEditor";

export const gridColumn = defineType({
  name: "gridColumn",
  title: "Column",
  type: "object",
  fields: [
    defineField({
      name: "width",
      title: "Width",
      type: "string",
      options: {
        list: [
          { value: "auto", title: "Auto (equal with siblings)" },
          { value: "half", title: "Half (1/2)" },
          { value: "oneThird", title: "One Third (1/3)" },
          { value: "twoThirds", title: "Two Thirds (2/3)" },
          { value: "full", title: "Full Width" },
        ],
      },
      initialValue: "auto",
    }),
    defineField({
      name: "verticalAlign",
      title: "Vertical Alignment",
      type: "string",
      options: {
        list: [
          { value: "top", title: "Top" },
          { value: "center", title: "Center" },
          { value: "bottom", title: "Bottom" },
        ],
      },
      initialValue: "center",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        portableTextBlock,
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt text",
              type: "string",
              description: "Describe the image for screen readers and SEO",
            }),
            defineField({
              name: "priority",
              title: "Priority load (above the fold)",
              type: "boolean",
              description: "Enable for images visible on initial page load to improve LCP",
              initialValue: false,
            }),
          ],
        },
        { type: "columnDivider" },
        { type: "cardsBlock" },
        { type: "pricingCardsBlock" },
        { type: "statCardsBlock" },
        { type: "statBandBlock" },
        { type: "ctaBlock" },
        { type: "testimonialBlock" },
        { type: "numberedStepBlock" },
        { type: "iconFeatureBlock" },
        { type: "contactFormBlock" },
        { type: "checkListBlock" },
        { type: "featureCardsBlock" },
        { type: "solutionCard" },
        { type: "tabsBlock" },
        { type: "stickyScrollBlock" },
        { type: "comparisonBlock" },
        { type: "tailoredStepsBlock" },
        { type: "approachTabsBlock" },
      ],
    }),
  ],
  preview: {
    select: { content: "content", width: "width" },
    prepare: ({ content, width }) => {
      const firstBlock = content?.find(
        (b: { _type: string; children?: { text: string }[] }) =>
          b._type === "block" && b.children?.[0]?.text
      );
      const text = firstBlock?.children
        ?.map((c: { text: string }) => c.text)
        .join("");
      const Icon = getColumnIcon(width ?? "auto", content);
      return { title: text || "Column", media: Icon };
    },
  },
});
