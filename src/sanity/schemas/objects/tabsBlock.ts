import { defineField, defineType } from "sanity";
import { ThListIcon } from "@sanity/icons";

export const tabsBlock = defineType({
  name: "tabsBlock",
  title: "Tabs",
  type: "object",
  icon: ThListIcon,
  description:
    "Timer-driven tab bar. Each tab's panel is a Solution Card — the same reusable content type used for standalone solution cards elsewhere on the site.",
  fields: [
    defineField({
      name: "items",
      title: "Tabs",
      type: "array",
      of: [{ type: "tabItem" }],
      validation: (Rule) => Rule.required().min(2).max(6),
    }),
    defineField({
      name: "autoRotateSeconds",
      title: "Auto-Rotate Seconds",
      type: "number",
      initialValue: 20,
      description:
        "Seconds each tab is shown before auto-advancing to the next. Set to 0 to disable auto-rotation (tabs remain clickable).",
    }),
  ],
  preview: {
    select: { items: "items" },
    prepare: ({ items }) => ({
      title: "Tabs",
      subtitle: `${items?.length ?? 0} tabs`,
    }),
  },
});
