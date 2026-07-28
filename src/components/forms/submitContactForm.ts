import type { ContactFormValues } from "./schema";

export interface SubmitContactFormResult {
  ok: boolean;
  error?: string;
}

export async function submitContactForm(
  values: ContactFormValues
): Promise<SubmitContactFormResult> {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (response.ok) return { ok: true };

    const data = (await response.json().catch(() => null)) as { error?: string } | null;
    return {
      ok: false,
      error: data?.error ?? "Something went wrong. Please try again.",
    };
  } catch {
    return { ok: false, error: "Network error. Please check your connection and try again." };
  }
}
