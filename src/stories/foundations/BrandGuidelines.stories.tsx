import type { Meta, StoryObj } from "@storybook/react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/modules/SectionHeader";
import { ChevronRight } from "lucide-react";

/**
 * Living recreation of the web-relevant pages from `reference/Brand
 * Guidelines.html` (5.0 — Brand Application: CTA Buttons & Background
 * Circle / Website Design Examples / Digital & Web Brand Rules), built
 * entirely out of real site components and `global.css` design tokens
 * instead of the static handoff markup. Use this to validate the token +
 * component migration against the PDF-style guidelines side by side.
 */
const meta: Meta = {
  title: "Foundations / Brand Guidelines",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj;

function PanelLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-3 text-[11px] font-bold tracking-[0.14em] text-red uppercase">
      {children}
    </div>
  );
}

function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-border-color bg-lotion p-6 ${className}`}>
      {children}
    </div>
  );
}

// ─── 3.0 Color ────────────────────────────────────────────────────────────

const colorSwatches = [
  { name: "Burnt Red", token: "--red", cls: "bg-red", text: "text-white" },
  { name: "Red Deep", token: "--red-deep", cls: "bg-red-deep", text: "text-white" },
  { name: "Red Bright", token: "--red-bright", cls: "bg-red-bright", text: "text-white" },
  { name: "Red Terra", token: "--red-terra", cls: "bg-red-terra", text: "text-white" },
  { name: "Vanilla Blush", token: "--vanilla", cls: "bg-vanilla", text: "text-ink" },
  { name: "Cream", token: "--cream", cls: "bg-cream", text: "text-ink" },
  { name: "Lotion", token: "--lotion", cls: "bg-lotion border border-border-color", text: "text-ink" },
  { name: "Ink", token: "--ink", cls: "bg-ink", text: "text-white" },
];

export const ColorPalette: Story = {
  name: "3.0 — Color Palette",
  render: () => (
    <div className="grid grid-cols-2 gap-4 p-10 sm:grid-cols-4">
      {colorSwatches.map((c) => (
        <div key={c.name} className="overflow-hidden rounded-xl border border-border-color">
          <div className={`flex h-20 items-end p-3 ${c.cls} ${c.text}`}>
            <span className="text-xs font-semibold">{c.name}</span>
          </div>
          <div className="bg-white px-3 py-2 font-mono text-[11px] text-muted-text">
            {c.token}
          </div>
        </div>
      ))}
    </div>
  ),
};

// ─── 4.0 — Typography ──────────────────────────────────────────────────────

const typeScale: {
  role: string;
  spec: string;
  className: string;
  sample: string;
}[] = [
  {
    role: "Display — Hero Headlines",
    spec: "Playfair Display / 500 / 40–56pt",
    className: "font-serif text-[44px] font-medium leading-[1.05] tracking-[-0.02em] text-ink",
    sample: "Real New Patient Growth",
  },
  {
    role: "Display Italic — Accent",
    spec: "Playfair Display / 400 Italic / 32–40pt",
    className: "font-serif text-[36px] font-normal italic leading-[1.05] tracking-[-0.02em] text-red",
    sample: "Powered by Real People",
  },
  {
    role: "Heading — Section Titles",
    spec: "Playfair Display / 500 / 20–28pt",
    className: "section-title text-[24px]!",
    sample: "Front Desk Training Programs",
  },
  {
    role: "Subheading — Labels & Nav",
    spec: "Plus Jakarta Sans / 600 / 12pt · 2.4px tracking",
    className: "eyebrow",
    sample: "Complete Your Front Desk Solution",
  },
  {
    role: "Body — Standard Copy",
    spec: "Plus Jakarta Sans / 300 (Light) / 14–17pt",
    className: "font-sans text-[15px] font-light leading-[1.7] text-charcoal",
    sample: "Our tailored solutions empower your front desk to give new patients the experience they deserve.",
  },
  {
    role: "Caption / Label",
    spec: "Plus Jakarta Sans / 400 / 7–8pt · 0.12em tracking",
    className: "font-sans text-[11px] font-normal uppercase tracking-[0.12em] text-muted-text",
    sample: "Avg. across Practice Porter client practices",
  },
];

export const Typography: Story = {
  name: "4.0 — Typography",
  render: () => (
    <div className="flex flex-col gap-8 p-10">
      <div className="grid gap-4 sm:grid-cols-2">
        <Panel>
          <PanelLabel>Primary Brand Font</PanelLabel>
          <div className="font-serif text-[32px] font-medium text-ink">Playfair Display</div>
          <p className="mt-1 text-[12px] text-muted-text">
            Headlines, section titles, CTA button labels, numerals — weight 500 (never bold).
          </p>
        </Panel>
        <Panel>
          <PanelLabel>Supporting Brand Font</PanelLabel>
          <div className="font-sans text-[22px] font-semibold text-ink">Plus Jakarta Sans</div>
          <p className="mt-1 text-[12px] text-muted-text">
            Body copy (300), labels/eyebrows (700), buttons (500) — everything else.
          </p>
        </Panel>
      </div>

      <div className="flex flex-col">
        {typeScale.map((row) => (
          <div
            key={row.role}
            className="grid grid-cols-[230px_1fr] items-center gap-7 border-b border-border-color py-5 first:border-t"
          >
            <div className="flex flex-col gap-1">
              <div className="eyebrow text-[10px]!">{row.role}</div>
              <div className="text-[11px] font-light text-muted-text">{row.spec}</div>
            </div>
            <div className={row.className}>{row.sample}</div>
          </div>
        ))}
      </div>

      <Panel>
        <PanelLabel>CTA Type</PanelLabel>
        <p className="mb-4 text-[12px] font-light text-muted-text">
          Plus Jakarta Sans / 500 / 13–14pt — see `foundations/Button` for full spec.
        </p>
        <Button size="cta">Book Free Consultation</Button>
      </Panel>
    </div>
  ),
};

// ─── 5.0 — CTA Buttons & Background Circle ────────────────────────────────

export const CtaButtonsAndRingMotif: Story = {
  name: "5.0 — CTA Buttons & Background Circle",
  render: () => (
    <div className="grid gap-6 p-10 lg:grid-cols-2">
      <Panel>
        <PanelLabel>Primary CTA — Gradient + Sheen Sweep</PanelLabel>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="cta">Book Free Consultation</Button>
        </div>
        <p className="mt-4 text-[11px] leading-relaxed text-muted-text">
          Fill: <code>linear-gradient(100deg, var(--red), var(--red-bright))</code> · Hover:
          white sheen sweep, 0.85s ease · Radius/Padding: 11px / 14px 28px
        </p>
      </Panel>

      <Panel>
        <PanelLabel>Secondary CTA — Border + Fill</PanelLabel>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" size="cta">
            Learn More
            <ChevronRight className="size-4" />
          </Button>
        </div>
        <p className="mt-4 text-[11px] leading-relaxed text-muted-text">
          Fill: white rest / vanilla hover · Border: rgba(163,39,5,.28) → .40 on hover · Hover
          effect: translateY(-2px) + box-shadow
        </p>
      </Panel>

      <Panel className="lg:col-span-2">
        <PanelLabel>Background Circle Element</PanelLabel>
        <div
          className="relative h-44 overflow-hidden rounded-xl border border-border-color bg-lotion"
          style={{ contain: "paint" }}
        >
          <div
            aria-hidden="true"
            className="absolute -top-24 -right-24 size-[320px] rounded-full"
            style={{ border: "14px solid rgba(163,39,5,0.13)" }}
          />
          <div className="relative z-10 p-6">
            <div className="font-serif text-xl font-medium text-ink">Section Headline</div>
            <p className="mt-2 max-w-[320px] text-[13px] leading-relaxed text-charcoal">
              Body copy sits in front of the ring. Content is always above z-index: 0.
            </p>
          </div>
        </div>
        <p className="mt-4 text-[11px] leading-relaxed text-muted-text">
          400–520px, always partially off-page · Absolute, top/right or top/left, overflow
          hidden on parent · Light backgrounds only · Max 1 per section
        </p>
      </Panel>
    </div>
  ),
};

// ─── 5.0 — Section Backgrounds (data-theme tokens) ────────────────────────

const themes = [
  "white",
  "lotion",
  "cream",
  "vanilla",
  "red",
  "gradient",
] as const;

export const SectionBackgrounds: Story = {
  name: "5.0 — Section Backgrounds (data-theme)",
  render: () => (
    <div className="flex flex-col">
      {themes.map((theme) => (
        <section
          key={theme}
          data-theme={theme}
          className="px-10 py-14"
          style={{ background: "var(--section-bg)" }}
        >
          <div className="mx-auto max-w-[672px]">
            <SectionHeader
              eyebrow={`data-theme="${theme}"`}
              title="Real New Patient Growth"
              titleHighlight="Real Patient"
              subtitle="Alternate between white, lotion, cream, and vanilla for rhythm; reserve red and gradient for key moments."
              theme={theme}
            />
          </div>
        </section>
      ))}
    </div>
  ),
};

// ─── 5.0 — Website Content & Components (Content Card / CTA Banner / Stat Callout) ──

export const ContentCardAndCtaBanner: Story = {
  name: "5.0 — Content Card, CTA Banner & Stat Callout",
  render: () => (
    <div className="grid gap-6 p-10 lg:grid-cols-2">
      <div className="flex flex-col gap-3">
        <PanelLabel>Content Section Card</PanelLabel>
        <div className="rounded-2xl border border-border-color bg-lotion p-8 shadow-[0_10px_30px_rgba(43,26,20,0.09)]">
          <div className="mb-3 text-[11px] font-bold tracking-[0.18em] text-red uppercase">
            Section 1.0
          </div>
          <h3 className="mb-3 font-serif text-[27px] leading-tight font-medium text-ink">
            Real New Patient Growth, Powered by Real People
          </h3>
          <p className="mb-5 text-[13px] leading-relaxed text-charcoal">
            Our tailored solutions empower your front desk to give new patients the experience
            they deserve.
          </p>
          <Button size="cta">
            Learn More
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <PanelLabel>CTA Banner</PanelLabel>
          <div
            className="rounded-2xl p-9 shadow-[0_10px_30px_rgba(43,26,20,0.13)]"
            style={{ background: "var(--hero-gradient)" }}
          >
            <h3 className="mb-3 font-serif text-2xl leading-tight font-medium text-[#FFF7F2]">
              Ready to See What Your Front Desk Is Missing?
            </h3>
            <p className="mb-5 text-[12.5px] leading-relaxed text-[rgba(255,243,236,0.88)]">
              Book a free consultation and get a clear view of your new patient opportunity.
            </p>
            <Button
              size="cta"
              className="bg-white bg-none text-red before:hidden hover:bg-white hover:shadow-none"
            >
              Book a Free Consultation
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <PanelLabel>Stat Callout</PanelLabel>
          <div className="flex items-center gap-6 rounded-2xl border border-[rgba(163,39,5,0.12)] bg-vanilla p-7">
            <div className="font-serif text-5xl leading-none font-medium text-red">85%</div>
            <div>
              <div className="mb-1 text-[13px] font-semibold text-ink">
                New Patient Conversion Rate
              </div>
              <div className="text-xs text-muted-text">
                Avg. across Practice Porter client practices
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// ─── 5.0 — Type on Gradient ────────────────────────────────────────────────

export const TypeOnGradient: Story = {
  name: "5.0 — Type on Gradient",
  render: () => (
    <div className="p-10">
      <div
        className="max-w-[512px] rounded-2xl p-8"
        style={{ background: "var(--hero-gradient)" }}
      >
        <h3 className="mb-2 font-serif text-lg font-medium text-[#FFF7F2]">
          Headline in White
        </h3>
        <p className="text-[13px] leading-relaxed text-[rgba(255,243,236,0.88)]">
          Supporting copy at 88% opacity cream. Never use Ink or brand-red text on the
          gradient — always #FFF7F2 for headlines, rgba(255,243,236,.88) for body copy.
        </p>
      </div>
    </div>
  ),
};
