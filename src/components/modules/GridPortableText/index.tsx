"use client";

import { PortableText, type PortableTextBlock } from "@portabletext/react";
import { cn } from "@/lib/utils";
import { makeComponents } from "./makeComponents";

interface GridPortableTextProps {
  value: PortableTextBlock[];
  className?: string;
  centered?: boolean;
}

export function GridPortableText({
  value,
  className,
  centered = false,
}: GridPortableTextProps) {
  if (!value?.length) return null;
  const components = makeComponents(centered);
  return (
    <div className={cn("space-y-4", className)}>
      <PortableText value={value} components={components} />
    </div>
  );
}
