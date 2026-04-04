"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SITE_SETTINGS_QUERY_RESULT } from "sanity.types";

// Derive props from the GROQ query result type, not the raw schema document type.
// The query projects a different shape (no _key on links, string | null instead of string | undefined).
type NavigationProps = NonNullable<
  NonNullable<SITE_SETTINGS_QUERY_RESULT>["navigation"]
>;

function filterLinks(links: NavigationProps["links"]) {
  return (links ?? []).filter(
    (l): l is { label: string; href: string } =>
      typeof l?.label === "string" && typeof l?.href === "string"
  );
}

/** Ensures anchor-only hrefs (e.g. "#pricing") always point to the home page
 *  so global nav links work correctly regardless of the current route. */
function resolveGlobalHref(href: string) {
  return href.startsWith("#") ? `/${href}` : href;
}

type Props = NavigationProps & {
  firstModuleTheme?: string | null;
  navTheme?: string | null;
};

export function Navigation({
  links,
  ctaLabel = "Book a Consultation",
  ctaHref = "#cta",
  firstModuleTheme,
  navTheme,
}: Props) {
  const validLinks = useMemo(() => filterLinks(links), [links]);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isCream = (navTheme ?? "cream") === "cream";

  // Cream nav is always filled; dark nav goes transparent over dark hero modules
  const alwaysFilled = isCream || firstModuleTheme !== "dark";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filled = alwaysFilled || scrolled;

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-[1000] flex h-20 items-center justify-between px-6 md:px-8 xl:px-12 transition-all duration-400",
          filled
            ? isCream
              ? "h-[68px] bg-[var(--off-white)] shadow-[0_1px_0_rgba(201,169,110,0.25)]"
              : "h-[68px] bg-[rgba(11,29,58,0.97)] backdrop-blur-[20px] shadow-[0_1px_0_rgba(201,169,110,0.1)]"
            : "bg-transparent"
        )}
      >
        <a
          href="/"
          className={cn(
            "flex items-baseline gap-0.5 no-underline",
            filled && isCream ? "text-[var(--midnight)]" : "text-white"
          )}
        >
          <span
            className={cn(
              "font-serif text-[22px] font-semibold tracking-[-0.5px]",
              filled && isCream ? "text-[var(--midnight)]" : "text-white"
            )}
          >
            Practice
          </span>
          <span className="ml-1.5 font-sans text-[22px] font-light tracking-[2px] uppercase text-gold">
            Porter
          </span>
          <span className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-gold align-middle" />
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-7 list-none xl:flex">
          {validLinks.map((link) => (
            <li key={link.href}>
              <a
                href={resolveGlobalHref(link.href)}
                className={cn(
                  "relative text-[13px] font-medium tracking-[0.5px] no-underline transition-colors after:absolute after:bottom-[-4px] after:left-0 after:h-px after:w-0 after:bg-gold after:transition-[width] hover:after:w-full",
                  filled && isCream
                    ? "text-[var(--charcoal)]/70 hover:text-[var(--midnight)]"
                    : "text-white/70 hover:text-white"
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <Button variant="nav" asChild>
              <a href={resolveGlobalHref(ctaHref ?? "#cta")}>{ctaLabel ?? "Book a Consultation"}</a>
            </Button>
          </li>
        </ul>

        {/* Mobile / tablet menu — button is outside SheetTrigger to avoid Radix pointer-event blocking */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className={cn(
            "relative flex size-11 cursor-pointer flex-col items-center justify-center gap-1.5 transition-all duration-200 xl:hidden",
            mobileOpen
              ? "z-[1001] rounded-full border border-white/15"
              : ""
          )}
        >
          {mobileOpen ? (
            <X className={cn("size-5", isCream ? "text-[var(--midnight)]" : "text-white")} />
          ) : (
            <>
              <span className={cn("block h-[1.5px] w-6", filled && isCream ? "bg-[var(--midnight)]" : "bg-white")} />
              <span className={cn("block h-[1.5px] w-6", filled && isCream ? "bg-[var(--midnight)]" : "bg-white")} />
              <span className={cn("block h-[1.5px] w-6", filled && isCream ? "bg-[var(--midnight)]" : "bg-white")} />
            </>
          )}
        </button>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen} modal={false}>
          <SheetContent
            side="top"
            className={cn(
              "flex min-h-screen flex-col items-center justify-center gap-8 border-none",
              isCream
                ? "bg-[var(--off-white)]"
                : "bg-[rgba(11,29,58,0.98)] backdrop-blur-[30px]"
            )}
            showCloseButton={false}
            onInteractOutside={(e) => e.preventDefault()}
          >
            {validLinks.map((link) => (
              <a
                key={link.href}
                href={resolveGlobalHref(link.href)}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "font-serif text-[28px] font-medium no-underline transition-colors duration-200 hover:text-gold",
                  isCream ? "text-[var(--midnight)]/80" : "text-white/80"
                )}
              >
                {link.label}
              </a>
            ))}
            <a
              href={resolveGlobalHref(ctaHref ?? "#cta")}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "font-serif text-[28px] font-medium text-gold no-underline transition-colors duration-200",
                isCream ? "hover:text-[var(--midnight)]" : "hover:text-white"
              )}
            >
              {ctaLabel ?? "Book a Consultation"}
            </a>
          </SheetContent>
        </Sheet>
      </nav>
    </>
  );
}
