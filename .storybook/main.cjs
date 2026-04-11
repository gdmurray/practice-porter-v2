const path = require("path");

/** @type {import("@storybook/react-vite").StorybookConfig} */
const config = {
  stories: ["../src/stories/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (viteConfig) => {
    // require.resolve uses CJS resolution (pnpm-safe), then dynamic import loads ESM
    const tailwindcssPath = require.resolve("@tailwindcss/vite");
    const { default: tailwindcss } = await import(tailwindcssPath);

    viteConfig.plugins = [...(viteConfig.plugins ?? []), tailwindcss()];

    // Ensure esbuild uses the automatic JSX runtime so React doesn't need to
    // be imported in every story/component file
    viteConfig.esbuild = {
      ...viteConfig.esbuild,
      jsx: "automatic",
    };

    viteConfig.resolve = viteConfig.resolve ?? {};
    const existingAlias = viteConfig.resolve.alias;
    if (Array.isArray(existingAlias)) {
      existingAlias.push({ find: "@", replacement: path.resolve(__dirname, "../src") });
    } else {
      viteConfig.resolve.alias = {
        ...(existingAlias ?? {}),
        "@": path.resolve(__dirname, "../src"),
      };
    }

    return viteConfig;
  },
};

module.exports = config;
