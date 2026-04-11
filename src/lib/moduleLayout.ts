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

  if (moduleLayout.topPadding) {
    attrs["data-module-pt"] = moduleLayout.topPadding;
  }
  if (moduleLayout.bottomPadding) {
    attrs["data-module-pb"] = moduleLayout.bottomPadding;
  }
  if (moduleLayout.animated) {
    attrs["data-module-animated"] = true;
  }

  return attrs;
}
