/**
 * ESM shim for react-compiler-runtime.
 * The CJS version of this package can't be imported as a named ESM export
 * in the browser. This shim exports the same API using React 19's built-in
 * compiler runtime (React.__COMPILER_RUNTIME.c) or a useMemo-based fallback.
 */
import React from "react";

const $empty = Symbol.for("react.memo_cache_sentinel");

export const c =
  typeof React.__COMPILER_RUNTIME?.c === "function"
    ? React.__COMPILER_RUNTIME.c
    : function c(size) {
        return React.useMemo(() => {
          const $ = new Array(size);
          for (let i = 0; i < size; i++) $[i] = $empty;
          $[$empty] = true;
          return $;
        }, []);
      };

export function $dispatcherGuard() {}
export function $makeReadOnly() {}
export function $reset($) {
  for (let i = 0; i < $.length; i++) $[i] = $empty;
}
export function $structuralCheck() {}
export const renderCounterRegistry = new Map();
export function clearRenderCounterRegistry() {
  renderCounterRegistry.clear();
}
export function useRenderCounter() {}
