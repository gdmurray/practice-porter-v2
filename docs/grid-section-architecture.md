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
 ├── theme       — white | lotion | vanilla | red | gradient
 ├── backgroundImage    — optional full-bleed image (asset + alt)
 ├── gradientDirection  — none | left | right — overlays theme bg, fades to transparent
 ├── isHero      — boolean — caps section at 80vh; see "Hero Sections" below
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
| `eyebrow` | Burnt-red uppercase label with line | `.eyebrow` |
| `h2` | Large serif section title | `.section-title` |
| `h3` | Smaller serif subheading | `font-serif text-[22px]` |
| `subtitle` | Muted subtitle paragraph | `.section-subtitle` |
| `lead` | Slightly larger body text | `text-[17px]` |
| `normal` | Standard body paragraph | `text-base` |

### Marks (inline formatting)

| Mark | Effect |
|---|---|
| `highlight` | Wraps text in a `<span>` colored `var(--section-accent)` — follows the current section theme's accent (usually `red`, `vanilla` on `red`/`gradient` themes) |
| `highlightRed` | Wraps text in `<span class="text-red">` — forces burnt-red regardless of theme |
| `highlightTerra` | Wraps text in `<span class="text-red-terra">` — softer terracotta emphasis |
| `strong` | Bold |
| `link` | Standard anchor with `href` |
| `rotatingText` | Mark **annotation** (not an inline object) — cycles through a `words[]` array on a 3s-per-word fade/slide loop (matches `reference/About Us.html`'s `.rotw`). Carries no typography of its own; nest it with `em`/`strong`/`highlight`/`serifText` decorators on the same selection to style the rotating word — those marks wrap it and their styles inherit through. `prefers-reduced-motion: reduce` shows the first word only, no animation. See `RotatingText.tsx` + `.rotw`/`@keyframes rotw` in `global.css` |

### Block Objects (submodule components)

Inserted via the "Insert" menu in the Sanity Studio editor:

| Object type | What it renders | Key fields |
|---|---|---|
| `image` | Full-width `<img>` from Sanity CDN | Sanity image asset with hotspot/crop |
| `statCardsBlock` | Grid of stat cards | `columns` (2/3/4), `theme` (lotion/vanilla/white), `items[]` → `statCard` |
| `ctaBlock` | CTA button group | `items[]` → `cta`, `alignment` |
| `testimonialBlock` | Testimonial quotes — grid (all shown) or single-card carousel | `items[]` → `testimonial`, `variant` (grid/carousel), `autoRotateSeconds` (carousel only) |
| `numberedStepBlock` | Numbered list (burnt-red numbers, borders) | `items[]` → `numberedStep` |
| `iconFeatureBlock` | Icon + title + description list | `variant` (`feature` / `detail`), `items[]` → `iconFeature` |
| `contactFormBlock` | Contact form card (fields, submit, success state) | `formTitle`, `formSubtitle`, `interestOptions[]`, `privacyPolicyHref`, `successTitle`, `successMessage` |
| `checkListBlock` | Checkmark list with borders | `items[]` → `{ label }` |
| `featureCardsBlock` | Grid of bordered icon+title+description cards | `columns` (2/3/4), `items[]` → `featureCard` (each can be `default` or `link` type — see below) |
| `solutionCard` | Image + copy card with an optional "See More" checklist disclosure | `title`, `image`, `details[]`, `expandableTitle`, `checks[]` |
| `tabsBlock` | Timer-driven tab bar whose panels reuse `solutionCard` | `items[]` → `tabItem`, `autoRotateSeconds` |
| `stickyScrollBlock` | Sticky image rail that cross-fades between steps as you scroll; stacks to a plain image-then-text list per step on mobile | `items[]` → `stickyScrollStep` |
| `comparisonBlock` | Paired dark/light stat cards with a 5-icon fill comparison ("2 / 5" vs "4 / 5") plus a CTA banner. Card colors are fixed, not theme-driven | `leftCard`/`rightCard` → `comparisonCard` (`label`, `overLabel`, `value`, `caption`, `filledCount`), `banner` (`headline`, `headlineEmphasis`, `subtext`, `cta`) |
| `tailoredStepsBlock` | Two connected step cards (e.g. Consultation → Solutions) with an arrow connector between them | `stepOne`/`stepTwo` → `tailoredStep` (`badge`, `eyebrow`, `title`, `body`, `cta`, `links[]` → `tailoredSolutionLink`) |
| `approachTabsBlock` | Vertical numbered step list (per-step progress + deep link) paired with an illustration panel that swaps as each step becomes active. Timer/pause mechanics mirror `tabsBlock` but the panel is a distinct illustration card, not a nested `solutionCard` | `items[]` → `approachTab` (`label`, `body`, `link`, `kicker`, `panelTitle`, `image`, `cta`), `autoRotateSeconds` |

---

## Atomic Item Types

Submodule blocks contain arrays of these atomic types:

**`statCard`** — used in `statCardsBlock`:
- `value` — the big number/string (e.g. "45%", "$150K+")
- `label` — description below the value
- `compareText` — optional small comparison (e.g. "Industry avg: 33%")
- `icon` — optional lucide icon name
- `valueColor` — ink | red | terra | muted

**`numberedStep`** — used in `numberedStepBlock`:
- `title` — step heading
- `description` — step body text

**`iconFeature`** — used in `iconFeatureBlock`:
- `iconName` — lucide icon name
- `title` — feature heading (or uppercase label when `variant` is `detail`)
- `description` — feature body text (or value line when `variant` is `detail`)

`iconFeatureBlock.variant`:
- `feature` (default) — rounded-square icon, bold title, muted description
- `detail` — circle icon, red uppercase label, ink value (e.g. contact email / response time rows)

**`featureCard`** — used in `featureCardsBlock`:
- `type` — `default` (static) | `link` (clickable — see below)
- `iconLocation` — `left` (default, compact row layout) | `top` (see below)
- `icon` — lucide icon name
- `title` — card heading
- `description` — card body text
- `cta` — a `cta` object; only shown/used when `type` is `link`. The card's own `title` is the visible link text, so the CTA's `label` field is not required in this context (see `cta.ts`'s grandparent-aware validation via `getValueAtPath`)

**`tabItem`** — used in `tabsBlock`:
- `title` — tab button label
- `icon` — lucide icon name (via the `IconPickerInput` autocomplete)
- `content` — a `solutionCard` (see below) rendered as that tab's panel

**`stickyScrollStep`** — used in `stickyScrollBlock`:
- `image` — hotspot + alt, required
- `content` — a minimal Portable Text array (its own tiny editor, `stickyScrollPortableTextEditor.tsx` — `Normal`/`Step Title` styles, bold + link only, **no embedded block-objects**, since this field lives inside the same object that `gridColumn`'s block-object list would otherwise need to reference, which is what would create a real circular schema/import reference)

**`comparisonCard`** — used in `comparisonBlock` (fixed `leftCard`/`rightCard` fields, not an array — always exactly two, dark vs light):
- `label` — e.g. "Industry Average"
- `overLabel` — optional small italic label above the value, e.g. "OVER"
- `value` — display string, e.g. "2 / 5"
- `caption` — e.g. "new patient calls booked as appointments"
- `filledCount` — 0–5, how many of the 5 person icons are filled

**`tailoredStep`** — used in `tailoredStepsBlock` (fixed `stepOne`/`stepTwo` fields, not an array):
- `badge` — step number string
- `eyebrow` — e.g. "Consultation"
- `title`, `body`
- `cta` — use when the step has a single CTA (e.g. "Book Free Consultation")
- `links[]` → `tailoredSolutionLink` — use instead of `cta` when the step lists multiple linked solutions

**`tailoredSolutionLink`** — used in `tailoredStep.links[]`:
- `icon` — lucide icon name (via `IconPickerInput`)
- `cta` — the link's own `label` is shown as the visible link text

**`approachTab`** — used in `approachTabsBlock`:
- `label` — step name; also shown as the illustration panel's eyebrow when active
- `body` — shown under the label when the step is active
- `link` — optional deep-link CTA shown under `body`, e.g. "Practice Performance Report →"
- `kicker`, `panelTitle`, `image`, `cta` — illustration panel content that swaps in as this step becomes active

---

## `solutionCard` — a Reusable Card, Insertable Two Ways

`solutionCard` is deliberately **not** wrapped in its own container block. The same object type is:

1. **Inserted directly** into a column's `content[]` for a single standalone card — e.g. the "Live Call Answering Services" card on the Call Answering Solutions page, or the "Front Desk Training Sessions" card on the Front Desk Training page (both are single-panel versions of the same UI, with no tab bar).
2. **Nested** as `tabItem.content` inside `tabsBlock` — e.g. the four rotating panels on the Practice Performance Report page.

Fields: `title`, `image` (hotspot + alt), `details[]` (short lines, always shown, divider-separated), `expandableTitle` (defaults to "The Practice Porter Solution"), `checks[]` (checkmark bullets — when empty, no "See More" disclosure is rendered at all). The "Book a Free Consultation" CTA is hardcoded in `SolutionCardGroup.tsx`, not a schema field, since it's identical everywhere the card appears.

`SolutionCardGroup` accepts a `bare` prop: `false` (default) draws its own rounded/bordered/shadowed card chrome for standalone placement; `true` renders just the inner grid + disclosure with no outer chrome, used by `TabsGroup` so the tab bar and active panel read as one continuous card.

---

## `featureCard` — Default vs Link Type

Mirrors the "Pairs Well With" cross-link cards from the reference HTML
(`.pairs-card` in `reference/Call Answering Solutions.html`), but reuses the
same icon+title+description card shell as the default `featureCard` rather
than a separate component — only the interaction differs:

- **`default`** — static card, regular cursor, description always visible, no arrow.
- **`link`** — renders as an `<a>` (via `ctaProps()` from `src/lib/cta.ts`, so `ctaType: "external"`/`"book_meeting"` behave the same as any other CTA), `cursor-pointer`, and adds a right arrow icon. The description is collapsed (`max-h-0 opacity-0`) until the card is hovered/focused, then animates open — mirroring `.pairs-card p`'s `max-height`/`opacity` hover transition — while the arrow nudges right (`.pairs-arr`'s `translateX` hover effect).

Because the card's own `title` already serves as the visible link text, the
nested `cta` field's `label` is optional here — `cta.ts`'s `label` validation
walks up to its grandparent via `getValueAtPath` (`src/sanity/lib/getValueAtPath.ts`)
to detect `_type === "featureCard"` and skip the required check only in that
context (it's still required for `ctaBlock.items[]`, `navigationSettings.cta`, etc.).

`iconLocation` swaps the whole card layout, independent of `type`:
- **`left`** (default) — compact row: icon, then title+description in a single vertically-centered column, arrow (if `link`) on the far right. `link` cards get a fixed `min-h` so the hover-revealed description never grows the card — see the comments in `FeatureCardsGroup.tsx`.
- **`top`** — mirrors the "Our Focus" cards from `reference/About Us.html` (`.focus-card`): icon (46px) above a larger serif title, description always visible below (no hover-reveal, since there's no compact-space constraint to solve for). If `link`, the arrow sits inline next to the title instead of at the card's edge.

---

## `splitBooking` — a Full Module With Its Own Curated Rich Text

`splitBooking` (`src/sanity/schemas/modules/splitBooking.ts` /
`src/components/modules/SplitBooking.tsx`) is a **full page module**, not a
`gridColumn` block object — the reference section (`reference/About Us.html`'s
`.book-card`) is a singular full-bleed card, never combined with other rich
text in a shared column. It is the booking surface for the site (the older
centered-iframe `bookMeeting` module was removed).

Its left (always brand-red) panel is Portable Text, but uses its own
deliberately narrow editor — `splitBookingPortableTextEditor.tsx`
(`h2`/`normal` styles, bold + link only) — the same "minimal editor, no
circular block-object refs" pattern as `stickyScrollPortableTextEditor.tsx`
and `legalPortableTextEditor.tsx`. Its `content[]` array allows two block
objects: the existing `checkListBlock` (rendered with `tone="onBrand"` — see
below) and a new reusable `avatarBlock` (`initials`/`name`/`role`/`image`) for
named-person credits like "Shaan Brach, CEO & Founder". Neither this editor
nor `avatarBlock` is registered on the main `gridColumn` insert menu — they're
scoped to this module for now.

The right panel is always the Google Calendar scheduler embed, reading
`PUBLIC_GOOGLE_CALENDAR_BOOKING_URL` from the environment — never a schema
field, so the URL is never duplicated or hand-typed in Studio.

`CheckListGroup` (`src/components/modules/GridPortableText/CheckListGroup.tsx`)
takes an optional `tone?: "default" | "onBrand"` prop for this case — cream
circle-check icons and cream text for placement on the solid red panel,
instead of the default red-check-on-light-background treatment.

---

## Column Width System

When all columns in a row have `width: auto` (the default), they distribute evenly:
- 1 column → full width (centered if row `alignment: center`, max-width 900px)
- 2 columns → `md:grid-cols-2` (50/50)
- 3 columns → `md:grid-cols-3`
- 4 columns → `md:grid-cols-4`

When any column has an explicit width, the row is `grid-cols-1` on mobile (every column stacks full-width) and switches to a `md:grid-cols-12` base at the `md` breakpoint, where each column maps to a span:
- `half` → `md:col-span-6`
- `oneThird` → `md:col-span-4`
- `twoThirds` → `md:col-span-8`
- `full` → `col-span-full` (full-width at every breakpoint, so no `md:` prefix needed)

---

## Hero Sections (`isHero`)

Toggling `isHero` turns a `gridSection` into a hero-style banner:

- The `<section>` gets `max-height: 80vh` (combined with the existing `overflow-hidden`, so tall content is clipped rather than pushing the section taller).
- The `backgroundImage` renders as a **height-filling panel anchored to one edge** — `w-1/2` of the section, pinned top-to-bottom — rather than stretched across the full section width. Stretching a photo to `object-cover` a wide, short (80vh) box forces an aggressive zoom on most aspect ratios; a half-width panel (that scales with the container, not a fixed `vw`/`px` cap) keeps the crop reasonable at any viewport size.
- That panel is anchored horizontally to the side **opposite** `gradientDirection` — the gradient fades to transparent moving away from its named side, so the image should stay visible on that far side: `gradientDirection: "left"` (solid left, fading right) anchors the image panel right, and vice versa. No gradient direction defaults to anchoring right.
- Within the panel, the image is `object-cover object-top` — any excess (if the source photo's aspect ratio still doesn't match the panel) is cropped from the bottom, keeping the top visible, and from the side facing away from the anchor.
- The gradient-fade overlay is nested **inside** the image panel (not spanning the full section) so its 0–100% mask stops always align with the panel's actual bounds — the blend spans the image's full width regardless of how wide the panel ends up being, avoiding a hard seam at the edge.
- The rest of the section (away from the image panel) shows the theme background — it's not filled with a stretched image.

This mirrors the narrow, side-anchored photo treatment in `reference/Practice Performance Report.html`'s `.pgs-hero-photo` (top/right/bottom anchored, mask-faded from the gradient side).

---

## How the V3 Sections Map to This Grid

### Contact Page

```
gridSection (theme: gradient, isHero, circlePattern)
  Row 1 (alignment: center, 1 col full)
    [eyebrow] Get in Touch
    [h1] Contact Us
    [subtitle] …

gridSection (theme: lotion, sectionId: "form")
  Row 1 (alignment: left, 2 cols)
    Col 1 (oneThird, top):
      [h2] Let's Start a Conversation
      [lead] …
      [iconFeatureBlock variant: detail]  ← Email / Response Time
    Col 2 (twoThirds, top):
      [contactFormBlock]
```

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
gridSection (theme: lotion, sectionId: "follow-up-center")
 Row 1 (alignment: left, 2 cols)
   Col 1: [image]                        ← CRM screenshot
   Col 2: [eyebrow] [h2 with highlight] [subtitle]
          [iconFeatureBlock]              ← Missed Calls / Forms / Alerts
```

### Call Answering Service
```
gridSection (theme: lotion, sectionId: "call-answering")
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

### Home — Approach, Tailored Solution, Comparison, Testimonials
```
gridSection (theme: cream, sectionId: "approach")
 Row 1 (alignment: center, 1 col)
   Col 1: [eyebrow "Our Three-Step Approach"] [h2] [subtitle]
 Row 2 (alignment: left, 1 col)
   Col 1: [approachTabsBlock]            ← Record / Retrain / Replace

gridSection (theme: cream, sectionId: "tailored")
 Row 1 (alignment: center, 1 col)
   Col 1: [h2] [subtitle]
 Row 2 (alignment: left, 1 col)
   Col 1: [tailoredStepsBlock]           ← Consultation → Solutions (sol-links)

gridSection (theme: red, sectionId: "comparison")
 Row 1 (alignment: center, 1 col)
   Col 1: [h2 with highlight]            ← "Most Practices Book Two in Five..."
 Row 2 (alignment: left, 1 col)
   Col 1: [comparisonBlock]              ← Industry Average vs PP + CTA banner

gridSection (theme: white, sectionId: "testimonials")
 Row 1 (alignment: left, 2 cols)
   Col 1: [h2] [subtitle]
   Col 2: [testimonialBlock, variant: "carousel"]
```

Approach and Tailored are two separate `gridSection`s (not one section split into two rows) — each gets its own centered header, unlike the reference's single continuous `.ap-tl-wrap` gradient div. Both reuse the same `cream` theme so the seam between them reads as one continuous band.

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
| `src/sanity/schemas/objects/iconFeatureBlock.ts` | PT block: icon features (`feature` / `detail` variants) |
| `src/sanity/schemas/objects/contactFormBlock.ts` | PT block: contact form card |
| `src/sanity/schemas/objects/checkListBlock.ts` | PT block: checkmark list |
| `src/sanity/schemas/objects/featureCard.ts` | Atomic feature card item — `type` (default/link), `cta` |
| `src/sanity/lib/getValueAtPath.ts` | Validation helper: resolves a value at an arbitrary document path (for grandparent-aware `Rule.custom` checks) |
| `src/sanity/schemas/objects/featureCardsBlock.ts` | PT block: grid of feature cards |
| `src/sanity/schemas/objects/solutionCard.ts` | Reusable object: image + copy card w/ optional checklist disclosure |
| `src/sanity/schemas/objects/tabItem.ts` | Atomic tab item: title, icon, `content` → `solutionCard` |
| `src/sanity/schemas/objects/tabsBlock.ts` | PT block: timer-driven tabs, `items[]` → `tabItem` |
| `src/sanity/schemas/objects/stickyScrollPortableTextEditor.tsx` | Minimal block-only editor (`Normal`/`Step Title` styles, bold + link) used only by `stickyScrollStep.content` |
| `src/sanity/schemas/objects/stickyScrollStep.ts` | Atomic item: image + minimal rich-text `content` |
| `src/sanity/schemas/objects/stickyScrollBlock.ts` | PT block: sticky cross-fading image rail, `items[]` → `stickyScrollStep` |
| `src/sanity/schemas/objects/comparisonCard.ts` | Atomic item: `label`/`overLabel`/`value`/`caption`/`filledCount` |
| `src/sanity/schemas/objects/comparisonBlock.ts` | PT block: paired dark/light comparison cards (`leftCard`/`rightCard`) + CTA banner |
| `src/sanity/schemas/objects/tailoredSolutionLink.ts` | Atomic item: `icon` + `cta` (label is the visible link text) |
| `src/sanity/schemas/objects/tailoredStep.ts` | Atomic item: `badge`/`eyebrow`/`title`/`body` + either a single `cta` or `links[]` → `tailoredSolutionLink` |
| `src/sanity/schemas/objects/tailoredStepsBlock.ts` | PT block: two connected `tailoredStep`s (`stepOne`/`stepTwo`) with an arrow connector |
| `src/sanity/schemas/objects/approachTab.ts` | Atomic item: step label/body/link + illustration panel fields (kicker/panelTitle/image/cta) |
| `src/sanity/schemas/objects/approachTabsBlock.ts` | PT block: vertical numbered step list + swapping illustration panel, `items[]` → `approachTab`, `autoRotateSeconds` |

### React
| File | Purpose |
|---|---|
| `src/components/modules/GridSection.tsx` | Layout shell — maps rows/columns to CSS grid |
| `src/components/modules/GridPortableText.tsx` | PT serializer — renders all block styles, marks, and submodule components |
| `src/components/modules/GridPortableText/SolutionCardGroup.tsx` | Renders `solutionCard` — accepts a `bare` prop for chrome-less nesting inside `TabsGroup` |
| `src/components/modules/GridPortableText/TabsGroup.tsx` | Renders `tabsBlock` — tab bar, progress bar, `requestAnimationFrame` auto-rotate timer, pause on hover/focus |
| `src/components/modules/GridPortableText/StickyScrollGroup.tsx` | Renders `stickyScrollBlock` — sticky cross-fading image rail on desktop (`IntersectionObserver`-driven active step), plain stacked image-then-text list on mobile. Renders `content` with its own local `<PortableText>` call rather than `GridPortableText`, to avoid importing `makeComponents.tsx` (which imports this file) |
| `src/components/modules/GridPortableText/ComparisonGroup.tsx` | Renders `comparisonBlock` — dark/light `leftCard`/`rightCard` with a 5-icon fill (`PersonGrid`), "vs." label, and an optional CTA banner |
| `src/components/modules/GridPortableText/TailoredStepsGroup.tsx` | Renders `tailoredStepsBlock` — two step cards (`stepOne`/`stepTwo`), each rendering either a single CTA or a `links[]` list of icon deep-links, with a centered arrow connector on desktop |
| `src/components/modules/GridPortableText/ApproachTabsGroup.tsx` | Renders `approachTabsBlock` — vertical numbered step list with per-step progress bar (shown under the active step only) + a swapping illustration panel. Timer/pause/`IntersectionObserver`-arm mechanics mirror `TabsGroup.tsx` |
| `src/components/modules/GridPortableText/ContactFormGroup.tsx` | Renders `contactFormBlock` — white form card with validation, interest select, and success state |

### Routing
- `src/components/modules/ModuleRenderer.tsx` — `gridSection` case added
- `src/sanity/schemas/documents/page.ts` — `gridSection` added to modules array
- `src/sanity/queries.ts` — GROQ projection added (image asset reference only)

---

## GROQ Query

Only fields containing a Sanity image reference (`asset` → `_ref`) need an explicit projection — everything else is a plain object and is spread automatically by `...`. This applies **regardless of nesting depth**: a top-level `image` block, `solutionCard.image`, `tabsBlock.items[].content.image`, `stickyScrollBlock.items[].image`, and `approachTabsBlock.items[].image` each need their own `asset->` projection, since GROQ's `...` does not auto-resolve references at any level. `comparisonBlock` and `tailoredStepsBlock` have no image fields, so they need no special-case projection — the default `...` spread covers them (including their nested `cta` objects, which are plain fields with no asset references).

```groq
modules[] {
  ...,
  rows[] {
    columns[] {
      content[] {
        ...,
        _type == "image" => { ..., asset-> },
        _type == "solutionCard" => { ..., image { ..., asset-> } },
        _type == "tabsBlock" => {
          ...,
          items[] { ..., content { ..., image { ..., asset-> } } }
        },
        _type == "stickyScrollBlock" => {
          ...,
          items[] { ..., image { ..., asset-> } }
        },
        _type == "approachTabsBlock" => {
          ...,
          items[] { ..., image { ..., asset-> } }
        }
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
