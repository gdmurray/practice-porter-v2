import React from "react";
import { defineArrayMember, defineField } from "sanity";
import {
  DropIcon,
  HighlightIcon,
  OlistIcon,
  StarFilledIcon,
  TextIcon,
} from "@sanity/icons";

const HighlightMark = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: "#1a5c5e" }}>{children}</span>
);

const GoldMark = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: "#c9a96e" }}>{children}</span>
);

const TealMark = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: "#1a5c5e" }}>{children}</span>
);

const PriceMark = ({ children }: { children: React.ReactNode }) => (
  <span
    style={{
      fontSize: "2.25rem",
      fontWeight: 700,
      lineHeight: 1,
      letterSpacing: "-0.02em",
    }}
  >
    {children}
  </span>
);

const SerifMark = ({ children }: { children: React.ReactNode }) => (
  <span style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
    {children}
  </span>
);

const EyebrowStyle = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      fontSize: "11px",
      fontWeight: 600,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: "#c9a96e",
    }}
  >
    <span
      style={{
        display: "inline-block",
        width: "28px",
        height: "1px",
        background: "#c9a96e",
        flexShrink: 0,
      }}
    />
    {children}
  </div>
);

const SubtitleStyle = ({ children }: { children: React.ReactNode }) => (
  <p
    style={{
      fontSize: "17px",
      lineHeight: 1.65,
      color: "#6b7280",
      fontWeight: 400,
    }}
  >
    {children}
  </p>
);

const LeadStyle = ({ children }: { children: React.ReactNode }) => (
  <p
    style={{
      fontSize: "16px",
      lineHeight: 1.7,
      color: "#9ca3af",
    }}
  >
    {children}
  </p>
);

const CaptionStyle = ({ children }: { children: React.ReactNode }) => (
  <p
    style={{
      fontSize: "12px",
      lineHeight: 1.5,
      color: "#9ca3af",
    }}
  >
    {children}
  </p>
);

export const portableTextBlock = defineArrayMember({
  type: "block",
  styles: [
    { title: "Normal", value: "normal" },
    { title: "Heading 1", value: "h1" },
    { title: "Heading 2", value: "h2" },
    { title: "Heading 3", value: "h3" },
    { title: "Eyebrow", value: "eyebrow", component: EyebrowStyle },
    { title: "Subtitle", value: "subtitle", component: SubtitleStyle },
    { title: "Lead", value: "lead", component: LeadStyle },
    { title: "Caption (light gray)", value: "caption", component: CaptionStyle },
  ],
  marks: {
    decorators: [
      { title: "Bold", value: "strong" },
      { title: "Italic", value: "em" },
      {
        title: "Price",
        value: "price",
        icon: OlistIcon,
        component: PriceMark,
      },
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
});
