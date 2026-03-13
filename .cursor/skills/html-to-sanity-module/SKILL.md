---
name: html-to-sanity-module
description: >-
  Convert HTML handoff sections into Sanity module schemas, object types, and
  React components. Use when the user provides an HTML file, a Figma handoff,
  or asks to create a new page module from a design reference.
---

# HTML to Sanity Module

Convert a design handoff (HTML file or Figma section) into a complete Sanity
module with schema, React component, and page wiring.

## Workflow

Copy this checklist and track progress:

```
- [ ] Step 1: Analyze HTML section
- [ ] Step 2: Identify reusable objects
- [ ] Step 3: Create Sanity object schemas
- [ ] Step 4: Create Sanity module schema
- [ ] Step 5: Register schema types
- [ ] Step 6: Create React component
- [ ] Step 7: Register in ModuleRenderer
- [ ] Step 8: Add to page document
- [ ] Step 9: Run typegen
- [ ] Step 10: Deploy schema
```

## Step 1: Analyze HTML section

Read the HTML file. Sections are delimited by HTML comments like
`<!-- HERO -->` or `<!-- PRICING -->`. For each section, extract:

- **Section name** (becomes the module `_type`)
- **Text content** (becomes string/text fields)
- **Repeated elements** (become array fields with object types)
- **CTAs / links** (use the existing `cta` object type)
- **Images** (use Sanity `image` type)
- **Theme** (detect background color: dark=midnight, white=#fff, cream=#f8f6f2)

## Step 2: Identify reusable objects

Check if any repeated field groups already exist in `src/sanity/schemas/objects/`.
Existing objects: `cta`, `seo`, `heroStat`, `trustItem`, `problemStatCard`,
`solutionCard`, `processStep`, `testimonial`, `scorecardFeature`,
`scorecardMetric`, `pricingCard`, `aboutValue`, `resultsMetric`,
`resultsExtraMetric`, `navLink`, `footerLink`, `footerColumn`, `socialLink`.

Only create a new object type if no existing one fits.

As well, make sure you're not recreating modules from an existing or past migration, since a lot of these migrations will be Upsert type changes, not entirely new.

## Step 3: Create Sanity object schemas

For new repeated-item types, create `src/sanity/schemas/objects/<name>.ts`:

```ts
import { defineField, defineType } from "sanity";

export const exampleItem = defineType({
  name: "exampleItem",
  title: "Example Item",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
  ],
});
```

Export from `schemas/objects/index.ts`.

## Step 4: Create Sanity module schema

Create `src/sanity/schemas/modules/<name>.ts`:

```ts
import { defineField, defineType } from "sanity";
import { themeField } from "../objects/theme";

export const <name> = defineType({
  name: "<name>",
  title: "<Display Name>",
  type: "object",
  fields: [
    themeField("<default-theme>"),  // "dark", "white", or "cream"
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    // ... extract all text fields from the HTML
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [{ type: "exampleItem" }],
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({ title: "<Display Name>", subtitle: title }),
  },
});
```

Rules:
- `themeField()` is always the first field
- Use `type: "cta"` for any CTA/button (not inline fields)
- Use `type: "text"` with `rows: 3` for multiline content
- Use `type: "image"` with `options: { hotspot: true }` for images
- Add `initialValue` for fields that have default content in the HTML
- Add `validation: (Rule) => Rule.max(N)` for capped arrays

Export from `schemas/modules/index.ts`.

## Step 5: Register schema types

1. Add new objects to `src/sanity/schemas/objects/index.ts`
2. Add new module to `src/sanity/schemas/modules/index.ts`
3. Add both to the `schemaTypes` array in `src/sanity/schemas/index.ts`
4. Add `{ type: "<name>" }` to the `modules` array in `schemas/documents/page.ts`

## Step 6: Create React component

Create `src/components/modules/<Name>.tsx`:

```tsx
"use client";

import { cn } from "@/lib/utils";

export interface <Name>Props {
  theme?: string;
  eyebrow?: string;
  title?: string;
  // ... match schema fields, all optional with null handling
}

export function <Name>({
  theme = "<default-theme>",
  eyebrow,
  title,
  ...
}: <Name>Props) {
  return (
    <section data-theme={theme} style={{ background: "var(--section-bg)" }}>
      <div className="pp-container pp-section text-center">
        {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
        {title && <h2 className="section-title mb-6">{title}</h2>}
        {/* ... */}
      </div>
    </section>
  );
}
```

Rules:
- `"use client"` at the top
- `data-theme={theme}` + `style={{ background: "var(--section-bg)" }}` on section
- `pp-container` + `pp-section` for layout
- Use design system classes: `.eyebrow`, `.section-title`, `.section-subtitle`
- Use `cn()` for conditional classes
- Props optional with `??` / `&&` null guards
- Use `lucide-react` for icons
- Use shadcn components (`Card`, `Badge`, `Button`) where appropriate

## Step 7: Register in ModuleRenderer

In `src/components/modules/ModuleRenderer.tsx`:

1. Import the component
2. Add a case to the switch:

```tsx
case "<name>":
  return <<Name> {...(props as React.ComponentProps<typeof <Name>>)} />;
```

## Step 8: Add to page document

In `src/sanity/schemas/documents/page.ts`, add to the `modules` array:

```ts
{ type: "<name>" },
```

## Step 9: Run typegen

```bash
nvm use && pnpm typegen
```

This regenerates `sanity.types.ts` with the new module types.

## Step 10: Deploy schema

```bash
pnpm sanity:deploy
```

Required before populating data via MCP. See `docs/sanity-mcp-troubleshooting.md`
if this fails.

## Decision guide

**Reuse existing object?** Check `schemas/objects/` first. A `cta` with label+href
covers most buttons. A `testimonial` covers quotes. Only create new objects for
genuinely new field shapes.

**Theme default?** Match the HTML background:
- Dark gradient / midnight → `"dark"`
- White → `"white"`
- Off-white / cream → `"cream"`

**Array vs fixed fields?** If the HTML shows 3+ similar items (cards, steps, stats),
use an array of objects. If it shows 1-2 fixed items (a single CTA pair), use
inline fields.
