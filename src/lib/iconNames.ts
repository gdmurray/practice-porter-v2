/**
 * Canonical list of icon names (kebab-case Lucide identifiers).
 * Used by Sanity schema field pickers and resolved at runtime via getIcon().
 */
export const ICON_NAMES = [
  "activity",
  "alert-circle",
  "bar-chart",
  "book-open",
  "calendar",
  "check-circle",
  "clock",
  "dollar-sign",
  "phone",
  "phone-off",
  "pie-chart",
  "star",
  "trending-down",
  "trending-up",
  "user",
  "user-x",
  "users",
  "zap",
] as const;

export type IconName = (typeof ICON_NAMES)[number];

/** Formats the ICON_NAMES list for use in a Sanity `options.list` field. */
export const ICON_LIST = ICON_NAMES.map((i) => ({ value: i, title: i }));
