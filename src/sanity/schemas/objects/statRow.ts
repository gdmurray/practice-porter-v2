import { defineField, defineType } from "sanity";
import { InlineIcon } from "@sanity/icons";

export const statRow = defineType({
  name: "statRow",
  title: "Stat Row",
  type: "object",
  icon: InlineIcon,
  fields: [
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [{ type: "inlineStat" }],
      validation: (Rule) => Rule.required().min(1).max(4),
      description: "1–4 stat items displayed side by side",
    }),
  ],
  preview: {
    select: { stats: "stats" },
    prepare: ({ stats }) => {
      const labels = stats
        ?.map((s: { value?: string; suffix?: string }) => `${s.value ?? ""}${s.suffix ?? ""}`)
        .join(" · ");
      return {
        title: "Stat Row",
        subtitle: labels ?? "",
        media: InlineIcon,
      };
    },
  },
});
