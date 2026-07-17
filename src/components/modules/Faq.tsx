"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeader } from "./SectionHeader";
import { getModuleLayoutAttrs, type ModuleLayoutValue } from "@/lib/moduleLayout";
import { trackEvent } from "@/lib/analytics";

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
  moduleLayout?: ModuleLayoutValue | null;
}

function renderAnswer(blocks?: FaqItem["answer"]) {
  if (!blocks?.length) return null;
  return blocks.map((block, i) => {
    const text = block.children?.map((c) => c.text).join("") ?? "";
    return text ? (
      <p key={i} className="text-muted-text leading-relaxed">
        {text}
      </p>
    ) : null;
  });
}

export function Faq({
  theme = "lotion",
  eyebrow,
  title,
  subtitle,
  items = [],
  moduleLayout,
}: FaqProps) {
  const animated = moduleLayout?.animated ?? false;

  return (
    <section
      id="faq"
      data-theme={theme}
      className="pp-section"
      style={{ background: "var(--section-bg)" }}
      aria-labelledby={title ? "faq-heading" : undefined}
      {...getModuleLayoutAttrs(moduleLayout)}
    >
      <div className="pp-container">
        {(eyebrow || title || subtitle) && (
          <SectionHeader
            eyebrow={eyebrow}
            title={title ?? ""}
            subtitle={subtitle}
            alignment="center"
            theme={
              theme as
                | "white"
                | "lotion"
                | "cream"
                | "vanilla"
                | "red"
                | "gradient"
            }
            className="mb-12"
            headingId="faq-heading"
            animated={animated}
          />
        )}
        {items.length > 0 && (
          <Accordion
            type="single"
            collapsible
            className="mx-auto w-full max-w-[800px] border-t border-border-color"
            aria-label="Frequently asked questions"
            onValueChange={(value) => {
              if (!value) return;
              const index = Number(value.replace("item-", ""));
              const question = items[index]?.question;
              if (question) trackEvent("faq_toggle", { question });
            }}
            {...(animated ? { "data-anim-list": true } : {})}
          >
            {items.map((item, i) => (
              <AccordionItem
                key={item._key ?? i}
                value={`item-${i}`}
                className="border-b border-border-color"
              >
                <AccordionTrigger className="py-6 text-left text-base font-semibold text-ink hover:text-red hover:no-underline focus-visible:outline-none **:data-[slot=accordion-trigger-icon]:text-red">
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
