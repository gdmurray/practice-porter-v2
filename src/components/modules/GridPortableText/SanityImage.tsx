export function SanityImage({
  value,
}: {
  value: { asset?: { url?: string; _id?: string }; alt?: string };
}) {
  const url = value.asset?.url;
  if (!url) return null;
  return (
    <img
      src={url}
      alt={value.alt ?? ""}
      loading="lazy"
      className="w-full rounded-xl"
    />
  );
}
