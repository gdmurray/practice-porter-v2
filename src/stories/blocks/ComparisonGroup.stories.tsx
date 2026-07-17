import type { Meta, StoryObj } from "@storybook/react";
import { ComparisonGroup } from "@/components/modules/GridPortableText/ComparisonGroup";

const meta: Meta<typeof ComparisonGroup> = {
  title: "Rich Text Blocks / ComparisonGroup",
  component: ComparisonGroup,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div data-theme="red" style={{ background: "var(--section-bg)", padding: "48px 24px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ComparisonGroup>;

export const Default: Story = {
  name: "Default",
  args: {
    value: {
      leftCard: {
        label: "Industry Average",
        value: "2 / 5",
        caption: "new patient calls booked as appointments",
        filledCount: 2,
      },
      rightCard: {
        label: "Practice Porter Clients",
        overLabel: "OVER",
        value: "4 / 5",
        caption: "new patient calls booked as appointments",
        filledCount: 4,
      },
      banner: {
        headline: "That gap costs practices over",
        headlineEmphasis: "$280,000 every year.",
        subtext: "A free 30-minute consultation shows you exactly what it's costing your practice.",
        cta: { label: "Book Free Consultation", href: "#book", ctaType: "book_meeting" },
      },
    },
  },
};

export const WithoutBanner: Story = {
  name: "Without Banner",
  args: {
    value: {
      leftCard: {
        label: "Industry Average",
        value: "40%",
        caption: "of calls converted to booked appointments",
        filledCount: 2,
      },
      rightCard: {
        label: "Practice Porter Clients",
        value: "80%",
        caption: "of calls converted to booked appointments",
        filledCount: 4,
      },
    },
  },
};
