import { defineField, defineType } from "sanity";

export const cta = defineType({
  name: "cta",
  title: "Call to Action",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "href",
      title: "URL",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ctaType",
      title: "CTA Type",
      type: "string",
      options: {
        list: [
          { title: "Internal Link (url or anchor)", value: "internal"},
          { title: "External Link", value: "external"},
          { title: "Calendly Popup", value: "calendly"},
        ],
        layout: "radio"
      },
      initialValue: "internal",
    })
  ],
  preview: {
    select: { label: "label" },
    prepare: ({ label }) => ({ title: label }),
  },
});
