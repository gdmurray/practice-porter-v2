import { defineField, defineType } from "sanity";
import { EnvelopeIcon } from "@sanity/icons";

export const contactFormBlock = defineType({
  name: "contactFormBlock",
  title: "Contact Form",
  type: "object",
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: "formTitle",
      title: "Form Title",
      type: "string",
      initialValue: "Send Us a Message",
    }),
    defineField({
      name: "formSubtitle",
      title: "Form Subtitle",
      type: "text",
      rows: 2,
      initialValue:
        "Fill out the form below and one of our consultants will be in touch shortly.",
    }),
    defineField({
      name: "interestOptions",
      title: "Interest Options",
      type: "array",
      of: [
        {
          type: "object",
          name: "contactInterestOption",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "value",
              title: "Value",
              type: "string",
              description: "Stable machine value submitted with the form",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "value" },
          },
        },
      ],
    }),
    defineField({
      name: "privacyPolicyHref",
      title: "Privacy Policy URL",
      type: "string",
      initialValue: "/privacy-policy",
    }),
    defineField({
      name: "successTitle",
      title: "Success Title",
      type: "string",
      initialValue: "Message Sent!",
    }),
    defineField({
      name: "successMessage",
      title: "Success Message",
      type: "text",
      rows: 3,
      initialValue:
        "Thanks for reaching out. One of our consultants will be in touch within 1 business day.",
    }),
  ],
  preview: {
    select: { formTitle: "formTitle" },
    prepare: ({ formTitle }) => ({
      title: "Contact Form",
      subtitle: formTitle ?? "Send Us a Message",
    }),
  },
});
