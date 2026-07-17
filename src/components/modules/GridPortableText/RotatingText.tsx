"use client";

import type { ReactNode } from "react";

export interface RotatingTextValue {
  words?: string[];
}

interface RotatingTextProps {
  value?: RotatingTextValue;
  children?: ReactNode;
}

// Renders the `rotatingText` mark annotation. Matches reference/About Us.html's
// `.rotw` (About hero rotating word): each word is stacked via `inline-grid` /
// `grid-area: 1 / 1` and cross-fades in on a 3s-per-word cycle. Deliberately
// carries no typography (no italic/color/font) — those come from whatever
// decorator marks (Italic, Bold, Highlight, Serif, ...) are nested with this
// annotation on the same text selection, and from the parent block style.
export function RotatingText({ value, children }: RotatingTextProps) {
  const words = value?.words?.filter(Boolean) ?? [];

  if (words.length < 2) {
    return <>{children}</>;
  }

  const cycleSeconds = words.length * 3;

  return (
    <span className="rotw" aria-label={words.join(" ")}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden="true"
          style={{
            animationDuration: `${cycleSeconds}s`,
            animationDelay: `${i * 3}s`,
          }}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
