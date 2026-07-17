import { defineField, defineType } from "sanity";

export const rotatingText = defineType({
  name: "rotatingText",
  title: "Rotating Text",
  type: "object",
  fields: [
    defineField({
      name: "words",
      title: "Words",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(2),
      description:
        "Words/phrases to cycle through. Include punctuation if needed (e.g. \"Calls.\"). The annotated text in the editor is just a placeholder — the rendered page cycles through this list instead.",
    }),
  ],
  preview: {
    select: { words: "words" },
    prepare({ words }: { words?: string[] }) {
      return {
        title: words?.filter(Boolean).join(" · ") || "Rotating Text",
      };
    },
  },
});
