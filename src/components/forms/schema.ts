import { z } from "zod";

export const contactFormSchema = z.object({
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
  // Hidden honeypot field — legitimate users never fill this in.
  companyWebsite: z.string().max(0, "Spam check failed").optional(),
  turnstileToken: z.string().min(1, "Please complete the verification challenge"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const defaultValues: ContactFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  practiceName: "",
  interest: "",
  message: "",
  companyWebsite: "",
  turnstileToken: "",
};
