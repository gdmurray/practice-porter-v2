export interface CtaData {
  label: string;
  href: string;
  ctaType?: "internal" | "external" | "calendly";
}

/**
 * Returns the correct anchor props based on ctaType:
 * - "external" → opens in a new tab with rel="noopener noreferrer"
 * - "calendly" → href only (Layout.astro event delegation handles the popup)
 * - "internal" / undefined → href only (Layout.astro handles smooth scroll)
 */
export function ctaProps(cta: CtaData): {
  href: string;
  target?: string;
  rel?: string;
} {
  if (cta.ctaType === "external") {
    return { href: cta.href, target: "_blank", rel: "noopener noreferrer" };
  }
  return { href: cta.href };
}
