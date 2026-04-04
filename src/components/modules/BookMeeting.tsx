"use client";

import { useEffect, useRef } from "react";
import { SectionHeader } from "./SectionHeader";

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
}

export function BookMeeting({
  theme = "white",
  eyebrow,
  title,
  subtitle,
  calendlyUrl,
}: BookMeetingProps) {
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
      style={{ background: "var(--section-bg)" }}
      aria-labelledby={title ? "book-meeting-heading" : undefined}
    >
      <div className="pp-container pp-section">
        {(eyebrow || title || subtitle) && (
          <SectionHeader
            eyebrow={eyebrow}
            title={title ?? ""}
            subtitle={subtitle}
            alignment="center"
            theme={theme as "dark" | "white" | "cream"}
            className="mb-12"
            headingId="book-meeting-heading"
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
