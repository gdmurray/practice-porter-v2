import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { structureHomeLandingPlugin } from "sanity-plugin-blank-space";
import { schemaTypes } from "./src/sanity/schemas";
import { EditorGuide } from "@/sanity/components/EditorGuide";
import { resolve } from "./src/sanity/lib/resolve";
import { designSystemTool } from "@/sanity/design-system-tool";

const projectId = import.meta.env?.PUBLIC_SANITY_PROJECT_ID ?? "u06m8vwg";
const dataset = import.meta.env?.PUBLIC_SANITY_DATASET ?? "production";
const previewUrl =
  import.meta.env?.PUBLIC_SANITY_PREVIEW_URL ??
  (typeof location !== "undefined" ? location.origin : "http://localhost:4321");

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
    structureHomeLandingPlugin({
      component: EditorGuide,
      title: "Editor guide",
      paneId: "home",
    }),
    presentationTool({
      previewUrl: `${previewUrl}?preview=true`,
      resolve,
    }),
  ],
  tools: [designSystemTool()],
  tasks: {
    enabled: true
  },
  releases: {
    enabled: false,
  },
  scheduledDrafts: {
    enabled: false,
  },
  schema: {
    types: schemaTypes,
  },
});