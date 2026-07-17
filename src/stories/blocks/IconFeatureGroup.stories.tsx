import type { Meta, StoryObj } from "@storybook/react";
import { IconFeatureGroup } from "@/components/modules/GridPortableText/IconFeatureGroup";

const meta: Meta<typeof IconFeatureGroup> = {
  title: "Rich Text Blocks / IconFeatureGroup",
  component: IconFeatureGroup,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof IconFeatureGroup>;

export const FeatureList: Story = {
  name: "Feature List — 5 items",
  args: {
    value: {
      items: [
        {
          _key: "f1",
          iconName: "phone",
          title: "Call Tracking & Recording",
          description: "Every inbound call is recorded, transcribed, and categorized automatically — new patient, existing, cancellation, and more.",
        },
        {
          _key: "f2",
          iconName: "bar-chart",
          title: "Booking Rate Analytics",
          description: "See exactly what percentage of calls convert to booked appointments, broken down by staff member, time of day, and call type.",
        },
        {
          _key: "f3",
          iconName: "users",
          title: "Staff Performance Reporting",
          description: "Identify your top performers and find coaching opportunities with per-staff booking rates, call duration, and outcome tracking.",
        },
        {
          _key: "f4",
          iconName: "trending-up",
          title: "Industry Benchmarks",
          description: "Compare your key metrics against 2,000+ dental practices. Know exactly where you stand and where the biggest opportunity lies.",
        },
        {
          _key: "f5",
          iconName: "alert-circle",
          title: "Missed Call Recovery",
          description: "Get instant alerts when calls go unanswered during business hours so you can follow up before the patient books elsewhere.",
        },
      ],
    },
  },
};

export const ShortList: Story = {
  name: "Short List — 3 items",
  args: {
    value: {
      items: [
        {
          _key: "f1",
          iconName: "check-circle",
          title: "No Hardware Required",
          description: "Works with your existing phone system. Setup takes less than 10 minutes with zero downtime.",
        },
        {
          _key: "f2",
          iconName: "clock",
          title: "Live Within 48 Hours",
          description: "Your dashboard goes live within two business days of signing up — often faster.",
        },
        {
          _key: "f3",
          iconName: "star",
          title: "Dedicated Support",
          description: "Monthly reviews and quarterly strategy calls with a Practice Porter specialist who knows your numbers inside out.",
        },
      ],
    },
  },
};

export const DetailVariant: Story = {
  name: "Detail — contact info rows",
  args: {
    value: {
      variant: "detail",
      items: [
        {
          _key: "d1",
          iconName: "mail",
          title: "Email",
          description: "info@practiceporter.ca",
        },
        {
          _key: "d2",
          iconName: "clock",
          title: "Response Time",
          description: "We respond within 1 business day",
        },
      ],
    },
  },
};
