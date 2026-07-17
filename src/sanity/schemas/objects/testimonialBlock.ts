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
    defineField({
      name: "variant",
      title: "Layout",
      type: "string",
      options: {
        list: [
          { value: "grid", title: "Grid (all quotes shown)" },
          { value: "carousel", title: "Carousel (one at a time, with auto-advance)" },
        ],
        layout: "radio",
      },
      initialValue: "grid",
    }),
    defineField({
      name: "autoRotateSeconds",
      title: "Auto-Rotate Seconds",
      type: "number",
      initialValue: 15,
      description: "Seconds each quote is shown before auto-advancing. Set to 0 to disable auto-rotation. Only applies to the Carousel layout.",
      hidden: ({ parent }) => parent?.variant !== "carousel",
    }),
  ],
  preview: {
    select: { items: "items", variant: "variant" },
    prepare: ({ items, variant }) => ({
      title: "Testimonials",
      subtitle: `${items?.length ?? 0} quotes · ${variant === "carousel" ? "carousel" : "grid"}`,
    }),
  },
});
