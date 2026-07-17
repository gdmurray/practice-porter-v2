import React from "react";
import { defineArrayMember, defineField } from "sanity";
import {
  DropIcon,
  HighlightIcon,
  OlistIcon,
  StarFilledIcon,
  SyncIcon,
  TextIcon,
} from "@sanity/icons";

const HighlightMark = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: "#A32705" }}>{children}</span>
);

const RedMark = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: "#A32705" }}>{children}</span>
);

const TerraMark = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: "#C0532C" }}>{children}</span>
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

// Studio-only chip preview for the `rotatingText` annotation — shows the
// configured word list so editors don't need to open the dialog to see
// what's cycling. Rendering (animation, timing) lives entirely in
// RotatingText.tsx / global.css, not here.
const RotatingTextAnnotation = ({
  value,
  children,
}: {
  value?: { words?: string[] };
  children: React.ReactNode;
}) => {
  const words = value?.words?.filter(Boolean) ?? [];
  return (
    <span
      style={{ borderBottom: `1px dashed ${RED}` }}
      title={words.length ? words.join(" · ") : undefined}
    >
      {children}
    </span>
  );
};

const FONT_SANS =
  '"Plus Jakarta Sans Variable", "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
const FONT_SERIF =
  '"Playfair Display Variable", "Playfair fallback", Georgia, "Times New Roman", serif';
const RED = "#A32705";

// These previews render inside the Studio's own dark UI chrome, not on the
// site's light page backgrounds — so the real brand colors (ink, charcoal,
// muted-text) are all near-black and illegible here. LIGHT_HEADING /
// LIGHT_BODY are light-mode-safe stand-ins that keep each style's relative
// size/weight/family accurate while staying readable against dark chrome.
const LIGHT_HEADING = "#FFEEE4"; // vanilla — matches the existing convention in cardsPortableTextEditor.tsx
const LIGHT_BODY = "#9CA3AF";

const NormalStyle = ({ children }: { children: React.ReactNode }) => (
  <p
    style={{
      fontFamily: FONT_SANS,
      fontSize: "16px",
      fontWeight: 300,
      lineHeight: 1.75,
      color: LIGHT_BODY,
    }}
  >
    {children}
  </p>
);

const H1Style = ({ children }: { children: React.ReactNode }) => (
  <h1
    style={{
      fontFamily: FONT_SERIF,
      fontSize: "48px",
      fontWeight: 400,
      lineHeight: 1.18,
      color: LIGHT_HEADING,
    }}
  >
    {children}
  </h1>
);

const H2Style = ({ children }: { children: React.ReactNode }) => (
  <h2
    style={{
      fontFamily: FONT_SERIF,
      fontSize: "40px",
      fontWeight: 400,
      lineHeight: 1.18,
      color: LIGHT_HEADING,
    }}
  >
    {children}
  </h2>
);

const H3Style = ({ children }: { children: React.ReactNode }) => (
  <h3
    style={{
      fontFamily: FONT_SERIF,
      fontSize: "33px",
      fontWeight: 500,
      lineHeight: 1.15,
      color: LIGHT_HEADING,
    }}
  >
    {children}
  </h3>
);

const EyebrowStyle = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      fontFamily: FONT_SANS,
      fontSize: "12px",
      fontWeight: 600,
      letterSpacing: "2.4px",
      textTransform: "uppercase",
      color: RED,
    }}
  >
    {children}
  </div>
);

const SubtitleStyle = ({ children }: { children: React.ReactNode }) => (
  <p
    style={{
      fontFamily: FONT_SANS,
      fontSize: "17px",
      fontWeight: 300,
      lineHeight: 1.7,
      color: LIGHT_BODY,
    }}
  >
    {children}
  </p>
);

const LeadStyle = ({ children }: { children: React.ReactNode }) => (
  <p
    style={{
      fontFamily: FONT_SANS,
      fontSize: "15px",
      fontWeight: 400,
      lineHeight: 1.75,
      color: LIGHT_BODY,
    }}
  >
    {children}
  </p>
);

// Matches reference/Home.html's `.stat-eyebrow` (11px/600/2px tracking,
// uppercase, centered) — the label that sits above a themed Stat Band.
const StatEyebrowStyle = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      fontFamily: FONT_SANS,
      textAlign: "center",
      fontSize: "11px",
      fontWeight: 600,
      letterSpacing: "2px",
      textTransform: "uppercase",
      color: LIGHT_BODY,
    }}
  >
    {children}
  </div>
);

export const portableTextBlock = defineArrayMember({
  type: "block",
  styles: [
    { title: "Normal", value: "normal", component: NormalStyle },
    { title: "Heading 1", value: "h1", component: H1Style },
    { title: "Heading 2", value: "h2", component: H2Style },
    { title: "Heading 3", value: "h3", component: H3Style },
    { title: "Eyebrow", value: "eyebrow", component: EyebrowStyle },
    { title: "Subtitle", value: "subtitle", component: SubtitleStyle },
    { title: "Lead", value: "lead", component: LeadStyle },
    { title: "Stat Eyebrow", value: "stat-eyebrow", component: StatEyebrowStyle },
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
        title: "Burnt Red",
        value: "highlightRed",
        icon: StarFilledIcon,
        component: RedMark,
      },
      {
        title: "Terracotta",
        value: "highlightTerra",
        icon: DropIcon,
        component: TerraMark,
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
      {
        name: "rotatingText",
        type: "rotatingText",
        title: "Rotating Text",
        icon: SyncIcon,
        components: { annotation: RotatingTextAnnotation },
      },
    ],
  },
});
