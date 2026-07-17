---
name: sanity-component-builder
description: >-
  End-to-end workflow for designing and building a new reusable Sanity-backed
  component from an HTML/design reference — a GridPortableText rich-text
  block, a reusable atomic object, or a full page module. Covers source
  analysis across reference pages, deciding what's hardcoded vs
  CMS-editable, schema + renderer wiring, implementation notes, and the
  Storybook story that follows. Use when the user asks to plan, spec, or
  build a new component/block/module from a reference/*.html section or
  screenshot, or asks to "workshop" a name for a new UI element.
---

# Sanity Component Builder

Turn a design reference (HTML section, screenshot, or Figma handoff) into a
production component: Sanity schema, React renderer, wiring, and a Storybook
story. This is the generalized version of `html-to-sanity-module` — use it
for **any** new component, not just full page modules, and use it when the
task also needs the planning/naming/scope decisions the pattern below covers.

For content population (filling in real Sanity documents after the
infra exists), switch to the `sanity-content-population` skill instead.

## Workflow

```
- [ ] Step 0: Pick the component shape (module vs PT block vs reusable object)
- [ ] Step 1: Collect the source — read + cross-reference the HTML
- [ ] Step 2: Decide hardcoded vs flexible (ask when it's a real scope call)
- [ ] Step 3: Design the schema
- [ ] Step 4: Register schema + wire into the renderer
- [ ] Step 5: Build the component (implementation notes below)
- [ ] Step 6: Build the Storybook story
- [ ] Step 7: typegen + deploy + lint
```

If the scope is non-trivial (new naming, ambiguous flexibility, multi-page
reuse), do Steps 0–2 as a **plan** (`CreatePlan`) before writing any code —
every real usage of this pattern in this repo asked at least one
`AskQuestion` before implementing. Small, obviously-scoped components can
skip straight to implementation.

---

## Step 0: Pick the component shape

| Shape | When | Registers in |
|---|---|---|
| **GridPortableText block** (e.g. `statCardsBlock`, `tabsBlock`) | Reusable, gets inserted into rich text alongside other content, composes with headings/paragraphs in a `gridSection` column | `gridColumn.tsx` `content.of[]` + `makeComponents.tsx` |
| **Reusable object, insertable two ways** (e.g. `solutionCard` used standalone *and* nested inside `tabItem`) | The exact same visual unit appears both on its own and nested inside another block | Same as above, plus give the component a `bare` prop (see Step 5) |
| **Full page module** (e.g. `stepBand`, `bookMeeting`) | A distinct, usually full-bleed or singular section that never combines with other rich-text content in the same slot | `ModuleRenderer.tsx` + `page.ts` `modules[]` |

Read `docs/grid-section-architecture.md` before deciding — it documents the
exact block/module list and the reasoning for each.

---

## Step 1: Collect the source

1. Read the cited HTML line range first, but **don't stop there** — `grep`
   the distinguishing CSS class name(s) across every file in `reference/`
   (`Grep` with `output_mode: files_with_matches`, then `content` per file).
   The same visual pattern is frequently reused verbatim across 2-3 pages
   with only copy/images changing (e.g. `.step-band` on 3 pages, `.cas-card`
   reused as tab panels).
2. For each occurrence, diff what's identical (layout, colors, decorative
   assets, structure, item count) against what varies (headings, body copy,
   image, list items).
3. Check for a `<script>` block near the section — timers, flip/accordion
   interactions, auto-rotation. Note the exact durations/easing/behavior so
   the React implementation matches (e.g. `DUR = 20000`, flip-after-2.6s).
4. Check whether required image assets already exist in `public/` (`Glob`
   `public/*.png`). If an asset is referenced by the design but missing,
   ask the user for it — don't fabricate a placeholder path silently.
5. Grep `src/sanity/schemas/objects/` and
   `src/components/modules/GridPortableText/` for an existing type that
   already covers this shape before building a new one (`iconFeatureBlock`
   vs a new "feature card" grid are easy to conflate — check field-level
   fit, not just visual similarity).
6. Cross-check colors/spacing against `src/styles/global.css` tokens
   (`--red`, `--vanilla`, `--cream`, `--ink`, `--muted-text`, etc.) — map
   reference hex values to the nearest existing token rather than
   introducing new hex.

## Step 2: Decide hardcoded vs flexible

Default rule: **only schema-ize what actually differs across real usages.**
Everything identical across every occurrence found in Step 1 stays hardcoded
in the component/CSS.

- Design mechanics that never vary (grid layout, connector lines, flip
  animation, alternating brand colors, decorative logo/icon assets) →
  hardcoded in the component + CSS, not schema fields.
- A CTA that's always the same label/action everywhere the component is used
  (e.g. "Book a Free Consultation" → `book_meeting`) → hardcode it in the
  component, not a schema field. Use the existing `data-cta-type` delegation
  pattern from `src/lib/cta.ts` / `Layout.astro`.
- Text, images, and list items that change per occurrence → schema fields.
- A fixed, small item count that must never be reordered/added-to by editors
  (e.g. always exactly 2 steps) → two named fields (`stepOne`/`stepTwo`), not
  an array. An open-ended, repeatable list (cards, checks, tabs) → an array
  with `min`/`max` validation.
- `themeField()` is the default first field on every module — but skip it
  with an explicit one-line justification if the component has genuinely
  fixed, non-themed brand colors (call this out in the plan, don't silently
  omit it).

Use `AskQuestion` when a decision meaningfully changes scope and isn't
obvious from the reference alone: naming (present 3-4 options in the
established `<name>Block`/`<name>Card` convention, mark a recommended
default), fidelity of an animation/interaction, whether structure should be
fixed or flexible, or whether this pass should also populate real content.

### Rich text usage

If the component is a GridPortableText block, decide field flatness the
same way: flatten nested "sections" into top-level fields on the object
unless there's a real reason to nest (see `solutionCard`'s flat
`expandableTitle`/`checks[]` instead of a wrapped `accordion { ... }`
object — simpler to query and edit).

For icon fields, prefer the existing `IconPickerInput` component
(`src/sanity/components/IconPickerInput.tsx`) over a hardcoded `options.list`
of icon names — it's a searchable autocomplete over the full icon set. Only
fall back to a fixed list (see `cardIcon.ts`) when the design intentionally
constrains editors to a curated subset. If a needed lucide icon isn't yet in
`src/lib/iconNames.ts` / `src/lib/icons.tsx`, add it there.

---

## Step 3: Design the schema

**Atomic item** (`src/sanity/schemas/objects/<name>.ts`):
```ts
import { defineField, defineType } from "sanity";

export const exampleCard = defineType({
  name: "exampleCard",
  title: "Example Card",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
  ],
  preview: { select: { title: "title", subtitle: "description" } },
});
```

**Container block** (PT-insertable, mirrors `statCardsBlock`/`tabsBlock`):
```ts
export const exampleCardsBlock = defineType({
  name: "exampleCardsBlock",
  title: "Example Cards",
  type: "object",
  fields: [
    defineField({ name: "columns", title: "Columns", type: "number", options: { list: [2, 3, 4] }, initialValue: 3 }),
    defineField({ name: "items", title: "Items", type: "array", of: [{ type: "exampleCard" }], validation: (Rule) => Rule.required().min(1) }),
  ],
  preview: { select: { items: "items" }, prepare: ({ items }) => ({ title: `Example Cards (${items?.length ?? 0})` }) },
});
```

**Full module** — same shape but add `moduleLayoutField()` (padding/animation
overrides) and, unless deliberately skipped (Step 2), `themeField()` first.

For nested images (any `image` field not at the PT-block top level, e.g.
`solutionCard.image` or `tabItem.content.image`), remember Step 4's GROQ
projection — GROQ's `...` never auto-resolves `asset->` at any depth.

## Step 4: Register schema + wire into the renderer

**PT block:**
1. `src/sanity/schemas/objects/index.ts` — export new type(s)
2. `src/sanity/schemas/index.ts` — add to `schemaTypes` array
3. `src/sanity/schemas/objects/gridColumn.tsx` — add `{ type: "<name>" }` to
   the `content.of` array (this is what makes it appear in Studio's Insert
   menu)
4. `src/components/modules/GridPortableText/makeComponents.tsx` — add
   `<name>: (props) => <NameGroup {...props} animated={animated} />` to the
   `types` map
5. `src/sanity/queries.ts` — add an explicit `_type == "<name>" => { ... }`
   projection in `PAGE_QUERY`'s `content[]` block for any nested image field
6. (optional, nice-to-have) `src/sanity/lib/gridIconRenderer.tsx` — add a
   `CONTENT_TYPE_ICONS` entry so the Studio column preview shows a fitting
   icon

**Full module:**
1. `src/sanity/schemas/objects/index.ts` / `modules/index.ts` — export
2. `src/sanity/schemas/index.ts` — add to `schemaTypes`
3. `src/sanity/schemas/documents/page.ts` — add `{ type: "<name>" }` to
   `modules[]`
4. `src/components/modules/ModuleRenderer.tsx` — add a `lazy()` import and a
   `case "<name>":` in the switch

After wiring, update `docs/grid-section-architecture.md` (Block Objects
table, Atomic Item Types, Files tables, GROQ section) if you added a PT
block — this doc is the map the next agent reads first.

## Step 5: Build the component — implementation notes

- `"use client"` at the top; props interface mirrors the schema fields,
  all optional with `??`/`&&` null guards (editors may leave fields empty).
- Design tokens, not hex: `var(--red)`, `.pp-container`, `.pp-section`,
  `.eyebrow`, `.section-title`. Full modules use `data-theme={theme}` +
  `style={{ background: "var(--section-bg)" }}` on the outer `<section>`
  unless Step 2 deliberately hardcoded fixed brand colors instead.
- **Reusable-in-two-places pattern**: give the component a `bare` prop
  (default `false`). `false` renders its own outer card chrome for
  standalone placement; `true` renders just the inner content, letting the
  parent (e.g. a tabs wrapper) own the outer chrome — see `SolutionCardGroup`.
- Reuse existing shadcn primitives instead of hand-rolling
  interaction/accessibility (e.g. `Accordion` for any "see more" disclosure,
  `Button` `variant="brand" size="cta"` for CTAs).
- Timer/auto-rotate interactions: `requestAnimationFrame` loop gated by an
  `IntersectionObserver` (don't start until scrolled into view), pause on
  `onMouseEnter`/`onFocus`, resume on `onMouseLeave`/`onBlur`, and always
  add a `prefers-reduced-motion: reduce` branch (skip the timer/transition
  entirely, don't just hide the visual progress indicator).
- Custom CSS beyond Tailwind utilities goes in `src/styles/global.css`
  under `@layer components`, BEM-style (`.step-band__item--one`), placed
  next to the other component blocks.
- After writing/editing, run `ReadLints` on every changed file and fix
  anything introduced.

## Step 6: Build the Storybook story

Every new GridPortableText block or module component gets a story —
this is a required step, not optional polish.

1. Read one existing story in `src/stories/blocks/` for the exact
   conventions (title format, decorator wrapper, mock data shape) — see
   `.cursor/rules/storybook-design-system.mdc`.
2. Create `src/stories/blocks/<Name>.stories.tsx`:
   `title: "Rich Text Blocks / <Name>Group"`, `tags: ["autodocs"]`, a
   decorator wrapping the story in a `maxWidth` container.
3. Write 2-4 stories covering: the full/default case, an edge case (missing
   optional field — e.g. no image, no checklist), and if the component has a
   `bare` prop, a dedicated `Bare` story.
4. Use realistic mock copy from the reference HTML, not "Lorem ipsum" —
   placeholder images can be Unsplash URLs with real `dimensions` metadata.
5. If the block also renders inside `GridPortableText.stories.tsx` or a
   parent story, add a variant there too.

## Step 7: typegen + deploy + lint

```bash
nvm use && pnpm typegen
pnpm sanity:deploy
```

Both are required after any schema change — see
`.cursor/rules/pre-commit-checklist.mdc`. Run `ReadLints` one more time
across all touched files before considering the task done.
