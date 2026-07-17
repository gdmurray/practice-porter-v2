"use client";

import { useState, type ComponentType } from "react";
import { Controller, useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Clock, Send, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { getModuleLayoutAttrs, type ModuleLayoutValue } from "@/lib/moduleLayout";
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

const contactFormSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .pipe(z.email("Enter a valid email address")),
  practiceName: z.string().trim().optional(),
  interest: z.string().optional(),
  message: z.string().trim().optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const defaultValues: ContactFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  practiceName: "",
  interest: "",
  message: "",
};

export interface ContactDetailItem {
  _key?: string;
  icon: "mail" | "clock";
  label: string;
  value: string;
}

export interface ContactInterestOption {
  _key?: string;
  label: string;
  value: string;
}

const contactDetailIcons: Record<ContactDetailItem["icon"], ComponentType<{ className?: string }>> = {
  mail: Mail,
  clock: Clock,
};

const defaultDetails: ContactDetailItem[] = [
  { icon: "mail", label: "Email", value: "info@practiceporter.ca" },
  { icon: "clock", label: "Response Time", value: "We respond within 1 business day" },
];

const defaultInterestOptions: ContactInterestOption[] = [
  { label: "Practice Performance Report", value: "growth" },
  { label: "Call Answering Solutions", value: "call-management" },
  { label: "Front Desk Training", value: "retraining" },
  { label: "All Solutions / Not Sure Yet", value: "all" },
];

export interface ContactFormProps {
  theme?: string;
  title?: string;
  description?: string;
  details?: ContactDetailItem[];
  formTitle?: string;
  formSubtitle?: string;
  interestOptions?: ContactInterestOption[];
  privacyPolicyHref?: string;
  moduleLayout?: ModuleLayoutValue | null;
}

export function ContactForm({
  theme = "lotion",
  title = "Let's Start a Conversation",
  description = "Whether you're ready to get started or just exploring your options, our team is happy to answer any questions and walk you through what Practice Porter can do for your practice.",
  details = defaultDetails,
  formTitle = "Send Us a Message",
  formSubtitle = "Fill out the form below and one of our consultants will be in touch shortly.",
  interestOptions = defaultInterestOptions,
  privacyPolicyHref = "/privacy-policy",
  moduleLayout,
}: ContactFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    control,
    handleSubmit,
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
    // Backend/Sanity submission endpoint is not wired up yet — this only
    // validates and surfaces the success state described in the reference.
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Contact form submitted", values);
    setIsSubmitted(true);
  }

  const fieldInputClasses =
    "h-11 rounded-lg border-border-color bg-lotion px-4 text-[14.5px] focus-visible:border-red focus-visible:ring-red/15";

  return (
    <section
      id="contact-form"
      data-theme={theme}
      className="pp-section"
      style={{ background: "var(--section-bg)" }}
      aria-labelledby="contact-form-heading"
      {...getModuleLayoutAttrs(moduleLayout)}
    >
      <div className="pp-container">
        {/* Stays stacked through tablet (up to lg) so the info panel never
            gets squeezed into a narrow column — only splits into two
            columns once there's room at desktop widths. */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
          <div>
            <h2
              id="contact-form-heading"
              className="mb-[18px] font-serif text-[32px] leading-[1.2] font-normal text-ink md:text-[34px]"
            >
              {title}
            </h2>
            <p className="mb-10 max-w-[440px] text-[15px] leading-[1.7] text-muted-text">
              {description}
            </p>

            <div className="flex flex-col gap-6">
              {details.map((detail, i) => {
                const Icon = contactDetailIcons[detail.icon];
                return (
                  <div key={detail._key ?? i} className="flex items-start gap-3.5">
                    <div className="flex size-[38px] shrink-0 items-center justify-center rounded-full bg-vanilla">
                      <Icon className="size-[17px] text-red" />
                    </div>
                    <div className="pt-0.5">
                      <div className="mb-1 text-[11px] font-semibold tracking-[1.2px] text-red uppercase">
                        {detail.label}
                      </div>
                      <div className="text-[14.5px] leading-snug text-ink">{detail.value}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-border-color bg-white p-8 shadow-[0_16px_48px_rgba(43,26,20,0.08)] sm:p-11">
            {isSubmitted ? (
              <div className="py-10 text-center">
                <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-vanilla">
                  <CheckCircle2 className="size-[26px] text-red" />
                </div>
                <h3 className="mb-3 font-serif text-[26px] font-normal text-ink">
                  Message Sent!
                </h3>
                <p className="mx-auto max-w-[340px] text-[14.5px] leading-[1.65] text-muted-text">
                  Thanks for reaching out. One of our consultants will be in touch within 1
                  business day.
                </p>
              </div>
            ) : (
              <>
                <h2 className="mb-2 font-serif text-[26px] font-normal text-ink">{formTitle}</h2>
                <p className="mb-8 text-[14px] leading-[1.55] text-muted-text">{formSubtitle}</p>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger id={field.name} className={cn("w-full", fieldInputClasses)}>
                            <SelectValue placeholder="Select a solution" />
                          </SelectTrigger>
                          <SelectContent>
                            {interestOptions.map((option) => (
                              <SelectItem key={option._key ?? option.value} value={option.value}>
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
        </div>
      </div>
    </section>
  );
}
