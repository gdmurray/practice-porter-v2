import { ComponentIcon } from "@sanity/icons";

// In dev, the Storybook server runs separately on :6006.
// In production, `pnpm build-storybook` outputs to public/design-system/ which
// Astro copies to dist/ and Cloudflare Pages serves at /design-system/.
const STORYBOOK_URL = import.meta.env.DEV
  ? "http://localhost:6006"
  : "/design-system/";

function DesignSystemTool() {
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
        src={STORYBOOK_URL}
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
