"use client";

import { useEffect, useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getIcon } from "@/lib/icons";
import { SolutionCardGroup, type SolutionCardValue } from "./SolutionCardGroup";

export interface TabItemValue {
  _key?: string;
  title?: string;
  icon?: string;
  content?: SolutionCardValue;
}

export function TabsGroup({
  value,
  animated = false,
}: {
  value: { items?: TabItemValue[]; autoRotateSeconds?: number };
  animated?: boolean;
}) {
  const items = value.items ?? [];
  const durationMs = (value.autoRotateSeconds ?? 20) * 1000;
  const autoRotate = durationMs > 0 && items.length > 1;

  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const cardRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const visibleRef = useRef(false);
  const startRef = useRef<number | null>(null);
  const pausedElapsedRef = useRef(0);

  // Freeze/resume the elapsed clock without resetting it, mirroring the
  // reference's mouseenter/mouseleave pause behavior.
  function pause() {
    pausedRef.current = true;
    if (startRef.current !== null) {
      pausedElapsedRef.current += performance.now() - startRef.current;
      startRef.current = null;
    }
  }
  function resume() {
    pausedRef.current = false;
  }

  // Every time the active tab changes (auto-advance or manual click) start a
  // fresh full-duration window for the new tab.
  useEffect(() => {
    startRef.current = null;
    pausedElapsedRef.current = 0;
    setProgress(0);
  }, [activeIndex]);

  useEffect(() => {
    if (!autoRotate) return;
    const el = cardRef.current;
    let rafId: number;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visibleRef.current = true;
        });
      },
      { threshold: 0.35 }
    );
    if (el) observer.observe(el);

    function loop(t: number) {
      rafId = requestAnimationFrame(loop);
      if (pausedRef.current || !visibleRef.current) return;
      if (startRef.current === null) startRef.current = t;
      const elapsed = t - startRef.current + pausedElapsedRef.current;
      const pct = Math.min(elapsed / durationMs, 1);
      setProgress(pct * 100);
      if (pct >= 1) {
        setActiveIndex((i) => (i + 1) % items.length);
      }
    }
    rafId = requestAnimationFrame(loop);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
    // Deliberately excludes `activeIndex` — the loop reads it via refs and
    // the effect above resets the clock on every tab change instead.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoRotate, durationMs, items.length]);

  if (items.length === 0) return null;

  return (
    <Tabs
      ref={cardRef}
      value={String(activeIndex)}
      onValueChange={(v) => setActiveIndex(Number(v))}
      className="mx-auto w-full max-w-[900px] gap-0 overflow-hidden rounded-2xl border border-border-color bg-white shadow-[0_20px_50px_rgba(43,26,20,0.10)]"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
      {...(animated ? { "data-anim-header": true } : {})}
    >
      {/* Stacked full-width rows read easier on narrow phones than a
          squeezed, wrapping/scrolling horizontal row — switches back to the
          single row from the reference at `sm` and up. */}
      <TabsList
        aria-label="Solutions"
        // `!h-auto` is required here — the shared `TabsList` base styling
        // forces a fixed `h-9` via `group-data-horizontal/tabs:h-9`, which
        // otherwise wins over a plain `h-auto` and silently clips the
        // stacked mobile tabs down to a single row's height.
        className="h-auto! w-full flex-col items-stretch justify-start gap-1.5 rounded-none bg-transparent px-3 py-3 sm:min-h-[70px] sm:flex-row sm:items-center sm:gap-2 sm:px-[22px] sm:py-0"
      >
        {items.map((item, i) => {
          const Icon = item.icon ? getIcon(item.icon) : null;
          return (
            <TabsTrigger
              key={item._key ?? i}
              value={String(i)}
              className="w-full flex-none cursor-pointer justify-start gap-2 whitespace-nowrap rounded-lg border-none px-3 py-2 font-serif text-[15px] font-semibold text-muted-text shadow-none transition-colors data-[state=inactive]:hover:text-foreground data-active:bg-vanilla data-active:text-red data-active:shadow-none sm:w-auto sm:flex-1 sm:justify-center sm:py-3.5 sm:text-base"
            >
              {Icon && <Icon className="size-[17px]" />}
              {item.title}
            </TabsTrigger>
          );
        })}
      </TabsList>
      {autoRotate && (
        // No CSS transition on the fill — the rAF loop already drives a smooth
        // 60fps width update, so layering a competing CSS transition on top
        // just makes it visibly "creep" for a moment after pausing instead of
        // freezing instantly on hover.
        <div className="mx-[26px] h-1.5 overflow-hidden rounded-full bg-[rgba(43,26,20,0.12)] motion-reduce:hidden">
          <div className="h-full rounded-full bg-red" style={{ width: `${progress}%` }} />
        </div>
      )}
      {items.map((item, i) =>
        item.content ? (
          <TabsContent key={item._key ?? i} value={String(i)}>
            <SolutionCardGroup value={item.content} bare animated={animated} />
          </TabsContent>
        ) : null
      )}
    </Tabs>
  );
}
