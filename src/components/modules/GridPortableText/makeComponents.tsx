import { type PortableTextComponents } from "@portabletext/react";
import { cn } from "@/lib/utils";
import { StatCardsGroup } from "./StatCardsGroup";

interface ColumnDividerValue {
  style?: "line" | "spacer";
}
import { CardsGroup } from "./CardsGroup";
import { PricingCardsGroup } from "./PricingCardsGroup";
import { makeCtaGroup } from "./CtaGroup";
import { TestimonialGroup } from "./TestimonialGroup";
import { NumberedStepGroup } from "./NumberedStepGroup";
import { IconFeatureGroup } from "./IconFeatureGroup";
import { CheckListGroup } from "./CheckListGroup";
import { SanityImage } from "./SanityImage";

export function makeComponents(centered: boolean, animated = false): PortableTextComponents {
  // When animated, apply data-anim-header to each header-style block element
  // so the parent [data-module-animated] CSS cascade can stagger them in.
  const h = animated ? { "data-anim-header": true } : {};

  return {
    block: {
      normal: ({ children }) => (
        <p className="text-base font-normal leading-[1.75] text-charcoal">{children}</p>
      ),
      h1: ({ children }) => (
        <h1
          {...h}
          className="mb-4 font-serif text-[clamp(36px,4.5vw,56px)] font-bold leading-[1.08]"
          style={{ color: "var(--section-text)" }}
        >
          {children}
        </h1>
      ),
      h2: ({ children }) => (
        <h2 {...h} className="section-title mb-4">{children}</h2>
      ),
      h3: ({ children }) => (
        <h3 {...h} className="mb-4 font-serif text-[22px] font-bold text-midnight">
          {children}
        </h3>
      ),
      eyebrow: ({ children }) => (
        <div {...h} className={cn("eyebrow mb-4 flex items-center gap-3", centered && "justify-center")}>
          <span className="h-px w-7 bg-gold" />
          {children}
        </div>
      ),
      subtitle: ({ children }) => (
        <p {...h} className={cn("section-subtitle mb-6 max-w-[560px]", centered && "mx-auto")}>
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
      price: ({ children }) => (
        <span className="font-serif text-[2.25rem] font-bold leading-none tracking-tight text-teal">
          {children}
        </span>
      ),
      serifText: ({ children }) => (
        <span className="font-serif">{children}</span>
      ),
      highlight: ({ children }) => (
        <span style={{ color: "var(--section-accent)" }}>
          {children}
        </span>
      ),
      highlightGold: ({ children }) => (
        <span className="text-gold">{children}</span>
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
      columnDivider: ({ value }: { value: ColumnDividerValue }) => {
        if (value.style === "spacer") return <div className="my-6" />;
        return <hr className="my-6 border-warm-gray" />;
      },
      statCardsBlock: (props) => <StatCardsGroup {...props} animated={animated} />,
      cardsBlock: (props) => <CardsGroup {...props} animated={animated} />,
      ctaBlock: makeCtaGroup(centered, animated),
      testimonialBlock: (props) => <TestimonialGroup {...props} animated={animated} />,
      numberedStepBlock: (props) => <NumberedStepGroup {...props} animated={animated} />,
      iconFeatureBlock: (props) => <IconFeatureGroup {...props} animated={animated} />,
      checkListBlock: (props) => <CheckListGroup {...props} animated={animated} />,
      pricingCardsBlock: (props) => <PricingCardsGroup {...props} animated={animated} />,
      image: (props) => <SanityImage {...props} animated={animated} />,
    },
  };
}
