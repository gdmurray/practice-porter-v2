import { defineField, defineType } from "sanity";
import { themeField } from "../objects/theme";

export const results = defineType({
  name: "results",
  title: "Results Section",
  type: "object",
  fields: [
    themeField("white"),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      initialValue: "Proven Results",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "The Numbers Don't Lie",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "alignment",
      title: "Header Alignment",
      type: "string",
      options: {
        list: [
          { value: "center", title: "Center" },
          { value: "left", title: "Left" },
        ],
      },
      initialValue: "center",
    }),
    defineField({
      name: "layout",
      title: "Layout",
      type: "string",
      options: {
        list: [
          { value: "split", title: "Split (data left, testimonials right)" },
          { value: "stacked", title: "Stacked" },
        ],
      },
      initialValue: "split",
    }),
    defineField({
      name: "metrics",
      title: "Performance Metrics",
      type: "array",
      of: [{ type: "resultsMetric" }],
    }),
    defineField({
      name: "extraMetrics",
      title: "Extra Metrics (e.g. Missed Calls, ROI)",
      type: "array",
      of: [{ type: "resultsExtraMetric" }],
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [{ type: "testimonial" }],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Results Section" }),
  },
});
