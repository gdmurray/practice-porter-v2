import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemas";
import { resolve } from "./src/sanity/lib/resolve";

const projectId = import.meta.env?.PUBLIC_SANITY_PROJECT_ID ?? "u06m8vwg";
const dataset = import.meta.env?.PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Site Settings")
              .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
            S.divider(),
            ...S.documentTypeListItems().filter((item) => item.getId() !== "siteSettings"),
          ]),
    }),
    presentationTool({
      previewUrl: typeof location !== "undefined" ? location.origin : "http://localhost:4321",
      resolve,
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});