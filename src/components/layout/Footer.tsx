/** Props shaped to match SITE_SETTINGS_QUERY footer result */
export interface FooterProps {
  brandDescription?: string | null;
  socialLinks?: Array<{ platform?: string | null; url?: string | null }> | null;
  columns?: Array<{
    title?: string | null;
    links?: Array<{ label?: string | null; href?: string | null }> | null;
  }> | null;
  legalLinks?: Array<{ label?: string | null; href?: string | null }> | null;
  copyright?: string | null;
}

const socialIcons: Record<string, string> = {
  linkedin: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  email: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6L12 13 2 6",
};

function isValidSocial(
  s: { platform?: string | null; url?: string | null } | null | undefined
): s is { platform: string; url: string } {
  return Boolean(s && typeof s.platform === "string" && typeof s.url === "string");
}

function isValidLink(
  l: { label?: string | null; href?: string | null } | null | undefined
): l is { label: string; href: string } {
  return Boolean(l && typeof l.label === "string" && typeof l.href === "string");
}

/** Ensures anchor-only hrefs (e.g. "#pricing") always point to the home page
 *  so global footer links work correctly regardless of the current route. */
function resolveGlobalHref(href: string) {
  return href.startsWith("#") ? `/${href}` : href;
}

export function Footer({
  brandDescription = "Intelligence behind every call. Boutique new-patient call answering and performance analytics for dental practices across North America.",
  socialLinks,
  columns,
  legalLinks,
  copyright = "© 2026 Practice Porter Inc. All rights reserved.",
}: FooterProps) {
  const socials = (socialLinks ?? []).filter(isValidSocial);
  const cols = (columns ?? []).filter(
    (c): c is { title: string; links?: Array<{ label?: string | null; href?: string | null }> | null } =>
      Boolean(c && "title" in c && typeof c.title === "string")
  );
  const legal = (legalLinks ?? []).filter(isValidLink);

  return (
    <footer className="bg-[#070F1E] pb-10 pt-20 text-white/50">
      <div className="pp-container">
        <div className="mb-[60px] grid grid-cols-1 gap-10 border-b border-white/10 pb-[60px] md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <a href="/" className="mb-5 flex items-baseline gap-0.5 no-underline">
              <span className="font-serif text-[22px] font-semibold tracking-[-0.5px] text-white">
                Practice
              </span>
              <span className="ml-1.5 font-sans text-[22px] font-light tracking-[2px] uppercase text-gold">
                Porter
              </span>
              <span className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-gold align-middle" />
            </a>
            <p className="mb-6 max-w-[280px] text-sm leading-[1.7] text-white/40">
              {brandDescription ?? ""}
            </p>
            <div className="flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.url}
                  href={social.url}
                  aria-label={social.platform}
                  className="flex size-10 items-center justify-center rounded-full border border-white/10 text-white/40 transition-colors hover:border-gold hover:text-gold"
                >
                  {social.platform === "linkedin" && (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
                      <path d={socialIcons.linkedin} />
                    </svg>
                  )}
                  {social.platform === "email" && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-4">
                      <path d={socialIcons.email} />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <div className="mb-6 text-xs font-bold tracking-[2px] uppercase text-white">
                {col.title}
              </div>
              <ul className="flex flex-col gap-3 list-none">
                {(col.links ?? []).filter(isValidLink).map((link) => (
                  <li key={link.href}>
                    <a
                      href={resolveGlobalHref(link.href)}
                      className="text-sm text-white/40 no-underline transition-colors hover:text-gold"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-between gap-4 text-[13px] text-white/25 md:flex-row">
          <div>{copyright ?? ""}</div>
          <div className="flex gap-6">
            {legal.map((link) => (
              <a
                key={link.href}
                href={resolveGlobalHref(link.href)}
                className="text-white/25 no-underline transition-colors hover:text-white/50"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
