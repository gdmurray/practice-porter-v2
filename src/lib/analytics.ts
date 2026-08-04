declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    clarity?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") window.gtag("event", name, params);
  // Clarity's API events only take a name (no params) — see
  // https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-api
  if (typeof window.clarity === "function") window.clarity("event", name);
}
