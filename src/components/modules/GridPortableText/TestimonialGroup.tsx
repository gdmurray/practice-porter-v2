"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export interface TestimonialItem {
  _key?: string;
  quote?: string;
  author?: string;
  role?: string;
  avatar?: string;
}

export function TestimonialGroup({
  value,
}: {
  value: { items?: TestimonialItem[] };
}) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {value.items?.map((t, i) => (
        <div key={t._key ?? i} className="rounded-xl bg-off-white p-9">
          <blockquote className="text-left mb-6 font-serif text-[17px] italic leading-relaxed text-midnight">
            {t.quote}
          </blockquote>
          <div className="flex items-center gap-3.5">
            <Avatar className="size-11 bg-gold-pale">
              <AvatarFallback className="font-serif text-base font-semibold text-gold">
                {t.avatar || t.author?.slice(0, 2) || "?"}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="text-left text-sm font-semibold text-midnight">
                {t.author}
              </div>
              <div className="text-[13px] text-mid-gray">{t.role}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
