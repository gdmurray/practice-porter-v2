import React from "react";
import { defineArrayMember, defineField } from "sanity";

// Studio previews render inside the dark Studio chrome, not the site's
// brand-red left panel — LIGHT_HEADING/LIGHT_BODY are light-mode-safe
// stand-ins, matching the convention in portableTextEditor.tsx /
// stickyScrollPortableTextEditor.tsx.
const LIGHT_HEADING = "#FFEEE4";
const LIGHT_BODY = "#9CA3AF";

const H2Style = ({ children }: { children: React.ReactNode }) => (
  <h2
    style={{
      fontFamily: "'Playfair Display', Georgia, serif",
      fontSize: "28px",
      fontWeight: 500,
      lineHeight: 1.18,
      color: LIGHT_HEADING,
    }}
  >
    {children}
  </h2>
);

const NormalStyle = ({ children }: { children: React.ReactNode }) => (
  <p
    style={{
      fontSize: "15px",
      lineHeight: 1.6,
      color: LIGHT_BODY,
    }}
  >
    {children}
  </p>
);

// Deliberately narrow — same rationale as stickyScrollPortableTextEditor.tsx:
// this editor only drives the Split Booking left panel, which needs a
// heading, body copy, a checklist, and a founder credit. No other block
// objects (image, stat cards, etc.) make sense in that fixed-width red
// panel, so they're not offered here.
export const splitBookingPortableTextBlock = defineArrayMember({
  type: "block",
  styles: [
    { title: "Normal", value: "normal", component: NormalStyle },
    { title: "Heading 2", value: "h2", component: H2Style },
  ],
  marks: {
    decorators: [{ title: "Bold", value: "strong" }],
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
