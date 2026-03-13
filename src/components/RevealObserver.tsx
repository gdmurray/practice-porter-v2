"use client";

import { useEffect } from "react";

export function RevealObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
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
      },
      { rootMargin: "0px 0px -80px 0px", threshold: 0.1 }
    );

    document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
