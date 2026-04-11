import type { Preview } from "@storybook/react";
import "../src/styles/global.css";

const preview: Preview = {
  parameters: {
    layout: "padded",
    backgrounds: {
      default: "cream",
      values: [
        { name: "cream", value: "#FAF8F5" },
        { name: "white", value: "#FFFFFF" },
        { name: "midnight", value: "#0B1D3A" },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
