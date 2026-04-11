import type { Meta, StoryObj } from "@storybook/react";
import { CheckListGroup } from "@/components/modules/GridPortableText/CheckListGroup";

const meta: Meta<typeof CheckListGroup> = {
  title: "Rich Text Blocks / CheckListGroup",
  component: CheckListGroup,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CheckListGroup>;

const checkItems = [
  { _key: "i1", label: "Call tracking and recording on every inbound call" },
  { _key: "i2", label: "Booking rate analytics by staff member and call type" },
  { _key: "i3", label: "Missed call detection and recovery alerts" },
  { _key: "i4", label: "New vs. existing patient performance breakdown" },
  { _key: "i5", label: "Cancellation and rebooking rate tracking" },
  { _key: "i6", label: "Industry benchmark comparisons" },
  { _key: "i7", label: "Weekly email summaries and monthly reports" },
];

export const Plain: Story = {
  name: "Plain — No separators",
  args: {
    value: {
      items: checkItems,
      lineSeparated: false,
    },
  },
};

export const LineSeparated: Story = {
  name: "Line Separated",
  args: {
    value: {
      items: checkItems,
      lineSeparated: true,
    },
  },
};

export const ShortList: Story = {
  name: "Short — 3 items",
  args: {
    value: {
      items: [
        { _key: "i1", label: "No hardware or IT work required" },
        { _key: "i2", label: "Setup in under 48 hours" },
        { _key: "i3", label: "Cancel anytime — no long-term contracts" },
      ],
      lineSeparated: false,
    },
  },
};
