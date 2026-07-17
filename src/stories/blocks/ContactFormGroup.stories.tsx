import type { Meta, StoryObj } from "@storybook/react";
import { ContactFormGroup } from "@/components/modules/GridPortableText/ContactFormGroup";

const meta: Meta<typeof ContactFormGroup> = {
  title: "Rich Text Blocks / ContactFormGroup",
  component: ContactFormGroup,
  tags: ["autodocs"],
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

const defaultValue = {
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
};

export const Default: Story = {
  name: "Default form card",
  args: {
    value: defaultValue,
  },
};

export const MinimalCopy: Story = {
  name: "Minimal — title only",
  args: {
    value: {
      formTitle: "Get in Touch",
      interestOptions: defaultValue.interestOptions,
    },
  },
};

export const CustomSuccess: Story = {
  name: "Custom success copy",
  args: {
    value: {
      ...defaultValue,
      successTitle: "You're all set!",
      successMessage: "We'll email you a calendar link within the hour.",
    },
  },
};
