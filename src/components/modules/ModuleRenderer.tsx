import { lazy, Suspense } from "react";

const Faq = lazy(() =>
  import("./Faq").then((m) => ({ default: m.Faq }))
);
const GridSection = lazy(() =>
  import("./GridSection").then((m) => ({ default: m.GridSection }))
);
const LogoCarousel = lazy(() =>
  import("./LogoCarousel").then((m) => ({ default: m.LogoCarousel }))
);
const Legal = lazy(() =>
  import("./Legal").then((m) => ({ default: m.Legal }))
);
const StepBand = lazy(() =>
  import("./StepBand").then((m) => ({ default: m.StepBand }))
);
const SplitBooking = lazy(() =>
  import("./SplitBooking").then((m) => ({ default: m.SplitBooking }))
);

export interface ModuleRendererProps {
  module: {
    _type: string;
    _key?: string;
    [key: string]: unknown;
  };
  prevModuleTheme?: string;
}

export function ModuleRenderer({ module, prevModuleTheme }: ModuleRendererProps) {
  const { _type, _key: _unusedKey, ...props } = module;

  let content: React.ReactNode = null;

  switch (_type) {
    case "faq":
      content = <Faq {...(props as Parameters<typeof Faq>[0])} />;
      break;
    case "gridSection":
      content = (
        <GridSection
          {...(props as Parameters<typeof GridSection>[0])}
          prevModuleTheme={prevModuleTheme}
        />
      );
      break;
    case "logoCarousel":
      content = <LogoCarousel {...(props as Parameters<typeof LogoCarousel>[0])} />;
      break;
    case "legal":
      content = <Legal {...(props as Parameters<typeof Legal>[0])} />;
      break;
    case "stepBand":
      content = <StepBand {...(props as Parameters<typeof StepBand>[0])} />;
      break;
    case "splitBooking":
      content = (
        <SplitBooking {...(props as Parameters<typeof SplitBooking>[0])} />
      );
      break;
    default:
      return null;
  }

  return <Suspense fallback={null}>{content}</Suspense>;
}
