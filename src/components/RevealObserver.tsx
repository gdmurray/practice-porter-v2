"use client";

import { useEffect } from "react";

export function RevealObserver() {
  useEffect(() => {
    const sharedCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          // Progress bars (used in legacy .reveal elements)
          const bars = entry.target.querySelectorAll("[data-width]");
          bars.forEach((bar) => {
            const el = bar as HTMLElement;
            const width = el.dataset.width;
            if (width) {
              setTimeout(() => {
                el.style.width = width.includes("%") ? width : `${width}%`;
              }, 500);
            }
          });
        }
      });
    };

    // Legacy per-element reveal classes (.reveal, .reveal-left, .reveal-right)
    const revealObserver = new IntersectionObserver(sharedCallback, {
      rootMargin: "0px 0px -80px 0px",
      threshold: 0.1,
    });

    // Individual header elements — trigger as each one scrolls into view
    const headerObserver = new IntersectionObserver(sharedCallback, {
      rootMargin: "0px 0px -60px 0px",
      threshold: 0.2,
    });

    // List containers — fire when the top of the list is clearly visible
    const listObserver = new IntersectionObserver(sharedCallback, {
      rootMargin: "0px 0px -80px 0px",
      threshold: 0.15,
    });

    document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el) => {
      revealObserver.observe(el);
    });

    document.querySelectorAll("[data-anim-header]").forEach((el) => {
      headerObserver.observe(el);
    });

    document.querySelectorAll("[data-anim-list]").forEach((el) => {
      listObserver.observe(el);
    });

    return () => {
      revealObserver.disconnect();
      headerObserver.disconnect();
      listObserver.disconnect();
    };
  }, []);

  return null;
}
