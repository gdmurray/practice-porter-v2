"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TestimonialItem {
  _key?: string;
  quote?: string;
  author?: string;
  role?: string;
  avatar?: string;
}

const FADE_MS = 250;

function TestimonialCard({ item }: { item: TestimonialItem }) {
  return (
    <div className="min-h-[180px] rounded-lg border border-[rgba(43,26,20,0.08)] bg-white px-11 py-10 shadow-[0_14px_40px_rgba(43,26,20,0.08)]">
      {item.quote && (
        <blockquote className="text-left font-sans text-lg font-medium leading-[1.4] tracking-[0.3px] text-ink">
          &ldquo;{item.quote}&rdquo;
        </blockquote>
      )}
      {(item.author || item.role) && (
        <div className="mt-5 text-left text-sm text-muted-text">
          {item.author}
          {item.author && item.role ? ", " : null}
          {item.role}
        </div>
      )}
    </div>
  );
}

// Mirrors the auto-advance + hover-pause behavior established in
// TabsGroup/ApproachTabsGroup, but on a simple setTimeout schedule (matching
// reference/Home.html's `tSchedule`/`tAdvance`) since there's no progress bar
// to drive here — just a crossfade between single quotes.
function TestimonialCarousel({
  items,
  autoRotateSeconds,
  animated,
}: {
  items: TestimonialItem[];
  autoRotateSeconds: number;
  animated: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const pausedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((next: number) => {
    setVisible(false);
    fadeTimerRef.current = setTimeout(() => {
      setIndex(next);
      setVisible(true);
    }, FADE_MS);
  }, []);

  const schedule = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (pausedRef.current || autoRotateSeconds <= 0) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    timerRef.current = setTimeout(() => {
      goTo((index + 1) % items.length);
    }, autoRotateSeconds * 1000);
  }, [autoRotateSeconds, goTo, index, items.length]);

  useEffect(() => {
    schedule();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  function pause() {
    pausedRef.current = true;
    if (timerRef.current) clearTimeout(timerRef.current);
  }
  function resume() {
    pausedRef.current = false;
    schedule();
  }

  const active = items[index];
  if (!active) return null;

  return (
    <div
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
      {...(animated ? { "data-anim-header": true } : {})}
    >
      <div
        className={cn(
          "transition-opacity duration-250 motion-reduce:transition-none",
          visible ? "opacity-100" : "opacity-0"
        )}
      >
        <TestimonialCard item={active} />
      </div>
      {items.length > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2.5">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => goTo((index - 1 + items.length) % items.length)}
            className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-[rgba(43,26,20,0.2)] bg-white text-ink transition-all duration-200 hover:border-red hover:bg-cream hover:text-red"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => goTo((index + 1) % items.length)}
            className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-[rgba(43,26,20,0.2)] bg-white text-ink transition-all duration-200 hover:border-red hover:bg-cream hover:text-red"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export function TestimonialGroup({
  value,
  animated = false,
}: {
  value: {
    items?: TestimonialItem[];
    variant?: "grid" | "carousel";
    autoRotateSeconds?: number;
  };
  animated?: boolean;
}) {
  const items = value.items ?? [];
  if (items.length === 0) return null;

  if (value.variant === "carousel") {
    return (
      <TestimonialCarousel
        items={items}
        autoRotateSeconds={value.autoRotateSeconds ?? 15}
        animated={animated}
      />
    );
  }

  return (
    <div
      className="grid grid-cols-1 gap-8 md:grid-cols-2"
      {...(animated ? { "data-anim-list": true } : {})}
    >
      {items.map((t, i) => (
        <TestimonialCard key={t._key ?? i} item={t} />
      ))}
    </div>
  );
}
