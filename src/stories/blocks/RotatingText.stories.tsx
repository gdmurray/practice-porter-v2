import type { Meta, StoryObj } from "@storybook/react";
import type { PortableTextBlock } from "@portabletext/react";
import { GridPortableText } from "@/components/modules/GridPortableText";

// `rotatingText` is a mark ANNOTATION (like `link`), not a standalone block
// component — it only renders meaningfully wrapped around text inside a
// GridPortableText tree, so these stories exercise it through GridPortableText
// rather than in isolation.
const meta: Meta<typeof GridPortableText> = {
  title: "Rich Text Blocks / RotatingTextGroup",
  component: GridPortableText,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "48px 32px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof GridPortableText>;

function span(text: string, marks: string[] = []) {
  return { _type: "span" as const, _key: Math.random().toString(36).slice(2), text, marks };
}

function rotatingTextMarkDef(key: string, words: string[]) {
  return { _key: key, _type: "rotatingText", words };
}

export const AboutHeroHeadline: Story = {
  name: "About Hero Headline — Italic + Rotating (reference match)",
  decorators: [
    (Story) => (
      <div
        data-theme="red"
        style={{ background: "var(--hero-gradient)", padding: "64px 32px", textAlign: "center" }}
      >
        <Story />
      </div>
    ),
  ],
  args: {
    value: [
      {
        _type: "block",
        _key: "hero1",
        style: "h1",
        markDefs: [rotatingTextMarkDef("rotw1", ["Calls.", "Bookings.", "Revenue.", "Growth."])],
        children: [
          span("Your Dental Practice's Partner in New Patient "),
          span("Calls.", ["em", "rotw1"]),
        ],
      },
    ] as unknown as PortableTextBlock[],
    centered: true,
  },
};

export const WithoutItalic: Story = {
  name: "Without Italic — proves the annotation carries no typography of its own",
  args: {
    value: [
      {
        _type: "block",
        _key: "hero2",
        style: "h2",
        markDefs: [rotatingTextMarkDef("rotw2", ["Faster.", "Smarter.", "Simpler."])],
        children: [span("Book More Patients, "), span("Faster.", ["rotw2"])],
      },
    ] as unknown as PortableTextBlock[],
    centered: true,
  },
};

export const WithHighlightColor: Story = {
  name: "With Highlight Color mark stacked on top",
  args: {
    value: [
      {
        _type: "block",
        _key: "hero3",
        style: "h2",
        markDefs: [rotatingTextMarkDef("rotw3", ["Calls.", "Bookings.", "Revenue."])],
        children: [span("Track Every "), span("Calls.", ["highlight", "rotw3"])],
      },
    ] as unknown as PortableTextBlock[],
    centered: true,
  },
};

export const TwoWordEdgeCase: Story = {
  name: "2 Words — minimum valid count",
  args: {
    value: [
      {
        _type: "block",
        _key: "hero4",
        style: "h3",
        markDefs: [rotatingTextMarkDef("rotw4", ["Up.", "Down."])],
        children: [span("Numbers Only Go "), span("Up.", ["em", "rotw4"])],
      },
    ] as unknown as PortableTextBlock[],
    centered: false,
  },
};
