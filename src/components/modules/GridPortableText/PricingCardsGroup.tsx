"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PricingCardItem {
  _key?: string;
  tag?: string;
  amount?: string;
  period?: string;
  desc?: string;
  features?: string[];
  ctaLabel?: string;
  ctaHref?: string;
  variant?: "light" | "dark";
}

export function PricingCardsGroup({
  value,
  animated = false,
}: {
  value: { items?: PricingCardItem[] };
  animated?: boolean;
}) {
  return (
    <div
      className="mx-auto mt-8 grid w-full max-w-[900px] grid-cols-1 gap-8 md:grid-cols-2"
      {...(animated ? { "data-anim-list": true } : {})}
    >
      {value.items?.map((card, i) => {
        const isDark = card.variant === "dark";
        return (
          <Card
            key={card._key ?? i}
            className={cn(
              "rounded-[20px] p-10 transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_16px_60px_rgba(43,26,20,0.10)]",
              isDark
                ? "bg-red text-white [&]:border-white/10"
                : "border-border-color bg-lotion text-charcoal"
            )}
          >
            <CardContent className="flex h-full flex-col p-0">
              {card.tag && (
                <Badge
                  variant={isDark ? "brand" : "default"}
                  className="mb-7 w-fit"
                >
                  {card.tag}
                </Badge>
              )}
              <div className="mb-2">
                <span
                  className={cn(
                    "font-serif text-5xl font-medium leading-none",
                    isDark ? "text-white" : "text-ink"
                  )}
                >
                  {card.amount}
                </span>
                <span
                  className={cn(
                    "ml-1 text-[15px] font-normal",
                    isDark ? "text-white/40" : "text-muted-text"
                  )}
                >
                  {card.period}
                </span>
              </div>
              {card.desc && (
                <p
                  className={cn(
                    "mb-8 text-[15px] leading-[1.6]",
                    isDark ? "text-white/50" : "text-muted-text"
                  )}
                >
                  {card.desc}
                </p>
              )}
              <ul className="mb-9 space-y-3.5">
                {card.features?.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm">
                    <Check
                      className={cn(
                        "size-[18px] shrink-0",
                        isDark ? "text-vanilla" : "text-red"
                      )}
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                variant={isDark ? "brand" : "outline"}
                size="cta"
                className="mt-auto w-full justify-center"
                asChild
              >
                <a href={card.ctaHref || "#cta"}>
                  {card.ctaLabel || "Book Consultation"}
                </a>
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
