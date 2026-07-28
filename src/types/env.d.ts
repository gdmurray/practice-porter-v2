// Secrets set via `wrangler secret put` (and mirrored in local `.env` for dev)
// aren't declared in wrangler.jsonc, so `wrangler types` doesn't generate
// them into worker-configuration.d.ts. Augment Cloudflare.Env by hand here.
declare namespace Cloudflare {
  interface Env {
    TURNSTILE_SECRET_KEY: string;
    CONTACT_FORM_WEBHOOK_SECRET: string;
    GOOGLE_APPS_SCRIPT_URL: string;
  }
}
