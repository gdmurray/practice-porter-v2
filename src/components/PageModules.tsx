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
      {modules.map((module) => (
        <ModuleRenderer
          key={module._key ?? module._type}
          module={module}
        />
      ))}
    </>
  );
}
