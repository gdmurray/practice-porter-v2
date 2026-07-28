"use client";

import { PortableText, type PortableTextBlock } from "@portabletext/react";
import { cn } from "@/lib/utils";
import { makeComponents } from "./makeComponents";

interface GridPortableTextProps {
  value: PortableTextBlock[];
  className?: string;
  centered?: boolean;
  animated?: boolean;
  /** Hero-only page-load entrance (title/subtitle/CTA), independent of
   *  scroll-triggered `animated` — see makeComponents.tsx. */
  heroAnimated?: boolean;
}

export function GridPortableText({
  value,
  className,
  centered = false,
  animated = false,
  heroAnimated = false,
}: GridPortableTextProps) {
  if (!value?.length) return null;
  const components = makeComponents(centered, animated, heroAnimated);
  return (
    <div className={cn("space-y-4", className)}>
      <PortableText value={value} components={components} />
    </div>
  );
}
