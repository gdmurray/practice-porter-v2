"use client";

import { ArrowRight } from "lucide-react";
import { getIcon } from "@/lib/icons";
import { ctaProps, type CtaData } from "@/lib/cta";
import { cn } from "@/lib/utils";

export interface FeatureCardItem {
  _key?: string;
  icon?: string;
  iconLocation?: "left" | "top";
  title: string;
  description: string;
  type?: "default" | "link";
  cta?: Partial<CtaData>;
}

export function FeatureCardsGroup({
  value,
  animated = false,
}: {
  value: { columns?: number; items?: FeatureCardItem[] };
  animated?: boolean;
}) {
  const cols = value.columns ?? 3;
  // The 2-up layout (e.g. the "Complete Your Front Desk Solution" cross-links)
  // reads as a centered pair with a tight gap, not two stretched grid tracks —
  // mirrors reference/Call Answering Solutions.html's `.pairs-grid` (flex +
  // justify-center) rather than the evenly-stretched grid used for 3/4 cards.
  const isTwoColumn = cols === 2;
  const containerClass = isTwoColumn
    ? "flex flex-wrap justify-center gap-5"
    : cn(
        "grid gap-5",
        cols === 4 ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" : "grid-cols-1 md:grid-cols-3"
      );

  return (
    <div
      className={containerClass}
      {...(animated ? { "data-anim-list": true } : {})}
    >
      {value.items?.map((card, i) => {
        const Icon = card.icon ? getIcon(card.icon) : null;
        const isLink = card.type === "link" && Boolean(card.cta?.href);
        const isTopIcon = card.iconLocation === "top";
        const CardTag = isLink ? "a" : "div";
        const linkProps = isLink ? ctaProps(card.cta as CtaData) : {};

        const arrow = isLink && (
          <ArrowRight
            className="size-[18px] shrink-0 text-red transition-transform duration-300 ease-out group-hover:translate-x-1 group-focus-visible:translate-x-1"
            aria-hidden="true"
          />
        );

        // Icon-on-top matches reference/About Us.html's "focus-card" — the
        // description is always visible (no room-constrained reveal), so it
        // doesn't need the fixed min-height trick the left-icon link cards use.
        if (isTopIcon) {
          return (
            <CardTag
              key={card._key ?? i}
              {...linkProps}
              className={cn(
                "group flex w-full max-w-[380px] flex-col items-start rounded-2xl border border-[rgba(163,39,5,0.12)] bg-white px-[34px] py-10 text-left transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-[rgba(163,39,5,0.3)] hover:shadow-[0_10px_24px_rgba(163,39,5,0.08)]",
                !isTwoColumn && "mx-auto",
                isLink ? "cursor-pointer" : "cursor-default"
              )}
            >
              {Icon && (
                <div className="mb-[22px] flex size-[46px] shrink-0 items-center justify-center rounded-full bg-vanilla text-red">
                  <Icon className="size-[23px]" />
                </div>
              )}
              <div className="mb-3 flex w-full items-center justify-between gap-3">
                <div className="text-left font-serif text-[21px] font-medium leading-tight text-ink">
                  {card.title}
                </div>
                {arrow}
              </div>
              <div className="text-left text-[14.5px] leading-[1.6] text-muted-text">
                {card.description}
              </div>
            </CardTag>
          );
        }

        return (
          <CardTag
            key={card._key ?? i}
            {...linkProps}
            className={cn(
              "group flex w-full max-w-[380px] items-center gap-3.5 rounded-2xl border border-[rgba(163,39,5,0.12)] bg-white p-5 text-left transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-[rgba(163,39,5,0.3)] hover:shadow-[0_10px_24px_rgba(163,39,5,0.08)]",
              // In the flex (2-up) layout, justify-center already centers the
              // pair as a group — mx-auto here would add its own auto-margin
              // behavior on top and space the cards apart instead.
              !isTwoColumn && "mx-auto",
              // Fixed floor tall enough for title + revealed description, so
              // the card's own height never changes on hover — only the
              // content inside it re-centers (see the content wrapper below).
              isLink ? "min-h-[130px] cursor-pointer" : "cursor-default"
            )}
          >
            {Icon && (
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-vanilla text-red">
                <Icon className="size-[21px]" />
              </div>
            )}
            {/* A single vertically-centered flex column. Combined with the
                card's fixed min-h and its own items-center, this block (not
                the card) grows/shrinks around its own center as the
                description reveals — title-only centers in the fixed card
                height at rest, and shifts up as the description fades in. */}
            <div className="flex min-w-0 flex-1 flex-col justify-center">
              <div
                className={cn(
                  "text-left font-serif font-medium leading-tight text-ink",
                  isLink ? "text-[16px]" : "mb-0.5 text-[19px]"
                )}
              >
                {card.title}
              </div>
              <div
                className={cn(
                  "text-left text-[12.5px] leading-[1.55] text-muted-text",
                  isLink &&
                    "max-h-0 overflow-hidden opacity-0 transition-[max-height,opacity,margin-top] duration-300 ease-out group-hover:mt-1 group-hover:max-h-12 group-hover:opacity-100 group-focus-visible:mt-1 group-focus-visible:max-h-12 group-focus-visible:opacity-100"
                )}
              >
                {card.description}
              </div>
            </div>
            {arrow}
          </CardTag>
        );
      })}
    </div>
  );
}
