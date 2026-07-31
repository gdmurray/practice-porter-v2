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
 * and are not caught by the defaults. Below the list, two more targeted
 * rules handle field names that are too generic/ambiguous to blanket-skip
 * by name alone (`style`, `listItem` — scoped to the specific object
 * `_type` they're unsafe on) and Portable Text decorator marks (array
 * elements, so they can't be matched by field name at all).
 *
 * Why a denylist (skip-by-default is the exception) rather than an
 * allowlist (encode-by-default is the exception): stega only runs in
 * Presentation/preview mode, never production (see `load-query.ts`), so
 * the two failure modes aren't symmetric. A missed denylist entry causes
 * a loud, visible rendering bug in preview — bad, but easy to spot and
 * fix (see gridSection's `gradientDirection`/`circlePosition`, the bug
 * this file was patched for). A missed allowlist entry causes a prose
 * field to silently stop being click-to-edit in preview — easy to never
 * notice. Given ~78% of this schema's string fields are free prose (vs.
 * ~22% enum/lookup fields per an audit of `src/sanity/schemas/**`), an
 * allowlist would also need a longer, more per-schema-specific list than
 * this denylist does, for a worse default failure mode. If this list
 * grows unwieldy, prefer scoping new entries by `sourceDocument._type`
 * (see below) over adding bare names.
 */
const LAYOUT_FIELD_DENYLIST = new Set([
  // Alignment / layout controls
  "alignment", // gridRow, ctaBlock: "left" | "center"
  "verticalAlign", // gridColumn: "top" | "middle" | "bottom"
  "width", // gridColumn: column width fraction
  "padding", // cardsBlock.cardTheme: "compact" | "default" | "spacious" -> paddingMap[]
  "topPadding", // moduleLayout (used by every module): -> data-module-pt attr, matched by exact CSS selector
  "bottomPadding", // moduleLayout (used by every module): -> data-module-pb attr, matched by exact CSS selector

  // Behavior/type enumerations
  "ctaType", // cta: "internal" | "external" | "book_meeting"
  "dateSource", // legal: "updated" | "effective" -> === comparison
  "iconLocation", // featureCard: "left" | "top" -> === comparison

  // Decorative/token fields
  "valueColor", // statCard: "navy" | "red" | "gold" | "teal"
  "suffixColor", // statBandItem, inlineStat: -> suffixColorVar/suffixColorMap[] lookups
  "iconName", // iconFeature: Lucide icon slug
  "iconColor", // cardIcon: -> iconBgMap[] lookup
  "iconShape", // cardIcon: "square" | "circle" -> === comparison
  "cardBg", // cardsBlock.cardTheme: -> cardBgMap[] lookup
  "gradientDirection", // gridSection: "none" | "left" | "right" -> gradientMaskMap/heroGradientMaskMap[] lookups
  "circlePosition", // gridSection: corner enum -> circlePositionClass[] lookup
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
 *   1. Portable Text decorator/annotation keys inside a `marks: string[]`
 *      array (e.g. "strong", "price") — these are exact-match lookup keys
 *      into a `PortableTextComponents.marks` map, never rendered as visible
 *      text themselves. They're array elements (numeric last path segment),
 *      so a field-name denylist can never catch them.
 *   2. Portable Text's own structural `style`/`listItem` fields on a
 *      `block` (e.g. "h2", "bullet") — these select which component renders
 *      the block, and encoding them breaks that lookup for every rich-text
 *      block on the site. Scoped to `_type === "block"` (rather than a bare
 *      name in the denylist above) because `style`/`listItem` are common
 *      enough words that a bare-name match risks false positives on future
 *      unrelated prose fields.
 *   3. `columnDivider.style` ("line" | "spacer") — same field name as #2,
 *      different object, same failure mode (=== comparison in `CardsGroup`).
 *   4. Any field whose last path segment is a known layout/presentation
 *      field name (see `LAYOUT_FIELD_DENYLIST` above).
 *   5. Anything the Sanity default filter would already skip.
 *
 * Returns `true` (encode) for all other visible text fields such as
 * title, subtitle, eyebrow, label, description, quote, author, etc.
 */
export const stegaFilter: FilterDefault = (props) => {
  const { sourcePath, sourceDocument, filterDefault } = props;

  const lastSegment = sourcePath.at(-1);
  const parentSegment = sourcePath.at(-2);

  if (parentSegment === "marks" && typeof lastSegment === "number") {
    return false;
  }

  if (typeof lastSegment === "string") {
    const sourceType = sourceDocument._type;

    if (sourceType === "block" && (lastSegment === "style" || lastSegment === "listItem")) {
      return false;
    }

    if (sourceType === "columnDivider" && lastSegment === "style") {
      return false;
    }

    if (LAYOUT_FIELD_DENYLIST.has(lastSegment)) {
      return false;
    }
  }

  return filterDefault(props);
};
