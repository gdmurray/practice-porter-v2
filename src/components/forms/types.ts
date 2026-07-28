export interface ContactInterestOption {
  _key?: string;
  label: string;
  value: string;
}

export interface ContactFormProps {
  formTitle?: string;
  formSubtitle?: string;
  interestOptions?: ContactInterestOption[];
  privacyPolicyHref?: string;
  successTitle?: string;
  successMessage?: string;
}
