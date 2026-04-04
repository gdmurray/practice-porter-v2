import { defineField, defineType } from "sanity";
import * as LucideIcons from "lucide-react";

const ICONS = [
  "activity",
  "alert-circle",
  "bar-chart-3",
  "bell",
  "calendar",
  "check-circle",
  "clock",
  "dollar-sign",
  "globe",
  "heart",
  "mail",
  "message-circle",
  "monitor",
  "phone",
  "phone-off",
  "pie-chart",
  "shield",
  "shield-check",
  "star",
  "target",
  "trending-down",
  "trending-up",
  "users",
  "zap",
];

function slugToIcon(slug: string): React.ComponentType {
  const pascal = slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
  return (LucideIcons as unknown as Record<string, React.ComponentType>)[pascal] ?? LucideIcons.Shield;
}

export const iconFeature = defineType({
  name: "iconFeature",
  title: "Icon Feature",
  type: "object",
  fields: [
    defineField({
      name: "iconName",
      title: "Icon",
      type: "string",
      options: {
        list: ICONS.map((i) => ({ value: i, title: i })),
      },
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
  ],
  preview: {
    select: { iconName: "iconName", title: "title", description: "description" },
    prepare: ({ iconName, title, description }) => ({
      title: title ?? "Icon Feature",
      subtitle: description ?? "",
      media: slugToIcon(iconName ?? "shield"),
    }),
  },
});
