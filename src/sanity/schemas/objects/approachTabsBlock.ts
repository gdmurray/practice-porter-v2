import { defineField, defineType } from "sanity";
import { OlistIcon } from "@sanity/icons";

export const approachTabsBlock = defineType({
  name: "approachTabsBlock",
  title: "Approach Tabs",
  type: "object",
  icon: OlistIcon,
  description:
    "Vertical numbered step list (with per-step progress + deep link) paired with an illustration panel that swaps as each step becomes active.",
  fields: [
    defineField({
      name: "items",
      title: "Steps",
      type: "array",
      of: [{ type: "approachTab" }],
      validation: (Rule) => Rule.required().min(2).max(4),
    }),
    defineField({
      name: "autoRotateSeconds",
      title: "Auto-Rotate Seconds",
      type: "number",
      initialValue: 12,
      description:
        "Seconds each step is shown before auto-advancing to the next. Set to 0 to disable auto-rotation (steps remain clickable).",
    }),
  ],
  preview: {
    select: { items: "items" },
    prepare: ({ items }) => ({
      title: "Approach Tabs",
      subtitle: `${items?.length ?? 0} steps`,
    }),
  },
});
