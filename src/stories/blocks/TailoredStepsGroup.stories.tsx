import type { Meta, StoryObj } from "@storybook/react";
import { TailoredStepsGroup } from "@/components/modules/GridPortableText/TailoredStepsGroup";

const meta: Meta<typeof TailoredStepsGroup> = {
  title: "Rich Text Blocks / TailoredStepsGroup",
  component: TailoredStepsGroup,
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
type Story = StoryObj<typeof TailoredStepsGroup>;

export const Default: Story = {
  name: "Default",
  args: {
    value: {
      stepOne: {
        badge: "1",
        eyebrow: "Consultation",
        title: "Personalized New Patient Consultation",
        body: "Before offering recommendations, we meet with you to assess your patient volume, front desk operations, areas needing improvement, and your goals.",
        cta: { label: "Book Free Consultation", href: "#book", ctaType: "book_meeting" },
      },
      stepTwo: {
        badge: "2",
        eyebrow: "Solutions",
        title: "The Right Solutions for Your Practice",
        body: "We recommend the best solutions to improve your new patient experience, tailored to your practice.",
        links: [
          {
            _key: "l1",
            icon: "bar-chart",
            cta: { label: "Practice Performance Report", href: "/practice-performance-report", ctaType: "internal" },
          },
          {
            _key: "l2",
            icon: "phone",
            cta: { label: "Call Answering Solutions", href: "/call-answering-solutions", ctaType: "internal" },
          },
          {
            _key: "l3",
            icon: "graduation-cap",
            cta: { label: "Front Desk Training", href: "/front-desk-training", ctaType: "internal" },
          },
        ],
      },
    },
  },
};
