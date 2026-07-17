export interface CtaData {
  label: string;
  href: string;
  ctaType?: "internal" | "external" | "book_meeting";
  variant?: "primary" | "secondary";
}

/**
 * Returns the correct anchor props based on ctaType:
 * - "external" → opens in a new tab with rel="noopener noreferrer"
 * - "book_meeting" → adds data-cta-type attr so Layout.astro's click delegation
 *   can intercept and trigger the Google Calendar scheduling popup; href is a
 *   fallback for no-JS environments
 * - "internal" / undefined → href only (Layout.astro handles smooth scroll)
 */
export function ctaProps(cta: CtaData): {
  href: string;
  target?: string;
  rel?: string;
  "data-cta-type"?: string;
} {
  if (cta.ctaType === "external") {
    return { href: cta.href, target: "_blank", rel: "noopener noreferrer" };
  }
  if (cta.ctaType === "book_meeting") {
    return { href: cta.href, "data-cta-type": "book_meeting" };
  }
  return { href: cta.href };
}
