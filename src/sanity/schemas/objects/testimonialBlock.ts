import { defineField, defineType } from "sanity";
import { CommentIcon } from "@sanity/icons";

export const testimonialBlock = defineType({
  name: "testimonialBlock",
  title: "Testimonials",
  type: "object",
  icon: CommentIcon,
  fields: [
    defineField({
      name: "items",
      title: "Testimonials",
      type: "array",
      of: [{ type: "testimonial" }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { items: "items" },
    prepare: ({ items }) => ({
      title: "Testimonials",
      subtitle: `${items?.length ?? 0} quotes`,
    }),
  },
});
