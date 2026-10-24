import countryLists from "./i18n/countries.json";
import type { Locale } from "./i18n/routing";
import {
  getCountries,
  parsePhoneNumberFromString,
  type CountryCode,
} from "libphonenumber-js/min";

/** Shared between the form (client) and /api/waitlist (server). */

export const START_OPTIONS = [
  { value: "solo", label: "Solo" },
  { value: "duo", label: "As a Duo" },
  { value: "unsure", label: "Not sure yet" },
] as const;

export const SOURCE_OPTIONS = [
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "youtube", label: "YouTube" },
  { value: "google", label: "Google search" },
  { value: "friend", label: "A friend or colleague" },
  { value: "other", label: "Somewhere else" },
] as const;

export type StartOption = (typeof START_OPTIONS)[number]["value"];
export type SourceOption = (typeof SOURCE_OPTIONS)[number]["value"];

export type WaitlistInput = {
  firstName: string;
  lastName: string;
  email: string;
  /** ISO country code, e.g. "CH". Required — where the person joins from. */
  country: string;
  /** Optional. Parsed with `country` as the default prefix. */
  phone: string;
  start: string;
  source: string;
  consent: boolean;
  partnerFirstName?: string;
  partnerLastName?: string;
  partnerEmail?: string;
  partnerCountry?: string;
  partnerPhone?: string;
  partnerConsent?: boolean;
  /** Honeypot — real people never fill this in. */
  website?: string;
  /** Milliseconds the form was open before submitting. */
  elapsedMs?: number;
  attribution?: Record<string, string>;
};

export type WaitlistErrors = Partial<
  Record<"firstName" | "lastName" | "email" | "country" | "phone" | "start" | "consent" | "partnerFirstName" | "partnerLastName" | "partnerEmail" | "partnerCountry" | "partnerPhone" | "partnerConsent", string>
>;

export type WaitlistRecord = {
  submittedAt: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  countryCode: string;
  start: string;
  source: string;
  consent: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  referrer: string;
  landingPage: string;
  language: string;
  partnerFirstName: string;
  partnerLastName: string;
  partnerEmail: string;
  partnerPhone: string;
  partnerCountry: string;
  partnerCountryCode: string;
  partnerConsent: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Countries shown first in the phone prefix list. */
export const PRIORITY_COUNTRIES: CountryCode[] = ["CH", "DE", "AT", "LI"];

export function countryName(code: string, locale = "en"): string {
  try {
    return new Intl.DisplayNames([locale], { type: "region" }).of(code) ?? code;
  } catch {
    return code;
  }
}

export function countryOptions(locale: Locale = "en") {
  // The same precomputed names and order on server and browser prevent hydration differences.
  const all = countryLists[locale];
  const priority = PRIORITY_COUNTRIES.map(code => all.find(c => c.code === code)!).filter(Boolean);
  const rest = all.filter(c => !(PRIORITY_COUNTRIES as readonly string[]).includes(c.code));
  return { priority, rest };
}

export function isCountryCode(value: string): value is CountryCode {
  return (getCountries() as string[]).includes(value);
}

/**
 * Parses a phone number typed with or without its international prefix.
 * A number starting with + or 00 decides the country on its own.
 */
export function parsePhone(phone: string, country: string) {
  const trimmed = phone.trim().replace(/^00/, "+");
  const fallback = isCountryCode(country) ? country : undefined;
  return parsePhoneNumberFromString(trimmed, fallback);
}

export function validateWaitlist(input: WaitlistInput): WaitlistErrors {
  const errors: WaitlistErrors = {};

  if (!input.firstName.trim()) errors.firstName = "Please enter your first name.";
  else if (input.firstName.trim().length > 80) errors.firstName = "That name is too long.";

  if (!input.lastName.trim()) errors.lastName = "Please enter your last name.";
  else if (input.lastName.trim().length > 80) errors.lastName = "That name is too long.";

  const email = input.email.trim();
  if (!email) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(email) || email.length > 200)
    errors.email = "This email address doesn't look right. Please check it.";

  if (!isCountryCode(input.country)) errors.country = "Please choose your country.";

  // Phone is optional — only check it when someone fills it in.
  if (input.phone.trim()) {
    const parsed = parsePhone(input.phone, input.country);
    if (!parsed || !parsed.isValid()) {
      errors.phone =
        "This number doesn't look valid. Check it, or add the country prefix (for example +49).";
    }
  }

  if (!START_OPTIONS.some((o) => o.value === input.start))
    errors.start = "Choose how you'd like to start.";

  if (input.start === "duo") {
    if (!input.partnerFirstName?.trim()) errors.partnerFirstName = "Please enter your first name.";
    else if (input.partnerFirstName.trim().length > 80) errors.partnerFirstName = "That name is too long.";
    if (!input.partnerLastName?.trim()) errors.partnerLastName = "Please enter your last name.";
    else if (input.partnerLastName.trim().length > 80) errors.partnerLastName = "That name is too long.";
    const partnerEmail = input.partnerEmail?.trim() ?? "";
    if (!partnerEmail) errors.partnerEmail = "Please enter your email address.";
    else if (!EMAIL_RE.test(partnerEmail) || partnerEmail.length > 200)
      errors.partnerEmail = "This email address doesn't look right. Please check it.";
    else if (partnerEmail.toLowerCase() === email.toLowerCase())
      errors.partnerEmail = "Please use a different email address for each person.";
    if (!isCountryCode(input.partnerCountry ?? "")) errors.partnerCountry = "Please choose your country.";
    if (input.partnerPhone?.trim()) {
      const parsed = parsePhone(input.partnerPhone, input.partnerCountry ?? "");
      if (!parsed?.isValid()) errors.partnerPhone = "This number doesn't look valid. Check it, or add the country prefix (for example +49).";
    }
    if (!input.partnerConsent) errors.partnerConsent = "Please confirm the second person's agreement to receive BIAB updates.";
  }

  if (!input.consent) errors.consent = "Please confirm so we can contact you about the launch.";

  return errors;
}
