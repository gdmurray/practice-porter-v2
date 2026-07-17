"use client";

import { cn } from "@/lib/utils";
import { getModuleLayoutAttrs, type ModuleLayoutValue } from "@/lib/moduleLayout";
import { sanityImageUrl, type SanityImageValue } from "@/lib/sanityImage";
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

interface BackgroundImageData extends SanityImageValue {
  alt?: string;
}

type CirclePosition = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";

export interface GridSectionProps {
  name?: string;
  sectionId?: string;
  theme?: string;
  maxWidth?: number | null;
  backgroundImage?: BackgroundImageData | null;
  gradientDirection?: "none" | "left" | "right" | null;
  isHero?: boolean | null;
  circlePattern?: boolean | null;
  circlePosition?: CirclePosition | null;
  rows?: GridRowData[];
  moduleLayout?: ModuleLayoutValue | null;
}

const themeBgMap: Record<string, string> = {
  white: "bg-white",
  lotion: "bg-lotion",
  cream: "bg-cream",
  vanilla: "bg-vanilla",
  red: "bg-red",
  gradient: "",
};

// md:-prefixed so explicit-width columns only take their fractional span at
// the `md` breakpoint and up — below that, every column in a `grid-cols-1`
// row is naturally full-width. Without the prefix these spans applied at
// ALL viewport widths (see the row's grid template below), which forced a
// fixed 12-column layout on phones too: a "half" column stayed pinned at
// 50% of a ~300px container instead of stacking, and any content inside
// that couldn't shrink to fit (images, cards, non-wrapping text) overflowed
// the section — clipped rather than scrollable, since the section itself
// has `overflow-hidden`.
const colWidthClass: Record<string, string> = {
  full: "col-span-full",
  half: "md:col-span-6",
  oneThird: "md:col-span-4",
  twoThirds: "md:col-span-8",
  auto: "",
};

// Literal (non-interpolated) class names so Tailwind's static scanner can
// find them — a template string like `col-span-${12 / colCount}` never
// appears as complete text in source, so Tailwind can't generate it.
const evenSpanClass: Record<number, string> = {
  1: "md:col-span-12",
  2: "md:col-span-6",
  3: "md:col-span-4",
  4: "md:col-span-3",
  6: "md:col-span-2",
  12: "md:col-span-1",
};

const verticalAlignClass: Record<string, string> = {
  top: "self-start",
  center: "self-center",
  bottom: "self-end",
};

const circlePositionClass: Record<CirclePosition, string> = {
  topRight: "circle-pattern--topRight",
  topLeft: "circle-pattern--topLeft",
  bottomRight: "circle-pattern--bottomRight",
  bottomLeft: "circle-pattern--bottomLeft",
};

// The overlay is painted with the theme's own background (solid or gradient)
// then faded out with a mask, so it works regardless of whether --section-bg
// is a flat color or a multi-stop gradient (e.g. the "gradient" theme).
// Fully solid through the first half of the section, then tapers to
// transparent across the second half, so text stays fully legible against
// the photo and the fade itself reads as a deliberate, punchy transition
// rather than a faint tint.
const gradientMaskMap: Record<string, string> = {
  left: "linear-gradient(to right, #000 0%, #000 50%, transparent 100%)",
  right: "linear-gradient(to left, #000 0%, #000 50%, transparent 100%)",
};

// Same idea, but scoped to the (much smaller) hero image panel rather than
// the full section. The hero text column (max-w-900px, centered in the
// container) overlaps roughly the inner ~45% of this panel at typical
// desktop widths, so the overlay stays solid through that stretch to keep
// copy legible, then eases out — fully clear by 80% of the panel. Uses
// several intermediate stops (rather than a single opaque→transparent
// segment) to approximate an ease-in-out S-curve: a plain two-stop linear
// fade has a visible "elbow" where it snaps from flat into a straight
// decline, which reads as an abrupt cut rather than a soft dissolve.
const heroGradientMaskMap: Record<string, string> = {
  left: "linear-gradient(to right, #000 0%, #000 40%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.15) 70%, transparent 80%)",
  right: "linear-gradient(to left, #000 0%, #000 40%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.15) 70%, transparent 80%)",
};

// On mobile the hero text column is full-width and sits over the image
// panel, so fading the overlay all the way to transparent makes dark copy
// unreadable against the photo. Same S-curve shape as desktop, but the
// mask floors at ~45% — higher = more --section-bg wash, less photo
// showing through, better text contrast.
const heroGradientMaskMobileMap: Record<string, string> = {
  left: "linear-gradient(to right, #000 0%, #000 40%, rgba(0,0,0,0.85) 55%, rgba(0,0,0,0.6) 75%, rgba(0,0,0,0.45) 100%)",
  right: "linear-gradient(to left, #000 0%, #000 40%, rgba(0,0,0,0.85) 55%, rgba(0,0,0,0.6) 75%, rgba(0,0,0,0.45) 100%)",
};

// In hero mode the background image is anchored to the side OPPOSITE the
// gradient overlay: the gradient fades to transparent moving away from its
// named side, so the image needs to stay visible (unclipped) on that far
// side — e.g. a "left" gradient (solid on the left, fading right) pushes a
// narrow image to hug the right edge. Defaults to "right" when there's no
// gradient direction to derive from.
const heroOppositeSideMap: Record<string, "left" | "right"> = {
  left: "right",
  right: "left",
  none: "right",
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
  theme = "lotion",
  maxWidth,
  backgroundImage,
  gradientDirection,
  isHero,
  circlePattern,
  circlePosition,
  rows = [],
  moduleLayout,
}: GridSectionProps) {
  const bg = themeBgMap[theme] ?? themeBgMap.lotion;
  const animated = moduleLayout?.animated ?? false;
  const contentMaxWidth =
    typeof maxWidth === "number" && maxWidth > 0 ? maxWidth : undefined;

  const sectionStyle = {
    ...(theme === "gradient" ? { background: "var(--hero-gradient)" } : {}),
    ...(isHero ? { maxHeight: "80vh" } : {}),
  };

  // No explicit width/height: this renders full-bleed and gets further
  // cropped by CSS `object-cover` at whatever size the section ends up, so
  // we only need the CDN to bake in the editor's Studio crop rect here.
  const imageUrl = sanityImageUrl(backgroundImage);
  const overlayMask = gradientDirection ? gradientMaskMap[gradientDirection] : undefined;
  const heroOverlayMask = gradientDirection ? heroGradientMaskMap[gradientDirection] : undefined;
  const heroOverlayMaskMobile = gradientDirection
    ? heroGradientMaskMobileMap[gradientDirection]
    : undefined;

  // In hero mode the image is a height-filling panel anchored to one edge —
  // NOT stretched across the full section width. A full-bleed `object-cover`
  // over a wide, short (80vh-capped) box forces an aggressive zoom on most
  // photo aspect ratios. Instead: fill the section's height, take three
  // quarters of the width on mobile / half on desktop (scales with the
  // container instead of a fixed vw/px cap), and anchor it to the side
  // opposite the gradient. If the panel's aspect ratio still doesn't
  // perfectly match, excess is cropped from the bottom (top-aligned) and
  // from the far side (away from the anchor).
  const heroHorizontalSide = heroOppositeSideMap[gradientDirection ?? "none"] ?? "right";

  // Brand rule: never on the gradient theme, and never layered on top of a
  // background image (the reference handoffs never combine the two).
  const showCirclePattern = Boolean(circlePattern) && theme !== "gradient" && !imageUrl;

  return (
    <section
      id={sectionId ?? undefined}
      data-theme={theme}
      className={cn("pp-section relative overflow-hidden", bg)}
      style={sectionStyle}
      {...getModuleLayoutAttrs(moduleLayout)}
    >
      {imageUrl && isHero && (
        <div
          className={cn(
            // Wider on mobile so the photo still fills most of the frame;
            // desktop keeps the half-width panel for the photo-forward look.
            "absolute inset-y-0 w-3/4 md:w-1/2",
            heroHorizontalSide === "left" ? "left-0" : "right-0"
          )}
        >
          <img
            src={imageUrl}
            alt={backgroundImage?.alt ?? ""}
            className="size-full object-cover object-top"
            // Hero sections render at the top of the page and this image is
            // almost always the LCP element, so it's loaded eagerly and at
            // the browser's highest fetch priority instead of the default
            // lazy/auto treatment used elsewhere.
            loading="eager"
            fetchPriority="high"
            decoding="sync"
          />
          {heroOverlayMask && heroOverlayMaskMobile && (
            // Scoped to the panel itself (not the full section) so the fade
            // always spans the image's actual bounds, regardless of how
            // wide the panel ends up being. Mobile uses a separate mask
            // that never fully clears (see heroGradientMaskMobileMap).
            <>
              <div
                aria-hidden="true"
                className="absolute inset-0 md:hidden"
                style={{
                  background: "var(--section-bg)",
                  maskImage: heroOverlayMaskMobile,
                  WebkitMaskImage: heroOverlayMaskMobile,
                }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 hidden md:block"
                style={{
                  background: "var(--section-bg)",
                  maskImage: heroOverlayMask,
                  WebkitMaskImage: heroOverlayMask,
                }}
              />
            </>
          )}
        </div>
      )}
      {imageUrl && !isHero && (
        <>
          <img
            src={imageUrl}
            alt={backgroundImage?.alt ?? ""}
            className="absolute inset-0 size-full object-cover"
            loading="lazy"
          />
          {overlayMask && (
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background: "var(--section-bg)",
                maskImage: overlayMask,
                WebkitMaskImage: overlayMask,
              }}
            />
          )}
        </>
      )}
      {showCirclePattern && (
        <img
          src="/circle-bg.png"
          alt=""
          aria-hidden="true"
          className={cn(
            "circle-pattern",
            circlePositionClass[circlePosition ?? "topRight"]
          )}
        />
      )}
      <div
        className="pp-container relative z-10 space-y-14"
        style={contentMaxWidth ? { maxWidth: contentMaxWidth } : undefined}
      >
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
            : "grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16";

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
                      ? evenSpanClass[12 / colCount] ?? ""
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
                        "mx-auto max-w-[900px]"
                    )}
                  >
                    {col.content && (
                      <GridPortableText
                        value={col.content}
                        centered={isCentered && colCount === 1}
                        animated={animated}
                      />
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
