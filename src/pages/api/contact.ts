export const prerender = false;

import type { APIRoute } from "astro";
import { contactFormSchema } from "@/components/forms/schema";

const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

interface TurnstileVerifyResult {
  success: boolean;
}

interface AppsScriptResult {
  ok?: boolean;
  error?: string;
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function jsonError(error: string, status: number) {
  return json({ ok: false, error }, status);
}

export const POST: APIRoute = async ({ request, locals }) => {
  const env = locals.runtime.env;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid request body.", 400);
  }

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message ?? "Invalid form submission.", 400);
  }

  const { companyWebsite, turnstileToken, ...values } = parsed.data;

  // Honeypot tripped — respond as if successful so bots don't learn to avoid this field.
  if (companyWebsite) {
    return json({ ok: true });
  }

  const turnstileSecret = env.TURNSTILE_SECRET_KEY;
  const scriptUrl = env.GOOGLE_APPS_SCRIPT_URL;
  const webhookSecret = env.CONTACT_FORM_WEBHOOK_SECRET;

  if (!turnstileSecret || !scriptUrl || !webhookSecret) {
    console.error(
      "Contact form is missing one of TURNSTILE_SECRET_KEY, GOOGLE_APPS_SCRIPT_URL, CONTACT_FORM_WEBHOOK_SECRET."
    );
    return jsonError("Contact form is not configured yet.", 500);
  }

  const verifyResponse = await fetch(TURNSTILE_VERIFY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret: turnstileSecret,
      response: turnstileToken,
      remoteip: request.headers.get("CF-Connecting-IP") ?? undefined,
    }),
  });
  const verifyResult = (await verifyResponse
    .json()
    .catch(() => ({ success: false }))) as TurnstileVerifyResult;
  if (!verifyResult.success) {
    return jsonError("Verification failed. Please try again.", 400);
  }

  try {
    // Apps Script web apps can't read custom HTTP headers in doPost, so the
    // shared secret travels as a field in the JSON body instead.
    const scriptResponse = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, secret: webhookSecret }),
    });
    const scriptResult = (await scriptResponse
      .json()
      .catch(() => ({ ok: false }))) as AppsScriptResult;

    if (!scriptResponse.ok || !scriptResult.ok) {
      throw new Error(`Apps Script responded with ${scriptResponse.status}: ${scriptResult.error ?? "unknown error"}`);
    }
  } catch (error) {
    console.error("Failed to forward contact form submission to Apps Script:", error);
    return jsonError("Something went wrong. Please try again.", 502);
  }

  return json({ ok: true });
};
