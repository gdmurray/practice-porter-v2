import type { Meta, StoryObj } from "@storybook/react";
import { StatBandGroup } from "@/components/modules/GridPortableText/StatBandGroup";

const meta: Meta<typeof StatBandGroup> = {
  title: "Rich Text Blocks / StatBandGroup",
  component: StatBandGroup,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div data-theme="red" style={{ background: "var(--section-bg)", padding: "64px 32px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof StatBandGroup>;

export const ThreeStats: Story = {
  name: "3 Stats — Red theme, count-up",
  args: {
    value: {
      countUp: true,
      stats: [
        { _key: "s1", value: "85", suffix: "%+", label: "Average new patient conversion rate" },
        { _key: "s2", value: "2", suffix: "x", label: "More new patients booked in each practice" },
        { _key: "s3", value: "280", suffix: "k+", label: "Increase in production per practice per year" },
      ],
    },
  },
};

export const SuffixColorOptions: Story = {
  name: "Suffix Color — accent / text / red / terra / ink",
  args: {
    value: {
      countUp: false,
      stats: [
        { _key: "c1", value: "85", suffix: "%+", suffixColor: "accent", label: "Theme Accent (default) — vanilla on red" },
        { _key: "c2", value: "94", suffix: "%", suffixColor: "text", label: "Match Value / White — same as value text" },
        { _key: "c3", value: "2", suffix: "x", suffixColor: "red", label: "Burnt Red (fixed)" },
        { _key: "c4", value: "280", suffix: "k+", suffixColor: "terra", label: "Terracotta (fixed)" },
      ],
    },
  },
};

export const SuffixColorOptionsOnLightTheme: Story = {
  name: "Suffix Color — accent / text on Lotion theme",
  decorators: [
    (Story) => (
      <div data-theme="lotion" style={{ background: "var(--section-bg)", padding: "64px 32px" }}>
        <Story />
      </div>
    ),
  ],
  args: {
    value: {
      countUp: false,
      stats: [
        { _key: "l1", value: "85", suffix: "%+", suffixColor: "accent", label: "Theme Accent (default) — red on light" },
        { _key: "l2", value: "94", suffix: "%", suffixColor: "text", label: "Match Value / White — ink on light" },
        { _key: "l3", value: "2", suffix: "x", suffixColor: "ink", label: "Ink (fixed)" },
      ],
    },
  },
};

export const TwoStatsNoCountUp: Story = {
  name: "2 Stats — Count-up disabled",
  args: {
    value: {
      countUp: false,
      stats: [
        { _key: "s1", value: "94", suffix: "%", label: "Booking rate" },
        { _key: "s2", value: "$142", label: "Cost per appointment" },
      ],
    },
  },
};

export const OnGradientTheme: Story = {
  name: "4 Stats — Gradient theme",
  decorators: [
    (Story) => (
      <div data-theme="gradient" style={{ background: "var(--section-bg)", padding: "64px 32px" }}>
        <Story />
      </div>
    ),
  ],
  args: {
    value: {
      countUp: true,
      stats: [
        { _key: "s1", value: "12,400", label: "Calls tracked / month" },
        { _key: "s2", value: "94", suffix: "%", label: "Booking rate" },
        { _key: "s3", value: "18", suffix: "%", label: "Missed calls" },
        { _key: "s4", value: "4.2", suffix: "x", label: "Avg ROI" },
      ],
    },
  },
};
