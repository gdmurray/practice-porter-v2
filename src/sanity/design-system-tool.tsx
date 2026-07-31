import { useEffect, useState } from "react";
import { ComponentIcon } from "@sanity/icons";

const STATIC_STORYBOOK_URL = "/design-system/";
const DEV_STORYBOOK_URL = "http://localhost:6006";

/** Prefer live Storybook in dev; fall back to the static build Astro serves. */
async function resolveStorybookUrl(): Promise<string> {
  if (process.env.NODE_ENV !== "development") return STATIC_STORYBOOK_URL;

  try {
    // no-cors: we only need to know the dev server accepts a connection.
    await fetch(DEV_STORYBOOK_URL, {
      mode: "no-cors",
      signal: AbortSignal.timeout(1500),
    });
    return DEV_STORYBOOK_URL;
  } catch {
    return STATIC_STORYBOOK_URL;
  }
}

function DesignSystemTool() {
  const [src, setSrc] = useState(STATIC_STORYBOOK_URL);

  useEffect(() => {
    let cancelled = false;
    resolveStorybookUrl().then((url) => {
      if (!cancelled) setSrc(url);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <iframe
        src={src}
        title="Design System (Storybook)"
        style={{ flex: 1, border: "none", width: "100%", height: "100%" }}
      />
    </div>
  );
}

export const designSystemTool = () => ({
  title: "Design System",
  name: "design-system",
  icon: ComponentIcon,
  component: DesignSystemTool,
});
