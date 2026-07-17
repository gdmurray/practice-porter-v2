"use client";

import { type PortableTextBlock } from "@portabletext/react";
import { getModuleLayoutAttrs, type ModuleLayoutValue } from "@/lib/moduleLayout";
import { LegalRenderer } from "./LegalRenderer";

export interface LegalProps {
  theme?: string;
  moduleLayout?: ModuleLayoutValue | null;
  title?: string | null;
  dateSource?: string | null;
  effectiveDate?: string | null;
  content?: PortableTextBlock[] | null;
}

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function Legal({
  theme = "white",
  moduleLayout,
  title,
  dateSource = "updated",
  effectiveDate,
  content,
}: LegalProps) {
  const dateLabel = dateSource === "effective" ? "Effective Date" : "Last updated";

  return (
    <section
      data-theme={theme}
      className="pp-section"
      style={{ background: "var(--section-bg)" }}
      {...getModuleLayoutAttrs(moduleLayout)}
    >
      <div className="pp-container-narrow">
        {title && (
          <h1 className="mb-6 font-serif text-[clamp(36px,4vw,52px)] font-normal leading-[1.1] tracking-[-0.3px] text-ink">
            {title}
          </h1>
        )}
        {effectiveDate && (
          <p className="mb-7 text-[13px] text-ink/50">
            {dateLabel}: {formatDate(effectiveDate)}
          </p>
        )}
        <div className="mb-11 h-0.5 w-12 rounded-full bg-red" />
        <LegalRenderer value={content} />
      </div>
    </section>
  );
}
