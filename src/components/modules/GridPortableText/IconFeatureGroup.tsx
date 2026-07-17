"use client";

import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export interface IconFeatureItem {
  _key?: string;
  iconName: string;
  title: string;
  description: string;
}

export function IconFeatureGroup({
  value,
  animated = false,
}: {
  value: { variant?: "feature" | "detail"; items?: IconFeatureItem[] };
  animated?: boolean;
}) {
  const isDetail = value.variant === "detail";

  return (
    <ul
      className={cn(
        "list-none",
        isDetail ? "mt-0 flex flex-col gap-6" : "mt-7 space-y-0"
      )}
      {...(animated ? { "data-anim-list": true } : {})}
    >
      {value.items?.map((feat, i) => {
        const Icon = getIcon(feat.iconName);
        return (
          <li
            key={feat._key ?? i}
            className={cn(
              "flex items-start",
              isDetail ? "gap-3.5" : "gap-4 py-4"
            )}
          >
            <div
              className={cn(
                "flex shrink-0 items-center justify-center bg-vanilla",
                isDetail
                  ? "size-[38px] rounded-full"
                  : "size-10 rounded-lg"
              )}
            >
              <Icon
                className={cn(
                  isDetail ? "size-[17px] text-red" : "size-5 text-red-terra"
                )}
              />
            </div>
            <div className={cn(isDetail && "pt-0.5")}>
              <div
                className={cn(
                  isDetail
                    ? "mb-1 text-[11px] font-semibold tracking-[1.2px] text-red uppercase"
                    : "mb-1 text-[15px] font-semibold text-ink"
                )}
              >
                {feat.title}
              </div>
              <div
                className={cn(
                  isDetail
                    ? "text-[14.5px] leading-snug text-ink"
                    : "text-sm leading-relaxed text-muted-text"
                )}
              >
                {feat.description}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
