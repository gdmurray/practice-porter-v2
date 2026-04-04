export function SanityImage({
  value,
}: {
  value: {
    asset?: {
      url?: string;
      _id?: string;
      metadata?: { dimensions?: { width?: number; height?: number } };
    };
    alt?: string;
    priority?: boolean;
  };
}) {
  const url = value.asset?.url;
  if (!url) return null;

  const isPriority = value.priority === true;
  const dims = value.asset?.metadata?.dimensions;
  const width = dims?.width;
  const height = dims?.height;

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
    />
  );
}
