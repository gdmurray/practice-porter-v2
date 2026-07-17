import { defineField, defineType } from "sanity";
import { getValueAtPath } from "@/sanity/lib/getValueAtPath";
import { InternalLinkInput } from "@/sanity/components/InternalLinkInput";

/**
 * `context.parent` in a `Rule.custom` validator only exposes the immediate
 * parent object (this `cta` object itself) — walk up two path segments (this
 * field, then the `cta` field) to reach the grandparent, e.g. to special-case
 * behavior when a `cta` is nested inside a Feature Card.
 */
function getGrandparent(context: { document?: unknown; path?: unknown }) {
  return getValueAtPath(
    context.document,
    ((context.path as (string | number)[]) ?? []).slice(0, -2)
  ) as { _type?: string; type?: string } | undefined;
}

export const cta = defineType({
  name: "cta",
  title: "Call to Action",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description:
        "Not required when this CTA is a Feature Card's link — the card's own title is displayed as the visible link text instead.",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const grandparent = getGrandparent(context);
          if (grandparent?._type === "featureCard") return true;
          return value ? true : "Label is required.";
        }),
    }),
    defineField({
      name: "href",
      title: "URL",
      type: "string",
      components: { input: InternalLinkInput },
      description:
        'For internal links, pick a page from the dropdown or type "#section-id" to scroll to an anchor on the current page.',
      hidden: ({ parent }) => parent?.ctaType === "book_meeting",
      validation: (Rule) =>
        Rule.custom(async (value, context) => {
          // A `cta` nested in a Feature Card is inert unless the card's type
          // is "link" — but Sanity still applies field `initialValue`s (e.g.
          // `ctaType: "internal"`) to the hidden object as soon as the card
          // is created, so it needs to be exempted here too.
          const grandparent = getGrandparent(context);
          if (grandparent?._type === "featureCard" && grandparent.type !== "link") {
            return true;
          }

          const parent = context.parent as { ctaType?: string } | undefined;
          if (parent?.ctaType === "book_meeting") return true;
          if (!value) return "URL is required unless CTA Type is Book Meeting.";

          if (parent?.ctaType !== "internal") return true;

          // In-page anchors (e.g. "#pricing") aren't page slugs — skip the
          // existence check for those.
          const [urlPath] = value.split("#");
          if (!urlPath) return true;

          const slug = urlPath === "/" ? "home" : urlPath.replace(/^\/+/, "");
          const client = context.getClient({ apiVersion: "2026-03-10" });
          const matchCount = await client.fetch<number>(
            `count(*[_type == "page" && slug.current == $slug])`,
            { slug }
          );
          if (!matchCount) {
            return `No page found at "${urlPath}". Pick a page from the dropdown or fix the URL.`;
          }
          return true;
        }),
    }),
    defineField({
      name: "variant",
      title: "Style",
      type: "string",
      options: {
        list: [
          { title: "Primary (burnt red filled)", value: "primary" },
          { title: "Secondary (white / outline)", value: "secondary" },
        ],
        layout: "radio",
      },
      initialValue: "primary",
    }),
    defineField({
      name: "ctaType",
      title: "CTA Type",
      type: "string",
      options: {
        list: [
          { title: "Internal Link (url or anchor)", value: "internal"},
          { title: "External Link", value: "external"},
          { title: "Book Meeting Popup", value: "book_meeting"},
        ],
        layout: "radio"
      },
      initialValue: "internal",
    })
  ],
  preview: {
    select: { label: "label" },
    prepare: ({ label }) => ({ title: label }),
  },
});
