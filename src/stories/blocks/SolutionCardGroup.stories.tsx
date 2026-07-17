import type { Meta, StoryObj } from "@storybook/react";
import { SolutionCardGroup } from "@/components/modules/GridPortableText/SolutionCardGroup";

const meta: Meta<typeof SolutionCardGroup> = {
  title: "Rich Text Blocks / SolutionCardGroup",
  component: SolutionCardGroup,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "32px 16px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SolutionCardGroup>;

const heroImage = {
  asset: {
    url: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=900&h=700&fit=crop",
    metadata: { dimensions: { width: 900, height: 700 } },
  },
  alt: "Smiling front desk staff member taking a new patient call",
};

export const Expandable: Story = {
  name: "With 'See More' checklist",
  args: {
    value: {
      title: "Live Call Answering Services",
      image: heroImage,
      details: [
        "Our team answers and books new patient calls with a friendly and professional touch.",
        "New patients are booked directly in your current scheduling software.",
      ],
      expandableTitle: "The Practice Porter Solution",
      checks: [
        "Calls answered by real humans — trained, dental-specific agents.",
        "Objections handled and callers converted at twice the industry rate.",
        "Patients scheduled in your current software — no workflow disruption.",
        "Booking confirmations and call summaries keep your team in the loop.",
      ],
    },
  },
};

export const DetailsOnlyNoDisclosure: Story = {
  name: "Details only — no disclosure (checks omitted)",
  args: {
    value: {
      title: "Front Desk Training Sessions",
      image: heroImage,
      details: [
        "Improve your team's ability to convert new patients with tailored training sessions.",
        "Ensure staff are prepared to confidently handle patient calls.",
      ],
    },
  },
};

export const NoImage: Story = {
  name: "No image (fallback panel)",
  args: {
    value: {
      title: "Practice Performance Report",
      details: ["Monthly report detailing your practice's new patient performance."],
      checks: ["Individualized insights for each front desk team member."],
    },
  },
};

export const Bare: Story = {
  name: "Bare — no outer card chrome (used inside Tabs)",
  args: {
    value: {
      title: "Follow Up Center",
      image: heroImage,
      details: ["Convert more new patients by following up with missed callers."],
      checks: ["Assign team members to follow up quickly before patients move on."],
    },
    bare: true,
  },
};
