import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "navigation", title: "Navigation" },
    { name: "footer", title: "Footer" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "navigation",
      title: "Navigation",
      type: "navigationSettings",
      group: "navigation",
    }),
    defineField({
      name: "footer",
      title: "Footer",
      type: "footerSettings",
      group: "footer",
    }),
    defineField({
      name: "seo",
      title: "Default SEO",
      type: "seo",
      group: "seo",
      description: "Default values for pages without custom SEO",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
