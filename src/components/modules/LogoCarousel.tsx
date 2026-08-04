"use client";

import { getModuleLayoutAttrs, type ModuleLayoutValue } from "@/lib/moduleLayout";
import { sanityImageUrl, type SanityImageValue } from "@/lib/sanityImage";

export interface LogoCarouselItem {
  _key?: string;
  name?: string;
  logo?: SanityImageValue | null;
}

export interface LogoCarouselProps {
  theme?: string;
  label?: string;
  logos?: LogoCarouselItem[];
  speed?: number;
  moduleLayout?: ModuleLayoutValue | null;
}

function LogoSet({ logos, ariaHidden }: { logos: LogoCarouselItem[]; ariaHidden?: boolean }) {
  return (
    <div className="logo-set" aria-hidden={ariaHidden}>
      {logos.map((item, i) => {
        // These marquee logos never render taller than ~40px, but partner
        // brands upload wildly oversized source files (some 800KB+ at
        // 10000px+ wide) — cap the CDN request instead of shipping the raw
        // asset byte-for-byte.
        const url = sanityImageUrl(item.logo, { width: 300 });
        if (!url) return null;
        return (
          <img
            key={item._key ?? i}
            src={url}
            alt={ariaHidden ? "" : item.name ?? ""}
            loading="lazy"
          />
        );
      })}
    </div>
  );
}

export function LogoCarousel({
  theme = "white",
  label,
  logos = [],
  speed = 66,
  moduleLayout,
}: LogoCarouselProps) {
  const validLogos = logos.filter((item) => item.logo?.asset?.url);
  if (!validLogos.length) return null;
  const animated = moduleLayout?.animated ?? false;

  return (
    <section
      data-theme={theme}
      className="pp-section-tight"
      style={{ background: "var(--section-bg)" }}
      {...getModuleLayoutAttrs(moduleLayout)}
    >
      {label && (
        <div className="pp-container">
          <p
            className="mb-4 text-left text-[11px] font-light uppercase tracking-[0.15em]"
            style={{ color: "var(--section-muted)" }}
            {...(animated ? { "data-anim-header": true } : {})}
          >
            {label}
          </p>
        </div>
      )}
      <div className="logo-marquee">
        <div className="logo-track" style={{ animationDuration: `${speed}s` }}>
          <LogoSet logos={validLogos} />
          <LogoSet logos={validLogos} ariaHidden />
        </div>
      </div>
    </section>
  );
}
