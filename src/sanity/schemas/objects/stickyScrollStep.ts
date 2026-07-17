import { defineField, defineType } from "sanity";
import { ImageIcon } from "@sanity/icons";
import { stickyScrollPortableTextBlock } from "./stickyScrollPortableTextEditor";

export const stickyScrollStep = defineType({
  name: "stickyScrollStep",
  title: "Sticky Scroll Step",
  type: "object",
  icon: ImageIcon,
  fields: [
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [stickyScrollPortableTextBlock],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { content: "content", media: "image" },
    prepare: ({ content, media }) => {
      const firstBlock = content?.find(
        (b: { _type: string; children?: { text: string }[] }) =>
          b._type === "block" && b.children?.[0]?.text
      );
      const text = firstBlock?.children
        ?.map((c: { text: string }) => c.text)
        .join("");
      return { title: text || "Sticky Scroll Step", media };
    },
  },
});
