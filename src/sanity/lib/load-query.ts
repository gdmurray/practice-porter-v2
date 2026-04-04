import type { QueryParams } from "sanity";
import { sanityClient } from "sanity:client";
import { stegaFilter } from "../../lib/stegaFilter";


export async function loadQuery<QueryResponse>({
  query,
  params = {},
  preview = false,
}: {
  query: string;
  params?: QueryParams;
  preview?: boolean;
}) {
  const visualEditingEnabled =
    import.meta.env.PUBLIC_SANITY_VISUAL_EDITING_ENABLED === "true";

  // Stega + drafts only when Presentation/preview URLs are active — not on every request.
  const usePreviewData = visualEditingEnabled && preview;
  const token = import.meta.env.SANITY_API_READ_TOKEN;

  if (usePreviewData && !token) {
    throw new Error(
      "The `SANITY_API_READ_TOKEN` environment variable is required when using ?preview or sanity-preview-perspective (Visual Editing).",
    );
  }

  const perspective = usePreviewData ? "drafts" : "published";

  if (usePreviewData) {
    const { result, resultSourceMap } = await sanityClient.fetch<QueryResponse>(
      query,
      params,
      {
        filterResponse: false,
        perspective,
        resultSourceMap: "withKeyArraySelector",
        stega: {
          enabled: true,
          studioUrl: "/studio",
          filter: stegaFilter,
        },
        token: token!,
      },
    );

    return {
      data: result,
      sourceMap: resultSourceMap,
      perspective,
    };
  }

  const data = await sanityClient.fetch<QueryResponse>(query, params);
  return { data, perspective };
}
