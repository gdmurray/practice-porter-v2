import { defineField, defineType } from "sanity";

export const navLink = defineType({
  name: "navLink",
  title: "Navigation Link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      initialValue: "link",
      options: {
        list: [
          { title: "Link", value: "link" },
          { title: "Menu (dropdown)", value: "menu" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "href",
      title: "URL",
      type: "string",
      hidden: ({ parent }) => parent?.type === "menu",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { type?: string } | undefined;
          if (parent?.type !== "menu" && !value) {
            return "URL is required for a link";
          }
          return true;
        }),
    }),
    defineField({
      name: "links",
      title: "Menu Links",
      type: "array",
      of: [{ type: "navSubLink" }],
      hidden: ({ parent }) => parent?.type !== "menu",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { type?: string } | undefined;
          if (parent?.type === "menu" && (!value || value.length === 0)) {
            return "Add at least one link for this menu";
          }
          return true;
        }),
    }),
  ],
  preview: {
    select: { label: "label", type: "type", links: "links" },
    prepare: ({ label, type, links }) => ({
      title: label,
      subtitle:
        type === "menu"
          ? `Menu · ${(links ?? []).length} link${(links ?? []).length === 1 ? "" : "s"}`
          : "Link",
    }),
  },
});
