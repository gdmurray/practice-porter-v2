import type { Meta, StoryObj } from "@storybook/react";
import { StatCardsGroup } from "@/components/modules/GridPortableText/StatCardsGroup";

const meta: Meta<typeof StatCardsGroup> = {
  title: "Rich Text Blocks / StatCardsGroup",
  component: StatCardsGroup,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof StatCardsGroup>;

export const TwoColumn: Story = {
  name: "2 Column — Light theme",
  args: {
    value: {
      theme: "white",
      columns: 2,
      items: [
        { _key: "s1", icon: "phone", value: "94%", label: "Average booking rate across tracked practices", valueColor: "terra" },
        { _key: "s2", icon: "dollar-sign", value: "$142", label: "Average cost per booked appointment", valueColor: "ink" },
      ],
    },
  },
};

export const ThreeColumnWithIcons: Story = {
  name: "3 Column — With icons, all colors",
  args: {
    value: {
      theme: "white",
      columns: 3,
      items: [
        { _key: "s1", icon: "trending-up", value: "2.4×", label: "ROI vs industry average", valueColor: "red", compareText: "Industry avg: 1.1×" },
        { _key: "s2", icon: "users", value: "12,400", label: "Patient calls tracked per month", valueColor: "terra" },
        { _key: "s3", icon: "alert-circle", value: "18%", label: "Calls missed during business hours", valueColor: "muted", compareText: "Industry avg: 31%" },
      ],
    },
  },
};

export const FourColumn: Story = {
  name: "4 Column — No icons, lotion background",
  args: {
    value: {
      theme: "lotion",
      columns: 4,
      items: [
        { _key: "s1", value: "94%", label: "Booking rate", valueColor: "terra" },
        { _key: "s2", value: "$142", label: "Cost per appt", valueColor: "ink" },
        { _key: "s3", value: "87%", label: "Show rate", valueColor: "red" },
        { _key: "s4", value: "4.2×", label: "Avg ROI", valueColor: "ink" },
      ],
    },
  },
};
