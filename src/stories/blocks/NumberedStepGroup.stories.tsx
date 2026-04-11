import type { Meta, StoryObj } from "@storybook/react";
import { NumberedStepGroup } from "@/components/modules/GridPortableText/NumberedStepGroup";

const meta: Meta<typeof NumberedStepGroup> = {
  title: "Rich Text Blocks / NumberedStepGroup",
  component: NumberedStepGroup,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NumberedStepGroup>;

export const FourSteps: Story = {
  name: "Four Steps — Onboarding flow",
  args: {
    value: {
      items: [
        {
          _key: "step1",
          title: "Connect Your Phone System",
          description: "We integrate with your existing phone provider in under 10 minutes. No hardware changes, no downtime, no technical team required.",
        },
        {
          _key: "step2",
          title: "We Start Tracking Every Call",
          description: "Practice Porter begins recording, transcribing, and categorizing every inbound call — new patient, existing patient, cancellation, and more.",
        },
        {
          _key: "step3",
          title: "Your Dashboard Goes Live",
          description: "Within 48 hours you'll have a live dashboard showing booking rates, missed calls, staff performance, and how you compare to industry benchmarks.",
        },
        {
          _key: "step4",
          title: "Insights Delivered Every Week",
          description: "Weekly email summaries keep your team focused on the right numbers. Monthly deep-dives and quarterly strategy calls keep you ahead of trends.",
        },
      ],
    },
  },
};

export const ThreeSteps: Story = {
  name: "Three Steps — Short version",
  args: {
    value: {
      items: [
        {
          _key: "step1",
          title: "Book a 30-Minute Demo",
          description: "We'll walk through your current front desk metrics, show you what Practice Porter tracks, and answer every question you have.",
        },
        {
          _key: "step2",
          title: "We Handle the Setup",
          description: "Our team integrates Practice Porter with your phone system and configures your dashboard — usually live within 48 hours.",
        },
        {
          _key: "step3",
          title: "Start Converting More Patients",
          description: "See exactly where you're losing patients and take action with confidence. Most practices see measurable improvement within the first 30 days.",
        },
      ],
    },
  },
};
