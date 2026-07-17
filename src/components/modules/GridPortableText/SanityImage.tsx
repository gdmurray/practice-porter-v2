import { croppedDimensions, sanityImageUrl, type SanityImageValue } from "@/lib/sanityImage";

export function SanityImage({
  value,
  animated = false,
}: {
  value: SanityImageValue & {
    asset?: {
      url?: string;
      _id?: string;
      metadata?: { dimensions?: { width?: number; height?: number } };
    };
    alt?: string;
    priority?: boolean;
  };
  animated?: boolean;
}) {
  if (!value.asset?.url) return null;

  // No fixed render size here (this block has no `object-fit`), so pass the
  // original dimensions through and let the CDN return the Studio crop rect
  // at its own natural size — then derive matching width/height hints below
  // so the `aspect-ratio` CSS doesn't stretch the (now differently-shaped)
  // cropped result.
  const url = sanityImageUrl(value);
  const isPriority = value.priority === true;
  const { width, height } = croppedDimensions(value.asset?.metadata?.dimensions, value.crop);

  return (
    <img
      src={url}
      alt={value.alt ?? ""}
      // Intrinsic width/height let the browser reserve exact space before the
      // image loads, preventing layout shift. CSS still scales it to 100%.
      width={width}
      height={height}
      loading={isPriority ? "eager" : "lazy"}
      fetchPriority={isPriority ? "high" : "auto"}
      decoding={isPriority ? "sync" : "async"}
      className="w-full rounded-xl"
      style={width && height ? { aspectRatio: `${width}/${height}` } : undefined}
      {...(animated ? { "data-anim-header": true } : {})}
    />
  );
}
