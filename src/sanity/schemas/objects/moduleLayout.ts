import { defineField, defineType } from "sanity";

export const moduleLayout = defineType({
  name: "moduleLayout",
  title: "Module Layout",
  type: "object",
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    defineField({
      name: "topPadding",
      title: "Top Padding",
      type: "string",
      options: {
        list: [
          { value: "lrg", title: "Large (160px)" },
          { value: "med", title: "Medium (120px)" },
          { value: "sml", title: "Small (80px)" },
          { value: "xs", title: "X-Small (40px)" },
          { value: "xxs", title: "XX-Small (20px)" },
          { value: "none", title: "None (0px)" },
        ],
        layout: "radio",
      },
      description: "Override top padding. Leave blank to use the default (Large).",
    }),
    defineField({
      name: "bottomPadding",
      title: "Bottom Padding",
      type: "string",
      options: {
        list: [
          { value: "lrg", title: "Large (160px)" },
          { value: "med", title: "Medium (120px)" },
          { value: "sml", title: "Small (80px)" },
          { value: "xs", title: "X-Small (40px)" },
          { value: "xxs", title: "XX-Small (20px)" },
          { value: "none", title: "None (0px)" },
        ],
        layout: "radio",
      },
      description: "Override bottom padding. Leave blank to use the default (Large).",
    }),
    defineField({
      name: "animated",
      title: "Animate on Scroll",
      type: "boolean",
      initialValue: false,
      description: "Fade in + slide up when scrolled into view. Disable for above-the-fold sections.",
    }),
  ],
});

export const moduleLayoutField = () =>
  defineField({
    name: "moduleLayout",
    title: "Module Layout",
    type: "moduleLayout",
  });
