import { defineField, defineType } from "sanity";
import { ImageIcon } from "@sanity/icons";

export const logoCarouselItem = defineType({
  name: "logoCarouselItem",
  title: "Logo",
  type: "object",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "logo",
      title: "Logo Image",
      type: "image",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "Used for alt text (e.g. \"Delta Dental\")",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { name: "name", media: "logo" },
    prepare: ({ name, media }) => ({ title: name || "Logo", media }),
  },
});
