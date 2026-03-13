---
name: sanity-content-population
description: >-
  Populate Sanity documents with content extracted from HTML files or design
  handoffs using the Sanity MCP tools. Use when the user asks to fill, seed,
  or populate Sanity content from an HTML file, design reference, or wants
  to create page documents with module data.
---

# Sanity Content Population

Populate Sanity documents with content extracted from HTML handoffs using the
Sanity MCP (`user-Sanity` server).

## Prerequisites

Before populating content, verify:

1. **Schema is deployed** — MCP validates mutations against the cloud schema.
   If you get `Schema for schemaId '_.schemas.default' not found`, run:
   ```bash
   nvm use && pnpm sanity:deploy
   ```
2. **Project config** — `projectId: "u06m8vwg"`, `dataset: "production"`
3. **MCP tool schemas** — Always read the tool descriptor JSON before calling.
   Located at: `mcps/user-Sanity/tools/<tool-name>.json`

## Workflow

```
- [ ] Step 1: Extract content from HTML
- [ ] Step 2: Check for existing documents
- [ ] Step 3: Create base document
- [ ] Step 4: Patch modules in chunks
- [ ] Step 5: Publish
- [ ] Step 6: Verify
```

## Step 1: Extract content from HTML

Read the HTML file. For each section/module, extract:
- All visible text (headings, paragraphs, labels, stats)
- CTA labels and href targets
- Array item content (cards, steps, metrics)
- Theme (infer from background classes/colors)

Map extracted content to the Sanity schema field names. Check the module schema
in `src/sanity/schemas/modules/<name>.ts` for exact field names and types.

## Step 2: Check for existing documents

Query for the target document first to avoid duplicates:

```
Tool: query_documents
Args:
  resource: { projectId: "u06m8vwg", dataset: "production" }
  query: '*[_type == "page" && slug.current == "<slug>"][0]{ _id, title }'
  perspective: "raw"
```

For siteSettings: `'*[_id == "siteSettings"][0]{ _id }'`

If the document exists, skip to Step 4 (patch). Note the `_id` for patching.

## Step 3: Create base document

Create a minimal document first. Do NOT include large module arrays in the
create call — large payloads can abort.

```
Tool: create_documents_from_json
Args:
  resource: { projectId: "u06m8vwg", dataset: "production" }
  intent: "Creating <page-name> page from HTML handoff"
  documents: [{
    type: "page",
    content: {
      title: "<Page Title>",
      slug: { _type: "slug", current: "<slug>" }
    }
  }]
```

The response returns the created document with its `_id`. Note this ID (it will
have a `drafts.` prefix).

**Important**: `create_documents_from_json` ignores `_id` in content — IDs are
auto-generated. For documents that need a specific ID (like `siteSettings`),
use a script with `createOrReplace()` or create manually in Studio.

## Step 4: Patch modules in chunks

Patch modules onto the document in batches of 2-3 modules at a time.
This avoids payload size issues.

**First batch** (set the modules array with initial modules):

```
Tool: patch_document_from_json
Args:
  resource: { projectId: "u06m8vwg", dataset: "production" }
  documentId: "drafts.<id>"
  intent: "Adding hero and trustBar modules from HTML handoff"
  set: [{
    path: "modules",
    value: [
      {
        _type: "hero",
        _key: "hero-1",
        theme: "dark",
        eyebrow: "Boutique Dental Call Intelligence",
        headline: "Every Missed Call Is a New Patient You'll Never Meet",
        headlineHighlight: "Never",
        primaryCta: { _type: "cta", label: "Book Free Consultation", href: "#cta" },
        stats: [
          { _type: "heroStat", _key: "stat-1", value: "67", suffix: "%", label: "Calls Missed" }
        ]
      },
      {
        _type: "trustBar",
        _key: "trust-1",
        theme: "white",
        items: [
          { _type: "trustItem", _key: "ti-1", text: "HIPAA Compliant" }
        ]
      }
    ]
  }]
```

**Subsequent batches** (append to existing modules array):

```
Tool: patch_document_from_json
Args:
  resource: { projectId: "u06m8vwg", dataset: "production" }
  documentId: "drafts.<id>"
  intent: "Adding problem and solution modules from HTML handoff"
  append: [{
    path: "modules",
    items: [
      { _type: "problem", _key: "problem-1", theme: "cream", ... },
      { _type: "solution", _key: "solution-1", theme: "dark", ... }
    ]
  }]
```

### Critical rules for patch payloads

- **`_key` is required** on every array item (modules, stats, cards, steps, etc.)
  Use descriptive keys: `"hero-1"`, `"stat-revenue"`, `"card-ai-scoring"`
- **`_type` is required** on every object in an array that uses named types
  (modules, cta, heroStat, etc.)
- **Nested objects** like `cta` need `_type: "cta"` even though they're inline
- **Use `set` for the first batch** (creates the `modules` array)
- **Use `append` for subsequent batches** (adds to existing array)
- **Do NOT use `set` on `modules` after the first batch** — it replaces the
  entire array, destroying previously added modules

## Step 5: Publish

After all patches are applied, publish the draft:

```
Tool: publish_documents
Args:
  resource: { projectId: "u06m8vwg", dataset: "production" }
  intent: "Publishing <page-name> page"
  ids: ["<id-without-drafts-prefix>"]
```

Note: Pass the ID **without** the `drafts.` prefix.

## Step 6: Verify

Query the published document to confirm:

```
Tool: query_documents
Args:
  resource: { projectId: "u06m8vwg", dataset: "production" }
  query: '*[_type == "page" && slug.current == "<slug>"][0]{ _id, title, "moduleCount": count(modules), "moduleTypes": modules[]._type }'
  perspective: "published"
```

Check that `moduleCount` and `moduleTypes` match expectations.

## Populating siteSettings

siteSettings is a singleton (`_id: "siteSettings"`). Patch it directly:

```
Tool: patch_document_from_json
Args:
  documentId: "siteSettings"
  set: [
    { path: "navigation.links", value: [...] },
    { path: "navigation.ctaLabel", value: "Book a Consultation" },
    { path: "footer.brandDescription", value: "..." },
    { path: "footer.columns", value: [...] }
  ]
```

Then publish with `ids: ["siteSettings"]`.

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| `Schema for schemaId not found` | Schema not deployed | `pnpm sanity:deploy` |
| `Could not find document` | Wrong ID or doesn't exist | Query first to get the real `_id` |
| Mutation aborts silently | Payload too large | Split into smaller patch calls |
| Fields missing after patch | Used `set` on parent path | Use more specific child paths |
| Array items lost | Used `set` on `modules` twice | Use `append` after first `set` |

See `docs/sanity-mcp-troubleshooting.md` for the full runbook.
