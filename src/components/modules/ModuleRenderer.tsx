import { TrustBar } from "./TrustBar";
import { Faq } from "./Faq";
import { BookMeeting } from "./BookMeeting";
import { GridSection } from "./GridSection";

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
    case "trustBar":
      return <TrustBar {...(props as React.ComponentProps<typeof TrustBar>)} />;
    case "faq":
      return <Faq {...(props as React.ComponentProps<typeof Faq>)} />;
    case "bookMeeting":
      return <BookMeeting {...(props as React.ComponentProps<typeof BookMeeting>)} />;
    case "gridSection":
      return <GridSection {...(props as React.ComponentProps<typeof GridSection>)} />;
    default:
      return null;
  }
}
