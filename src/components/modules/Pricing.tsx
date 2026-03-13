"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "./SectionHeader";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PricingCard {
  tag?: string;
  amount?: string;
  period?: string;
  desc?: string;
  features?: string[];
  ctaLabel?: string;
  ctaHref?: string;
  variant?: "light" | "dark";
}

export interface PricingProps {
  theme?: string;
  eyebrow?: string;
  title?: string;
  titleHighlight?: string;
  subtitle?: string;
  alignment?: "left" | "center";
  cards?: PricingCard[];
  note?: string;
}

export function Pricing({
  theme = "white",
  eyebrow = "Simple Pricing",
  title = "Pay for Results, Not Promises",
  titleHighlight = "Results",
  subtitle,
  alignment = "center",
  cards = [],
  note,
}: PricingProps) {
  return (
    <section data-theme={theme} id="pricing" className="pp-section bg-white">
      <div className="pp-container">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          titleHighlight={titleHighlight}
          subtitle={subtitle}
          alignment={alignment}
          theme={theme as Theme}
        />
        <div className="reveal mx-auto mt-16 grid max-w-[900px] grid-cols-1 gap-8 md:grid-cols-2">
          {cards.map((card, i) => {
            const isDark = card.variant === "dark";
            return (
              <Card
                key={i}
                className={cn(
                  "pricing-card rounded-[20px] p-12 px-10 transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_16px_60px_rgba(11,29,58,0.1)]",
                  isDark
                    ? "bg-midnight text-white [&]:border-white/10"
                    : "border-warm-gray bg-off-white text-charcoal"
                )}
              >
                <CardContent className="p-0">
                  {card.tag && (
                    <Badge
                      variant={isDark ? "gold" : "teal"}
                      className="mb-7"
                    >
                      {card.tag}
                    </Badge>
                  )}
                  <div className="mb-2">
                    <span
                      className={cn(
                        "font-serif text-5xl font-bold leading-none",
                        isDark ? "text-white" : "text-midnight"
                      )}
                    >
                      {card.amount}
                    </span>
                    <span
                      className={cn(
                        "ml-1 text-[15px] font-normal",
                        isDark ? "text-white/40" : "text-mid-gray"
                      )}
                    >
                      {card.period}
                    </span>
                  </div>
                  {card.desc && (
                    <p
                      className={cn(
                        "mb-8 text-[15px] leading-[1.6]",
                        isDark ? "text-white/50" : "text-mid-gray"
                      )}
                    >
                      {card.desc}
                    </p>
                  )}
                  <ul className="mb-9 space-y-3.5">
                    {card.features?.map((f, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm">
                        <Check
                          className={cn("size-[18px] shrink-0", isDark ? "text-gold" : "text-teal")}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={isDark ? "brand" : "outline"}
                    className="w-full"
                    asChild
                  >
                    <a href={card.ctaHref || "#cta"}>{card.ctaLabel || "Book Consultation"}</a>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
        {note && (
          <p className="reveal mt-10 text-center text-[15px] text-mid-gray">{note}</p>
        )}
      </div>
    </section>
  );
}
