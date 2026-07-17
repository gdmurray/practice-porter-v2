"use client";

import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ctaProps, type CtaData } from "@/lib/cta";
import { cn } from "@/lib/utils";

export interface ComparisonCardValue {
  label?: string;
  overLabel?: string;
  value?: string;
  caption?: string;
  filledCount?: number;
}

export interface ComparisonBannerValue {
  headline?: string;
  headlineEmphasis?: string;
  subtext?: string;
  cta?: CtaData;
}

// Fixed dark/light card skins per the reference — not theme-driven, since
// the comparison is always "industry (dark)" vs "Practice Porter (light)"
// regardless of the surrounding section's theme.
function PersonGrid({ filled, tone }: { filled: number; tone: "dark" | "light" }) {
  return (
    <div className="mt-5 flex gap-2">
      {Array.from({ length: 5 }, (_, i) => {
        const isFilled = i < filled;
        return (
          <span
            key={i}
            className={cn(
              "flex size-8 items-center justify-center rounded-full transition-colors",
              tone === "dark"
                ? isFilled
                  ? "bg-[rgba(255,243,236,0.92)] text-red-deep"
                  : "bg-[rgba(255,255,255,0.10)] text-[rgba(255,255,255,0.25)]"
                : isFilled
                  ? "bg-red text-cream"
                  : "bg-[rgba(163,39,5,0.08)] text-[rgba(163,39,5,0.18)]"
            )}
          >
            <User className="size-4" />
          </span>
        );
      })}
    </div>
  );
}

function CompareCard({
  data,
  tone,
}: {
  data?: ComparisonCardValue;
  tone: "dark" | "light";
}) {
  if (!data) return null;
  return (
    <div
      className={cn(
        "w-full max-w-[300px] rounded-2xl p-8",
        tone === "dark"
          ? "bg-[color-mix(in_srgb,var(--ink)_88%,black)] text-cream"
          : "bg-white text-ink"
      )}
    >
      <div
        className={cn(
          "text-xs font-semibold uppercase tracking-[1.5px]",
          tone === "dark" ? "text-[rgba(255,243,236,0.65)]" : "text-muted-text"
        )}
      >
        {data.label}
      </div>
      {data.overLabel && (
        <div className="mt-4 text-[10px] font-medium uppercase italic tracking-[1.5px] text-red-terra">
          {data.overLabel}
        </div>
      )}
      <div
        className={cn(
          "font-serif text-[52px] font-medium leading-none",
          tone === "dark" ? "text-cream" : "text-ink",
          data.overLabel ? "mt-0" : "mt-4"
        )}
      >
        {data.value}
      </div>
      <div
        className={cn(
          "mt-2 text-xs",
          tone === "dark" ? "text-[rgba(255,243,236,0.6)]" : "text-muted-text"
        )}
      >
        {data.caption}
      </div>
      <PersonGrid filled={data.filledCount ?? 0} tone={tone} />
    </div>
  );
}

export function ComparisonGroup({
  value,
  animated = false,
}: {
  value: {
    leftCard?: ComparisonCardValue;
    rightCard?: ComparisonCardValue;
    banner?: ComparisonBannerValue;
  };
  animated?: boolean;
}) {
  const banner = value.banner;
  const hasBanner = Boolean(banner?.headline || banner?.subtext);

  return (
    <div>
      <div
        className="mx-auto flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-10"
        {...(animated ? { "data-anim-list": true } : {})}
      >
        <CompareCard data={value.leftCard} tone="dark" />
        <div className="font-serif text-lg text-muted-text">vs.</div>
        <CompareCard data={value.rightCard} tone="light" />
      </div>

      {hasBanner && (
        <div
          className="mx-auto mt-14 flex max-w-[900px] flex-col items-center justify-between gap-6 rounded-2xl bg-[rgba(255,255,255,0.96)] p-8 text-center sm:flex-row sm:text-left"
          {...(animated ? { "data-anim-header": true } : {})}
        >
          <div>
            <div className="font-serif text-xl font-medium leading-snug text-ink sm:text-2xl">
              {banner?.headline}{" "}
              {banner?.headlineEmphasis && (
                <em className="font-serif italic text-red">{banner.headlineEmphasis}</em>
              )}
            </div>
            {banner?.subtext && (
              <p className="mt-2 text-sm text-muted-text">{banner.subtext}</p>
            )}
          </div>
          {banner?.cta?.label && (
            <Button variant="brand" size="cta" asChild className="shrink-0">
              <a {...ctaProps(banner.cta)}>{banner.cta.label}</a>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
