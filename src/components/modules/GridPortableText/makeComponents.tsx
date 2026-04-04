import { type PortableTextComponents } from "@portabletext/react";
import { cn } from "@/lib/utils";
import { StatCardsGroup } from "./StatCardsGroup";
import { PricingCardsGroup } from "./PricingCardsGroup";
import { makeCtaGroup } from "./CtaGroup";
import { TestimonialGroup } from "./TestimonialGroup";
import { NumberedStepGroup } from "./NumberedStepGroup";
import { IconFeatureGroup } from "./IconFeatureGroup";
import { CheckListGroup } from "./CheckListGroup";
import { SanityImage } from "./SanityImage";

export function makeComponents(centered: boolean): PortableTextComponents {
  return {
    block: {
      normal: ({ children }) => (
        <p className="text-base font-normal leading-[1.75] text-charcoal">{children}</p>
      ),
      h1: ({ children }) => (
        <h1
          className="mb-4 font-serif text-[clamp(36px,4.5vw,56px)] font-bold leading-[1.08]"
          style={{ color: "var(--section-text)" }}
        >
          {children}
        </h1>
      ),
      h2: ({ children }) => (
        <h2 className="section-title mb-4">{children}</h2>
      ),
      h3: ({ children }) => (
        <h3 className="mb-4 font-serif text-[22px] font-bold text-midnight">
          {children}
        </h3>
      ),
      eyebrow: ({ children }) => (
        <div className={cn("eyebrow mb-4 flex items-center gap-3", centered && "justify-center")}>
          <span className="h-px w-7 bg-gold" />
          {children}
        </div>
      ),
      subtitle: ({ children }) => (
        <p className={cn("section-subtitle mb-6 max-w-[560px]", centered && "mx-auto")}>
          {children}
        </p>
      ),
      lead: ({ children }) => (
        <p className="mb-6 text-[17px] leading-[1.7] text-mid-gray">{children}</p>
      ),
      caption: ({ children }) => (
        <p className={cn("text-sm leading-normal text-light-gray", centered && "text-center")}>
          {children}
        </p>
      ),
    },
    marks: {
      serifText: ({ children }) => (
        <span className="font-serif">{children}</span>
      ),
      highlight: ({ children }) => (
        <span className="font-medium" style={{ color: "var(--section-accent)" }}>
          {children}
        </span>
      ),
      highlightGold: ({ children }) => (
        <span className="text-gold font-medium">{children}</span>
      ),
      highlightTeal: ({ children }) => (
        <span className="text-teal">{children}</span>
      ),
      strong: ({ children }) => (
        <strong className="font-semibold">{children}</strong>
      ),
      link: ({ value, children }) => {
        const href = value?.href ?? "#";
        const isExternal = href.startsWith("http");
        return (
          <a
            href={href}
            className="text-teal underline underline-offset-2 hover:text-teal-light"
            {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {children}
          </a>
        );
      },
    },
    types: {
      statCardsBlock: StatCardsGroup,
      ctaBlock: makeCtaGroup(centered),
      testimonialBlock: TestimonialGroup,
      numberedStepBlock: NumberedStepGroup,
      iconFeatureBlock: IconFeatureGroup,
      checkListBlock: CheckListGroup,
      pricingCardsBlock: PricingCardsGroup,
      image: SanityImage,
    },
  };
}
