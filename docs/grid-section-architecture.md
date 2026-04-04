# Grid Section Architecture

How page sections are built using the `gridSection` module, Portable Text columns, and embedded submodule blocks.

---

## The Problem It Solves

Previously, every distinct section on the page was its own Sanity module with a hardcoded schema. Adding a new section meant: new schema file, new React component, new barrel export, new GROQ projection, new `ModuleRenderer` case — every time.

The `gridSection` module replaces one-off section modules with a composable grid system. An editor builds any section by configuring rows, columns, and inserting submodule blocks into a rich text editor. No code changes required.

---

## Data Structure

```
gridSection
 ├── name        — Studio display label (e.g. "Problem Section")
 ├── sectionId   — HTML anchor id for nav links (e.g. "problem")
 ├── theme       — cream | white | dark
 └── rows[]  →  gridRow
      ├── alignment  — left | center
      └── columns[]  →  gridColumn
           ├── width          — auto | half | oneThird | twoThirds | full
           ├── verticalAlign  — top | center | bottom
           └── content[]      — Portable Text (see below)
```

---

## Portable Text Column Content

Each column's `content` field is a Portable Text array. It supports standard text blocks **plus** custom block objects that render as full UI components.

### Block Styles (text formatting)

Set via the paragraph format dropdown in Sanity Studio:

| Style | Renders as | CSS class |
|---|---|---|
| `eyebrow` | Gold uppercase label with line | `.eyebrow` |
| `h2` | Large serif section title | `.section-title` |
| `h3` | Smaller serif subheading | `font-serif text-[22px]` |
| `subtitle` | Gray subtitle paragraph | `.section-subtitle` |
| `lead` | Slightly larger body text | `text-[17px]` |
| `normal` | Standard body paragraph | `text-base` |

### Marks (inline formatting)

| Mark | Effect |
|---|---|
| `highlight` | Wraps text in `<em class="text-teal">` — the teal italic emphasis used in headlines |
| `strong` | Bold |
| `link` | Standard anchor with `href` |

### Block Objects (submodule components)

Inserted via the "Insert" menu in the Sanity Studio editor:

| Object type | What it renders | Key fields |
|---|---|---|
| `image` | Full-width `<img>` from Sanity CDN | Sanity image asset with hotspot/crop |
| `statCardsBlock` | Grid of stat cards | `columns` (2/3/4), `items[]` → `statCard` |
| `ctaBlock` | CTA button group | `items[]` → `cta`, `alignment` |
| `testimonialBlock` | Testimonial quotes row | `items[]` → `testimonial` |
| `numberedStepBlock` | Numbered list (gold numbers, borders) | `items[]` → `numberedStep` |
| `iconFeatureBlock` | Icon + title + description list | `items[]` → `iconFeature` |
| `checkListBlock` | Checkmark list with borders | `items[]` → `{ label }` |

---

## Atomic Item Types

Submodule blocks contain arrays of these atomic types:

**`statCard`** — used in `statCardsBlock`:
- `value` — the big number/string (e.g. "45%", "$150K+")
- `label` — description below the value
- `compareText` — optional small comparison (e.g. "Industry avg: 33%")
- `icon` — optional lucide icon name
- `valueColor` — navy | red | gold | teal

**`numberedStep`** — used in `numberedStepBlock`:
- `title` — step heading
- `description` — step body text

**`iconFeature`** — used in `iconFeatureBlock`:
- `iconName` — lucide icon name
- `title` — feature heading
- `description` — feature body text

---

## Column Width System

When all columns in a row have `width: auto` (the default), they distribute evenly:
- 1 column → full width (centered if row `alignment: center`, max-width 680px)
- 2 columns → `md:grid-cols-2` (50/50)
- 3 columns → `md:grid-cols-3`
- 4 columns → `md:grid-cols-4`

When any column has an explicit width, the row switches to a `grid-cols-12` base and each column maps to a span:
- `half` → `col-span-6`
- `oneThird` → `col-span-4`
- `twoThirds` → `col-span-8`
- `full` → `col-span-full`

---

## How the V3 Sections Map to This Grid

### Problem Section
```
gridSection (theme: white, sectionId: "problem")
 Row 1 (alignment: left, 1 col)
   Col 1: [eyebrow] [h2 with highlight] [subtitle]
 Row 2 (alignment: left, 2 cols)
   Col 1: [normal] [normal]           ← body paragraphs
   Col 2: [statCardsBlock, cols: 2]   ← 45%, $150K+, 33%, 24hrs
```

### Practice Performance Report
```
gridSection (theme: white, sectionId: "ppr")
 Row 1 (alignment: left, 2 cols)
   Col 1: [eyebrow] [h2 with highlight] [subtitle]
          [numberedStepBlock]            ← Reward / Retrain / Replace
          [ctaBlock]                     ← "See Full Report Details"
   Col 2: [image]                        ← Report screenshot
```

### Follow Up Center
```
gridSection (theme: cream, sectionId: "follow-up-center")
 Row 1 (alignment: left, 2 cols)
   Col 1: [image]                        ← CRM screenshot
   Col 2: [eyebrow] [h2 with highlight] [subtitle]
          [iconFeatureBlock]              ← Missed Calls / Forms / Alerts
```

### Call Answering Service
```
gridSection (theme: cream, sectionId: "call-answering")
 Row 1 (alignment: center, 1 col)
   Col 1: [eyebrow] [h2 with highlight] [subtitle]
 Row 2 (alignment: left, 2 cols)
   Col 1: [image]                        ← Agent/phone visual
   Col 2: [h3] [normal]                  ← "How It Works" + body
          [checkListBlock]               ← Feature checklist
```

### Proven Results
```
gridSection (theme: white, sectionId: "results")
 Row 1 (alignment: center, 1 col)
   Col 1: [eyebrow] [h2] [subtitle]
 Row 2 (alignment: left, 1 col)
   Col 1: [statCardsBlock, cols: 4]      ← 94%, 95%, 3-5x, 94%
 Row 3 (alignment: left, 1 col)
   Col 1: [testimonialBlock]             ← 2 doctor quotes
```

---

## Files

### Schema
| File | Purpose |
|---|---|
| `src/sanity/schemas/modules/gridSection.ts` | Top-level module: name, sectionId, theme, rows |
| `src/sanity/schemas/objects/gridRow.ts` | Row: alignment, columns array |
| `src/sanity/schemas/objects/gridColumn.ts` | Column: width, verticalAlign, PT content field |
| `src/sanity/schemas/objects/statCard.ts` | Atomic stat card item |
| `src/sanity/schemas/objects/numberedStep.ts` | Atomic numbered step item |
| `src/sanity/schemas/objects/iconFeature.ts` | Atomic icon feature item |
| `src/sanity/schemas/objects/statCardsBlock.ts` | PT block: grid of statCards |
| `src/sanity/schemas/objects/ctaBlock.ts` | PT block: CTA button group |
| `src/sanity/schemas/objects/testimonialBlock.ts` | PT block: testimonial quotes |
| `src/sanity/schemas/objects/numberedStepBlock.ts` | PT block: numbered steps |
| `src/sanity/schemas/objects/iconFeatureBlock.ts` | PT block: icon features |
| `src/sanity/schemas/objects/checkListBlock.ts` | PT block: checkmark list |

### React
| File | Purpose |
|---|---|
| `src/components/modules/GridSection.tsx` | Layout shell — maps rows/columns to CSS grid |
| `src/components/modules/GridPortableText.tsx` | PT serializer — renders all block styles, marks, and submodule components |

### Routing
- `src/components/modules/ModuleRenderer.tsx` — `gridSection` case added
- `src/sanity/schemas/documents/page.ts` — `gridSection` added to modules array
- `src/sanity/queries.ts` — GROQ projection added (image asset reference only)

---

## GROQ Query

Only the `image` type needs an explicit projection because `asset` is a Sanity reference (`_ref`). All other embedded object types are plain objects and are spread automatically by `...`.

```groq
modules[] {
  ...,
  rows[] {
    columns[] {
      content[] {
        ...,
        _type == "image" => { ..., asset-> }
      }
    }
  }
}
```

---

## Adding a New Submodule Block

If you need a new insertable block type (e.g. `videoBlock`, `pricingTableBlock`):

1. Create the atomic item schema in `src/sanity/schemas/objects/`
2. Create the block container schema (e.g. `videoBlock.ts`) in `src/sanity/schemas/objects/`
3. Export from `src/sanity/schemas/objects/index.ts`
4. Register in `src/sanity/schemas/index.ts` → `schemaTypes` array
5. Add `{ type: "videoBlock" }` to the `of` array in `gridColumn.ts` content field
6. Add a React renderer in `GridPortableText.tsx` under `components.types`
7. Run `pnpm sanity:deploy && pnpm typegen`

No changes needed to `GridSection.tsx`, `ModuleRenderer.tsx`, or `page.ts`.
