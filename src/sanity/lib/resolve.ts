import { defineDocuments, defineLocations } from "sanity/presentation";

function visualEditMessage(count: number): string {
  if (count === 1) return "Visually edit this page";
  return `Visually edit these ${count} pages`;
}

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
      resolve: (doc) => {
        const locations = [
          {
            title: doc?.title || "Untitled",
            href: doc?.slug === "home" ? "/" : `/${doc?.slug}`,
          },
        ];

        return {
          message: visualEditMessage(locations.length),
          locations,
        };
      },
    }),
  },
};
