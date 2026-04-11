"use client";

import { useEffect, useRef } from "react";
import { SectionHeader } from "./SectionHeader";
import { getModuleLayoutAttrs, type ModuleLayoutValue } from "@/lib/moduleLayout";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        prefill?: Record<string, unknown>;
        utm?: Record<string, unknown>;
      }) => void;
    };
  }
}

export interface BookMeetingProps {
  theme?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  calendlyUrl?: string;
  moduleLayout?: ModuleLayoutValue | null;
}

export function BookMeeting({
  theme = "white",
  eyebrow,
  title,
  subtitle,
  calendlyUrl,
  moduleLayout,
}: BookMeetingProps) {
  const animated = moduleLayout?.animated ?? false;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!calendlyUrl || !containerRef.current) return;

    const container = containerRef.current;

    const initWidget = () => {
      if (window.Calendly && container) {
        // Clear any prior Calendly iframe before re-initializing
        container.innerHTML = "";
        window.Calendly.initInlineWidget({
          url: calendlyUrl,
          parentElement: container,
          prefill: {},
          utm: {},
        });
      }
    };

    // Inject Calendly CSS once
    const cssId = "calendly-widget-css";
    if (!document.getElementById(cssId)) {
      const link = document.createElement("link");
      link.id = cssId;
      link.rel = "stylesheet";
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      document.head.appendChild(link);
    }

    const scriptId = "calendly-widget-script";
    const existingScript = document.getElementById(scriptId);

    if (existingScript) {
      // Script already present — init immediately (it may already be loaded)
      if (window.Calendly) {
        initWidget();
      } else {
        existingScript.addEventListener("load", initWidget, { once: true });
      }
    } else {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.addEventListener("load", initWidget, { once: true });
      document.body.appendChild(script);
    }
  }, [calendlyUrl]);

  return (
    <section
      id="book-meeting"
      data-theme={theme}
      className="pp-section"
      style={{ background: "var(--section-bg)" }}
      aria-labelledby={title ? "book-meeting-heading" : undefined}
      {...getModuleLayoutAttrs(moduleLayout)}
    >
      <div className="pp-container">
        {(eyebrow || title || subtitle) && (
          <SectionHeader
            eyebrow={eyebrow}
            title={title ?? ""}
            subtitle={subtitle}
            alignment="center"
            theme={theme as "dark" | "white" | "cream"}
            className="mb-12"
            headingId="book-meeting-heading"
            animated={animated}
          />
        )}
        {calendlyUrl && (
          <div
            ref={containerRef}
            className="mx-auto w-full"
            style={{ minWidth: "320px", height: "700px" }}
          />
        )}
      </div>
    </section>
  );
}
