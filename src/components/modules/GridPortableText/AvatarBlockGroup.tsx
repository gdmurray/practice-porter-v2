"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { sanityImageUrl, type SanityImageValue } from "@/lib/sanityImage";

export interface AvatarBlockValue {
  name?: string;
  role?: string;
  initials?: string;
  image?: SanityImageValue | null;
}

export function AvatarBlockGroup({
  value,
  animated = false,
}: {
  value: AvatarBlockValue;
  animated?: boolean;
}) {
  if (!value.name) return null;

  // Rendered at a fixed 54px circle — request roughly 2x that for retina
  // instead of the raw source asset.
  const imageUrl = sanityImageUrl(value.image, { width: 120, height: 120 });

  return (
    <div
      className="flex items-center gap-3.5 border-t border-white/20 pt-6"
      {...(animated ? { "data-anim-header": true } : {})}
    >
      <Avatar className="size-[54px] bg-cream">
        {imageUrl && (
          <AvatarImage src={imageUrl} alt={value.image?.alt ?? value.name} />
        )}
        <AvatarFallback className="font-serif text-xl text-red">
          {value.initials || value.name.slice(0, 1)}
        </AvatarFallback>
      </Avatar>
      <div>
        <div className="text-[15px] font-semibold text-cream">{value.name}</div>
        {value.role && (
          <div className="text-[13px] text-cream/80">{value.role}</div>
        )}
      </div>
    </div>
  );
}
