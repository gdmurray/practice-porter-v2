import type { Meta, StoryObj } from "@storybook/react";
import { makeCtaGroup } from "@/components/modules/GridPortableText/CtaGroup";

const CtaGroupLeft = makeCtaGroup(false);
const CtaGroupCentered = makeCtaGroup(true);

const meta: Meta<typeof CtaGroupLeft> = {
  title: "Rich Text Blocks / CtaGroup",
  component: CtaGroupLeft,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CtaGroupLeft>;

const twoButtons = {
  items: [
    { label: "Book a Demo", href: "#cta", variant: "primary" as const },
    { label: "View Sample Report", href: "#report", variant: "secondary" as const },
  ],
};

export const PrimaryAndSecondary: Story = {
  name: "Primary + Secondary — Left aligned",
  render: () => <CtaGroupLeft value={twoButtons} />,
};

export const CenteredButtons: Story = {
  name: "Primary + Secondary — Centered",
  render: () => <CtaGroupCentered value={twoButtons} />,
};

export const PrimaryOnly: Story = {
  name: "Primary only",
  render: () => (
    <CtaGroupLeft
      value={{
        items: [{ label: "Get Started Today", href: "#cta", variant: "primary" }],
      }}
    />
  ),
};

export const ExplicitCenterAlignment: Story = {
  name: "Explicit center alignment override",
  render: () => (
    <CtaGroupLeft
      value={{
        alignment: "center",
        items: [
          { label: "Book a Demo", href: "#cta", variant: "primary" },
          { label: "Learn More", href: "#about", variant: "secondary" },
        ],
      }}
    />
  ),
};
