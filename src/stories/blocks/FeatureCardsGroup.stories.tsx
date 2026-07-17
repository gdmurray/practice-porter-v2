import type { Meta, StoryObj } from "@storybook/react";
import { FeatureCardsGroup } from "@/components/modules/GridPortableText/FeatureCardsGroup";

const meta: Meta<typeof FeatureCardsGroup> = {
  title: "Rich Text Blocks / FeatureCardsGroup",
  component: FeatureCardsGroup,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="bg-cream p-10">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FeatureCardsGroup>;

export const ThreeColumn: Story = {
  name: "3 Column — Pricing page value props",
  args: {
    value: {
      columns: 3,
      items: [
        {
          _key: "f1",
          icon: "package",
          title: "Tailored Packages",
          description: "Mix the solutions that fit your practice.",
        },
        {
          _key: "f2",
          icon: "check",
          title: "No Long-Term Contracts",
          description: "No setup fees and no lock-in.",
        },
        {
          _key: "f3",
          icon: "users",
          title: "A Partnership That Adapts",
          description: "Solutions adapt as your practice evolves.",
        },
      ],
    },
  },
};

export const TwoColumn: Story = {
  name: "2 Column",
  args: {
    value: {
      columns: 2,
      items: [
        {
          _key: "f1",
          icon: "clock",
          title: "Fast Onboarding",
          description: "Live within a week, not months.",
        },
        {
          _key: "f2",
          icon: "phone",
          title: "Dedicated Support",
          description: "A real team, not a ticket queue.",
        },
      ],
    },
  },
};

export const LinkCards: Story = {
  name: "2 Column — Link type (hover to reveal description)",
  args: {
    value: {
      columns: 2,
      items: [
        {
          _key: "f1",
          type: "link",
          icon: "bar-chart",
          title: "Practice Performance Report",
          description: "See how your front desk handles calls.",
          cta: { href: "/practice-performance-report", ctaType: "internal" },
        },
        {
          _key: "f2",
          type: "link",
          icon: "phone",
          title: "Call Answering Solutions",
          description: "We answer and book the calls you miss.",
          cta: { href: "/call-answering-solutions", ctaType: "internal" },
        },
      ],
    },
  },
};

export const TopIcon: Story = {
  name: "3 Column — Icon on top",
  args: {
    value: {
      columns: 3,
      items: [
        {
          _key: "f1",
          iconLocation: "top",
          icon: "package",
          title: "Improve New Patient Experiences",
          description:
            "A patient's first impression is everything. We help practices make every new patient call count - warm, responsive, and never missed.",
        },
        {
          _key: "f2",
          iconLocation: "top",
          icon: "check",
          title: "Empower Dental Practices",
          description:
            "We exist so dentists and practice owners can get full visibility and control over their new patient experience - backed by real data.",
        },
        {
          _key: "f3",
          iconLocation: "top",
          icon: "users",
          title: "Deliver Human-Powered Solutions",
          description:
            "We believe the best solutions start with a human touch, supported by the best technology - not the other way around.",
        },
      ],
    },
  },
};

export const TopIconLink: Story = {
  name: "3 Column — Icon on top, Link type",
  args: {
    value: {
      columns: 3,
      items: [
        {
          _key: "f1",
          iconLocation: "top",
          type: "link",
          icon: "bar-chart",
          title: "Practice Performance Report",
          description: "See how your front desk handles calls.",
          cta: { href: "/practice-performance-report", ctaType: "internal" },
        },
        {
          _key: "f2",
          iconLocation: "top",
          type: "link",
          icon: "phone",
          title: "Call Answering Solutions",
          description: "We answer and book the calls you miss.",
          cta: { href: "/call-answering-solutions", ctaType: "internal" },
        },
        {
          _key: "f3",
          iconLocation: "top",
          type: "link",
          icon: "book-open",
          title: "Front Desk Training",
          description: "Coaching that turns calls into bookings.",
          cta: { href: "/front-desk-training", ctaType: "internal" },
        },
      ],
    },
  },
};

export const MixedTypes: Story = {
  name: "3 Column — Default + Link mixed",
  args: {
    value: {
      columns: 3,
      items: [
        {
          _key: "f1",
          icon: "package",
          title: "Tailored Packages",
          description: "Mix the solutions that fit your practice.",
        },
        {
          _key: "f2",
          type: "link",
          icon: "book-open",
          title: "Front Desk Training",
          description: "Coaching that turns calls into bookings.",
          cta: { href: "/front-desk-training", ctaType: "internal" },
        },
        {
          _key: "f3",
          icon: "users",
          title: "A Partnership That Adapts",
          description: "Solutions adapt as your practice evolves.",
        },
      ],
    },
  },
};

export const FourColumn: Story = {
  name: "4 Column",
  args: {
    value: {
      columns: 4,
      items: [
        {
          _key: "f1",
          icon: "calendar",
          title: "Flexible Scheduling",
          description: "Book around your practice hours.",
        },
        {
          _key: "f2",
          icon: "bar-chart",
          title: "Clear Reporting",
          description: "See performance at a glance.",
        },
        {
          _key: "f3",
          icon: "check-circle",
          title: "HIPAA Compliant",
          description: "Every call handled securely.",
        },
        {
          _key: "f4",
          icon: "star",
          title: "5-Star Support",
          description: "Rated highly by practice owners.",
        },
      ],
    },
  },
};
