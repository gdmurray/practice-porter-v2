"use client";

import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export interface StatCardItem {
  _key?: string;
  icon?: string;
  value: string;
  label: string;
  compareText?: string;
  valueColor?: "ink" | "red" | "terra" | "muted";
}

const valueColorMap: Record<string, string> = {
  ink: "text-ink",
  red: "text-red",
  terra: "text-red-terra",
  muted: "text-muted-text",
};

const iconBgMap: Record<string, string> = {
  ink: "bg-[rgba(43,26,20,0.08)] text-ink",
  red: "bg-[rgba(163,39,5,0.10)] text-red",
  terra: "bg-vanilla text-red-terra",
  muted: "bg-border-color text-muted-text",
};

export function StatCardsGroup({
  value,
  animated = false,
}: {
  value: { theme?: string; columns?: number; items?: StatCardItem[] };
  animated?: boolean;
}) {
  const cols = value.columns ?? 2;
  const gridCols =
    cols === 4
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      : cols === 3
        ? "grid-cols-1 sm:grid-cols-3"
        : "grid-cols-1 sm:grid-cols-2";

  const cardBg =
    value.theme === "white"
      ? "bg-white"
      : value.theme === "vanilla"
        ? "bg-vanilla"
        : "bg-lotion";

  return (
    <div
      className={cn("grid gap-5", gridCols)}
      {...(animated ? { "data-anim-list": true } : {})}
    >
      {value.items?.map((card, i) => {
        const Icon = card.icon ? getIcon(card.icon) : null;
        const color = card.valueColor ?? "ink";
        return (
          <div key={card._key ?? i} className={cn("rounded-xl p-7", cardBg)}>
            {Icon && (
              <div
                className={cn(
                  "mb-5 flex size-12 shrink-0 items-center justify-center rounded-xl",
                  iconBgMap[color] ?? iconBgMap.terra
                )}
              >
                <Icon className="size-[22px]" />
              </div>
            )}
            <div
              className={cn(
                "mb-1.5 font-serif text-4xl font-medium leading-none",
                valueColorMap[color] ?? "text-ink"
              )}
            >
              {card.value}
            </div>
            <div className="text-sm leading-normal text-muted-text">
              {card.label}
            </div>
            {card.compareText && (
              <div className="mt-2 text-xs text-light-gray">
                {card.compareText}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
