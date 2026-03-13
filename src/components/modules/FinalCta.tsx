"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight, ArrowUpRight } from "lucide-react";
import { ctaProps, type CtaData } from "@/lib/cta";

export interface FinalCtaProps {
  theme?: string;
  eyebrow?: string;
  title?: string;
  titleHighlight?: string;
  sub?: string;
  primaryCta?: CtaData;
  secondaryCta?: CtaData;
  note?: string;
}

export function FinalCta({
  theme = "dark",
  eyebrow = "Get Started",
  title = "Stop Losing Patients to Missed Calls",
  titleHighlight = "Missed Calls",
  sub,
  primaryCta = { label: "Book Free Consultation", href: "#cta" },
  secondaryCta = { label: "Or email us directly", href: "mailto:info@practiceporter.ca" },
  note = "No contracts. No setup fees. Just results.",
}: FinalCtaProps) {
  const displayTitle = titleHighlight
    ? title.replace(titleHighlight, `__HIGHLIGHT__`)
    : title;

  return (
    <section
      data-theme={theme}
      id="cta"
      className="relative overflow-hidden bg-[linear-gradient(165deg,var(--midnight)_0%,#0d2244_50%,var(--deep-navy)_100%)] px-[var(--space-lg)] py-[var(--space-3xl)] text-center text-white"
    >
      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:60px_60px]" />
      <div className="relative z-1 mx-auto max-w-[700px]">
        <div className="eyebrow mb-7 flex justify-center">
          <span className="mr-3 h-px w-8 bg-gold" />
          {eyebrow}
        </div>
        <h2 className="section-title mb-5 text-center text-white">
          {displayTitle.split("__HIGHLIGHT__").map((part, i) => (
            <span key={i}>
              {part}
              {i === 0 && titleHighlight && <em className="text-gold">{titleHighlight}</em>}
            </span>
          ))}
        </h2>
        {sub && (
          <p className="mx-auto mb-12 max-w-[540px] text-lg font-light leading-[1.7] text-white/50">
            {sub}
          </p>
        )}
        <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
          <Button variant="brand" size="cta" asChild>
            <a {...ctaProps(primaryCta)} className="px-11 py-5 text-sm">
              {primaryCta.label}
              <ChevronRight className="ml-2 size-[18px]" />
            </a>
          </Button>
          <a
            {...ctaProps(secondaryCta)}
            className="btn-secondary flex items-center gap-2 text-white/40 no-underline hover:text-white"
          >
            {secondaryCta.label}
            <ArrowUpRight className="size-3.5" />
          </a>
        </div>
        {note && <p className="mt-6 text-[13px] text-white/30">{note}</p>}
      </div>
    </section>
  );
}
