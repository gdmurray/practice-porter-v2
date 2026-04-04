import { defineField, defineType } from "sanity";
import * as LucideIcons from "lucide-react";

const LUCIDE_ICONS = [
  "activity",
  "alert-circle",
  "bar-chart-3",
  "calendar",
  "check-circle",
  "clock",
  "dollar-sign",
  "globe",
  "message-circle",
  "monitor",
  "phone",
  "phone-off",
  "pie-chart",
  "shield",
  "shield-check",
  "star",
  "trending-down",
  "users",
];

function slugToIcon(slug: string): React.ComponentType {
  const pascal = slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
  return (LucideIcons as unknown as Record<string, React.ComponentType>)[pascal] ?? LucideIcons.Shield;
}

export const trustItem = defineType({
  name: "trustItem",
  title: "Trust Item",
  type: "object",
  fields: [
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: {
        list: LUCIDE_ICONS.map((i) => ({ value: i, title: i })),
      },
      initialValue: "shield",
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { icon: "icon", label: "label" },
    prepare: ({ icon, label }) => ({
      title: label ?? "Trust Item",
      media: slugToIcon(icon ?? "shield"),
    }),
  },
});
