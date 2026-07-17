import { type PortableTextComponents } from "@portabletext/react";
import { cn } from "@/lib/utils";
import { StatCardsGroup } from "./StatCardsGroup";
import { StatBandGroup } from "./StatBandGroup";

interface ColumnDividerValue {
  style?: "line" | "spacer";
}
import { CardsGroup } from "./CardsGroup";
import { PricingCardsGroup } from "./PricingCardsGroup";
import { makeCtaGroup } from "./CtaGroup";
import { TestimonialGroup } from "./TestimonialGroup";
import { NumberedStepGroup } from "./NumberedStepGroup";
import { IconFeatureGroup } from "./IconFeatureGroup";
import { ContactFormGroup } from "./ContactFormGroup";
import { CheckListGroup } from "./CheckListGroup";
import { FeatureCardsGroup } from "./FeatureCardsGroup";
import { SanityImage } from "./SanityImage";
import { SolutionCardGroup } from "./SolutionCardGroup";
import { TabsGroup } from "./TabsGroup";
import { StickyScrollGroup } from "./StickyScrollGroup";
import { ComparisonGroup } from "./ComparisonGroup";
import { TailoredStepsGroup } from "./TailoredStepsGroup";
import { ApproachTabsGroup } from "./ApproachTabsGroup";
import { RotatingText } from "./RotatingText";

export function makeComponents(centered: boolean, animated = false): PortableTextComponents {
  const h = animated ? { "data-anim-header": true } : {};

  return {
    block: {
      normal: ({ children }) => (
        <p className="text-base font-light leading-[1.75] text-charcoal">{children}</p>
      ),
      h1: ({ children }) => (
        <h1
          {...h}
          className="mb-4 font-serif text-[clamp(32px,4.2vw,48px)] font-normal leading-[1.18] tracking-normal"
          style={{ color: "var(--section-text)" }}
        >
          {children}
        </h1>
      ),
      h2: ({ children }) => (
        <h2 {...h} className="section-title mb-4">{children}</h2>
      ),
      h3: ({ children }) => (
        <h3
          {...h}
          className="mb-4 font-serif text-[26px] font-medium leading-[1.15] text-ink lg:text-[33px]"
        >
          {children}
        </h3>
      ),
      eyebrow: ({ children }) => (
        <div {...h} className={cn("eyebrow mb-4", centered && "text-center")}>
          {children}
        </div>
      ),
      subtitle: ({ children }) => (
        <p {...h} className={cn("section-subtitle mb-6 max-w-[700px] font-light", centered && "mx-auto")}>
          {children}
        </p>
      ),
      lead: ({ children }) => (
        <p className="mb-6 text-[15px] leading-[1.75] text-muted-text">{children}</p>
      ),
      // Matches reference/Home.html's `.stat-eyebrow` — the label above a
      // themed Stat Band. Uses color-mix against --section-text (rather than
      // the reference's hardcoded rgba(255,243,236,0.75)) so it stays legible
      // across themes, not just the red/gradient band it was designed for.
      "stat-eyebrow": ({ children }) => (
        <div
          {...h}
          className="mb-[34px] text-center text-[11px] font-semibold uppercase tracking-[2px]"
          style={{ color: "color-mix(in srgb, var(--section-text) 75%, transparent)" }}
        >
          {children}
        </div>
      ),
    },
    marks: {
      price: ({ children }) => (
        <span className="font-serif text-[2.25rem] font-medium leading-none tracking-tight text-red">
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
      highlightRed: ({ children }) => (
        <span className="text-red">{children}</span>
      ),
      highlightTerra: ({ children }) => (
        <span className="text-red-terra">{children}</span>
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
            className="text-red underline underline-offset-2 hover:text-red-terra"
            {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {children}
          </a>
        );
      },
      rotatingText: ({ value, children }) => (
        <RotatingText value={value}>{children}</RotatingText>
      ),
    },
    types: {
      columnDivider: ({ value }: { value: ColumnDividerValue }) => {
        if (value.style === "spacer") return <div className="my-6" />;
        return <hr className="my-6 border-border-color" />;
      },
      statCardsBlock: (props) => <StatCardsGroup {...props} animated={animated} />,
      statBandBlock: (props) => <StatBandGroup {...props} animated={animated} />,
      cardsBlock: (props) => <CardsGroup {...props} animated={animated} />,
      ctaBlock: makeCtaGroup(centered, animated),
      testimonialBlock: (props) => <TestimonialGroup {...props} animated={animated} />,
      numberedStepBlock: (props) => <NumberedStepGroup {...props} animated={animated} />,
      iconFeatureBlock: (props) => <IconFeatureGroup {...props} animated={animated} />,
      contactFormBlock: (props) => <ContactFormGroup {...props} />,
      checkListBlock: (props) => <CheckListGroup {...props} animated={animated} />,
      featureCardsBlock: (props) => <FeatureCardsGroup {...props} animated={animated} />,
      pricingCardsBlock: (props) => <PricingCardsGroup {...props} animated={animated} />,
      solutionCard: (props) => <SolutionCardGroup {...props} animated={animated} />,
      tabsBlock: (props) => <TabsGroup {...props} animated={animated} />,
      stickyScrollBlock: (props) => <StickyScrollGroup {...props} animated={animated} />,
      comparisonBlock: (props) => <ComparisonGroup {...props} animated={animated} />,
      tailoredStepsBlock: (props) => <TailoredStepsGroup {...props} animated={animated} />,
      approachTabsBlock: (props) => <ApproachTabsGroup {...props} animated={animated} />,
      image: (props) => <SanityImage {...props} animated={animated} />,
    },
  };
}
