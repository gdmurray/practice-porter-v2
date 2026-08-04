import { Faq } from "./Faq";
import { GridSection } from "./GridSection";
import { LogoCarousel } from "./LogoCarousel";
import { Legal } from "./Legal";
import { StepBand } from "./StepBand";
import { SplitBooking } from "./SplitBooking";

export interface ModuleRendererProps {
  module: {
    _type: string;
    _key?: string;
    [key: string]: unknown;
  };
  prevModuleTheme?: string;
}

// Static imports (not React.lazy/Suspense) are intentional: PageModules
// hydrates as one `client:visible` island that's visible immediately (the
// hero sits at the top of the page), so per-module code-splitting never
// actually deferred any real network work here — every module's chunk was
// already being fetched right away regardless. Worse, React.lazy's
// per-boundary "selective hydration" meant each module hydrated at a
// slightly different time as its own chunk resolved, racing against
// RevealObserver's DOM-mutating `classList.add("visible")`: if the DOM was
// mutated before a given module's boundary finished hydrating, React would
// see a mismatch against its SSR snapshot for that node and log a hydration
// warning (harmless in isolation, but genuinely risky if it ever ran
// alongside a legitimate React re-render, which would drop the "visible"
// class and quietly kill that element's reveal animation). Plain static
// imports hydrate everything in one synchronous pass, matching SSR exactly.
export function ModuleRenderer({ module, prevModuleTheme }: ModuleRendererProps) {
  const { _type, _key: _unusedKey, ...props } = module;

  switch (_type) {
    case "faq":
      return <Faq {...(props as Parameters<typeof Faq>[0])} />;
    case "gridSection":
      return (
        <GridSection
          {...(props as Parameters<typeof GridSection>[0])}
          prevModuleTheme={prevModuleTheme}
        />
      );
    case "logoCarousel":
      return <LogoCarousel {...(props as Parameters<typeof LogoCarousel>[0])} />;
    case "legal":
      return <Legal {...(props as Parameters<typeof Legal>[0])} />;
    case "stepBand":
      return <StepBand {...(props as Parameters<typeof StepBand>[0])} />;
    case "splitBooking":
      return <SplitBooking {...(props as Parameters<typeof SplitBooking>[0])} />;
    default:
      return null;
  }
}
