import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

// Mirrors the dual-env fallback pattern in `sanity.config.ts` — this helper
// needs to run in React islands (client + server) and Storybook, not just
// Astro server code, so it can't rely on the `sanity:client` virtual module.
const projectId = import.meta.env?.PUBLIC_SANITY_PROJECT_ID ?? "u06m8vwg";
const dataset = import.meta.env?.PUBLIC_SANITY_DATASET ?? "production";

const builder = createImageUrlBuilder({ projectId, dataset });

export interface SanityImageValue {
  asset?: { _id?: string | null; url?: string | null } | null;
  crop?: { top?: number; bottom?: number; left?: number; right?: number } | null;
  hotspot?: { x?: number; y?: number; height?: number; width?: number } | null;
}

/**
 * Returns a chainable `@sanity/image-url` builder for a Sanity image value,
 * or `null` if there's no usable asset. Respects `crop`/`hotspot` set in
 * Studio automatically — the raw `asset.url` field alone never does, since
 * Sanity stores those as separate metadata rather than baking them into the
 * uploaded file.
 */
export function urlForImage(image?: SanityImageValue | null) {
  if (!image?.asset?.url && !image?.asset?._id) return null;
  return builder.image(image as SanityImageSource);
}

/**
 * Convenience wrapper: returns the final cropped image URL string. Pass
 * `width`/`height` when the image renders at a fixed aspect ratio (e.g. a
 * portable-text image block) so the CDN also re-crops toward the hotspot to
 * match that ratio; omit them for full-bleed/responsive images that already
 * get visually cropped by CSS `object-cover` — the editor's Studio crop
 * still applies either way.
 */
export function sanityImageUrl(
  image?: SanityImageValue | null,
  { width, height }: { width?: number; height?: number } = {}
): string | undefined {
  const img = urlForImage(image);
  if (!img) return image?.asset?.url ?? undefined;

  let chain = img.auto("format");
  if (width) chain = chain.width(width);
  if (height) chain = chain.height(height);
  if (width && height) chain = chain.fit("crop");
  return chain.url();
}

/**
 * Approximates the rendered image's aspect ratio after Studio cropping, so
 * layout-shift-preventing `width`/`height` hints stay accurate even when no
 * `object-fit` is applied (e.g. a plain rich-text image). Falls back to the
 * original asset dimensions when there's no crop.
 */
export function croppedDimensions(
  original: { width?: number; height?: number } | null | undefined,
  crop?: SanityImageValue["crop"]
): { width?: number; height?: number } {
  if (!original?.width || !original?.height) return {};
  if (!crop) return { width: original.width, height: original.height };

  const width = Math.round(original.width * (1 - (crop.left ?? 0) - (crop.right ?? 0)));
  const height = Math.round(original.height * (1 - (crop.top ?? 0) - (crop.bottom ?? 0)));
  return { width: width || original.width, height: height || original.height };
}
