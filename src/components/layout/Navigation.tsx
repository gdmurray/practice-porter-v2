"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
/** Props shaped to match SITE_SETTINGS_QUERY navigation result */
export interface NavigationProps {
  links?: Array<{ label?: string | null; href?: string | null }> | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;
}

function filterLinks(links: NavigationProps["links"]): Array<{ label: string; href: string }> {
  return (links ?? []).filter(
    (l): l is { label: string; href: string } =>
      Boolean(l && typeof l.label === "string" && typeof l.href === "string")
  );
}

export function Navigation({
  links,
  ctaLabel = "Book a Consultation",
  ctaHref = "#cta",
}: NavigationProps) {
  const validLinks = useMemo(() => filterLinks(links), [links]);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-[1000] flex h-20 items-center justify-between px-[var(--space-lg)] transition-all duration-400",
          scrolled
            ? "h-[68px] bg-[rgba(11,29,58,0.97)] backdrop-blur-[20px] shadow-[0_1px_0_rgba(201,169,110,0.1)]"
            : "bg-transparent"
        )}
      >
        <a href="/" className="flex items-baseline gap-0.5 text-white no-underline">
          <span className="font-serif text-[22px] font-semibold tracking-[-0.5px] text-white">
            Practice
          </span>
          <span className="ml-1.5 font-sans text-[22px] font-light tracking-[2px] uppercase text-gold">
            Porter
          </span>
          <span className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-gold align-middle" />
        </a>

        <ul className="hidden items-center gap-9 list-none lg:flex">
          {validLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative text-[13px] font-medium tracking-[1.5px] uppercase text-white/70 no-underline transition-colors hover:text-white after:absolute after:bottom-[-4px] after:left-0 after:h-px after:w-0 after:bg-gold after:transition-[width] hover:after:w-full"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <Button variant="nav" asChild>
              <a href={ctaHref ?? "#cta"}>{ctaLabel ?? "Book a Consultation"}</a>
            </Button>
          </li>
        </ul>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="block cursor-pointer lg:hidden">
            <button
              type="button"
              className="flex flex-col gap-1.5 p-2"
              aria-label="Open menu"
            >
              <span className="block h-[1.5px] w-6 bg-white" />
              <span className="block h-[1.5px] w-6 bg-white" />
              <span className="block h-[1.5px] w-6 bg-white" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="top"
            className="flex min-h-screen flex-col items-center justify-center gap-8 bg-[rgba(11,29,58,0.98)] backdrop-blur-[30px] border-none pt-16"
            showCloseButton={false}
          >
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="absolute right-6 top-6 flex size-11 items-center justify-center rounded-full border border-white/15 text-2xl text-white"
              aria-label="Close menu"
            >
              <X className="size-6" />
            </button>
            {validLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-serif text-[28px] font-medium text-white no-underline"
              >
                {link.label}
              </a>
            ))}
            <a
              href={ctaHref ?? "#cta"}
              onClick={() => setMobileOpen(false)}
              className="font-serif text-[28px] font-medium text-gold no-underline"
            >
              {ctaLabel ?? "Book a Consultation"}
            </a>
          </SheetContent>
        </Sheet>
      </nav>
    </>
  );
}
