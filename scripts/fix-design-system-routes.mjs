// The @astrojs/cloudflare adapter auto-excludes every individual static file
// it finds under public/ from the SSR Worker (so Cloudflare Pages serves
// them directly). The Storybook build in public/design-system/ has 100+
// files, which blows past Cloudflare's 100-rule combined include/exclude
// cap in _routes.json — extra files silently fall through to the Worker
// (and 404, since our SSR route doesn't know how to serve them).
//
// This collapses every per-file /design-system/* exclude rule into a single
// wildcard, freeing up the rule budget and guaranteeing every Storybook
// asset (present or future) is served statically. It must be an exact
// re-derivation (not appended alongside the per-file rules) because
// Cloudflare rejects _routes.json when a wildcard rule overlaps other rules
// for the same prefix.
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const routesPath = fileURLToPath(
  new URL("../dist/_routes.json", import.meta.url)
);

const routes = JSON.parse(await readFile(routesPath, "utf-8"));

const designSystemPrefix = "/design-system/";
const kept = routes.exclude.filter(
  (rule) => !rule.startsWith(designSystemPrefix)
);
kept.push(`${designSystemPrefix}*`);

routes.exclude = kept;

await writeFile(routesPath, `${JSON.stringify(routes, null, 2)}\n`);

console.log(
  `[fix-design-system-routes] Collapsed design-system excludes into a single wildcard (${routes.exclude.length} total exclude rules).`
);
