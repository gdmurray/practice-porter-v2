import type { Meta, StoryObj } from "@storybook/react";
import { AvatarBlockGroup } from "@/components/modules/GridPortableText/AvatarBlockGroup";

const meta: Meta<typeof AvatarBlockGroup> = {
  title: "Rich Text Blocks / AvatarBlockGroup",
  component: AvatarBlockGroup,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 430, margin: "0 auto", padding: 32, background: "#A32705" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AvatarBlockGroup>;

export const Initials: Story = {
  name: "Initials Only",
  args: {
    value: {
      name: "Shaan Brach",
      role: "CEO & Founder, Practice Porter",
      initials: "S",
    },
  },
};

export const WithPhoto: Story = {
  name: "With Photo",
  args: {
    value: {
      name: "Shaan Brach",
      role: "CEO & Founder, Practice Porter",
      initials: "S",
      image: {
        asset: { url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop" },
        alt: "Shaan Brach",
      },
    },
  },
};

export const NoRole: Story = {
  name: "Missing Role",
  args: {
    value: {
      name: "Shaan Brach",
      initials: "S",
    },
  },
};
