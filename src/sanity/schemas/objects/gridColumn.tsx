import React from "react";
import { defineField, defineType } from "sanity";
import {
  DropIcon,
  HighlightIcon,
  StarFilledIcon,
  TextIcon,
} from "@sanity/icons";
import { getColumnIcon } from "../../lib/gridIconRenderer";

const HighlightMark = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: "#1a5c5e", fontWeight: 500 }}>{children}</span>
);

const GoldMark = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: "#c9a96e", fontWeight: 500 }}>{children}</span>
);

const TealMark = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: "#1a5c5e" }}>{children}</span>
);

const SerifMark = ({ children }: { children: React.ReactNode }) => (
  <span style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
    {children}
  </span>
);

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
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 1", value: "h1" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Eyebrow", value: "eyebrow" },
            { title: "Subtitle", value: "subtitle" },
            { title: "Lead", value: "lead" },
            { title: "Caption (light gray)", value: "caption" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              {
                title: "Serif",
                value: "serifText",
                icon: TextIcon,
                component: SerifMark,
              },
              {
                title: "Highlight",
                value: "highlight",
                icon: HighlightIcon,
                component: HighlightMark,
              },
              {
                title: "Gold",
                value: "highlightGold",
                icon: StarFilledIcon,
                component: GoldMark,
              },
              {
                title: "Teal",
                value: "highlightTeal",
                icon: DropIcon,
                component: TealMark,
              },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  defineField({
                    name: "href",
                    type: "string",
                    title: "URL",
                    validation: (Rule) => Rule.required(),
                  }),
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
        },
        { type: "pricingCardsBlock" },
        { type: "statCardsBlock" },
        { type: "ctaBlock" },
        { type: "testimonialBlock" },
        { type: "numberedStepBlock" },
        { type: "iconFeatureBlock" },
        { type: "checkListBlock" },
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
