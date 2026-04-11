import type { Meta, StoryObj } from "@storybook/react";
import { SanityImage } from "@/components/modules/GridPortableText/SanityImage";

const meta: Meta<typeof SanityImage> = {
  title: "Rich Text Blocks / SanityImage",
  component: SanityImage,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SanityImage>;

export const WideImage: Story = {
  name: "Wide (16:9)",
  args: {
    value: {
      asset: {
        url: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=1200&h=675&fit=crop",
        metadata: { dimensions: { width: 1200, height: 675 } },
      },
      alt: "Modern dental practice reception area",
      priority: false,
    },
  },
};

export const SquareImage: Story = {
  name: "Square (1:1)",
  args: {
    value: {
      asset: {
        url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=600&fit=crop",
        metadata: { dimensions: { width: 600, height: 600 } },
      },
      alt: "Dental team at front desk",
      priority: false,
    },
  },
};

export const PortraitImage: Story = {
  name: "Portrait (3:4)",
  args: {
    value: {
      asset: {
        url: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=800&fit=crop",
        metadata: { dimensions: { width: 600, height: 800 } },
      },
      alt: "Dentist reviewing patient analytics on tablet",
      priority: false,
    },
  },
};

export const PriorityLoad: Story = {
  name: "Priority (eager load)",
  args: {
    value: {
      asset: {
        url: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=1200&h=500&fit=crop",
        metadata: { dimensions: { width: 1200, height: 500 } },
      },
      alt: "Practice Porter dashboard hero image",
      priority: true,
    },
  },
};

export const NoAsset: Story = {
  name: "No asset (renders nothing)",
  args: {
    value: {
      asset: undefined,
      alt: "Missing image",
    },
  },
};
