"use client";

import { useEffect } from "react";

const REVEAL_SELECTOR = ".reveal, .reveal-left, .reveal-right";
const ANIM_SELECTOR = `${REVEAL_SELECTOR}, [data-anim-header], [data-anim-list]`;

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

    const observed = new Set<Element>();

    const observerFor = (el: Element): IntersectionObserver | null => {
      if (el.matches(REVEAL_SELECTOR)) return revealObserver;
      if (el.matches("[data-anim-header]")) return headerObserver;
      if (el.matches("[data-anim-list]")) return listObserver;
      return null;
    };

    const observeIfNew = (el: Element) => {
      if (observed.has(el)) return;
      const observer = observerFor(el);
      if (!observer) return;
      observed.add(el);
      observer.observe(el);
    };

    // Scans an element (and its descendants) for animatable targets. Needed
    // both for the initial pass and for nodes inserted later by React.lazy()
    // module chunks, which resolve after this component's first render and
    // would otherwise sit at opacity:0 forever, never observed.
    const scan = (root: Element) => {
      observeIfNew(root);
      root.querySelectorAll(ANIM_SELECTOR).forEach(observeIfNew);
    };

    scan(document.body);

    const mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) scan(node);
        });
      }
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      revealObserver.disconnect();
      headerObserver.disconnect();
      listObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
