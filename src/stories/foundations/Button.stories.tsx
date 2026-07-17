import type { Meta, StoryObj } from "@storybook/react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

/**
 * `<Button>` — maps directly to the CTA specs in Brand Guidelines.html
 * (5.0 — "CTA Buttons & Background Circle" and "Digital & Web Brand Rules").
 *
 * - `default` / `brand` → Primary Button: brand-red gradient fill, white
 *   sheen sweep on hover, 11px radius.
 * - `outline` → Secondary CTA: white fill, brand-red border + text.
 * - `nav` → small solid pill used in the fixed header only.
 */
const meta: Meta<typeof Button> = {
  title: "Foundations / Button",
  component: Button,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Button>;

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="mb-0.5 text-[9.5px] font-bold tracking-widest text-muted-text uppercase">
        {label}
      </div>
      <div className="text-[11px] text-ink">{value}</div>
    </div>
  );
}

function SwatchCard({
  eyebrow,
  children,
  specs,
}: {
  eyebrow: string;
  children: ReactNode;
  specs: { label: string; value: string }[];
}) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border-color bg-lotion p-5">
      <div className="text-[11px] font-bold tracking-[0.14em] text-red uppercase">
        {eyebrow}
      </div>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
      <div className="grid grid-cols-2 gap-2 border-t border-border-color pt-3">
        {specs.map((s) => (
          <SpecRow key={s.label} label={s.label} value={s.value} />
        ))}
      </div>
    </div>
  );
}

export const BrandSpecSheet: Story = {
  name: "Brand spec sheet — Primary / Secondary / Nav",
  render: () => (
    <div className="flex max-w-[672px] flex-col gap-4">
      <SwatchCard
        eyebrow="Primary CTA — Gradient + Sheen Sweep"
        specs={[
          { label: "Fill", value: "linear-gradient(100deg, red, red-bright)" },
          { label: "Hover", value: "White sheen sweep, 0.85s ease" },
          { label: "Radius / Padding", value: "11px / 14px 28px" },
          { label: "Typography", value: "Plus Jakarta Sans 500, white, 14px" },
        ]}
      >
        <Button size="cta">Book Free Consultation</Button>
      </SwatchCard>

      <SwatchCard
        eyebrow="Secondary CTA — Border + Fill"
        specs={[
          { label: "Fill", value: "#FFFFFF rest / vanilla hover" },
          { label: "Border", value: "1px rgba(163,39,5,.28) → .40 hover" },
          { label: "Text", value: "#A32705, 500 weight" },
          { label: "Hover effect", value: "translateY(-2px) + box-shadow" },
        ]}
      >
        <Button variant="outline" size="cta">
          Learn More
          <ChevronRight className="size-4" />
        </Button>
      </SwatchCard>

      <SwatchCard
        eyebrow="Nav CTA — Small Solid Pill"
        specs={[
          { label: "Fill", value: "#A32705 solid / #7E1D02 hover" },
          { label: "Radius / Padding", value: "10px / 10px 24px" },
          { label: "Typography", value: "Plus Jakarta Sans 500, white, 13px" },
          { label: "Usage", value: "Fixed header only" },
        ]}
      >
        <Button variant="nav">Book Free Consultation</Button>
      </SwatchCard>
    </div>
  ),
};

export const AllVariants: Story = {
  name: "All variants",
  render: () => (
    <div className="flex flex-wrap items-center gap-4 rounded-2xl bg-lotion p-8">
      <Button>Default (Primary)</Button>
      <Button variant="brand">Brand</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="nav">Nav</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

export const Sizes: Story = {
  name: "Sizes — xs / sm / default / lg / cta",
  render: () => (
    <div className="flex flex-wrap items-center gap-4 rounded-2xl bg-lotion p-8">
      <Button size="xs">Extra small</Button>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="cta">CTA size</Button>
    </div>
  ),
};

export const OnGradientTheme: Story = {
  name: "Primary + Secondary on gradient background",
  render: () => (
    <div
      data-theme="gradient"
      className="flex flex-wrap items-center gap-4 rounded-2xl p-10"
      style={{ background: "var(--section-bg)" }}
    >
      <Button size="cta">Book Free Consultation</Button>
      <Button variant="outline" size="cta">
        Learn More
      </Button>
    </div>
  ),
};

export const WithIcons: Story = {
  name: "With trailing icon (CtaGroup pattern)",
  render: () => (
    <div className="flex flex-wrap items-center gap-4 rounded-2xl bg-lotion p-8">
      <Button size="cta">
        Book a Demo
        <ChevronRight className="size-4" />
      </Button>
      <Button variant="outline" size="cta">
        View Sample Report
        <ChevronRight className="size-4" />
      </Button>
    </div>
  ),
};

export const DisabledState: Story = {
  name: "Disabled state",
  render: () => (
    <div className="flex flex-wrap items-center gap-4 rounded-2xl bg-lotion p-8">
      <Button disabled>Default</Button>
      <Button variant="outline" disabled>
        Outline
      </Button>
      <Button variant="nav" disabled>
        Nav
      </Button>
    </div>
  ),
};
