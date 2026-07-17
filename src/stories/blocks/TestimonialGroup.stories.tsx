import type { Meta, StoryObj } from "@storybook/react";
import { TestimonialGroup } from "@/components/modules/GridPortableText/TestimonialGroup";

const meta: Meta<typeof TestimonialGroup> = {
  title: "Rich Text Blocks / TestimonialGroup",
  component: TestimonialGroup,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TestimonialGroup>;

export const TwoTestimonials: Story = {
  name: "Two Testimonials",
  args: {
    value: {
      items: [
        {
          _key: "t1",
          quote: "Before Practice Porter, we had no idea 23% of our calls were going unanswered. Within 90 days of fixing that alone, our new patient volume jumped by 40%.",
          author: "Dr. Sarah Mitchell",
          role: "Owner, Mitchell Family Dentistry",
          avatar: "SM",
        },
        {
          _key: "t2",
          quote: "The cost-per-appointment data completely changed how we look at our marketing spend. We cut our ad budget by 30% and actually booked more patients.",
          author: "Dr. James Okafor",
          role: "Managing Partner, Okafor Dental Group",
          avatar: "JO",
        },
      ],
    },
  },
};

export const FourTestimonials: Story = {
  name: "Four Testimonials",
  args: {
    value: {
      items: [
        {
          _key: "t1",
          quote: "The missed call recovery feature alone paid for Practice Porter in the first month. We were losing 4-5 new patients a week without even knowing it.",
          author: "Dr. Rachel Kim",
          role: "Owner, Smiles by Kim",
          avatar: "RK",
        },
        {
          _key: "t2",
          quote: "I finally know which staff members are converting calls and which ones need coaching. The team accountability this creates is priceless.",
          author: "Dr. Marcus Rivera",
          role: "Lead Dentist, Rivera Dental",
          avatar: "MR",
        },
        {
          _key: "t3",
          quote: "Our front desk team has become obsessed with their booking rate numbers. Healthy competition between staff has genuinely moved the needle.",
          author: "Dr. Lisa Park",
          role: "Owner, Park Dental Care",
          avatar: "LP",
        },
        {
          _key: "t4",
          quote: "The quarterly strategy reviews with the Practice Porter team are worth the subscription price by themselves. They've helped us spot patterns we'd never have caught.",
          author: "Dr. Tom Walsh",
          role: "Partner, Walsh & Associates",
          avatar: "TW",
        },
      ],
    },
  },
};

export const Carousel: Story = {
  name: "Carousel",
  args: {
    value: {
      variant: "carousel",
      autoRotateSeconds: 15,
      items: [
        {
          _key: "t1",
          quote: "Practice Porter's performance reporting gave us a clear look at exactly where our front desk staff was missing new patient booking opportunities, and gave us actionable next steps for each employee. We saw our new patient conversion rate improve by over 23% in under a month.",
          author: "Dr. C Samuel",
        },
        {
          _key: "t2",
          quote: "We were spending thousands on marketing to generate leads each month, then losing those patients when they called. Practice Porter helped us identify and fix our issues with the Practice Performance Report and Follow Up Center, giving us full visibility and control over our new patient experience.",
          author: "Dr. M Singh",
        },
        {
          _key: "t3",
          quote: "Practice Porter showed us exactly where new patients were slipping through the cracks. Within three months our front desk went from booking around 40% of new patient calls to over 80%, and we didn't have to hire a single new person to do it.",
          author: "Dr. M Singh",
        },
      ],
    },
  },
};
