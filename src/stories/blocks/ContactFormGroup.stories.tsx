import type { Meta, StoryObj } from "@storybook/react";
import { ContactFormGroup } from "@/components/modules/GridPortableText/ContactFormGroup";

const meta: Meta<typeof ContactFormGroup> = {
  title: "Rich Text Blocks / ContactFormGroup",
  component: ContactFormGroup,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Thin Sanity-block adapter around the isolated `ContactForm` component (see Forms/ContactForm for the full story matrix). This story only confirms the adapter passes the block's `value` through correctly.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-[560px] bg-lotion p-8">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ContactFormGroup>;

export const Default: Story = {
  name: "Default form card",
  args: {
    value: {
      formTitle: "Send Us a Message",
      formSubtitle:
        "Fill out the form below and one of our consultants will be in touch shortly.",
      interestOptions: [
        { _key: "o1", label: "Practice Performance Report", value: "growth" },
        { _key: "o2", label: "Call Answering Solutions", value: "call-management" },
        { _key: "o3", label: "Front Desk Training", value: "retraining" },
        { _key: "o4", label: "All Solutions / Not Sure Yet", value: "all" },
      ],
      privacyPolicyHref: "/privacy-policy",
      successTitle: "Message Sent!",
      successMessage:
        "Thanks for reaching out. One of our consultants will be in touch within 1 business day.",
    },
  },
};
