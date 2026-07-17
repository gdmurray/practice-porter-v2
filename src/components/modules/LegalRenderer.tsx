"use client";

import { PortableText, type PortableTextBlock, type PortableTextComponents } from "@portabletext/react";
import { cn } from "@/lib/utils";

const legalComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-3 text-[15px] leading-[1.75] text-ink/80">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mb-3 mt-8 font-serif text-[22px] font-medium tracking-[0.1px] text-ink">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-2 mt-5 text-[15px] font-bold text-ink">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="mb-2 mt-4 text-sm font-semibold uppercase tracking-wide text-ink/70">
        {children}
      </h4>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-3 list-disc pl-[22px]">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-3 list-decimal pl-[22px]">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="mb-2 text-[15px] leading-[1.75] text-ink/80">{children}</li>
    ),
    number: ({ children }) => (
      <li className="mb-2 text-[15px] leading-[1.75] text-ink/80">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-ink">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    underline: ({ children }) => <span className="underline">{children}</span>,
    "strike-through": ({ children }) => <s>{children}</s>,
    link: ({ value, children }) => {
      const href = value?.href ?? "#";
      const isExternal = href.startsWith("http");
      return (
        <a
          href={href}
          className="text-red no-underline hover:underline"
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      );
    },
  },
};

interface LegalRendererProps {
  value?: PortableTextBlock[] | null;
  className?: string;
}

export function LegalRenderer({ value, className }: LegalRendererProps) {
  if (!value?.length) return null;
  return (
    <div className={cn("legal-body", className)}>
      <PortableText value={value} components={legalComponents} />
    </div>
  );
}
