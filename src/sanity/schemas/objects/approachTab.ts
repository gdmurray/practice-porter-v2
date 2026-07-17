import { defineField, defineType } from "sanity";
import { ImageIcon } from "@sanity/icons";

export const approachTab = defineType({
  name: "approachTab",
  title: "Approach Step",
  type: "object",
  icon: ImageIcon,
  description:
    "One vertical step in the Approach Tabs list. The label also doubles as the illustration panel's eyebrow when this step is active.",
  fields: [
    defineField({
      name: "label",
      title: "Step Label",
      type: "string",
      description: "Shown as the step name and as the panel eyebrow, e.g. \"Record\".",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "link",
      title: "Deep Link",
      type: "cta",
      description: "Optional link shown under the body when this step is active, e.g. \"Practice Performance Report \u2192\".",
    }),
    defineField({
      name: "kicker",
      title: "Panel Kicker",
      type: "string",
      description: "Small label above the panel illustration, e.g. \"Insight on what's happening\".",
    }),
    defineField({
      name: "panelTitle",
      title: "Panel Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Panel Illustration",
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
      name: "cta",
      title: "Panel CTA",
      type: "cta",
      description: "e.g. \"See Solutions\"",
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "panelTitle", media: "image" },
  },
});
