"use client";

import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "./SectionHeader";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export interface ProblemStatCard {
  icon?: string;
  number: string;
  color?: "red" | "amber" | "navy" | "teal";
  desc: string;
}

export interface ProblemProps {
  theme?: string;
  eyebrow?: string;
  title?: string;
  titleHighlight?: string;
  subtitle?: string;
  bigStat?: string;
  quote?: string;
  body?: { _type: string; children?: { text: string }[] }[];
  statCards?: ProblemStatCard[];
}

const colorClasses = {
  red: "bg-[#FDF0F0] text-[#D35050]",
  amber: "bg-[#FDF5E6] text-[#C9A96E]",
  navy: "bg-[#E8ECF2] text-midnight",
  teal: "bg-teal-pale text-teal",
};

export function Problem({
  theme = "cream",
  eyebrow = "The Problem",
  title = "Your Marketing Is Working. Your Front Desk Isn't.",
  titleHighlight = "Front Desk",
  subtitle,
  bigStat = "45%",
  quote,
  body,
  statCards = [],
}: ProblemProps) {
  const bodyText = body?.map((b) => b.children?.map((c) => c.text).join("")).join("\n\n") || "";

  return (
    <section data-theme={theme} id="problem" className="pp-section relative bg-off-white">
      <div className="pp-container">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          titleHighlight={titleHighlight}
          subtitle={subtitle}
          theme={theme as Theme}
        />
        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
          <div className="reveal-left relative">
            <div className="absolute -left-5 -top-10 font-serif text-[clamp(80px,10vw,140px)] font-extrabold leading-[0.9] text-midnight opacity-[0.06]">
              {bigStat}
            </div>
            {quote && (
              <blockquote className="relative mb-6 border-l-[3px] border-gold pl-7 font-serif text-[28px] font-normal italic leading-normal text-midnight">
                {quote}
              </blockquote>
            )}
            {bodyText && (
              <div className="space-y-4 text-base leading-[1.8] text-mid-gray">
                {bodyText.split("\n\n").map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            )}
          </div>
          <div className="reveal-right grid grid-cols-1 gap-6 sm:grid-cols-2">
            {statCards.map((card, i) => {
              const Icon = getIcon(card.icon || "alert-circle");
              const color = card.color || "teal";
              return (
                <Card
                  key={i}
                  className={cn(
                    "problem-stat-card",
                    i === 1 && "mt-8",
                    i === 2 && "-mt-4"
                  )}
                >
                  <CardContent className="p-8 pt-8">
                    <div
                      className={cn(
                        "mb-5 flex size-12 items-center justify-center rounded-xl",
                        colorClasses[color]
                      )}
                    >
                      <Icon className="size-[22px]" />
                    </div>
                    <div
                      className={cn(
                        "mb-1.5 font-serif text-4xl font-bold leading-none",
                        color === "red" && "text-[#D35050]"
                      )}
                    >
                      {card.number}
                    </div>
                    <div className="text-sm leading-normal text-mid-gray">{card.desc}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
