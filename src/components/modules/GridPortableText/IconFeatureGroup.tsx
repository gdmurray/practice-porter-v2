"use client";

import { getIcon } from "@/lib/icons";

export interface IconFeatureItem {
  _key?: string;
  iconName: string;
  title: string;
  description: string;
}

export function IconFeatureGroup({
  value,
}: {
  value: { items?: IconFeatureItem[] };
}) {
  return (
    <ul className="mt-7 list-none space-y-0">
      {value.items?.map((feat, i) => {
        const Icon = getIcon(feat.iconName);
        return (
          <li key={feat._key ?? i} className="flex items-start gap-4 py-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-teal-pale">
              <Icon className="size-5 text-teal" />
            </div>
            <div>
              <div className="mb-1 text-[15px] font-semibold text-midnight">
                {feat.title}
              </div>
              <div className="text-sm leading-relaxed text-mid-gray">
                {feat.description}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
