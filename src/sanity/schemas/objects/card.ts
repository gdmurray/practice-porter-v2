import { defineField, defineType } from "sanity";
import { DocumentIcon } from "@sanity/icons";
import { cardsPortableTextBlock } from "./cardsPortableTextEditor";

export const card = defineType({
  name: "card",
  title: "Card",
  type: "object",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        cardsPortableTextBlock,
        { type: "cardIcon" },
        { type: "columnDivider" },
        { type: "statRow" },
      ],
    }),
  ],
  preview: {
    select: { content: "content" },
    prepare: ({ content }) => {
      const firstBlock = content?.find(
        (b: { _type: string; children?: { text: string }[] }) =>
          b._type === "block" && b.children?.[0]?.text
      );
      const text = firstBlock?.children
        ?.map((c: { text: string }) => c.text)
        .join("");
      return { title: text || "Card", media: DocumentIcon };
    },
  },
});
