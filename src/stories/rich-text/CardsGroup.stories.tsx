import type { Meta, StoryObj } from "@storybook/react";
import type { PortableTextBlock } from "@portabletext/react";
import { CardsGroup } from "@/components/modules/GridPortableText/CardsGroup";

const meta: Meta<typeof CardsGroup> = {
  title: "Rich Text / CardsGroup",
  component: CardsGroup,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CardsGroup>;

// ─── Block helpers ─────────────────────────────────────────────────────────────

function span(text: string, marks: string[] = []) {
  return { _type: "span" as const, _key: Math.random().toString(36).slice(2), text, marks };
}

function block(style: string, text: string) {
  return {
    _type: "block",
    _key: Math.random().toString(36).slice(2),
    style,
    children: [span(text)],
    markDefs: [],
  };
}

function iconBlock(icon: string, iconColor: "ink" | "terra" | "red" = "terra", iconShape: "circle" | "square" = "circle") {
  return { _type: "cardIcon", _key: Math.random().toString(36).slice(2), icon, iconColor, iconShape };
}

function divider(style: "line" | "spacer" = "line") {
  return { _type: "columnDivider", _key: Math.random().toString(36).slice(2), style };
}

function statRow(stats: { value: string; suffix?: string; suffixColor?: string; label: string }[]) {
  return {
    _type: "statRow",
    _key: Math.random().toString(36).slice(2),
    stats: stats.map((s) => ({ ...s, _key: Math.random().toString(36).slice(2) })),
  };
}

// ─── Sample card content sets ─────────────────────────────────────────────────

const reportCards = [
  {
    _key: "c1",
    content: [
      iconBlock("activity", "ink", "square"),
      block("cardTitle", "Practice Performance"),
      block("normal", "See how well your practice is converting marketing spend into booked appointments. Tracks your cost per lead, cost per appointment, and total new patient volume against industry averages."),
      divider("line"),
      statRow([
        { value: "$142", label: "Cost per appt" },
        { value: "$334", suffix: "*", suffixColor: "terra", label: "Industry avg" },
      ]),
    ] as unknown as PortableTextBlock[],
  },
  {
    _key: "c2",
    content: [
      iconBlock("users", "terra", "square"),
      block("cardTitle", "New Patients Results"),
      block("normal", "Detailed breakdown of every new patient call and form submission. Staff-level performance tracking shows who booked, who missed, and why each lost patient wasn't converted."),
      divider("line"),
      statRow([
        { value: "94", suffix: "%", suffixColor: "red", label: "Booking rate" },
        { value: "53", suffix: "%*", suffixColor: "terra", label: "Industry avg" },
      ]),
    ] as unknown as PortableTextBlock[],
  },
  {
    _key: "c3",
    content: [
      iconBlock("phone-off", "red", "square"),
      block("cardTitle", "Missed Calls Breakdown"),
      block("normal", "See exactly when calls are being missed, broken down by day of the week and hour of the day. Identify the patterns so you can staff accordingly and stop the leaks."),
      divider("line"),
      block("cardTitle", "By Hour"),
      block("cardCaption", "+ Day of week"),
    ] as unknown as PortableTextBlock[],
  },
];

// ─── Stories ──────────────────────────────────────────────────────────────────

export const ThreeColumnReportCards: Story = {
  name: "3 Column — Report Cards (lotion, bordered)",
  args: {
    value: {
      columns: 3,
      cardTheme: {
        cardBg: "lotion",
        bordered: true,
        layout: "left",
        padding: "default",
        hoverEffect: false,
      },
      items: reportCards,
    },
  },
};

export const TwoColumnWhite: Story = {
  name: "2 Column — White with hover",
  args: {
    value: {
      columns: 2,
      cardTheme: {
        cardBg: "white",
        bordered: true,
        layout: "left",
        padding: "spacious",
        hoverEffect: true,
      },
      items: [
        {
          _key: "c1",
          content: [
            iconBlock("bar-chart", "terra", "circle"),
            block("cardTitle", "Booking Rate"),
            block("cardLead", "Track how many inbound calls convert to booked appointments, broken down by staff member and call type."),
            divider(),
            statRow([{ value: "94", suffix: "%", suffixColor: "red", label: "Your practice" }]),
          ] as unknown as PortableTextBlock[],
        },
        {
          _key: "c2",
          content: [
            iconBlock("trending-up", "red", "circle"),
            block("cardTitle", "Revenue Impact"),
            block("cardLead", "Understand the dollar value of every missed opportunity and see how small improvements compound into significant revenue gains."),
            divider(),
            statRow([{ value: "$48k", label: "Avg annual recovery" }]),
          ] as unknown as PortableTextBlock[],
        },
      ],
    },
  },
};

export const FourColumnCompact: Story = {
  name: "4 Column — Compact with centered layout",
  args: {
    value: {
      columns: 4,
      cardTheme: {
        cardBg: "lotion",
        bordered: false,
        layout: "center",
        padding: "compact",
        hoverEffect: false,
      },
      items: [
        {
          _key: "c1",
          content: [
            iconBlock("phone", "terra", "circle"),
            block("cardTitle", "Calls Tracked"),
            block("metricValue", "12,400"),
            block("metricLabel", "per month"),
          ] as unknown as PortableTextBlock[],
        },
        {
          _key: "c2",
          content: [
            iconBlock("check-circle", "ink", "circle"),
            block("cardTitle", "Booked"),
            block("metricValue", "94%"),
            block("metricLabel", "booking rate"),
          ] as unknown as PortableTextBlock[],
        },
        {
          _key: "c3",
          content: [
            iconBlock("calendar", "red", "circle"),
            block("cardTitle", "Kept"),
            block("metricValue", "87%"),
            block("metricLabel", "show rate"),
          ] as unknown as PortableTextBlock[],
        },
        {
          _key: "c4",
          content: [
            iconBlock("dollar-sign", "terra", "circle"),
            block("cardTitle", "Revenue"),
            block("metricValue", "$142"),
            block("metricLabel", "cost per appt"),
          ] as unknown as PortableTextBlock[],
        },
      ],
    },
  },
};

export const IconColorShowcase: Story = {
  name: "Icon Color Showcase (all colors)",
  args: {
    value: {
      columns: 3,
      cardTheme: {
        cardBg: "white",
        bordered: true,
        layout: "center",
        padding: "default",
        hoverEffect: false,
      },
      items: [
        {
          _key: "c1",
          content: [
            iconBlock("activity", "terra", "circle"),
            block("cardCaption", "terra / circle"),
          ] as unknown as PortableTextBlock[],
        },
        {
          _key: "c2",
          content: [
            iconBlock("activity", "ink", "square"),
            block("cardCaption", "ink / square"),
          ] as unknown as PortableTextBlock[],
        },
        {
          _key: "c3",
          content: [
            iconBlock("activity", "red", "circle"),
            block("cardCaption", "red / circle"),
          ] as unknown as PortableTextBlock[],
        },
      ],
    },
  },
};
