import React from "react";
import { defineArrayMember, defineField } from "sanity";

// Previews render inside the Studio's dark UI chrome, not the site's light
// page backgrounds — "#2B1A14" (ink) would be illegible here, so this uses
// the same light "vanilla" stand-in as the other editors' heading previews.
const StepTitleStyle = ({ children }: { children: React.ReactNode }) => (
  <h3
    style={{
      fontFamily: "Georgia, 'Times New Roman', serif",
      fontSize: "26px",
      fontWeight: 500,
      lineHeight: 1.15,
      color: "#FFEEE4",
    }}
  >
    {children}
  </h3>
);

const NormalStyle = ({ children }: { children: React.ReactNode }) => (
  <p
    style={{
      fontSize: "15px",
      lineHeight: 1.75,
      color: "#6b7280",
    }}
  >
    {children}
  </p>
);

// Deliberately minimal — no embedded block-object types (unlike
// `portableTextBlock`, whose parent `gridColumn.tsx` also embeds
// `stickyScrollBlock` itself). Reusing that shared editor here would make
// this field able to insert another Sticky Scroll block inside a Sticky
// Scroll step, which is both nonsensical and a real circular schema
// reference. This editor only ever produces plain paragraph/heading text.
export const stickyScrollPortableTextBlock = defineArrayMember({
  type: "block",
  styles: [
    { title: "Normal", value: "normal", component: NormalStyle },
    { title: "Step Title", value: "stepTitle", component: StepTitleStyle },
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
