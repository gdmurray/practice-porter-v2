import type { Meta, StoryObj } from "@storybook/react";
import { ContactForm } from "@/components/forms";

const meta: Meta<typeof ContactForm> = {
  title: "Forms/ContactForm",
  component: ContactForm,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-[560px] bg-lotion p-8">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "Turnstile only renders when `PUBLIC_TURNSTILE_SITE_KEY` is set in the environment — in Storybook it renders nothing, so the widget field appears empty here.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ContactForm>;

const defaultArgs = {
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
  args: defaultArgs,
};

export const MinimalCopy: Story = {
  name: "Minimal — title only",
  args: {
    formTitle: "Get in Touch",
    interestOptions: defaultArgs.interestOptions,
  },
};

export const CustomSuccess: Story = {
  name: "Custom success copy",
  args: {
    ...defaultArgs,
    successTitle: "You're all set!",
    successMessage: "We'll email you a calendar link within the hour.",
  },
};
