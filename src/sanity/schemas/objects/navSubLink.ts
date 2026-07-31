import { defineField, defineType } from "sanity";
import { IconPickerInput } from "@/sanity/components/IconPickerInput";
import { InternalLinkInput } from "@/sanity/components/InternalLinkInput";
import { validatePageHrefExists } from "@/sanity/lib/internalHref";

export const navSubLink = defineType({
  name: "navSubLink",
  title: "Nav Sub Link",
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
      components: { input: InternalLinkInput },
      description:
        "Pick a page from the dropdown, or type an external URL (https://…) or in-page anchor (#section-id).",
      validation: (Rule) =>
        Rule.required().custom(async (value, context) => {
          if (!value) return true;
          return validatePageHrefExists(value, context.getClient.bind(context));
        }),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      components: { input: IconPickerInput },
    }),
  ],
  preview: {
    select: { label: "label", icon: "icon" },
    prepare: ({ label, icon }) => ({ title: label, subtitle: icon }),
  },
});
