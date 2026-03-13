import { Hero } from "./Hero";
import { TrustBar } from "./TrustBar";
import { Problem } from "./Problem";
import { Solution } from "./Solution";
import { Process } from "./Process";
import { Results } from "./Results";
import { Scorecard } from "./Scorecard";
import { Pricing } from "./Pricing";
import { About } from "./About";
import { FinalCta } from "./FinalCta";

export interface ModuleRendererProps {
  module: {
    _type: string;
    _key?: string;
    [key: string]: unknown;
  };
}

export function ModuleRenderer({ module }: ModuleRendererProps) {
  const { _type, _key, ...props } = module;

  switch (_type) {
    case "hero":
      return <Hero {...(props as React.ComponentProps<typeof Hero>)} />;
    case "trustBar":
      return <TrustBar {...(props as React.ComponentProps<typeof TrustBar>)} />;
    case "problem":
      return <Problem {...(props as React.ComponentProps<typeof Problem>)} />;
    case "solution":
      return <Solution {...(props as React.ComponentProps<typeof Solution>)} />;
    case "process":
      return <Process {...(props as React.ComponentProps<typeof Process>)} />;
    case "results":
      return <Results {...(props as React.ComponentProps<typeof Results>)} />;
    case "scorecard":
      return <Scorecard {...(props as React.ComponentProps<typeof Scorecard>)} />;
    case "pricing":
      return <Pricing {...(props as React.ComponentProps<typeof Pricing>)} />;
    case "about":
      return <About {...(props as React.ComponentProps<typeof About>)} />;
    case "finalCta":
      return <FinalCta {...(props as React.ComponentProps<typeof FinalCta>)} />;
    default:
      return null;
  }
}
