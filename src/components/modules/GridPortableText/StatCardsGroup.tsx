"use client";

import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export interface StatCardItem {
  _key?: string;
  icon?: string;
  value: string;
  label: string;
  compareText?: string;
  valueColor?: "navy" | "red" | "gold" | "teal";
}

const valueColorMap: Record<string, string> = {
  navy: "text-midnight",
  red: "text-[#C0392B]",
  gold: "text-gold",
  teal: "text-teal",
};

const iconBgMap: Record<string, string> = {
  red: "bg-[#FDF0F0] text-[#D35050]",
  amber: "bg-[#FDF5E6] text-[#C9A96E]",
  navy: "bg-[#E8ECF2] text-midnight",
  teal: "bg-teal-pale text-teal",
};

export function StatCardsGroup({
  value,
}: {
  value: { theme?: string; columns?: number; items?: StatCardItem[] };
}) {
  const cols = value.columns ?? 2;
  const gridCols =
    cols === 4
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      : cols === 3
        ? "grid-cols-1 sm:grid-cols-3"
        : "grid-cols-1 sm:grid-cols-2";

  const cardBg = value.theme === "white" ? "bg-white" : "bg-off-white";

  return (
    <div className={cn("grid gap-5", gridCols)}>
      {value.items?.map((card, i) => {
        const Icon = card.icon ? getIcon(card.icon) : null;
        const color = card.valueColor ?? "navy";
        return (
          <div key={card._key ?? i} className={cn("rounded-xl p-7", cardBg)}>
            {Icon && (
              <div
                className={cn(
                  "mb-5 flex size-12 shrink-0 items-center justify-center rounded-xl",
                  iconBgMap[color] ?? iconBgMap.teal
                )}
              >
                <Icon className="size-[22px]" />
              </div>
            )}
            <div
              className={cn(
                "mb-1.5 font-serif text-4xl font-bold leading-none",
                valueColorMap[color] ?? "text-midnight"
              )}
            >
              {card.value}
            </div>
            <div className="text-sm leading-normal text-mid-gray">
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
