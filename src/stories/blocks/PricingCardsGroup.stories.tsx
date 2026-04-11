import type { Meta, StoryObj } from "@storybook/react";
import { PricingCardsGroup } from "@/components/modules/GridPortableText/PricingCardsGroup";

const meta: Meta<typeof PricingCardsGroup> = {
  title: "Rich Text Blocks / PricingCardsGroup",
  component: PricingCardsGroup,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PricingCardsGroup>;

const starterFeatures = [
  "Call tracking & recording",
  "Booking rate analytics",
  "Staff performance reporting",
  "Monthly summary reports",
  "Email support",
];

const growthFeatures = [
  "Everything in Starter",
  "Missed call recovery alerts",
  "Cancellation & rebooking rates",
  "New vs. existing patient split",
  "Client insights dashboard",
  "Quarterly strategy review",
  "Priority support",
];

export const LightAndDark: Story = {
  name: "Light + Dark (standard pairing)",
  args: {
    value: {
      items: [
        {
          _key: "p1",
          tag: "Starter",
          amount: "$297",
          period: "/ mo",
          desc: "Everything you need to understand what's happening at your front desk and start converting more calls.",
          features: starterFeatures,
          ctaLabel: "Get Started",
          ctaHref: "#cta",
          variant: "light",
        },
        {
          _key: "p2",
          tag: "Growth",
          amount: "$597",
          period: "/ mo",
          desc: "Full visibility across every patient touchpoint, with proactive alerts and strategic support included.",
          features: growthFeatures,
          ctaLabel: "Book a Demo",
          ctaHref: "#cta",
          variant: "dark",
        },
      ],
    },
  },
};

export const BothLight: Story = {
  name: "Both Light",
  args: {
    value: {
      items: [
        {
          _key: "p1",
          tag: "Starter",
          amount: "$297",
          period: "/ mo",
          desc: "Core call tracking and analytics for practices just getting started with data-driven decisions.",
          features: starterFeatures,
          ctaLabel: "Get Started",
          ctaHref: "#cta",
          variant: "light",
        },
        {
          _key: "p2",
          tag: "Growth",
          amount: "$597",
          period: "/ mo",
          desc: "Advanced reporting and recovery features for practices ready to aggressively grow new patient volume.",
          features: growthFeatures,
          ctaLabel: "Book a Demo",
          ctaHref: "#cta",
          variant: "light",
        },
      ],
    },
  },
};
