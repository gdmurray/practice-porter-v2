import { defineDocuments, defineLocations } from "sanity/presentation";

export const resolve = {
  mainDocuments: defineDocuments([
    {
      route: "/",
      filter: `_type == "page" && slug.current == "home"`,
    },
    {
      route: "/:slug",
      filter: `_type == "page" && slug.current == $slug`,
      params: ({ params }) => ({ slug: params.slug }),
    },
  ]),
  locations: {
    page: defineLocations({
      select: { title: "title", slug: "slug.current" },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Untitled",
            href: doc?.slug === "home" ? "/" : `/${doc?.slug}`,
          },
        ],
      }),
    }),
  },
};
