import type { FilterDefault } from "@sanity/client";

/**
 * Presentation/layout fields that must never receive stega zero-width
 * encoding. Encoding these breaks rendering because they are read as
 * enum values, CSS tokens, icon slugs, or anchor IDs — not as visible
 * prose that an editor would click to open the Studio overlay.
 *
 * The Sanity default filter already skips the following (no need to
 * repeat them here):
 *   theme, variant, href, url, slug, icon, tag, template, path, link,
 *   color, id, key, type, status, locale, language, …
 *   + any string that looks like a URL or ISO date
 *   + any path inside "seo", "meta", "metadata", "openGraph"
 *
 * This list covers fields that are specific to this project's schemas
 * and are not caught by the defaults.
 */
const LAYOUT_FIELD_DENYLIST = new Set([
  // Alignment / layout controls
  "alignment", // gridRow, ctaBlock: "left" | "center"
  "verticalAlign", // gridColumn: "top" | "middle" | "bottom"
  "width", // gridColumn: column width fraction

  // Behavior/type enumerations
  "ctaType", // cta: "internal" | "external" | "calendly"

  // Decorative/token fields
  "valueColor", // statCard: "navy" | "red" | "gold" | "teal"
  "iconName", // iconFeature: Lucide icon slug
  "platform", // socialLink: "twitter" | "linkedin" | …

  // Structural/navigation identifiers
  "sectionId", // gridSection: HTML anchor id

  // Boolean flags (won't encode anyway, but explicit is safer)
  "priority", // image: LCP hint
  "lineSeparated", // checkListBlock: border toggle
]);

/**
 * Custom stega filter for Practice Porter.
 *
 * Returns `false` (skip encoding) for:
 *   1. Any field whose last path segment is a known layout/presentation field
 *   2. Anything the Sanity default filter would already skip
 *
 * Returns `true` (encode) for all other visible text fields such as
 * title, subtitle, eyebrow, label, description, quote, author, etc.
 */
export const stegaFilter: FilterDefault = (props) => {
  const { sourcePath, filterDefault } = props;

  const lastSegment = sourcePath.at(-1);
  if (typeof lastSegment === "string" && LAYOUT_FIELD_DENYLIST.has(lastSegment)) {
    return false;
  }

  return filterDefault(props);
};
