import type { Meta, StoryObj } from "@storybook/react";
import { ApproachTabsGroup } from "@/components/modules/GridPortableText/ApproachTabsGroup";

const meta: Meta<typeof ApproachTabsGroup> = {
  title: "Rich Text Blocks / ApproachTabsGroup",
  component: ApproachTabsGroup,
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
type Story = StoryObj<typeof ApproachTabsGroup>;

const placeholderImage = {
  asset: {
    url: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=380&h=460&fit=crop",
    metadata: { dimensions: { width: 380, height: 460 } },
  },
  alt: "Dentist reviewing a performance report on a tablet",
};

export const ThreeStepApproach: Story = {
  name: "Three-Step Approach",
  args: {
    value: {
      autoRotateSeconds: 12,
      items: [
        {
          _key: "record",
          label: "Record",
          body: "Record every patient call and gain insight into your front desk's performance in a monthly report.",
          link: { label: "Practice Performance Report", href: "/practice-performance-report", ctaType: "internal" },
          kicker: "Insight on what's happening",
          panelTitle: "Practice Performance Report",
          image: placeholderImage,
          cta: { label: "See Solutions", href: "/practice-performance-report", ctaType: "internal" },
        },
        {
          _key: "retrain",
          label: "Retrain",
          body: "Empower your staff to provide the 5-star service your patients deserve with customized training sessions for your practice.",
          link: { label: "Front Desk Training", href: "/front-desk-training", ctaType: "internal" },
          kicker: "Improve front desk performance",
          panelTitle: "Front Desk Training",
          image: placeholderImage,
          cta: { label: "See Solutions", href: "/front-desk-training", ctaType: "internal" },
        },
        {
          _key: "replace",
          label: "Replace",
          body: "Our boutique team is trained to handle your new patient calls and book appointments directly in your scheduling software.",
          link: { label: "Call Answering Solutions", href: "/call-answering-solutions", ctaType: "internal" },
          kicker: "Turn more calls into bookings",
          panelTitle: "Call Answering Solutions",
          image: placeholderImage,
          cta: { label: "See Solutions", href: "/call-answering-solutions", ctaType: "internal" },
        },
      ],
    },
  },
};

export const NoAutoRotate: Story = {
  name: "No Auto-Rotate",
  args: {
    value: {
      autoRotateSeconds: 0,
      items: ThreeStepApproach.args!.value.items,
    },
  },
};
