"use client";

import { useRef, useState } from "react";
import { Controller, useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle2 } from "lucide-react";
import type { TurnstileInstance } from "@marsidev/react-turnstile";
import { cn } from "@/lib/utils";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { contactFormSchema, defaultValues, type ContactFormValues } from "./schema";
import { defaultInterestOptions } from "./constants";
import { submitContactForm } from "./submitContactForm";
import { TurnstileWidget } from "./TurnstileWidget";
import type { ContactFormProps } from "./types";

export function ContactForm({
  formTitle = "Send Us a Message",
  formSubtitle = "Fill out the form below and one of our consultants will be in touch shortly.",
  interestOptions,
  privacyPolicyHref = "/privacy-policy",
  successTitle = "Message Sent!",
  successMessage = "Thanks for reaching out. One of our consultants will be in touch within 1 business day.",
}: ContactFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance>(null);

  const resolvedInterestOptions = interestOptions?.length
    ? interestOptions
    : defaultInterestOptions;

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    // `as any`/`as Resolver<...>` here works around a type-only mismatch
    // between @hookform/resolvers@5.4.0 and zod@4.4.x's internal version
    // brand (react-hook-form/resolvers#842) — runtime validation is
    // unaffected; only TS overload resolution is broken upstream.
    resolver: zodResolver(contactFormSchema as any) as Resolver<ContactFormValues>,
    defaultValues,
    mode: "onBlur",
  });

  async function onSubmit(values: ContactFormValues) {
    setSubmitError(null);
    const result = await submitContactForm(values);

    if (result.ok) {
      setIsSubmitted(true);
      trackEvent("generate_lead", { interest: values.interest || undefined });
      return;
    }

    setSubmitError(result.error ?? "Something went wrong. Please try again.");
    setValue("turnstileToken", "");
    turnstileRef.current?.reset();
  }

  const fieldInputClasses =
    "h-11 rounded-lg border-border-color bg-lotion px-4 text-[14.5px] text-ink placeholder:text-ink/45 focus-visible:border-red focus-visible:ring-red/15";

  const selectContentClasses =
    "rounded-lg border border-border-color bg-white p-1 shadow-[0_8px_24px_rgba(43,26,20,0.1)] ring-0";

  const selectItemClasses =
    "cursor-pointer rounded-md py-2.5 pr-8 pl-3 text-[14.5px] text-ink focus:bg-vanilla focus:text-ink";

  return (
    <div className="rounded-2xl border border-border-color bg-white p-8 shadow-[0_16px_48px_rgba(43,26,20,0.08)] sm:p-11">
      {isSubmitted ? (
        <div className="py-10 text-center">
          <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-vanilla">
            <CheckCircle2 className="size-[26px] text-red" />
          </div>
          <h3 className="mb-3 font-serif text-[26px] font-normal text-ink">{successTitle}</h3>
          <p className="mx-auto max-w-[340px] text-[14.5px] leading-[1.65] text-muted-text">
            {successMessage}
          </p>
        </div>
      ) : (
        <>
          <h2 className="mb-2 font-serif text-[26px] font-normal text-ink">{formTitle}</h2>
          <p className="mb-8 text-[14px] leading-[1.55] text-muted-text">{formSubtitle}</p>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Honeypot — hidden from sighted users, only bots fill this in. */}
            <div className="absolute left-[-9999px] h-px w-px overflow-hidden" aria-hidden="true">
              <label htmlFor="companyWebsite">Company Website</label>
              <input
                type="text"
                id="companyWebsite"
                tabIndex={-1}
                autoComplete="off"
                {...register("companyWebsite")}
              />
            </div>

            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <Field data-invalid={!!errors.firstName}>
                    <FieldLabel
                      htmlFor={field.name}
                      className="text-xs font-semibold tracking-[0.3px] text-ink uppercase"
                    >
                      First Name
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      placeholder="Jane"
                      aria-invalid={!!errors.firstName}
                      className={fieldInputClasses}
                    />
                    <FieldError errors={[errors.firstName]} />
                  </Field>
                )}
              />
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <Field data-invalid={!!errors.lastName}>
                    <FieldLabel
                      htmlFor={field.name}
                      className="text-xs font-semibold tracking-[0.3px] text-ink uppercase"
                    >
                      Last Name
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      placeholder="Smith"
                      aria-invalid={!!errors.lastName}
                      className={fieldInputClasses}
                    />
                    <FieldError errors={[errors.lastName]} />
                  </Field>
                )}
              />
            </div>

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Field data-invalid={!!errors.email} className="mb-4">
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-xs font-semibold tracking-[0.3px] text-ink uppercase"
                  >
                    Email Address
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="email"
                    placeholder="jane@yourpractice.com"
                    aria-invalid={!!errors.email}
                    className={fieldInputClasses}
                  />
                  <FieldError errors={[errors.email]} />
                </Field>
              )}
            />

            <Controller
              name="practiceName"
              control={control}
              render={({ field }) => (
                <Field className="mb-4">
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-xs font-semibold tracking-[0.3px] text-ink uppercase"
                  >
                    Practice Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    placeholder="Smile Dental"
                    className={fieldInputClasses}
                  />
                </Field>
              )}
            />

            <Controller
              name="interest"
              control={control}
              render={({ field }) => (
                <Field className="mb-4">
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-xs font-semibold tracking-[0.3px] text-ink uppercase"
                  >
                    I&rsquo;m interested in&hellip;
                  </FieldLabel>
                  <Select value={field.value || undefined} onValueChange={field.onChange}>
                    <SelectTrigger
                      id={field.name}
                      className={cn(
                        "w-full shadow-none data-placeholder:text-ink/45 [&_svg]:text-ink/45",
                        fieldInputClasses,
                      )}
                    >
                      <SelectValue placeholder="Select a solution" />
                    </SelectTrigger>
                    <SelectContent
                      position="popper"
                      sideOffset={4}
                      className={selectContentClasses}
                    >
                      {resolvedInterestOptions.map((option) => (
                        <SelectItem
                          key={option._key ?? option.value}
                          value={option.value}
                          className={selectItemClasses}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />

            <Controller
              name="message"
              control={control}
              render={({ field }) => (
                <Field className="mb-7">
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-xs font-semibold tracking-[0.3px] text-ink uppercase"
                  >
                    Message
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id={field.name}
                    placeholder="Tell us a bit about your practice and what you're looking to improve…"
                    className={cn("min-h-[120px] resize-y leading-[1.55]", fieldInputClasses)}
                  />
                </Field>
              )}
            />

            <Controller
              name="turnstileToken"
              control={control}
              render={({ field }) => (
                <Field className="mb-6" data-invalid={!!errors.turnstileToken}>
                  <TurnstileWidget ref={turnstileRef} onVerify={field.onChange} />
                  <FieldError errors={[errors.turnstileToken]} />
                </Field>
              )}
            />

            {submitError && (
              <p role="alert" className="mb-4 text-center text-[13px] text-destructive">
                {submitError}
              </p>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-[10px]! py-6 text-[15px] font-semibold"
            >
              {isSubmitting ? "Sending…" : "Send Message"}
              <Send className="size-[17px]" aria-hidden="true" />
            </Button>

            <p className="mt-4 text-center text-[12px] leading-normal text-ink/45">
              By submitting this form, you agree to our{" "}
              <a href={privacyPolicyHref} className="text-red hover:underline">
                Privacy Policy
              </a>
              . We&rsquo;ll never share your information.
            </p>
          </form>
        </>
      )}
    </div>
  );
}
