"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from "@portabletext/react";
import { cn } from "@/lib/utils";
import { croppedDimensions, sanityImageUrl, type SanityImageValue } from "@/lib/sanityImage";

export interface StickyScrollStepValue {
  _key?: string;
  image?: SanityImageValue & {
    asset?: {
      url?: string;
      metadata?: { dimensions?: { width?: number; height?: number } };
    };
    alt?: string;
  };
  content?: PortableTextBlock[];
}

// Deliberately not `GridPortableText` — that serializer's block-object map
// (`makeComponents.tsx`) is what registers this very component, so pulling
// it in here would create an import cycle. This is a small local renderer
// for the step's own minimal block type instead, matching the pattern in
// `CardsGroup.tsx` / `LegalRenderer.tsx`.
const stepComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-[15px] leading-[1.75] text-muted-text">{children}</p>
    ),
    stepTitle: ({ children }) => (
      <h3 className="font-serif text-[28px] font-medium leading-[1.15] text-ink lg:text-[32px]">
        {children}
      </h3>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-ink">{children}</strong>
    ),
    link: ({ value, children }) => {
      const href = value?.href ?? "#";
      const isExternal = href.startsWith("http");
      return (
        <a
          href={href}
          className="text-red underline underline-offset-2 hover:text-red-terra"
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      );
    },
  },
};

// The sticky rail always sits on the LEFT with the source photo's subject
// cropped toward its right edge (the seam with the text column) — mirrors
// the reference's `.cms-sticky` (first child) + `.cms-steps` (second child)
// DOM order and `background-position: right center`. The tint is a fixed
// white rather than the ancestor `gridSection`'s `var(--section-bg)` — the
// image itself is what should read as "overflowing" into the copy column,
// so the fade needs a constant color instead of shifting per theme. Only
// the last ~38% of the image (right at the seam) fades — same ratio
// `SolutionCardGroup.tsx` uses for its own photo-into-copy fade — so most
// of the photo stays fully crisp instead of the whole thing reading as
// washed out.
const TINT_MASK =
  "linear-gradient(to left, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.45) 18%, transparent 38%)";

const DESKTOP_QUERY = "(min-width: 1024px)";
const RAIL_TOP_OFFSET = 128;
const RAIL_HEIGHT = 440;

const railInFlowStyle: CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: RAIL_HEIGHT,
};

/**
 * Drives the sticky-rail behavior by hand instead of CSS `position: sticky`.
 * `GridSection.tsx`'s outer `<section>` sets `overflow-hidden` (needed to
 * clip full-bleed background images and prevent horizontal mobile
 * overflow — see the comment there), and ANY ancestor with a non-`visible`
 * `overflow` disables `position: sticky` for every descendant, regardless
 * of whether that ancestor's own box ever actually scrolls. Rather than
 * loosen that (shared by every section on the site), the rail here
 * switches between three plain-positioned states on scroll — in-flow at
 * the top of its column, `position: fixed` at a pinned viewport offset
 * while its column has room, then released to the bottom of its column —
 * which is exactly what `position: sticky` does internally, just computed
 * in JS so `position: fixed` can escape the overflow-hidden ancestor.
 */
function useStickyRail(isDesktop: boolean) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<CSSProperties>(railInFlowStyle);

  useEffect(() => {
    if (!isDesktop) {
      setStyle(railInFlowStyle);
      return;
    }
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    let ticking = false;

    function update() {
      if (!wrapper) return;
      const rect = wrapper.getBoundingClientRect();
      if (rect.top > RAIL_TOP_OFFSET) {
        setStyle(railInFlowStyle);
      } else if (rect.bottom < RAIL_TOP_OFFSET + RAIL_HEIGHT) {
        setStyle({
          position: "absolute",
          top: rect.height - RAIL_HEIGHT,
          left: 0,
          width: "100%",
          height: RAIL_HEIGHT,
        });
      } else {
        setStyle({
          position: "fixed",
          top: RAIL_TOP_OFFSET,
          left: rect.left,
          width: rect.width,
          height: RAIL_HEIGHT,
        });
      }
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isDesktop]);

  return { wrapperRef, style };
}

export function StickyScrollGroup({
  value,
  animated = false,
}: {
  value: { items?: StickyScrollStepValue[] };
  animated?: boolean;
}) {
  const items = value.items ?? [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { wrapperRef: railWrapperRef, style: railStyle } = useStickyRail(isDesktop);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // The exact same algorithm as the reference's vanilla-JS scrollytelling
  // script (`scroll` + rAF, "last step whose top has crossed the
  // viewport's vertical center line wins"). Only runs on desktop; the
  // stacked mobile/tablet layout below has no shared image to cross-fade.
  useEffect(() => {
    if (!isDesktop) return;
    const steps = stepRefs.current.filter(
      (el): el is HTMLDivElement => el !== null
    );
    if (!steps.length) return;

    let current = -1;
    let ticking = false;

    function update() {
      const line = window.innerHeight / 2;
      let active = 0;
      for (let i = 0; i < steps.length; i++) {
        if (steps[i].getBoundingClientRect().top <= line) active = i;
      }
      if (active === current) return;
      current = active;
      setActiveIndex(active);
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isDesktop, items.length]);

  if (items.length === 0) return null;

  return (
    <div {...(animated ? { "data-anim-list": true } : {})}>
      {/* Desktop: manually-pinned cross-fading image rail + scroll-tracked
          steps. Text is left-aligned here — this is the "dynamic" view
          where the copy sits beside the image, not stacked above it. */}
      <div className="hidden gap-16 text-left lg:grid lg:grid-cols-2">
        <div ref={railWrapperRef} className="relative">
          <div
            style={railStyle}
            className="overflow-hidden rounded-2xl"
          >
            <div className="relative size-full">
              {items.map((step, i) => {
                const url = sanityImageUrl(step.image);
                if (!url) return null;
                const { width, height } = croppedDimensions(
                  step.image?.asset?.metadata?.dimensions,
                  step.image?.crop
                );
                return (
                  <img
                    key={step._key ?? i}
                    src={url}
                    alt={step.image?.alt ?? ""}
                    width={width}
                    height={height}
                    aria-hidden={i !== activeIndex}
                    loading="lazy"
                    className={cn(
                      "absolute inset-0 size-full object-cover object-right transition-opacity duration-700 ease-in-out motion-reduce:transition-none",
                      i === activeIndex ? "opacity-100" : "opacity-0"
                    )}
                  />
                );
              })}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background: "#ffffff",
                  maskImage: TINT_MASK,
                  WebkitMaskImage: TINT_MASK,
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          {items.map((step, i) => (
            <div
              key={step._key ?? i}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              className={cn(
                "flex min-h-[440px] flex-col justify-center space-y-4 py-10 transition-opacity duration-500 ease-in-out motion-reduce:transition-none",
                // The active step is the primary element; the others fade
                // down (not away — they're still readable while scrolling
                // past) to keep focus on whichever one the rail is
                // currently showing.
                i === activeIndex ? "opacity-100" : "opacity-40"
              )}
            >
              {step.content && (
                <PortableText value={step.content} components={stepComponents} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile/tablet: no sticky/scroll behavior or tint — each step is a
          plain image-then-text stack, same collapse `SolutionCardGroup`
          uses, just repeated per step instead of once. Text is centered
          here to match the stacked, single-column reading order. On
          tablet widths (`sm:` and up, still below the `lg:` desktop
          breakpoint) the image is capped to a comfortable max width and
          centered instead of stretching full-bleed. */}
      <div className="flex flex-col gap-12 text-center lg:hidden">
        {items.map((step, i) => {
          const url = sanityImageUrl(step.image);
          const { width, height } = croppedDimensions(
            step.image?.asset?.metadata?.dimensions,
            step.image?.crop
          );
          return (
            <div key={step._key ?? i} className="flex flex-col items-center space-y-4">
              {url && (
                <img
                  src={url}
                  alt={step.image?.alt ?? ""}
                  width={width}
                  height={height}
                  loading="lazy"
                  className="aspect-4/3 w-full rounded-2xl object-cover sm:mx-auto sm:max-w-[480px]"
                />
              )}
              <div className="space-y-4">
                {step.content && (
                  <PortableText value={step.content} components={stepComponents} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
