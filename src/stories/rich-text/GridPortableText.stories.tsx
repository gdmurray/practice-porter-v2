import type { Meta, StoryObj } from "@storybook/react";
import type { PortableTextBlock } from "@portabletext/react";
import { GridPortableText } from "@/components/modules/GridPortableText";

const meta: Meta<typeof GridPortableText> = {
  title: "Rich Text / GridPortableText",
  component: GridPortableText,
  tags: ["autodocs"],
  argTypes: {
    centered: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof GridPortableText>;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function span(text: string, marks: string[] = []) {
  return { _type: "span" as const, _key: Math.random().toString(36).slice(2), text, marks };
}

function block(
  style: string,
  text: string,
  marks: string[] = [],
  markDefs: unknown[] = [],
  key?: string
) {
  return {
    _type: "block",
    _key: key ?? Math.random().toString(36).slice(2),
    style,
    children: [span(text, marks)],
    markDefs,
  };
}

// ─── Stories ──────────────────────────────────────────────────────────────────

const allStyleBlocks = [
  block("eyebrow", "Practice Intelligence"),
  block("h1", "Track Every Call, Convert More Patients"),
  block("h2", "Complete Visibility Into Your Front Desk"),
  block("h3", "Real-time reporting that drives action"),
  block("subtitle", "Practice Porter gives dental practices a clear view of what's happening at every touchpoint — so you can fix leaks before they become lost revenue."),
  block("normal", "Every missed call, every unconverted lead, and every cancellation is tracked automatically. No manual entry, no guesswork — just clean data your team can act on."),
  block("lead", "See your booking rate, cost per appointment, and new patient volume compared against industry benchmarks."),
  {
    _type: "block",
    _key: "marks-demo",
    style: "normal",
    markDefs: [{ _key: "lnk1", _type: "link", href: "https://practiceporter.com" }],
    children: [
      span("We support "),
      span("highlighted red text", ["highlight"]),
      span(", "),
      span("terracotta highlights", ["highlightTerra"]),
      span(", "),
      span("serif emphasis", ["serifText"]),
      span(", and "),
      span("external links", ["lnk1"]),
      span("."),
    ],
  },
  block("stat-eyebrow", "Our client practices see on average"),
] as unknown as PortableTextBlock[];

export const AllTextStyles: Story = {
  args: {
    value: allStyleBlocks,
    centered: false,
  },
};

export const Centered: Story = {
  args: {
    value: [
      block("eyebrow", "Why Practice Porter"),
      block("h2", "Built for Dental Practices That Want to Grow"),
      block("subtitle", "We combine call tracking, booking analytics, and patient journey data into one simple dashboard. No spreadsheets. No guesswork."),
      block("normal", "Our team has analyzed over 2 million dental phone calls to build benchmarks you can actually use."),
    ] as unknown as PortableTextBlock[],
    centered: true,
  },
};

export const WithEmbeddedBlocks: Story = {
  name: "With Embedded Blocks (Stat Cards + CTA)",
  args: {
    value: [
      block("eyebrow", "The Numbers"),
      block("h2", "Industry Benchmarks You Can Beat"),
      block("subtitle", "Most practices are leaving revenue on the table. Here's how you compare."),
      {
        _type: "statCardsBlock",
        _key: "stats1",
        theme: "white",
        columns: 3,
        items: [
          { _key: "s1", icon: "phone", value: "94%", label: "Average booking rate", valueColor: "terra" },
          { _key: "s2", icon: "dollar-sign", value: "$142", label: "Cost per appointment", valueColor: "ink" },
          { _key: "s3", icon: "trending-up", value: "2.4×", label: "ROI vs industry avg", valueColor: "red" },
        ],
      },
      {
        _type: "ctaBlock",
        _key: "cta1",
        items: [
          { label: "Book a Demo", href: "#cta", variant: "primary" },
          { label: "View Sample Report", href: "#report", variant: "secondary" },
        ],
      },
    ] as unknown as PortableTextBlock[],
    centered: false,
  },
};

export const WithStatBand: Story = {
  name: "With Embedded Stat Band (themed section)",
  decorators: [
    (Story) => (
      <div data-theme="red" style={{ background: "var(--section-bg)", padding: "64px 32px" }}>
        <Story />
      </div>
    ),
  ],
  args: {
    value: [
      block("stat-eyebrow", "Our client practices see on average"),
      {
        _type: "statBandBlock",
        _key: "band1",
        countUp: true,
        stats: [
          { _key: "b1", value: "85", suffix: "%+", suffixColor: "text", label: "Average new patient conversion rate" },
          { _key: "b2", value: "2", suffix: "x", suffixColor: "accent", label: "More new patients booked in each practice" },
          { _key: "b3", value: "280", suffix: "k+", suffixColor: "accent", label: "Increase in production per practice per year" },
        ],
      },
    ] as unknown as PortableTextBlock[],
    centered: true,
  },
};

export const WithRotatingText: Story = {
  name: "With Rotating Text mark (About hero headline)",
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
        _key: "rotw-demo",
        style: "h1",
        markDefs: [
          {
            _key: "rotw1",
            _type: "rotatingText",
            words: ["Calls.", "Bookings.", "Revenue.", "Growth."],
          },
        ],
        children: [
          span("Your Dental Practice's Partner in New Patient "),
          span("Calls.", ["em", "rotw1"]),
        ],
      },
    ] as unknown as PortableTextBlock[],
    centered: true,
  },
};

export const HeadingsOnly: Story = {
  args: {
    value: [
      block("h1", "H1 — Page Title Level"),
      block("h2", "H2 — Section Title Level"),
      block("h3", "H3 — Subsection Title Level"),
      block("eyebrow", "Eyebrow Label"),
      block("subtitle", "This is the subtitle style — used below headings to add context without being a full body paragraph."),
      block("normal", "This is normal body text. It uses the base font size with comfortable line height for readability."),
      block("lead", "This is the lead style — smaller supporting copy, used for lead-in paragraphs inside tabbed/stepped content."),
    ] as unknown as PortableTextBlock[],
    centered: false,
  },
};
