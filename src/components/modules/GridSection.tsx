"use client";

import { cn } from "@/lib/utils";
import { GridPortableText } from "./GridPortableText";
import type { PortableTextBlock } from "@portabletext/react";

interface GridColumnData {
  _key?: string;
  width?: "auto" | "half" | "oneThird" | "twoThirds" | "full";
  verticalAlign?: "top" | "center" | "bottom";
  content?: PortableTextBlock[];
}

interface GridRowData {
  _key?: string;
  alignment?: "left" | "center";
  columns?: GridColumnData[];
}

export interface GridSectionProps {
  name?: string;
  sectionId?: string;
  theme?: string;
  rows?: GridRowData[];
}

const themeBgMap: Record<string, string> = {
  cream: "bg-off-white",
  white: "bg-white",
  dark: "bg-midnight",
};

const colWidthClass: Record<string, string> = {
  full: "col-span-full",
  half: "col-span-6",
  oneThird: "col-span-4",
  twoThirds: "col-span-8",
  auto: "",
};

const verticalAlignClass: Record<string, string> = {
  top: "self-start",
  center: "self-center",
  bottom: "self-end",
};

function resolveGridTemplate(columns: GridColumnData[]): string {
  const hasExplicitWidth = columns.some(
    (c) => c.width && c.width !== "auto"
  );
  if (!hasExplicitWidth) {
    return `grid-cols-1 md:grid-cols-${columns.length}`;
  }
  return "grid-cols-12";
}

export function GridSection({
  sectionId,
  theme = "cream",
  rows = [],
}: GridSectionProps) {
  const bg = themeBgMap[theme] ?? themeBgMap.cream;

  return (
    <section
      id={sectionId ?? undefined}
      data-theme={theme}
      className={cn("pp-section", bg)}
    >
      <div className="pp-container space-y-14">
        {rows.map((row, ri) => {
          const columns = row.columns ?? [];
          const isCentered = row.alignment === "center";
          const colCount = columns.length;
          const allAuto = columns.every(
            (c) => !c.width || c.width === "auto"
          );

          const gridClass = allAuto
            ? colCount === 1
              ? ""
              : colCount === 2
                ? "grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16"
                : colCount === 3
                  ? "grid grid-cols-1 gap-8 md:grid-cols-3"
                  : "grid grid-cols-1 gap-8 md:grid-cols-4"
            : "grid grid-cols-12 gap-12 md:gap-16";

          return (
            <div
              key={row._key ?? ri}
              className={cn(
                gridClass,
                isCentered && "text-center"
              )}
            >
              {columns.map((col, ci) => {
                const width = col.width ?? "auto";
                const vAlign = col.verticalAlign ?? "center";
                const widthCls =
                  !allAuto && width !== "auto"
                    ? colWidthClass[width]
                    : !allAuto
                      ? `col-span-${12 / colCount}`
                      : "";

                return (
                  <div
                    key={col._key ?? ci}
                    className={cn(
                      widthCls,
                      verticalAlignClass[vAlign],
                      // Constrain single centered text columns; skip for explicit full-width columns
                      isCentered &&
                        colCount === 1 &&
                        width !== "full" &&
                        "mx-auto max-w-[680px]"
                    )}
                  >
                    {col.content && (
                      <GridPortableText value={col.content} centered={isCentered && colCount === 1} />
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </section>
  );
}
