import { stegaClean } from "@sanity/client/stega";

/**
 * Converts a moduleLayout Sanity object into HTML data attributes for a
 * module's <section> element.
 *
 * - data-module-pt / data-module-pb  → padding scale overrides (CSS handles the px values)
 * - data-module-animated             → triggers the scroll-reveal animation via RevealObserver
 *
 * When topPadding / bottomPadding are null the attribute is omitted and the
 * element falls back to the .pp-section class (160 px block padding).
 */
export interface ModuleLayoutValue {
  topPadding?: string | null;
  bottomPadding?: string | null;
  animated?: boolean | null;
}

export function getModuleLayoutAttrs(moduleLayout?: ModuleLayoutValue | null): Record<string, string | boolean | undefined> {
  if (!moduleLayout) return {};

  const attrs: Record<string, string | boolean | undefined> = {};

  // Every module on the site renders through here, so these two values are
  // cleaned defensively even though `topPadding`/`bottomPadding` are also in
  // `stegaFilter.ts`'s denylist — a forgotten/reverted denylist entry would
  // otherwise silently break padding on every module in Visual Editing
  // preview (the exact class of bug this guards against, see gridSection's
  // gradientDirection/circlePosition).
  const topPadding = stegaClean(moduleLayout.topPadding);
  const bottomPadding = stegaClean(moduleLayout.bottomPadding);

  if (topPadding) {
    attrs["data-module-pt"] = topPadding;
  }
  if (bottomPadding) {
    attrs["data-module-pb"] = bottomPadding;
  }
  if (moduleLayout.animated) {
    attrs["data-module-animated"] = true;
  }

  return attrs;
}
