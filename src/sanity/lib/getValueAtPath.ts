import type { ValidationContext } from "sanity";

/**
 * Resolves the value at an arbitrary path within a Sanity document.
 *
 * `context.parent` in a `Rule.custom` validator only exposes the immediate
 * parent object — there's no built-in way to reach further up the tree
 * (e.g. a grandparent). Sanity's documented workaround is to walk
 * `context.document` using `context.path`: see
 * https://www.sanity.io/docs/studio/validation
 */
export function getValueAtPath(
  document: unknown,
  path: ValidationContext["path"] | undefined
): unknown {
  return (path ?? []).reduce<unknown>((acc, segment) => {
    if (acc == null) return acc;
    if (typeof segment === "string" || typeof segment === "number") {
      return (acc as Record<string | number, unknown>)[segment];
    }
    if (typeof segment === "object" && segment !== null && "_key" in segment) {
      const key = (segment as { _key: string })._key;
      return Array.isArray(acc) ? acc.find((item) => item?._key === key) : undefined;
    }
    return undefined;
  }, document);
}
