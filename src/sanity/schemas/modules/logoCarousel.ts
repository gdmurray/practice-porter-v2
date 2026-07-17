import { defineField, defineType } from "sanity";
import { ImagesIcon } from "@sanity/icons";
import { themeField } from "../objects/theme";
import { moduleLayoutField } from "../objects/moduleLayout";

export const logoCarousel = defineType({
  name: "logoCarousel",
  title: "Logo Carousel",
  type: "object",
  icon: ImagesIcon,
  fields: [
    themeField("white"),
    moduleLayoutField(),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: "Small uppercase heading above the carousel (e.g. \"Integrated with the systems your practice runs on\")",
    }),
    defineField({
      name: "logos",
      title: "Logos",
      type: "array",
      of: [{ type: "logoCarouselItem" }],
      validation: (Rule) => Rule.required().min(2),
      description: "Logos scroll in an infinite loop; add enough logos to avoid an obvious repeat",
    }),
    defineField({
      name: "speed",
      title: "Scroll Speed (seconds per loop)",
      type: "number",
      description: "Time for one full loop. Lower is faster. Leave blank for the default (66s).",
      initialValue: 66,
      validation: (Rule) => Rule.min(10).max(200),
    }),
  ],
  preview: {
    select: { label: "label", logos: "logos" },
    prepare: ({ label, logos }) => ({
      title: label || "Logo Carousel",
      subtitle: `${logos?.length ?? 0} logo${logos?.length === 1 ? "" : "s"}`,
      media: ImagesIcon,
    }),
  },
});
