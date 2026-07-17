"use client";

import { ModuleRenderer } from "./modules/ModuleRenderer";
import { RevealObserver } from "./RevealObserver";

export interface PageModulesProps {
  modules: { _type: string; _key?: string; [key: string]: unknown }[];
}

export function PageModules({ modules }: PageModulesProps) {
  return (
    <>
      <RevealObserver />
      {modules.map((module, index) => {
        // Every module schema starts with a `theme` field (see themeField()),
        // so this generically detects an adjacent same-themed section
        // regardless of module type — needed so a gridSection's circle
        // pattern knows whether it's safe to bleed into the section above.
        const prevTheme = modules[index - 1]?.theme;
        return (
          <ModuleRenderer
            key={module._key ?? module._type}
            module={module}
            prevModuleTheme={typeof prevTheme === "string" ? prevTheme : undefined}
          />
        );
      })}
    </>
  );
}
