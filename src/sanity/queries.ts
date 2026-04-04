import { defineQuery } from "groq";

export type { PAGE_QUERY_RESULT, SITE_SETTINGS_QUERY_RESULT } from "../../sanity.types";

/** All page slugs except home (for getStaticPaths on [[slug]]) */
export const ALL_PAGE_SLUGS_QUERY = defineQuery(`
  *[_type == "page" && defined(slug.current) && slug.current != "home"] {
    "slug": slug.current
  }
`);

export const PAGE_QUERY = defineQuery(`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    seo {
      metaTitle,
      metaDescription,
      ogImage {
        asset-> {
          url,
        },
      },
      canonicalUrl,
      siteName,
    },
    modules[] {
      _type,
      _key,
      ...,
      stats[] {
        ...,
      },
      statCards[] {
        ...,
      },
      cards[] {
        ...,
      },
      steps[] {
        ...,
      },
      metrics[] {
        ...,
      },
      extraMetrics[] {
        ...,
      },
      testimonials[] {
        ...,
      },
      previewMetrics[] {
        ...,
      },
      features[] {
        ...,
      },
      values[] {
        ...,
      },
      image {
        ...,
        asset->,
      },
      primaryCta {
        ...,
      },
      secondaryCta {
        ...,
      },
      rows[] {
        ...,
        columns[] {
          ...,
          content[] {
            ...,
            _type == "image" => { ..., asset-> }
          }
        }
      },
    }
  }
`);

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_id == "siteSettings"][0] {
    navigation {
      links[] {
        label,
        href,
      },
      ctaLabel,
      ctaHref,
      theme,
    },
    footer {
      brandDescription,
      socialLinks[] {
        platform,
        url,
      },
      columns[] {
        title,
        links[] {
          label,
          href,
        },
      },
      legalLinks[] {
        label,
        href,
      },
      copyright,
    },
    seo {
      metaTitle,
      metaDescription,
      ogImage {
        asset-> {
          url,
        },
      },
      siteName,
    },
  }
`);
