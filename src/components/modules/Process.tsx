"use client";

import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "./SectionHeader";
import { cn } from "@/lib/utils";

export interface ProcessStep {
  tag?: string;
  title: string;
  desc?: string;
}

export interface ProcessProps {
  theme?: string;
  eyebrow?: string;
  title?: string;
  titleHighlight?: string;
  subtitle?: string;
  alignment?: "left" | "center";
  layout?: "alternating" | "stacked";
  steps?: ProcessStep[];
}

export function Process({
  theme = "cream",
  eyebrow = "How It Works",
  title = "From First Ring to Booked Patient in Four Simple Steps",
  titleHighlight = "Booked Patient",
  subtitle,
  alignment = "center",
  layout = "alternating",
  steps = [],
}: ProcessProps) {
  return (
    <section data-theme={theme} id="process" className="pp-section bg-off-white">
      <div className="pp-container">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          titleHighlight={titleHighlight}
          subtitle={subtitle}
          alignment={alignment}
          theme={theme as Theme}
        />
        <div className="relative mt-20">
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-gold to-transparent md:left-1/2" />
          <div className="space-y-12">
            {steps.map((step, i) => (
              <div
                key={i}
                className="reveal relative grid grid-cols-1 gap-6 md:grid-cols-[1fr_80px_1fr] md:items-center"
              >
                <div
                  className={cn(
                    "p-10",
                    layout === "alternating" && i % 2 === 0 && "md:text-right",
                    layout === "alternating" && i % 2 === 1 && "md:order-3 md:text-left"
                  )}
                >
                  {step.tag && (
                    <Badge variant="teal" className="mb-4">
                      {step.tag}
                    </Badge>
                  )}
                  <h3 className="mb-3 font-serif text-2xl font-semibold text-midnight">
                    {step.title}
                  </h3>
                  <p className="text-[15px] leading-[1.7] text-mid-gray">{step.desc}</p>
                </div>
                <div className="relative z-[2] flex size-14 shrink-0 items-center justify-center self-center justify-self-center rounded-full border-[3px] border-gold bg-midnight font-serif text-xl font-bold text-gold">
                  {i + 1}
                </div>
                <div className="hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
