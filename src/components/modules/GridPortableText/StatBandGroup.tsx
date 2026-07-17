"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface StatBandItem {
  _key?: string;
  value?: string;
  suffix?: string;
  suffixColor?: "accent" | "text" | "red" | "terra" | "ink";
  label?: string;
}

// "accent" and "text" resolve to the section's theme tokens (e.g. white on a
// red band, red on a light section) — the fixed brand colors are for
// deliberate overrides that should stay the same regardless of theme.
const suffixColorVar: Record<string, string> = {
  accent: "var(--section-accent)",
  text: "var(--section-text)",
  red: "var(--red)",
  terra: "var(--red-terra)",
  ink: "var(--ink)",
};

// Splits a display value like "$280k" or "94%" into a non-numeric prefix, the
// numeric run to animate, and a non-numeric trailing portion, so count-up can
// run without the caller needing to separate those out in Sanity.
function parseCountableValue(value: string) {
  const match = value.match(/^(\D*)([\d,.]+)(.*)$/);
  if (!match) return null;
  const [, prefix, numStr, trailing] = match;
  const target = parseFloat(numStr.replace(/,/g, ""));
  if (Number.isNaN(target)) return null;
  const decimals = (numStr.split(".")[1] ?? "").length;
  return { prefix, trailing, target, decimals };
}

function StatValue({ value, countUp }: { value?: string; countUp: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !value || !countUp) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const parsed = parseCountableValue(value);
    if (!parsed) return;
    const { prefix, trailing, target, decimals } = parsed;

    let hasRun = false;
    const duration = 900;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || hasRun) return;
          hasRun = true;
          observer.disconnect();
          const start = performance.now();
          const frame = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = target * eased;
            const display = decimals
              ? current.toFixed(decimals)
              : Math.round(current).toLocaleString();
            el.textContent = `${prefix}${display}${trailing}`;
            if (progress < 1) requestAnimationFrame(frame);
            else el.textContent = value;
          };
          requestAnimationFrame(frame);
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, countUp]);

  return <span ref={ref}>{value}</span>;
}

export function StatBandGroup({
  value,
  animated = false,
}: {
  value: { stats?: StatBandItem[]; countUp?: boolean };
  animated?: boolean;
}) {
  const stats = value.stats ?? [];
  const countUp = value.countUp ?? true;

  return (
    <div
      className="flex flex-col items-center gap-10 sm:flex-row sm:items-stretch sm:justify-center sm:gap-0"
      {...(animated ? { "data-anim-list": true } : {})}
    >
      {stats.map((stat, i) => (
        <div
          key={stat._key ?? i}
          className={cn(
            "flex flex-1 flex-col items-center px-10 text-center",
            i > 0 && "sm:border-l"
          )}
          style={
            i > 0
              ? { borderColor: "color-mix(in srgb, var(--section-muted) 45%, transparent)" }
              : undefined
          }
        >
          <div
            className="font-serif text-[56px] font-medium leading-none sm:text-[64px]"
            style={{ color: "var(--section-text)" }}
          >
            <StatValue value={stat.value} countUp={countUp} />
            {stat.suffix && (
              <span
                className="text-[0.6em]"
                style={{ color: suffixColorVar[stat.suffixColor ?? "accent"] }}
              >
                {stat.suffix}
              </span>
            )}
          </div>
          {stat.label && (
            <div
              className="mt-3 text-sm leading-snug"
              style={{ color: "color-mix(in srgb, var(--section-text) 85%, transparent)" }}
            >
              {stat.label}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
