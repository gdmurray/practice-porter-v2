import { defineField, defineType } from "sanity";
import { themeField } from "../objects/theme";

export const scorecard = defineType({
  name: "scorecard",
  title: "Scorecard Section",
  type: "object",
  fields: [
    themeField("cream"),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      initialValue: "Performance Scorecard",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "See What You've Been Missing",
    }),
    defineField({
      name: "titleHighlight",
      title: "Title Highlight",
      type: "string",
      initialValue: "Missing",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "previewTitle",
      title: "Preview Card Title",
      type: "string",
      initialValue: "Practice Performance Scorecard",
    }),
    defineField({
      name: "previewBadge",
      title: "Preview Badge",
      type: "string",
      initialValue: "Live Data",
    }),
    defineField({
      name: "previewMetrics",
      title: "Preview Metrics",
      type: "array",
      of: [{ type: "scorecardMetric" }],
    }),
    defineField({
      name: "imagePosition",
      title: "Preview Position",
      type: "string",
      options: {
        list: [
          { value: "left", title: "Left" },
          { value: "right", title: "Right" },
        ],
      },
      initialValue: "left",
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "scorecardFeature" }],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Scorecard Section" }),
  },
});
