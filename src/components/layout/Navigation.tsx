"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { getIcon } from "@/lib/icons";
import type { SITE_SETTINGS_QUERY_RESULT } from "sanity.types";

type NavigationProps = NonNullable<
  NonNullable<SITE_SETTINGS_QUERY_RESULT>["navigation"]
>;
type NavLinkRaw = NonNullable<NavigationProps["links"]>[number];
type NavSubLinkRaw = NonNullable<NavLinkRaw["links"]>[number];

type NavSubLinkItem = { label: string; href: string; icon: NavSubLinkRaw["icon"] };
type NavItem =
  | { kind: "link"; label: string; href: string }
  | { kind: "menu"; label: string; links: NavSubLinkItem[] };

/** Filters raw Sanity nav links into valid items, dropping incomplete entries
 *  (missing label/href for links, or menus with no sub-links). */
function getValidNavItems(links: NavigationProps["links"]): NavItem[] {
  const items: NavItem[] = [];
  for (const link of links ?? []) {
    if (!link?.label) continue;
    if (link.type === "menu") {
      const subLinks = (link.links ?? [])
        .filter((sub) => typeof sub?.label === "string" && typeof sub?.href === "string")
        .map((sub) => ({ label: sub.label as string, href: sub.href as string, icon: sub.icon }));
      if (subLinks.length > 0) {
        items.push({ kind: "menu", label: link.label, links: subLinks });
      }
    } else if (typeof link.href === "string") {
      items.push({ kind: "link", label: link.label, href: link.href });
    }
  }
  return items;
}

/** Flattens menu items into their sub-links for the mobile menu, since the
 *  mobile sheet shows sub-links directly instead of a nested dropdown. */
function getFlatMobileItems(items: NavItem[]): NavSubLinkItem[] {
  return items.flatMap((item) =>
    item.kind === "menu" ? item.links : [{ label: item.label, href: item.href, icon: null }]
  );
}

/** Ensures nav hrefs always resolve relative to the site root rather than the
 *  current route. Sanity content stores hrefs without a leading slash (e.g.
 *  "performance-report", "#pricing"), which only resolves correctly by
 *  accident of relative-URL resolution — this makes it explicit. Absolute
 *  URLs and special schemes (mailto:, tel:) are left untouched. */
function resolveGlobalHref(href: string) {
  if (/^(https?:|mailto:|tel:)/.test(href) || href.startsWith("/")) return href;
  return `/${href}`;
}

/** Strips a trailing slash (except for the root "/") so path comparisons
 *  aren't thrown off by "/about" vs "/about/". */
function normalizePath(path: string) {
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path || "/";
}

/** Whether a nav href points at the page currently being viewed. Anchor-only
 *  hrefs (e.g. "#pricing") are same-page CTAs, not distinct routes, so they
 *  never count as "active" even when currentPath is the home page. */
function isPathActive(href: string, currentPath: string | undefined) {
  if (!currentPath || href.startsWith("#")) return false;
  const [hrefPath] = resolveGlobalHref(href).split("#");
  return normalizePath(hrefPath) === normalizePath(currentPath);
}

type NavCta = { label?: string | null; href?: string | null; ctaType?: string | null; variant?: string | null };

/** Returns anchor props for the nav CTA based on ctaType.
 *  - external → new tab with rel
 *  - book_meeting → data-cta-type attr so Layout.astro event delegation triggers the Google Calendar popup
 *  - internal / undefined → resolveGlobalHref to keep anchor links working from any route
 */
function navCtaAnchorProps(cta: NavCta): { href: string; target?: string; rel?: string; "data-cta-type"?: string } {
  const href = cta.href ?? "#cta";
  if (cta.ctaType === "external") {
    return { href, target: "_blank", rel: "noopener noreferrer" };
  }
  if (cta.ctaType === "book_meeting") {
    return { href, "data-cta-type": "book_meeting" };
  }
  return { href: resolveGlobalHref(href) };
}

/** Matches the `theme` enum shared by every module (see `themeField()` in
 *  `src/sanity/schemas/objects/theme.ts`). The nav has no theme of its own —
 *  it infers light/dark from whichever section it's currently overlapping,
 *  starting with the page's first module (see callers in `src/pages`). */
type SectionTheme = "white" | "lotion" | "cream" | "vanilla" | "red" | "gradient";

/** "red" and "gradient" are both the bold burnt-red brand treatment (solid
 *  vs. gradient fill of the same colors) — everything else is a light,
 *  near-white section background. */
function isDarkTheme(theme: SectionTheme | string | null | undefined) {
  return theme === "red" || theme === "gradient";
}

type Props = NavigationProps & { currentPath?: string; theme?: SectionTheme | string | null };

const DEFAULT_CTA = { label: "Book a Consultation", href: "#cta", variant: "primary", ctaType: "internal" } as const;

export function Navigation({ links, cta, theme, currentPath }: Props) {
  const resolvedCta = cta ?? DEFAULT_CTA;
  const validItems = useMemo(() => getValidNavItems(links), [links]);
  const flatMobileItems = useMemo(() => getFlatMobileItems(validItems), [validItems]);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isLight = !isDarkTheme(theme);
  // currentPath is rendered server-side from Astro.url.pathname, so this is
  // stable on first paint — no client-only flash of the wrong variant.
  // Unknown path (e.g. a route that doesn't pass currentPath) defaults to
  // the home/primary treatment rather than assuming it's a subpage.
  const isHomePage = !currentPath || normalizePath(currentPath) === "/";
  const ctaVariant = isHomePage ? "brand" : "outline";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll(); // sync on mount — browsers restore scroll before hydration
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkTextClass = isLight
    ? "text-ink hover:text-red"
    : "text-white/70 hover:text-white";
  const strongTextClass = isLight ? "text-ink" : "text-white";

  // Full wordmark on desktop, compact mark-only logo on mobile — each with a
  // light-bg and dark-bg (white/cream ink) variant to match the section
  // the nav is currently overlapping.
  const desktopLogoSrc = isLight ? "/pp-nav-logo.png" : "/pp-logo-light.png";
  const mobileLogoSrc = isLight ? "/pp-logomark.png" : "/pp-logomark-white.png";

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-1000 flex h-20 items-center justify-between px-6 md:px-8 xl:px-12 transition-all duration-400",
          scrolled
            ? isLight
              ? "h-[68px] bg-white/85 backdrop-blur-[14px] shadow-[0_2px_20px_rgba(43,26,20,0.08)]"
              : "h-[68px] bg-[rgba(127,29,2,0.85)] backdrop-blur-[14px] shadow-[0_2px_20px_rgba(0,0,0,0.2)]"
            : "bg-transparent"
        )}
      >
        <a href="/" className="flex items-center no-underline">
          <img
            src={desktopLogoSrc}
            alt="Practice Porter"
            className="hidden h-[60px] w-auto object-contain md:block"
          />
          <img
            src={mobileLogoSrc}
            alt="Practice Porter"
            className="h-6 w-auto object-contain md:hidden"
          />
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-7 md:flex">
          <NavigationMenu viewport={false} className="max-w-none flex-none">
            <NavigationMenuList className="gap-7">
              {validItems.map((item) => {
                if (item.kind === "menu") {
                  return (
                    <NavigationMenuItem key={item.label}>
                      <NavigationMenuTrigger
                        className={cn(
                          "-translate-y-px h-auto w-auto cursor-pointer rounded-none bg-transparent p-0 text-[13px] font-medium leading-none tracking-[0.5px] hover:bg-transparent focus:bg-transparent data-popup-open:bg-transparent data-popup-open:hover:bg-transparent data-open:bg-transparent data-open:hover:bg-transparent data-open:focus:bg-transparent",
                          linkTextClass
                        )}
                      >
                        {item.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="rounded-2xl border border-charcoal/10 bg-white p-2 shadow-[0_20px_48px_rgba(43,26,20,0.18)] group-data-[viewport=false]/navigation-menu:ring-0">
                        <ul className="flex w-64 flex-col gap-0.5">
                          {item.links.map((sub) => {
                            const Icon = sub.icon ? getIcon(sub.icon) : null;
                            const isCurrent = isPathActive(sub.href, currentPath);
                            return (
                              <li key={sub.href}>
                                <NavigationMenuLink asChild>
                                  <a
                                    href={resolveGlobalHref(sub.href)}
                                    aria-current={isCurrent ? "page" : undefined}
                                    className={cn(
                                      "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13.5px] font-medium no-underline transition-colors hover:bg-cream hover:text-red",
                                      isCurrent ? "bg-cream text-red" : "text-ink"
                                    )}
                                  >
                                    {Icon && <Icon className="size-4 shrink-0 opacity-80" />}
                                    <span>{sub.label}</span>
                                  </a>
                                </NavigationMenuLink>
                              </li>
                            );
                          })}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                }

                const isCurrent = isPathActive(item.href, currentPath);
                return (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink asChild>
                      <a
                        href={resolveGlobalHref(item.href)}
                        aria-current={isCurrent ? "page" : undefined}
                        className={cn(
                          "inline-flex items-center rounded-none bg-transparent p-0 text-[13px] font-medium leading-none tracking-[0.5px] no-underline transition-colors hover:bg-transparent focus:bg-transparent active:bg-transparent data-[active=true]:bg-transparent data-[active=true]:hover:bg-transparent data-[active=true]:focus:bg-transparent",
                          linkTextClass
                        )}
                      >
                        {item.label}
                      </a>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>

          <Button variant={ctaVariant} size="sm" asChild>
            <a {...navCtaAnchorProps(resolvedCta)}>
              {resolvedCta.label ?? "Book a Consultation"}
            </a>
          </Button>
        </div>

        {/* Mobile menu — button is outside SheetTrigger to avoid Radix pointer-event blocking */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className={cn(
            "relative flex size-11 cursor-pointer flex-col items-center justify-center gap-1.5 transition-all duration-200 md:hidden",
            mobileOpen
              ? "z-1001 rounded-full border border-white/15"
              : ""
          )}
        >
          {mobileOpen ? (
            <X className={cn("size-5", strongTextClass)} />
          ) : (
            <>
              <span className={cn("block h-[1.5px] w-6", isLight ? "bg-ink" : "bg-white")} />
              <span className={cn("block h-[1.5px] w-6", isLight ? "bg-ink" : "bg-white")} />
              <span className={cn("block h-[1.5px] w-6", isLight ? "bg-ink" : "bg-white")} />
            </>
          )}
        </button>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen} modal={false}>
          <SheetContent
            side="top"
            className={cn(
              "flex min-h-screen flex-col items-stretch justify-start gap-6 border-none px-6 pt-20",
              isLight
                ? "bg-lotion"
                : "bg-[rgba(127,29,2,0.98)] backdrop-blur-[30px]"
            )}
            showCloseButton={false}
            onInteractOutside={(e) => e.preventDefault()}
          >
            {flatMobileItems.map((item) => {
              const Icon = item.icon ? getIcon(item.icon) : null;
              const isCurrent = isPathActive(item.href, currentPath);
              return (
                <a
                  key={item.href}
                  href={resolveGlobalHref(item.href)}
                  onClick={() => setMobileOpen(false)}
                  aria-current={isCurrent ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-2.5 whitespace-nowrap font-serif text-[20px] font-medium no-underline transition-colors duration-200",
                    isLight
                      ? cn(
                          "hover:text-red",
                          isCurrent ? "font-semibold text-red" : "text-ink/80"
                        )
                      : cn(
                          "hover:text-white",
                          isCurrent ? "font-semibold text-white" : "text-white/80"
                        )
                  )}
                >
                  {Icon && <Icon className="size-5 shrink-0 opacity-70" />}
                  <span>{item.label}</span>
                </a>
              );
            })}
            <a
              {...navCtaAnchorProps(resolvedCta)}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "whitespace-nowrap font-serif text-[20px] font-medium no-underline transition-colors duration-200",
                isLight
                  ? "text-red hover:text-ink"
                  : "text-white hover:text-white/70"
              )}
            >
              {resolvedCta.label ?? "Book a Consultation"}
            </a>
          </SheetContent>
        </Sheet>
      </nav>
    </>
  );
}
