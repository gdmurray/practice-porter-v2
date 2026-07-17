import { defineField, defineType } from "sanity";
import { UserIcon } from "@sanity/icons";

export const avatarBlock = defineType({
  name: "avatarBlock",
  title: "Avatar",
  type: "object",
  icon: UserIcon,
  description:
    "A named person credit — circular photo or initials, name, and role. Used for founder/team attribution inside rich text (e.g. the Split Booking left panel).",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      description: "e.g. 'CEO & Founder, Practice Porter'",
    }),
    defineField({
      name: "initials",
      title: "Initials",
      type: "string",
      description: "Fallback shown when no photo is set, e.g. 'S' for Shaan.",
    }),
    defineField({
      name: "image",
      title: "Photo",
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
      description: "Optional. Leave blank to show the initials instead.",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "image" },
    prepare: ({ title, subtitle, media }) => ({
      title: title || "Avatar",
      subtitle,
      media,
    }),
  },
});
