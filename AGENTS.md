# Agent Instructions

These instructions apply to every agent session in this repo, in addition to the rules in `.cursor/rules/`.

## Dev server

- **Never start, stop, or restart the dev server unless explicitly asked to.** Assume `pnpm dev` is already running in a terminal the user manages.
- To verify or view the site, just open/check `http://localhost:4321` directly (e.g. via `WebFetch`, the browser tools, or by telling the user to look at that URL). Do not run `pnpm dev`, `astro dev`, or similar just to "check" something.
- Never run a second dev server instance "to be safe." If `localhost:4321` isn't responding, ask the user whether the server is running rather than launching your own — spinning up a duplicate instance just causes a port collision (4321 vs 4322) and wastes time figuring out which one is live.
- If you genuinely need to start the dev server (e.g. the user asks you to, or confirms none is running), use `nvm use && pnpm dev` and clean it up when done.

## Debugging deploy/build/prod-only failures

- When a bug only reproduces in a deploy/build/prod context (not locally), prioritize empirical iteration over long chains of speculation: read the actual build/runtime logs first, change one variable at a time, and ask the user to redeploy/re-test rather than reasoning in the abstract for multiple turns.
- If you're not sure what's causing a failure, say so and go look at logs/output instead of guessing.

## Recurring things to double-check

- Use `pnpm` (never `npm`/`npx`) — see `architecture-decisions.mdc`.
- Run `nvm use` before CLI commands that touch Node/Sanity.
- `astro.config.mjs` uses `process.env`; app code uses `import.meta.env` — don't mix these up.
- Prefer generated Sanity typegen types (`sanity.types.ts`) over hand-written/hardcoded types — see `sanity-typegen.mdc`.
- Use design tokens / `pp-container` / `pp-section` / typography classes instead of hardcoded hex colors or ad-hoc spacing — see `design-system.mdc`.
- After any Sanity schema change: run `pnpm typegen` and `pnpm sanity:deploy` (see `pre-commit-checklist.mdc`).
