"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SectionHeader } from "./SectionHeader";
import { cn } from "@/lib/utils";

export interface Testimonial {
  quote?: string;
  author?: string;
  role?: string;
  avatar?: string;
}

export interface ResultsMetric {
  label?: string;
  industryValue?: string;
  industryBarWidth?: string;
  porterValue?: string;
  porterBarWidth?: string;
}

export interface ResultsProps {
  theme?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  alignment?: "left" | "center";
  layout?: "split" | "stacked";
  metrics?: ResultsMetric[];
  extraMetrics?: { label?: string; value?: string }[];
  testimonials?: Testimonial[];
}

export function Results({
  theme = "white",
  eyebrow = "Proven Results",
  title = "The Numbers Don't Lie",
  subtitle,
  alignment = "center",
  layout = "split",
  metrics = [],
  extraMetrics = [],
  testimonials = [],
}: ResultsProps) {
  return (
    <section data-theme={theme} id="results" className="pp-section relative bg-white">
      <div className="pp-container">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          alignment={alignment}
          theme={theme as Theme}
        />
        <div
          className={cn(
            "reveal mt-20 overflow-hidden rounded-[20px] border border-warm-gray",
            layout === "split" && "grid grid-cols-1 lg:grid-cols-2"
          )}
        >
          <div className="relative bg-midnight p-15 text-white">
            <div className="mb-12 text-[11px] font-semibold tracking-[3px] uppercase text-gold">
              Performance Comparison
            </div>
            <div className="space-y-9">
              {metrics.map((m, i) => (
                <div key={i}>
                  <div className="mb-3 text-sm text-white/50">{m.label}</div>
                  {m.industryValue && (
                    <>
                      <div className="mb-2 flex justify-between text-2xl text-white/30">
                        {m.industryValue}
                      </div>
                      <div className="mb-4 h-2 overflow-hidden rounded bg-white/[0.06]">
                        <div
                          className="h-full bg-white/15"
                          style={{ width: `${m.industryBarWidth || 33}%` }}
                        />
                      </div>
                    </>
                  )}
                  {m.porterValue && (
                    <>
                      <div className="mb-2 flex justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wider text-gold">
                          Practice Porter
                        </span>
                        <span className="font-serif text-3xl font-bold text-gold">
                          {m.porterValue}
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded bg-white/[0.06]">
                        <div
                          className="h-full rounded bg-gradient-to-r from-gold to-gold-light"
                          style={{ width: `${m.porterBarWidth || 94}%` }}
                        />
                      </div>
                    </>
                  )}
                </div>
              ))}
              {extraMetrics.length > 0 && (
                <div className="grid grid-cols-2 gap-5 border-t border-white/10 pt-7">
                  {extraMetrics.map((m, i) => (
                    <div key={i}>
                      <div className="mb-2 text-xs uppercase tracking-wider text-white/30">
                        {m.label}
                      </div>
                      <div className="font-serif text-[28px] font-bold text-gold">{m.value}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col justify-center p-15">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={cn(
                  "border-b border-warm-gray pb-10 last:border-b-0 last:pb-0",
                  i < testimonials.length - 1 && "mb-10"
                )}
              >
                <blockquote className="relative mb-5 border-l-[3px] border-gold pl-6 font-serif text-xl italic leading-[1.6] text-midnight">
                  {t.quote}
                </blockquote>
                <div className="flex items-center gap-3">
                  <Avatar className="size-11 bg-teal-pale">
                    <AvatarFallback className="font-serif text-base font-semibold text-teal">
                      {t.avatar || t.author?.slice(0, 2) || "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-semibold text-charcoal">{t.author}</div>
                    <div className="text-[13px] text-mid-gray">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
