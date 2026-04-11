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
      /** Opens popup without creating a badge button. Use this for programmatic triggers. */
      showPopupWidget: (url: string) => void;
      /** Creates a persistent floating badge button + opens popup. Call once only. */
      initPopupWidget: (options: { url: string }) => void;
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

    // Layout.astro owns Calendly script/CSS injection — never create it here.
    // By the time this island hydrates, Layout has already started loading it.
    const scriptEl = document.getElementById("calendly-widget-script");
    if (window.Calendly) {
      initWidget();
    } else if (scriptEl) {
      scriptEl.addEventListener("load", initWidget, { once: true });
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
