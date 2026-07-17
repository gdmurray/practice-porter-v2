"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ctaProps, type CtaData } from "@/lib/cta";
import { cn } from "@/lib/utils";

export interface ApproachTabValue {
  _key?: string;
  label?: string;
  body?: string;
  link?: CtaData;
  kicker?: string;
  panelTitle?: string;
  image?: {
    asset?: {
      url?: string;
      metadata?: { dimensions?: { width?: number; height?: number } };
    };
    alt?: string;
  };
  cta?: CtaData;
}

function ApproachPanel({ item, className }: { item?: ApproachTabValue; className?: string }) {
  if (!item) return null;
  const imageUrl = item.image?.asset?.url;
  const dims = item.image?.asset?.metadata?.dimensions;

  return (
    <div className={className}>
      {item.label && <p className="eyebrow">{item.label}</p>}
      {item.kicker && (
        <p className="text-[11px] font-medium uppercase tracking-[1.4px] text-muted-text">
          {item.kicker}
        </p>
      )}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={item.image?.alt ?? ""}
          width={dims?.width}
          height={dims?.height}
          className="h-auto w-[190px]"
          loading="lazy"
        />
      )}
      {item.panelTitle && (
        <h3 className="font-serif text-2xl font-medium text-ink">{item.panelTitle}</h3>
      )}
      {item.cta?.label && (
        <Button variant="brand" size="cta" asChild className="mt-2">
          <a {...ctaProps(item.cta)}>{item.cta.label}</a>
        </Button>
      )}
    </div>
  );
}

// Mirrors TabsGroup's rAF-driven timer (pause on hover/focus, IO-armed,
// clock frozen not reset on pause) but drives a vertical numbered step
// list + a separate illustration panel instead of a horizontal tab bar,
// matching reference/Home.html's Approach section.
export function ApproachTabsGroup({
  value,
  animated = false,
}: {
  value: { items?: ApproachTabValue[]; autoRotateSeconds?: number };
  animated?: boolean;
}) {
  const items = value.items ?? [];
  const durationMs = (value.autoRotateSeconds ?? 12) * 1000;
  const autoRotate = durationMs > 0 && items.length > 1;

  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);

  const wrapRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pausedRef = useRef(false);
  const visibleRef = useRef(false);
  const startRef = useRef<number | null>(null);
  const pausedElapsedRef = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

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

  useEffect(() => {
    startRef.current = null;
    pausedElapsedRef.current = 0;
    setProgress(0);
  }, [activeIndex]);

  useEffect(() => {
    // On mobile, scroll position drives which step is active instead of a
    // timer (see the scroll-linked effect below), so skip the auto-rotate
    // loop entirely there to avoid the two mechanisms fighting each other.
    if (!autoRotate || !isDesktop) return;
    const el = wrapRef.current;
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
    // the effect above resets the clock on every step change instead.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoRotate, durationMs, items.length, isDesktop]);

  // Mobile: advance to the next step once the current step's card + panel
  // scrolls past the top of the viewport. Deliberately one-directional —
  // scrolling back up never reactivates a previous step, since snapping
  // content open/closed while scrolling up felt jarring. Only the current
  // step is observed at a time; the effect re-runs (and re-observes) as
  // `activeIndex` changes.
  useEffect(() => {
    if (isDesktop || items.length <= 1) return;

    const currentEl = stepRefs.current[activeIndex];
    if (!currentEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && entry.boundingClientRect.bottom <= 0) {
          setActiveIndex((i) => Math.min(i + 1, items.length - 1));
        }
      },
      { threshold: 0 }
    );

    observer.observe(currentEl);
    return () => observer.disconnect();
  }, [isDesktop, activeIndex, items.length]);

  if (items.length === 0) return null;

  const active = items[activeIndex];

  return (
    <div
      ref={wrapRef}
      className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12"
      {...(animated ? { "data-anim-header": true } : {})}
    >
      <div className="flex flex-col">
        {items.map((item, i) => {
          const isActive = i === activeIndex;
          return (
            <div key={item._key ?? i}>
              <div
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
              >
                <div onMouseEnter={pause} onMouseLeave={resume} onFocus={pause} onBlur={resume}>
                  <button
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className={cn(
                      "flex w-full cursor-pointer items-start gap-4 rounded-xl p-5 text-left transition-colors",
                      isActive ? "bg-vanilla" : "hover:bg-[rgba(43,26,20,0.03)]"
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-11 shrink-0 items-center justify-center rounded-full border font-serif text-sm font-semibold transition-all",
                        isActive
                          ? "scale-105 border-transparent bg-red text-white shadow-[0_6px_16px_rgba(143,46,24,0.32)]"
                          : "border-red/20 bg-white text-red-terra/70"
                      )}
                    >
                      {i + 1}
                    </span>
                    <div className="flex-1">
                      <h3
                        className={cn(
                          "font-serif text-lg font-medium transition-colors",
                          isActive ? "text-ink" : "text-muted-text"
                        )}
                      >
                        {item.label}
                      </h3>
                      <div
                        className={cn(
                          "mt-2 transition-opacity",
                          isActive ? "opacity-100" : "opacity-60"
                        )}
                      >
                        {item.body && (
                          <p className="text-sm leading-relaxed text-muted-text">{item.body}</p>
                        )}
                        {isActive && item.link?.label && (
                          <a
                            {...ctaProps(item.link)}
                            className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-red hover:text-red-terra"
                          >
                            {item.link.label} &rarr;
                          </a>
                        )}
                      </div>
                    </div>
                  </button>
                  {isActive && isDesktop && autoRotate && (
                    <div className="mx-5 mt-1 h-1 overflow-hidden rounded-full bg-[rgba(43,26,20,0.10)] motion-reduce:hidden">
                      <div className="h-full rounded-full bg-red" style={{ width: `${progress}%` }} />
                    </div>
                  )}
                </div>
                {/* Mobile: only the active step's panel content shows, directly
                    beneath that step, and its bottom edge is what the
                    scroll-linked effect above watches. Desktop swaps a single
                    shared panel instead (below). */}
                {isActive && (
                  <ApproachPanel
                    item={item}
                    className="mt-4 flex flex-col items-center gap-4 rounded-2xl bg-white p-10 text-center shadow-[0_20px_50px_rgba(43,26,20,0.08)] md:hidden"
                  />
                )}
              </div>
              {i < items.length - 1 && (
                <div className="flex items-center py-3 pl-10" aria-hidden="true">
                  <ChevronDown
                    className={cn(
                      "size-6 transition-colors",
                      activeIndex === i ? "text-red" : "text-red/20"
                    )}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <ApproachPanel
        item={active}
        className="hidden flex-col items-center gap-4 rounded-2xl bg-white p-10 text-center shadow-[0_20px_50px_rgba(43,26,20,0.08)] md:flex"
      />
    </div>
  );
}
