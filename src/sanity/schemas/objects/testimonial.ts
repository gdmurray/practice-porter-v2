import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "object",
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author Name",
      type: "string",
      description: "e.g. 'Dr. K.'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role / Location",
      type: "string",
      description: "e.g. 'General Dentistry, Nova Scotia'",
    }),
    defineField({
      name: "avatar",
      title: "Avatar Initials",
      type: "string",
      description: "e.g. 'DK' for Dr. K.",
    }),
  ],
});
