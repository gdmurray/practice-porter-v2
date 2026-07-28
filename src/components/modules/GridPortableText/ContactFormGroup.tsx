"use client";

import { ContactForm } from "@/components/forms";
import type { ContactFormProps } from "@/components/forms";

export type ContactFormBlockValue = ContactFormProps;
export type { ContactInterestOption } from "@/components/forms";

export function ContactFormGroup({ value }: { value: ContactFormBlockValue }) {
  return <ContactForm {...value} />;
}
