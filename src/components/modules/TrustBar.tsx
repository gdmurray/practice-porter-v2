"use client";

import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export interface TrustItem {
  icon?: string;
  label: string;
}

export interface TrustBarProps {
  theme?: string;
  items?: TrustItem[];
}

export function TrustBar({ theme = "white", items = [] }: TrustBarProps) {
  return (
    <div
      data-theme={theme}
      className="reveal border-b border-warm-gray bg-white px-[var(--space-lg)] py-8"
    >
      <div className="pp-container flex flex-wrap items-center justify-center gap-12">
        {items.map((item, i) => {
          const Icon = getIcon(item.icon || "shield");
          return (
            <div key={i} className="flex items-center gap-3 text-[13px] font-medium text-mid-gray">
              <Icon className="size-5 shrink-0 text-teal" />
              {item.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
