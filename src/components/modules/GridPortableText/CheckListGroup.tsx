"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function CheckListGroup({
  value,
  animated = false,
  tone = "default",
}: {
  value: { items?: { _key?: string; label?: string }[]; lineSeparated?: boolean };
  animated?: boolean;
  /** "onBrand" renders cream-circle checks on cream text, for placement on
   *  a solid red panel (e.g. the Split Booking left panel) instead of the
   *  default light-background treatment. */
  tone?: "default" | "onBrand";
}) {
  const separated = value.lineSeparated ?? false;
  const onBrand = tone === "onBrand";
  return (
    <ul className="list-none" {...(animated ? { "data-anim-list": true } : {})}>
      {value.items?.map((item, i) => (
        <li
          key={item._key ?? i}
          className={cn(
            "flex items-center gap-2.5 py-2 text-sm",
            onBrand ? "text-cream/95" : "text-charcoal",
            separated &&
              (onBrand
                ? "border-b border-white/20 last:border-b-0"
                : "border-b border-border-color last:border-b-0")
          )}
        >
          {onBrand ? (
            <span className="flex size-[19px] shrink-0 items-center justify-center rounded-full bg-cream text-red">
              <Check className="size-3" strokeWidth={3} />
            </span>
          ) : (
            <Check className="size-4 shrink-0 text-red" />
          )}
          {item.label}
        </li>
      ))}
    </ul>
  );
}
