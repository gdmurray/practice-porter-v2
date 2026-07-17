import type { Meta, StoryObj } from "@storybook/react";
import { TabsGroup } from "@/components/modules/GridPortableText/TabsGroup";

const meta: Meta<typeof TabsGroup> = {
  title: "Rich Text Blocks / TabsGroup",
  component: TabsGroup,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 16px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TabsGroup>;

const image = (seed: string, alt: string) => ({
  asset: {
    url: `https://images.unsplash.com/${seed}?w=900&h=700&fit=crop`,
    metadata: { dimensions: { width: 900, height: 700 } },
  },
  alt,
});

export const FourTabsAutoRotating: Story = {
  name: "4 Tabs — Auto-rotating (20s)",
  args: {
    value: {
      autoRotateSeconds: 20,
      items: [
        {
          _key: "t1",
          title: "Call Recording",
          icon: "phone",
          content: {
            title: "Call Recording & Analysis",
            image: image("photo-1551190822-a9333d879b1f", "Front desk professional reviewing call performance"),
            details: [
              "Record patient calls to gain clear insights into front desk performance.",
              "Each call is transcribed and analyzed to reveal what works and what doesn't.",
            ],
            expandableTitle: "The Practice Porter Solution",
            checks: [
              "Every new patient call is recorded and securely stored for review.",
              "Calls are transcribed and analyzed to surface what is working and what is not.",
              "Spot missed opportunities and coaching moments across your front desk.",
              "Use real call examples to guide training and improve booking rates.",
            ],
          },
        },
        {
          _key: "t2",
          title: "Performance Reporting",
          icon: "bar-chart",
          content: {
            title: "Practice Performance Report",
            image: image("photo-1587854692152-cbe660dbde88", "Reviewing a practice performance report on a tablet"),
            details: [
              "Monthly report on new patient performance with team data.",
              "Meet monthly with our team to review performance and growth opportunities.",
            ],
            checks: [
              "Individualized insights and benchmarks for each front desk team member.",
              "A monthly consultation with our team to review results and next steps.",
            ],
          },
        },
        {
          _key: "t3",
          title: "Follow Up Center",
          icon: "phone-off",
          content: {
            title: "Follow Up Center",
            image: image("photo-1516321497487-e288fb19713f", "Reviewing follow-up tasks on a laptop"),
            details: [
              "Convert more new patients by following up with missed callers or hesitant bookers.",
              "Track missed calls and assign staff for follow-up.",
            ],
          },
        },
        {
          _key: "t4",
          title: "Google Review Center",
          icon: "star",
          content: {
            title: "Google Review Center",
            image: image("photo-1556742049-0cfed4f6a45d", "Patient leaving a five-star Google review"),
            details: [
              "Send Google Review requests to patients after an appointment.",
              "Monitor your Google Reviews and compare your numbers to competitors.",
            ],
          },
        },
      ],
    },
  },
};

export const AutoRotateDisabled: Story = {
  name: "Auto-rotate disabled (autoRotateSeconds: 0)",
  args: {
    value: {
      autoRotateSeconds: 0,
      items: [
        {
          _key: "t1",
          title: "Call Recording",
          icon: "phone",
          content: {
            title: "Call Recording & Analysis",
            image: image("photo-1551190822-a9333d879b1f", "Front desk professional reviewing call performance"),
            details: ["Record patient calls to gain clear insights into front desk performance."],
          },
        },
        {
          _key: "t2",
          title: "Performance Reporting",
          icon: "bar-chart",
          content: {
            title: "Practice Performance Report",
            image: image("photo-1587854692152-cbe660dbde88", "Reviewing a practice performance report on a tablet"),
            details: ["Monthly report on new patient performance with team data."],
          },
        },
      ],
    },
  },
};

export const TwoTabs: Story = {
  name: "2 Tabs — Minimum",
  args: {
    value: {
      autoRotateSeconds: 12,
      items: [
        {
          _key: "t1",
          title: "Live Answering",
          icon: "phone",
          content: {
            title: "Live Call Answering Services",
            image: image("photo-1551190822-a9333d879b1f", "Smiling woman taking a new patient call"),
            details: ["Our team answers and books new patient calls with a friendly and professional touch."],
            checks: ["Calls answered by real humans — trained, dental-specific agents."],
          },
        },
        {
          _key: "t2",
          title: "Training",
          icon: "user",
          content: {
            title: "Front Desk Training Sessions",
            image: image("photo-1600880292203-757bb62b4baf", "Group front desk training session"),
            details: ["Improve your team's ability to convert new patients with tailored training sessions."],
          },
        },
      ],
    },
  },
};
