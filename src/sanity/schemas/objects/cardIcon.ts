import { defineField, defineType } from "sanity";
import { ImageIcon } from "@sanity/icons";
import { IconPickerInput } from "@/sanity/components/IconPickerInput";
import { IconColorInput } from "@/sanity/components/IconColorInput";

export const cardIcon = defineType({
  name: "cardIcon",
  title: "Icon",
  type: "object",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      components: { input: IconPickerInput },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "iconColor",
      title: "Icon Color",
      type: "string",
      components: { input: IconColorInput },
      initialValue: "teal",
    }),
    defineField({
      name: "iconShape",
      title: "Icon Shape",
      type: "string",
      options: {
        list: [
          { value: "square", title: "Square (rounded)" },
          { value: "circle", title: "Circle" },
        ],
        layout: "radio",
      },
      initialValue: "circle",
    }),
  ],
  preview: {
    select: { icon: "icon", iconColor: "iconColor", iconShape: "iconShape" },
    prepare: ({ icon, iconColor, iconShape }) => ({
      title: icon ?? "Icon",
      subtitle: [iconColor, iconShape].filter(Boolean).join(" · "),
      media: ImageIcon,
    }),
  },
});
