"use client";

import { forwardRef } from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";

export interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
}

export const TurnstileWidget = forwardRef<TurnstileInstance, TurnstileWidgetProps>(
  function TurnstileWidget({ onVerify }, ref) {
    const siteKey = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY as string | undefined;

    if (!siteKey) {
      if (import.meta.env.DEV) {
        console.warn(
          "PUBLIC_TURNSTILE_SITE_KEY is not set — the contact form's Turnstile widget will not render."
        );
      }
      return null;
    }

    return (
      <Turnstile
        ref={ref}
        siteKey={siteKey}
        onSuccess={onVerify}
        onExpire={() => onVerify("")}
        onError={() => onVerify("")}
        options={{ theme: "light", size: "flexible" }}
      />
    );
  }
);
