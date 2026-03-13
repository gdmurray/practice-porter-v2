import { defineField, defineType } from "sanity";

export const socialLink = defineType({
  name: "socialLink",
  title: "Social Link",
  type: "object",
  fields: [
    defineField({
      name: "platform",
      title: "Platform",
      type: "string",
      options: {
        list: [
          { value: "linkedin", title: "LinkedIn" },
          { value: "twitter", title: "Twitter/X" },
          { value: "facebook", title: "Facebook" },
          { value: "instagram", title: "Instagram" },
          { value: "youtube", title: "YouTube" },
          { value: "email", title: "Email" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { platform: "platform" },
    prepare: ({ platform }) => ({ title: platform ? platform.charAt(0).toUpperCase() + platform.slice(1) : "Social" }),
  },
});
