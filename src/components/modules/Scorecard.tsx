"use client";

import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "./SectionHeader";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export interface ScorecardMetric {
  label?: string;
  value?: string;
  variant?: "default" | "gold" | "up" | "down";
}

export interface ScorecardFeature {
  icon?: string;
  title?: string;
  desc?: string;
}

export interface ScorecardProps {
  theme?: string;
  eyebrow?: string;
  title?: string;
  titleHighlight?: string;
  subtitle?: string;
  previewTitle?: string;
  previewBadge?: string;
  previewMetrics?: ScorecardMetric[];
  imagePosition?: "left" | "right";
  features?: ScorecardFeature[];
}

export function Scorecard({
  theme = "cream",
  eyebrow = "Performance Scorecard",
  title = "See What You've Been Missing",
  titleHighlight = "Missing",
  subtitle,
  previewTitle = "Practice Performance Scorecard",
  previewBadge = "Live Data",
  previewMetrics = [],
  imagePosition = "left",
  features = [],
}: ScorecardProps) {
  return (
    <section
      data-theme={theme}
      id="scorecard"
      className="pp-section bg-gradient-to-b from-off-white to-white"
    >
      <div className="pp-container">
        <div
          className={cn(
            "mt-16 grid grid-cols-1 gap-12 md:gap-20",
            imagePosition === "right" && "md:grid-flow-dense"
          )}
        >
          <div
            className={cn(
              "reveal-left overflow-hidden rounded-[20px] bg-midnight p-12",
              imagePosition === "right" && "md:col-start-2"
            )}
          >
            <div className="mb-9 flex items-center justify-between border-b border-white/10 pb-6">
              <div className="font-serif text-lg text-white">{previewTitle}</div>
              <Badge variant="gold">{previewBadge}</Badge>
            </div>
            <div className="grid grid-cols-2 gap-5">
              {previewMetrics.map((m, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
                >
                  <div className="mb-2 text-xs uppercase tracking-wider text-white/40">
                    {m.label}
                  </div>
                  <div
                    className={cn(
                      "font-serif text-[28px] font-bold text-white",
                      m.variant === "gold" && "text-gold",
                      m.variant === "up" && "text-[#4CAF50]",
                      m.variant === "down" && "text-[#FF6B6B]"
                    )}
                  >
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={cn("reveal-right", imagePosition === "right" && "md:col-start-1 md:row-start-1")}>
            <SectionHeader
              eyebrow={eyebrow}
              title={title}
              titleHighlight={titleHighlight}
              subtitle={subtitle}
              theme={theme as Theme}
            />
            <ul className="mt-8 space-y-5">
              {features.map((f, i) => {
                const Icon = getIcon(f.icon || "activity");
                return (
                  <li key={i} className="flex gap-4">
                    <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-teal-pale">
                      <Icon className="size-[18px] text-teal" />
                    </div>
                    <div>
                      <div className="mb-1 text-[15px] font-semibold text-charcoal">{f.title}</div>
                      <div className="text-sm leading-[1.6] text-mid-gray">{f.desc}</div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
