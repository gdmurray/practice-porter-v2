import { defineField, defineType } from "sanity";
import { IconPickerInput } from "@/sanity/components/IconPickerInput";
import { getIcon } from "@/lib/icons";

export const featureCard = defineType({
  name: "featureCard",
  title: "Feature Card",
  type: "object",
  fields: [
    defineField({
      name: "type",
      title: "Card Type",
      type: "string",
      options: {
        list: [
          { title: "Default (static)", value: "default" },
          { title: "Link (clickable, reveals description on hover)", value: "link" },
        ],
        layout: "radio",
      },
      initialValue: "default",
    }),
    defineField({
      name: "iconLocation",
      title: "Icon Location",
      type: "string",
      options: {
        list: [
          { title: "Left", value: "left" },
          { title: "Top", value: "top" },
        ],
        layout: "radio",
      },
      initialValue: "left",
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      components: { input: IconPickerInput },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cta",
      title: "Link",
      type: "cta",
      description:
        'Where the card links to. Only used when Card Type is "Link" — the card\'s title is shown as the visible link text, so the CTA\'s own Label field is optional here.',
      hidden: ({ parent }) => (parent as { type?: string } | undefined)?.type !== "link",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const type = (context.parent as { type?: string } | undefined)?.type;
          if (type === "link" && !value) {
            return 'A link is required when Card Type is "Link".';
          }
          return true;
        }),
    }),
  ],
  preview: {
    select: {
      title: "title",
      description: "description",
      type: "type",
      iconLocation: "iconLocation",
      icon: "icon",
    },
    prepare: ({ title, description, type, iconLocation, icon }) => ({
      title,
      subtitle: `${type ?? "default"} · icon: ${iconLocation ?? "left"} · ${description ?? ""}`,
      media: getIcon(icon),
    }),
  },
});
