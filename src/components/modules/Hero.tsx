"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface HeroStat {
  value: string;
  suffix?: string;
  label: string;
  barWidth?: string;
  barColor?: "gold" | "teal";
}

export interface HeroProps {
  theme?: string;
  eyebrow?: string;
  headline?: string;
  headlineHighlight?: string;
  sub?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  stats?: HeroStat[];
}

export function Hero({
  theme = "dark",
  eyebrow = "Boutique Dental Call Intelligence",
  headline = "Every Missed Call Is a New Patient You'll Never Meet",
  headlineHighlight = "Never",
  sub,
  primaryCta = { label: "Book Free Consultation", href: "#cta" },
  secondaryCta = { label: "See Our Results", href: "#results" },
  stats = [],
}: HeroProps) {
  const parts = headlineHighlight && headline.includes(headlineHighlight)
    ? headline.split(headlineHighlight)
    : [headline];

  return (
    <section
      data-theme={theme}
      className="relative flex min-h-screen items-center overflow-hidden bg-[linear-gradient(165deg,var(--midnight)_0%,#0d2244_40%,var(--deep-navy)_100%)]"
    >
      <div className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.025]" />
      <div className="hero-blob hero-blob-1 absolute -right-5 -top-[10%] h-[600px] w-[600px] animate-[blobFloat_15s_ease-in-out_infinite] rounded-full bg-gold opacity-[0.08] blur-[120px]" />
      <div className="hero-blob hero-blob-2 absolute -bottom-[10%] -left-5 h-[600px] w-[600px] animate-[blobFloat_15s_ease-in-out_infinite] rounded-full bg-teal opacity-[0.08] blur-[120px] [animation-delay:-7s] [animation-direction:reverse]" />
      <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:80px_80px]" />

      <div className="relative z-[2] mx-auto grid max-w-[var(--max-width)] grid-cols-1 gap-12 px-[var(--space-lg)] py-[140px] md:grid-cols-2 md:gap-20">
        <div className="max-w-[600px]">
          <div className="mb-8 flex animate-[fadeUp_0.8s_0.3s_forwards] items-center gap-3 opacity-0">
            <span className="h-px w-10 bg-gold" />
            <span className="text-[11px] font-semibold tracking-[4px] uppercase text-gold">
              {eyebrow}
            </span>
          </div>
          <h1 className="mb-7 animate-[fadeUp_0.8s_0.5s_forwards] font-serif text-[clamp(40px,5.5vw,68px)] font-bold leading-[1.08] text-white opacity-0">
            {parts.map((part, i) => (
              <span key={i}>
                {part}
                {i < parts.length - 1 && headlineHighlight && (
                  <em className="text-gold">{headlineHighlight}</em>
                )}
              </span>
            ))}
          </h1>
          {sub && (
            <p className="mb-11 max-w-[480px] animate-[fadeUp_0.8s_0.7s_forwards] text-lg font-light leading-[1.7] text-white/60 opacity-0">
              {sub}
            </p>
          )}
          <div className="flex animate-[fadeUp_0.8s_0.9s_forwards] items-center gap-8 opacity-0">
            <Button variant="brand" size="cta" asChild>
              <a href={primaryCta.href}>
                {primaryCta.label}
                <ChevronRight className="size-4" />
              </a>
            </Button>
            <a
              href={secondaryCta.href}
              className="btn-secondary flex items-center gap-2 text-white/60 no-underline hover:text-white"
            >
              {secondaryCta.label}
              <ChevronDown className="size-4" />
            </a>
          </div>
        </div>

        <div className="animate-[fadeUp_0.8s_1.1s_forwards] opacity-0">
          <Card className="relative overflow-hidden border-white/10 bg-white/[0.03] backdrop-blur-[20px] [&]:border [&]:rounded-[20px] [&]:p-12">
            <div className="absolute left-10 right-10 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
            <CardContent className="pt-0">
              <div className="mb-8 text-[11px] font-semibold tracking-[3px] uppercase text-gold">
                Live Performance Data
              </div>
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className={cn(
                    "border-b border-white/[0.06] pb-7 last:mb-0 last:border-b-0 last:pb-0",
                    i < stats.length - 1 && "mb-7"
                  )}
                >
                  <div className="mb-2 font-serif text-[52px] font-bold tabular-nums text-white">
                    {stat.value}
                    {stat.suffix && <span className="text-gold">{stat.suffix}</span>}
                  </div>
                  <div className="text-sm text-white/45">{stat.label}</div>
                  {stat.barWidth && (
                    <div className="mt-4 h-1 overflow-hidden rounded-sm bg-white/[0.06]">
                      <div
                        className={cn(
                          "h-full rounded-sm transition-[width] duration-[2s]",
                          stat.barColor === "gold" ? "bg-gold" : "bg-teal-light"
                        )}
                        style={{ width: stat.barWidth.includes("%") ? stat.barWidth : `${stat.barWidth}%` }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 z-[3] flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="text-[10px] tracking-[3px] uppercase text-white/30">Scroll</span>
        <div className="relative h-10 w-px overflow-hidden">
          <div className="absolute -top-10 left-0 h-10 w-px animate-[scrollLine_2s_ease-in-out_infinite] bg-gold" />
        </div>
      </div>
    </section>
  );
}
