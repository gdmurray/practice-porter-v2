import { defineField, defineType } from "sanity";
import { BarChartIcon } from "@sanity/icons";

export const statBandBlock = defineType({
  name: "statBandBlock",
  title: "Stat Band",
  type: "object",
  icon: BarChartIcon,
  description:
    "Large, borderless stat display for full-bleed themed bands (e.g. a red/gradient section) — distinct from Stat Cards, which render each stat inside its own card.",
  fields: [
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [{ type: "statBandItem" }],
      validation: (Rule) => Rule.required().min(1).max(4),
      description: "1–4 stats displayed side by side with dividers between them",
    }),
    defineField({
      name: "countUp",
      title: "Animate Count-Up",
      type: "boolean",
      initialValue: true,
      description: "Count up from 0 to the final value when scrolled into view",
    }),
  ],
  preview: {
    select: { stats: "stats" },
    prepare: ({ stats }) => {
      const labels = stats
        ?.map((s: { value?: string; suffix?: string }) => `${s.value ?? ""}${s.suffix ?? ""}`)
        .join(" · ");
      return {
        title: "Stat Band",
        subtitle: labels ?? "",
        media: BarChartIcon,
      };
    },
  },
});
