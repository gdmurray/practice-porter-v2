import { defineField, defineType } from "sanity";
import { themeField } from "../objects/theme";
import { moduleLayoutField } from "../objects/moduleLayout";
import { getGridIcon } from "../../lib/gridIconRenderer";

export const gridSection = defineType({
  name: "gridSection",
  title: "Grid Section",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Section Name",
      type: "string",
      description: "Display label in Studio (e.g. 'Problem Section')",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sectionId",
      title: "Section ID",
      type: "string",
      description: "HTML anchor id for navigation (e.g. 'problem')",
    }),
    themeField("lotion"),
    moduleLayoutField(),
    defineField({
      name: "maxWidth",
      title: "Max Content Width",
      type: "number",
      description:
        "Optional max width for this section's content, in pixels. Content is horizontally centered when the container is wider. Leave blank to use the default container width.",
      validation: (Rule) => Rule.min(200).integer(),
    }),
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      description: "Optional full-bleed image behind the section content (e.g. hero photo)",
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
      name: "gradientDirection",
      title: "Gradient Overlay Direction",
      type: "string",
      description:
        "Overlays the section theme's gradient on top of the background image, fading from solid color to transparent. Requires a background image.",
      options: {
        list: [
          { value: "none", title: "None (no overlay)" },
          { value: "left", title: "Left → Right (color on left, fades out to the right)" },
          { value: "right", title: "Right → Left (color on right, fades out to the left)" },
        ],
        layout: "radio",
      },
      initialValue: "none",
    }),
    defineField({
      name: "isHero",
      title: "Hero",
      type: "boolean",
      description:
        "Caps the section at 80vh, like a hero banner. Background image is anchored to the top (so overflow is cropped from the bottom) and horizontally anchored to the side opposite the gradient overlay direction (so a narrow image sticks to the visible, non-faded side).",
      initialValue: false,
    }),
    defineField({
      name: "circlePattern",
      title: "Circle Pattern",
      type: "boolean",
      description:
        "Decorative brand circle behind section content. Best on light themes; muted on red; hidden on gradient or when a background image is set. Max one per section.",
      initialValue: false,
    }),
    defineField({
      name: "circlePosition",
      title: "Circle Position",
      type: "string",
      description:
        "Corner placement for the decorative circle. Alternate corners across adjacent sections for visual rhythm.",
      options: {
        list: [
          { value: "topRight", title: "Top right" },
          { value: "topLeft", title: "Top left" },
          { value: "bottomRight", title: "Bottom right" },
          { value: "bottomLeft", title: "Bottom left" },
        ],
        layout: "radio",
      },
      initialValue: "topRight",
      hidden: ({ parent }) => !parent?.circlePattern,
    }),
    defineField({
      name: "rows",
      title: "Rows",
      type: "array",
      of: [{ type: "gridRow" }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { name: "name", rows: "rows" },
    prepare: ({ name, rows }) => ({
      title: name || "Grid Section",
      subtitle: `${rows?.length ?? 0} row${rows?.length === 1 ? "" : "s"}`,
      media: getGridIcon(rows ?? []),
    }),
  },
});
