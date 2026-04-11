import { lazy, Suspense } from "react";

const TrustBar = lazy(() =>
  import("./TrustBar").then((m) => ({ default: m.TrustBar }))
);
const Faq = lazy(() =>
  import("./Faq").then((m) => ({ default: m.Faq }))
);
const BookMeeting = lazy(() =>
  import("./BookMeeting").then((m) => ({ default: m.BookMeeting }))
);
const GridSection = lazy(() =>
  import("./GridSection").then((m) => ({ default: m.GridSection }))
);

export interface ModuleRendererProps {
  module: {
    _type: string;
    _key?: string;
    [key: string]: unknown;
  };
}

export function ModuleRenderer({ module }: ModuleRendererProps) {
  const { _type, _key: _unusedKey, ...props } = module;

  let content: React.ReactNode = null;

  switch (_type) {
    case "trustBar":
      content = <TrustBar {...(props as Parameters<typeof TrustBar>[0])} />;
      break;
    case "faq":
      content = <Faq {...(props as Parameters<typeof Faq>[0])} />;
      break;
    case "bookMeeting":
      content = <BookMeeting {...(props as Parameters<typeof BookMeeting>[0])} />;
      break;
    case "gridSection":
      content = <GridSection {...(props as Parameters<typeof GridSection>[0])} />;
      break;
    default:
      return null;
  }

  return <Suspense fallback={null}>{content}</Suspense>;
}
