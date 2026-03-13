"use client";

import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "./SectionHeader";
import { getIcon } from "@/lib/icons";

export interface SolutionCard {
  icon?: string;
  title: string;
  desc?: string;
}

export interface SolutionProps {
  theme?: string;
  eyebrow?: string;
  title?: string;
  titleHighlight?: string;
  subtitle?: string;
  cards?: SolutionCard[];
}

export function Solution({
  theme = "dark",
  eyebrow = "The Solution",
  title = "A Dedicated Team That Turns Every Ring Into Revenue",
  titleHighlight = "Revenue",
  subtitle,
  cards = [],
}: SolutionProps) {
  return (
    <section
      data-theme={theme}
      id="solution"
      className="pp-section relative overflow-hidden bg-midnight text-white"
    >
      <div className="pp-container">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          titleHighlight={titleHighlight}
          subtitle={subtitle}
          theme={theme as Theme}
        />
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => {
            const Icon = getIcon(card.icon || "phone");
            return (
              <Card
                key={i}
                className="solution-card border-white/10 bg-white/[0.03] [&]:rounded-[20px] [&]:p-9 [&]:px-9"
              >
                <CardContent className="p-0">
                  <div className="mb-6 flex size-[52px] items-center justify-center rounded-[14px] bg-gold/10">
                    <Icon className="size-6 text-gold" />
                  </div>
                  <h3 className="mb-3.5 font-serif text-[22px] font-semibold leading-[1.3] text-white">
                    {card.title}
                  </h3>
                  <p className="text-[15px] leading-[1.7] text-white/50">{card.desc}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
