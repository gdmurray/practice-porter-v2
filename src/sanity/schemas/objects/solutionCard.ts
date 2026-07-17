import { defineField, defineType } from "sanity";
import { ImageIcon } from "@sanity/icons";

export const solutionCard = defineType({
  name: "solutionCard",
  title: "Solution Card",
  type: "object",
  icon: ImageIcon,
  description:
    "Image + copy card with always-shown detail lines and an optional 'See More' checklist disclosure. Insertable on its own, or reused as a tab panel inside a Tabs block.",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          description: "Describe the image for screen readers and SEO",
        }),
      ],
    }),
    defineField({
      name: "details",
      title: "Details",
      type: "array",
      of: [{ type: "string" }],
      description: "Short lines always shown below the title, separated by dividers.",
    }),
    defineField({
      name: "expandableTitle",
      title: "Expandable Section Title",
      type: "string",
      initialValue: "The Practice Porter Solution",
      description: "Eyebrow label shown above the checklist when expanded.",
    }),
    defineField({
      name: "checks",
      title: "Checks",
      type: "array",
      of: [{ type: "string" }],
      description:
        "Checkmark bullet list revealed by a 'See More' disclosure. Leave empty to hide the disclosure entirely.",
    }),
  ],
  preview: {
    select: { title: "title", media: "image", details: "details", checks: "checks" },
    prepare: ({ title, media, details, checks }) => ({
      title: title || "Solution Card",
      subtitle: `${details?.length ?? 0} details · ${checks?.length ?? 0} checks`,
      media,
    }),
  },
});
