"use client";

import { type PortableTextComponents } from "@portabletext/react";
import { CheckListGroup } from "../GridPortableText/CheckListGroup";
import { AvatarBlockGroup } from "../GridPortableText/AvatarBlockGroup";

/**
 * Cream-on-red typography for the Split Booking left panel — deliberately
 * separate from GridPortableText/makeComponents.tsx since this panel is
 * always the fixed brand-red card background (see splitBookingPortableTextEditor.tsx),
 * never theme-driven.
 */
export function makeSplitBookingComponents(animated = false): PortableTextComponents {
  const h = animated ? { "data-anim-list": true } : {};

  return {
    block: {
      normal: ({ children }) => (
        <p className="max-w-[430px] text-[15.5px] leading-[1.6] text-cream/90">
          {children}
        </p>
      ),
      h2: ({ children }) => (
        <h2
          {...h}
          className="mb-4 font-serif text-[28px] font-medium leading-[1.18] text-cream lg:text-[33px]"
        >
          {children}
        </h2>
      ),
    },
    marks: {
      strong: ({ children }) => (
        <strong className="font-semibold">{children}</strong>
      ),
      link: ({ value, children }) => {
        const href = value?.href ?? "#";
        const isExternal = href.startsWith("http");
        return (
          <a
            href={href}
            className="text-cream underline underline-offset-2 hover:text-vanilla"
            {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {children}
          </a>
        );
      },
    },
    types: {
      checkListBlock: (props) => (
        <CheckListGroup {...props} tone="onBrand" animated={animated} />
      ),
      avatarBlock: (props) => <AvatarBlockGroup {...props} />,
    },
  };
}
