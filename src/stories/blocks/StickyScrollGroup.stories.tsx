import type { Meta, StoryObj } from "@storybook/react";
import { StickyScrollGroup } from "@/components/modules/GridPortableText/StickyScrollGroup";

const meta: Meta<typeof StickyScrollGroup> = {
  title: "Rich Text Blocks / StickyScrollGroup",
  component: StickyScrollGroup,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 16px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof StickyScrollGroup>;

const image = (seed: string, alt: string) => ({
  asset: {
    url: `https://images.unsplash.com/${seed}?w=900&h=1000&fit=crop`,
    metadata: { dimensions: { width: 900, height: 1000 } },
  },
  alt,
});

const block = (style: "normal" | "stepTitle", text: string) => ({
  _type: "block" as const,
  _key: `${style}-${text.slice(0, 8)}`,
  style,
  children: [{ _type: "span" as const, _key: "span1", text, marks: [] }],
  markDefs: [],
});

const linkParagraph = (before: string, linkText: string, after: string) => ({
  _type: "block" as const,
  _key: "link-para",
  style: "normal" as const,
  markDefs: [{ _key: "link1", _type: "link", href: "/practice-performance-report" }],
  children: [
    { _type: "span" as const, _key: "s1", text: before, marks: [] },
    { _type: "span" as const, _key: "s2", text: linkText, marks: ["link1"] },
    { _type: "span" as const, _key: "s3", text: after, marks: [] },
  ],
});

export const Default: Story = {
  name: "3 Steps — Call Answering Solutions copy",
  args: {
    value: {
      items: [
        {
          _key: "step1",
          image: image("photo-1556157382-97eda2d62296", "Front desk agent smiling while answering a call"),
          content: [
            block("stepTitle", "Live Call Answering, by Real Humans"),
            block(
              "normal",
              "Our experienced team answers & books your new patient calls with care and expertise because your patients deserve more than an AI receptionist."
            ),
          ],
        },
        {
          _key: "step2",
          image: image("photo-1600880292203-757bb62b4baf", "Front desk team reviewing new patient bookings"),
          content: [
            block("stepTitle", "Book More New Patients Without Adding Staff"),
            block(
              "normal",
              "We handle objections, answer questions, and convert callers into appointments at twice the industry rate. New patients are booked directly into your scheduling software without extra steps."
            ),
          ],
        },
        {
          _key: "step3",
          image: image("photo-1551190822-a9333d879b1f", "Agent following up on a missed new patient call"),
          content: [
            block("stepTitle", "Miss Fewer New Patient Calls"),
            linkParagraph(
              "Our team handles every new patient call to prevent missed bookings. For hesitant bookers, we follow up and track them via the ",
              "Follow Up Center",
              "."
            ),
          ],
        },
      ],
    },
  },
};

export const MinimumTwoSteps: Story = {
  name: "2 Steps — minimum",
  args: {
    value: {
      items: [
        {
          _key: "step1",
          image: image("photo-1600880292203-757bb62b4baf", "Personalized front desk training session"),
          content: [
            block("stepTitle", "No Scripts, Real Training"),
            block(
              "normal",
              "Personalized training sessions tailored to your practice's needs prepare staff for every new patient call."
            ),
          ],
        },
        {
          _key: "step2",
          image: image("photo-1551190822-a9333d879b1f", "Team member tracking performance metrics"),
          content: [
            block("stepTitle", "Track & Measure Performance Improvements"),
            block(
              "normal",
              "Monitor and support your team's development with your Practice Performance Reporting alongside monthly consulting."
            ),
          ],
        },
      ],
    },
  },
};
