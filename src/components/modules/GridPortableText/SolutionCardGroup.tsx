"use client";

import { useState, type MouseEvent } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export interface SolutionCardValue {
  title?: string;
  image?: {
    asset?: {
      url?: string;
      metadata?: { dimensions?: { width?: number; height?: number } };
    };
    alt?: string;
  };
  details?: string[];
  expandableTitle?: string;
  checks?: string[];
}

// Standalone use (`bare: false`) draws its own card chrome so it can be
// dropped directly into a grid column. Nested use inside `TabsGroup`
// (`bare: true`) reuses the exact same inner markup but lets the tabs
// wrapper own the outer chrome instead, so the tab bar and panel read as one
// continuous card — matching `.sol-card` in the Practice Performance Report
// reference while keeping this component identical for both call sites.
export function SolutionCardGroup({
  value,
  animated = false,
  bare = false,
}: {
  value: SolutionCardValue;
  animated?: boolean;
  bare?: boolean;
}) {
  const imageUrl = value.image?.asset?.url;
  const dims = value.image?.asset?.metadata?.dimensions;
  const hasChecks = (value.checks?.length ?? 0) > 0;

  // Accordion is controlled so a click anywhere on the card body (not just
  // the "See More" trigger) can toggle it too, matching `.cas-card.is-clickable`
  // in the reference — the whole card is `role="button"` there.
  const [open, setOpen] = useState(false);

  function handleCardClick(e: MouseEvent<HTMLElement>) {
    if (!hasChecks) return;
    const target = e.target as HTMLElement;
    // Let the CTA link navigate and let the trigger button manage its own
    // toggle (it already flows through `onValueChange` below) — anything
    // else on the card falls through to toggle open/closed.
    if (target.closest("a, button")) return;
    setOpen((o) => !o);
  }

  // The Trigger lives inside the copy pane (directly under the details list,
  // matching `.cas-expand-hint`'s placement in the reference) while the
  // Content panel spans the full card width below the two-column grid.
  // Radix's Accordion only requires a shared `AccordionItem` ancestor, not
  // DOM adjacency, so this split placement is safe.
  const inner = (
    <Accordion
      type="single"
      collapsible
      value={open ? "details" : ""}
      onValueChange={(v) => setOpen(v === "details")}
      onClick={bare ? handleCardClick : undefined}
      className={cn(bare && hasChecks && "cursor-pointer")}
    >
      <AccordionItem value="details" className="border-b-0">
        <div className="grid grid-cols-1 items-center md:grid-cols-2">
          <div className="order-2 p-8 text-left md:order-1 lg:p-14">
            {value.title && (
              <h3 className="mb-5 text-left font-serif text-[28px] font-medium leading-tight text-ink lg:text-[32px]">
                {value.title}
              </h3>
            )}
            {value.details?.map((line, i) => (
              <div
                key={i}
                className={cn(
                  "py-3 text-left text-[15.5px] leading-relaxed text-charcoal",
                  i > 0 && "border-t border-border-color"
                )}
              >
                {line}
              </div>
            ))}
            {hasChecks && (
              <AccordionPrimitive.Trigger className="group eyebrow mt-5 inline-flex w-fit cursor-pointer items-center gap-1.5 border-0 bg-transparent p-0 text-left outline-none focus-visible:underline">
                <span className="group-data-[state=open]:hidden">See More</span>
                <span className="hidden group-data-[state=open]:inline">See Less</span>
                <ChevronDown className="size-3.5 shrink-0 transition-transform duration-400 ease-in-out group-data-[state=open]:rotate-180" />
              </AccordionPrimitive.Trigger>
            )}
          </div>
          <div className="relative order-1 aspect-4/3 overflow-hidden md:order-2 md:aspect-auto md:h-full md:min-h-[420px]">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={value.image?.alt ?? ""}
                width={dims?.width}
                height={dims?.height}
                className="absolute inset-0 size-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 bg-vanilla" />
            )}
            {/* Feathers the photo's left edge into the copy pane's white
                background instead of a hard seam. Only meaningful once the
                two panes sit side by side, so it's hidden on the stacked
                mobile layout. */}
            <div className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(90deg,#fff_0%,rgba(255,255,255,0)_38%)] md:block" />
          </div>
        </div>
        {hasChecks && (
          // Bypasses shadcn's `AccordionContent` (fixed 200ms `ease-out`) for a
          // custom timing that mirrors the reference's `.cas-more`: height
          // grows over .85s with a slow cubic-bezier, while the checks/CTA
          // fade in over .6s (`group/content` lets the inner div read the
          // outer Content's `data-state` to drive that fade). `border-t` sits
          // on the height-animated panel itself so — like `.cas-more` — it's
          // clipped away while collapsed and only reveals as it expands.
          <AccordionPrimitive.Content className="group/content overflow-hidden duration-850 ease-in-out data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <div className="border-t border-border-color px-8 pt-7 pb-10 text-left opacity-0 transition-opacity duration-600 ease-out [&_a]:no-underline [&_a]:hover:text-white group-data-[state=open]/content:opacity-100 lg:px-14">
              <div className="eyebrow mb-3.5 text-left">
                {value.expandableTitle || "The Practice Porter Solution"}
              </div>
              <ul className="grid grid-cols-1 gap-3.5 text-left sm:grid-cols-2">
                {value.checks?.map((check, i) => (
                  <li key={i} className="flex items-start gap-3 text-left text-sm leading-relaxed text-ink">
                    <span className="mt-0.5 flex size-[22px] shrink-0 items-center justify-center rounded-full bg-vanilla">
                      <Check className="size-3 text-red" />
                    </span>
                    {check}
                  </li>
                ))}
              </ul>
              <Button variant="brand" size="cta" className="mt-6 no-underline" asChild>
                <a href="#book" data-cta-type="book_meeting" className="no-underline">
                  Book a Free Consultation
                </a>
              </Button>
            </div>
          </AccordionPrimitive.Content>
        )}
      </AccordionItem>
    </Accordion>
  );

  if (bare) return inner;

  return (
    <div
      onClick={handleCardClick}
      className={cn(
        "overflow-hidden rounded-2xl border border-border-color bg-white shadow-[0_20px_50px_rgba(43,26,20,0.10)] transition-[box-shadow,transform] duration-300",
        hasChecks && "cursor-pointer hover:-translate-y-[3px] hover:shadow-[0_28px_64px_rgba(43,26,20,0.16)]"
      )}
      {...(animated ? { "data-anim-header": true } : {})}
    >
      {inner}
    </div>
  );
}
