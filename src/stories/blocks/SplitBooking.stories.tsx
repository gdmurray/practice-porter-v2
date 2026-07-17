import type { Meta, StoryObj } from "@storybook/react";
import type { PortableTextBlock } from "@portabletext/react";
import { SplitBooking } from "@/components/modules/SplitBooking";

const meta: Meta<typeof SplitBooking> = {
  title: "Modules / SplitBooking",
  component: SplitBooking,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SplitBooking>;

const block = (style: "normal" | "h2", text: string) => ({
  _type: "block" as const,
  _key: `${style}-${text.slice(0, 8)}`,
  style,
  children: [{ _type: "span" as const, _key: "span1", text, marks: [] }],
  markDefs: [],
});

const checkList = (items: string[]) => ({
  _type: "checkListBlock",
  _key: "checklist",
  lineSeparated: false,
  items: items.map((label, i) => ({ _key: `c${i}`, label })),
});

const avatar = (overrides: Record<string, unknown> = {}) => ({
  _type: "avatarBlock",
  _key: "avatar",
  name: "Shaan Brach",
  role: "CEO & Founder, Practice Porter",
  initials: "S",
  ...overrides,
});

const defaultContent = [
  block("h2", "Meet With Our Founder and Find Out What Your Front Desk Is Missing."),
  block("normal", "Get a personalized look at how Practice Porter can help your growing practice with its new patient bottleneck."),
  checkList([
    "A personalized look at your front desk performance",
    "A clear picture of an untapped revenue opportunity",
    "Tailored solution recommendations, with zero obligation",
  ]),
  avatar(),
] as unknown as PortableTextBlock[];

export const Default: Story = {
  name: "Default — About Us",
  args: {
    theme: "cream",
    eyebrow: "Free Consultation",
    title: "Get a Deeper Look With a Free Consultation",
    subtitle: "Book a free 30-minute consultation to get a clear view of your new patient opportunity with Practice Porter.",
    content: defaultContent,
  },
};

export const WithFounderPhoto: Story = {
  name: "With Founder Photo",
  args: {
    theme: "cream",
    eyebrow: "Free Consultation",
    title: "Get a Deeper Look With a Free Consultation",
    subtitle: "Book a free 30-minute consultation to get a clear view of your new patient opportunity with Practice Porter.",
    content: [
      block("h2", "Meet With Our Founder and Find Out What Your Front Desk Is Missing."),
      block("normal", "Get a personalized look at how Practice Porter can help your growing practice with its new patient bottleneck."),
      checkList([
        "A personalized look at your front desk performance",
        "A clear picture of an untapped revenue opportunity",
        "Tailored solution recommendations, with zero obligation",
      ]),
      avatar({
        image: {
          asset: { url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop" },
          alt: "Shaan Brach",
        },
      }),
    ] as unknown as PortableTextBlock[],
  },
};

export const NoHeader: Story = {
  name: "No Section Header",
  args: {
    theme: "cream",
    content: defaultContent,
  },
};
