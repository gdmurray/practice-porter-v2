"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeader } from "./SectionHeader";

export interface FaqItem {
  _key?: string;
  question?: string;
  answer?: { _type: string; children?: { text: string }[] }[];
}

export interface FaqProps {
  theme?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  items?: FaqItem[];
}

function renderAnswer(blocks?: FaqItem["answer"]) {
  if (!blocks?.length) return null;
  return blocks.map((block, i) => {
    const text = block.children?.map((c) => c.text).join("") ?? "";
    return text ? (
      <p key={i} className="text-mid-gray leading-relaxed">
        {text}
      </p>
    ) : null;
  });
}

export function Faq({
  theme = "cream",
  eyebrow,
  title,
  subtitle,
  items = [],
}: FaqProps) {
  return (
    <section
      id="faq"
      data-theme={theme}
      style={{ background: "var(--section-bg)" }}
      aria-labelledby={title ? "faq-heading" : undefined}
    >
      <div className="pp-container pp-section">
        {(eyebrow || title || subtitle) && (
          <SectionHeader
            eyebrow={eyebrow}
            title={title ?? ""}
            subtitle={subtitle}
            alignment="center"
            theme={theme as "dark" | "white" | "cream"}
            className="mb-12"
            headingId="faq-heading"
          />
        )}
        {items.length > 0 && (
          <Accordion
            type="single"
            collapsible
            className="mx-auto w-full max-w-[800px] border-t border-warm-gray"
            aria-label="Frequently asked questions"
          >
            {items.map((item, i) => (
              <AccordionItem
                key={item._key ?? i}
                value={`item-${i}`}
                className="border-b border-warm-gray"
              >
                <AccordionTrigger className="py-6 text-left text-base font-semibold text-midnight hover:text-teal hover:no-underline focus-visible:outline-none **:data-[slot=accordion-trigger-icon]:text-gold">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-6 space-y-3">
                  {renderAnswer(item.answer)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </section>
  );
}
