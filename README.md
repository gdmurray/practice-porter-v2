# Practice Porter v2

Marketing site for Practice Porter — boutique dental call intelligence. Built with Astro 5, Sanity v5, Tailwind CSS v4, and deployed to Cloudflare Pages.

## Stack

| Layer | Technology |
|---|---|
| Framework | Astro 5 (SSR via Cloudflare adapter) |
| CMS | Sanity v5 (Studio embedded at `/studio`) |
| Styling | Tailwind CSS v4 + shadcn |
| Runtime | Cloudflare Pages |
| Package manager | pnpm |
| Node | v22+ (see `.nvmrc`) |

---

## Getting started

### 1. Prerequisites

- [nvm](https://github.com/nvm-sh/nvm) installed
- [pnpm](https://pnpm.io/installation) installed
- Access to the Sanity project (projectId: `u06m8vwg`, dataset: `production`)

### 2. Clone and install

```bash
git clone <repo-url>
cd practice-porter-v2
nvm use
pnpm install
```

### 3. Environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `PUBLIC_SANITY_PROJECT_ID` | Sanity project ID — find it at [sanity.io/manage](https://sanity.io/manage) |
| `PUBLIC_SANITY_DATASET` | Dataset name (default: `production`) |
| `PUBLIC_SANITY_VISUAL_EDITING_ENABLED` | Set `true` for dev/preview, `false` for production |
| `SANITY_API_READ_TOKEN` | Required when Visual Editing is enabled — create a **Viewer** token at sanity.io/manage under API > Tokens |

> Secrets (`SANITY_API_READ_TOKEN`) go in `.env.local`, which is gitignored. Public variables go in `.env`.

### 4. Run the dev server

```bash
pnpm dev
```

The site runs at `http://localhost:4321`. The embedded Sanity Studio is at `http://localhost:4321/studio`.

---

## Commands

| Command | Action |
|---|---|
| `pnpm dev` | Start local dev server at `localhost:4321` |
| `pnpm build` | Build for production to `./dist/` |
| `pnpm preview` | Build + run Cloudflare Pages locally via Wrangler |
| `pnpm deploy` | Build + deploy to Cloudflare Pages |
| `pnpm typegen` | Extract Sanity schema and regenerate `sanity.types.ts` |
| `pnpm sanity:deploy` | Deploy local schema to Sanity cloud |

> Always run `nvm use` before any CLI command to ensure the correct Node version.

---

## Project structure

```
.
├── public/                        # Static assets (favicon, robots.txt)
├── src/
│   ├── components/
│   │   ├── layout/                # Navigation.tsx, Footer.tsx (site-wide)
│   │   ├── modules/               # Page section components (Hero, Pricing, etc.)
│   │   │   └── ModuleRenderer.tsx # Maps Sanity _type -> React component
│   │   ├── ui/                    # shadcn primitives (button, card, sheet, etc.)
│   │   └── PageModules.tsx        # Renders a page's modules[] array
│   ├── layouts/
│   │   └── Layout.astro           # Base HTML shell (head, scripts, Visual Editing)
│   ├── lib/
│   │   ├── utils.ts               # cn() Tailwind class helper
│   │   ├── cta.ts                 # ctaProps() helper for CTA link rendering
│   │   └── icons.tsx              # Shared icon components
│   ├── pages/
│   │   ├── index.astro            # Root route — fetches page with slug "home"
│   │   └── [[slug]].astro         # Catch-all for all other pages
│   ├── sanity/
│   │   ├── lib/
│   │   │   └── load-query.ts      # Visual Editing-aware fetch wrapper (use this, not sanityClient.fetch)
│   │   ├── queries.ts             # All GROQ queries (defineQuery)
│   │   └── schemas/
│   │       ├── documents/         # page.ts, siteSettings.ts
│   │       ├── modules/           # hero.ts, pricing.ts, finalCta.ts, etc.
│   │       ├── objects/           # cta.ts, seo.ts, theme.ts, etc.
│   │       └── index.ts           # Barrel export of all schema types
│   └── styles/
│       └── global.css             # Design tokens, Tailwind config, component classes
├── sanity.config.ts               # Sanity Studio config (structure, plugins, schema)
├── sanity.cli.ts                  # Sanity CLI config (TypeGen, schema extraction)
├── sanity.types.ts                # Generated types — do not edit manually
├── schema.json                    # Extracted schema — do not edit manually
├── astro.config.mjs               # Astro + Sanity + Cloudflare integration config
├── components.json                # shadcn config
└── wrangler.jsonc                 # Cloudflare Pages config
```

See `.cursor/rules/project-structure.mdc` for naming conventions.

---

## Sanity CMS

### Content model

Pages are built from a `modules[]` array of typed section documents. Each module has a matching React component in `src/components/modules/`. The `ModuleRenderer.tsx` switch maps `_type` to component.

To add a new module, see `.cursor/rules/sanity-schemas.mdc` for the full checklist.

### Updating content via Sanity Studio

Navigate to `http://localhost:4321/studio` (dev) or your deployed Studio URL.

### Deploying schema changes

After editing any file in `src/sanity/schemas/`, run:

```bash
nvm use
pnpm typegen         # regenerate sanity.types.ts
pnpm sanity:deploy   # push schema to Sanity cloud
```

Schema must be deployed before MCP mutations or Studio validation will recognize new fields. See `docs/sanity-mcp-troubleshooting.md` for common issues.

---

## Deployment

The site deploys to **Cloudflare Pages**.

```bash
pnpm deploy
```

This runs `astro build && wrangler pages deploy`. Configure your Pages project in `wrangler.jsonc`.

> Visual Editing is disabled in production. Use a separate preview deployment with `PUBLIC_SANITY_VISUAL_EDITING_ENABLED=true` and a valid `SANITY_API_READ_TOKEN`.

---

## Before committing

See `.cursor/rules/pre-commit-checklist.mdc` for the full checklist. Key points:

- Run `pnpm typegen` if any Sanity schema or GROQ query changed
- Run `pnpm sanity:deploy` if schemas changed
- Run `pnpm build` to confirm no build errors
- Never commit `.env.local` or any file containing tokens
