"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface AvatarBlockValue {
  name?: string;
  role?: string;
  initials?: string;
  image?: {
    asset?: { url?: string } | null;
    alt?: string;
  } | null;
}

export function AvatarBlockGroup({ value }: { value: AvatarBlockValue }) {
  if (!value.name) return null;

  const imageUrl = value.image?.asset?.url;

  return (
    <div className="flex items-center gap-3.5 border-t border-white/20 pt-6">
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
