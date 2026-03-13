import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.PUBLIC_SANITY_PROJECT_ID ?? "u06m8vwg",
    dataset: process.env.PUBLIC_SANITY_DATASET ?? "production",
  },
  typegen: {
    path: "./src/**/*.{ts,tsx}",
    schema: "./schema.json",
    generates: "./sanity.types.ts",
    overloadClientMethods: true,
  },
  schemaExtraction: {
    enabled: true,
  },
});
