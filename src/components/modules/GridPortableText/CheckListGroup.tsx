"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function CheckListGroup({
  value,
}: {
  value: { items?: { _key?: string; label?: string }[]; lineSeparated?: boolean };
}) {
  const separated = value.lineSeparated ?? false;
  return (
    <ul className="list-none">
      {value.items?.map((item, i) => (
        <li
          key={item._key ?? i}
          className={cn(
            "flex items-center gap-2.5 py-2 text-sm text-charcoal",
            separated && "border-b border-warm-gray last:border-b-0"
          )}
        >
          <Check className="size-4 shrink-0 text-teal" />
          {item.label}
        </li>
      ))}
    </ul>
  );
}
