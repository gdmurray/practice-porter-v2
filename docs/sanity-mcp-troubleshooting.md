# Sanity MCP Failure: `create_documents_from_json` / patching pages

## Symptoms

- `create_documents_from_json` appeared to run but large payload calls aborted.
- `patch_document_from_json` failed with:
  - `Schema for schemaId '_.schemas.default' not found`

## Root causes

1. **Schema not deployed to Sanity cloud dataset**
   - MCP writes are validated against the deployed workspace schema.
   - Local schema files existed, but cloud schema was not deployed yet.

2. **Sanity CLI config incompatible with CJS extraction step**
   - `sanity.config.ts` used only `import.meta.env.*`.
   - During `schema deploy`, Sanity CLI extracts manifest in a CJS context where `import.meta.env` is empty.
   - This caused config load failure before deploy could run.

## What fixed it

1. Updated `sanity.config.ts` to support both runtime environments:
   - `process.env.*` for CLI/CJS
   - `import.meta.env?.*` for Vite/dev runtime

2. Deployed schema using pnpm + nvm:

```bash
source ~/.nvm/nvm.sh
nvm use
PUBLIC_SANITY_PROJECT_ID=u06m8vwg PUBLIC_SANITY_DATASET=production pnpm dlx sanity@latest schema deploy
```

## Verification steps

1. Confirm deploy succeeds (`Deployed 1/1 schemas`).
2. Run MCP query for target page:
   - `query_documents` for `_type == "page" && slug.current == "home"`.
3. Run MCP create/patch call again.
4. If needed, publish draft with `publish_documents`.

## Notes for future imports

- Prefer creating the base document first, then patching large module arrays in chunks.
- If a mutation fails with schema/workspace errors, check schema deploy status first.
- Always run with `nvm use` before CLI or MCP-adjacent automation.
