"use client";

import { useLocale, useTranslation, T } from "@/components/i18n/LocaleProvider";


import Link from "@/components/i18n/LocalizedLink";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  countryOptions,
  isCountryCode,
  SOURCE_OPTIONS,
  START_OPTIONS,
  validateWaitlist,
  type WaitlistErrors,
  type WaitlistInput,
} from "@/lib/waitlist";
import { LAUNCH } from "@/lib/content";

type Status = "idle" | "submitting" | "success" | "error";

const ATTRIBUTION_KEY = "biab-attribution";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

/** First-touch attribution: keep the campaign that brought the visitor in. */
function readAttribution(): Record<string, string> {
  const fresh: Record<string, string> = {};
  try {
    const params = new URLSearchParams(window.location.search);
    UTM_KEYS.forEach((k) => {
      const v = params.get(k);
      if (v) fresh[k] = v;
    });
    fresh.referrer = document.referrer;
    fresh.landing_page = window.location.pathname;
  } catch {
    /* ignore */
  }
  try {
    const stored = window.sessionStorage.getItem(ATTRIBUTION_KEY);
    if (stored) return { ...JSON.parse(stored), language: navigator.language };
    window.sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(fresh));
  } catch {
    /* storage blocked — use what we have */
  }
  return { ...fresh, language: typeof navigator !== "undefined" ? navigator.language : "" };
}

function guessCountry(): string {
  try {
    const region = new Intl.Locale(navigator.language).maximize().region;
    if (region && isCountryCode(region)) return region;
  } catch {
    /* ignore */
  }
  return "CH";
}

const inputBase =
  "w-full rounded-2xl border bg-paper/85 px-4 py-3.5 text-base text-ink placeholder:text-mid/70 transition-[border-color,box-shadow] duration-150 focus:outline-none focus:ring-4";
const inputOk = "border-ink/15 focus:border-blue focus:ring-blue/15";
const inputErr = "border-red-600 focus:border-red-600 focus:ring-red-600/15";

export default function WaitlistForm({ heading = true }: { heading?: boolean }) {
  const locale = useLocale();
  const t = useTranslation();
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;
  const { priority, rest } = useMemo(() => countryOptions(locale), [locale]);

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "CH",
    phone: "",
    start: "",
    source: "",
    consent: false,
    website: "",
    partnerFirstName: "",
    partnerLastName: "",
    partnerEmail: "",
    partnerCountry: "CH",
    partnerPhone: "",
    partnerConsent: false,
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<WaitlistErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const [result, setResult] = useState<{ firstName: string; duplicate: boolean; duo: boolean; partnerFirstName: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const startedAt = useRef(0);
  const attribution = useRef<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
    attribution.current = readAttribution();
    try {
      const draft = sessionStorage.getItem("biab-language-draft");
      if (draft) {
        sessionStorage.removeItem("biab-language-draft");
        const restored = JSON.parse(draft);
        setValues(v => ({ ...v, ...restored.values }));
        startedAt.current = restored.startedAt || Date.now();
      } else setValues(v => ({ ...v, country: guessCountry(), partnerCountry: guessCountry() }));
    } catch { setValues(v => ({ ...v, country: guessCountry(), partnerCountry: guessCountry() })); }
  }, []);

  useEffect(() => {
    const saveDraft = () => {
      if (status === "success") return;
      try { sessionStorage.setItem("biab-language-draft", JSON.stringify({ values, startedAt: startedAt.current })); } catch { /* storage disabled */ }
    };
    window.addEventListener("biab:language-change", saveDraft);
    return () => window.removeEventListener("biab:language-change", saveDraft);
  }, [values, status]);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  function toInput(v = values): WaitlistInput {
    const { partnerFirstName, partnerLastName, partnerEmail, partnerCountry, partnerPhone, partnerConsent, ...primary } = v;
    return {
      ...primary,
      ...(v.start === "duo" ? { partnerFirstName, partnerLastName, partnerEmail, partnerCountry, partnerPhone, partnerConsent } : {}),
      elapsedMs: Date.now() - startedAt.current,
    };
  }

  function update<K extends keyof typeof values>(key: K, value: (typeof values)[K]) {
    const next = { ...values, [key]: value };
    setValues(next);
    if (touched[key] || key === "start" || (key === "country" && touched.phone) || (key === "partnerCountry" && touched.partnerPhone) || (key === "email" && touched.partnerEmail)) {
      setErrors(validateWaitlist(toInput(next)));
    }
  }

  function blur(key: string) {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(validateWaitlist(toInput()));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");
    const all = validateWaitlist(toInput());
    setErrors(all);
    setTouched({ firstName: true, lastName: true, email: true, country: true, phone: true, start: true, consent: true, partnerFirstName: true, partnerLastName: true, partnerEmail: true, partnerCountry: true, partnerPhone: true, partnerConsent: true });

    const firstInvalid = Object.keys(all)[0];
    if (firstInvalid) {
      const el = formRef.current?.querySelector<HTMLElement>(`[data-field="${firstInvalid}"]`);
      el?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...toInput(), attribution: { ...attribution.current, language: locale } }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.ok) {
        setResult({ firstName: data.firstName ?? values.firstName, duplicate: !!data.duplicate, duo: values.start === "duo", partnerFirstName: values.partnerFirstName });
        setStatus("success");
        return;
      }
      if (data?.errors) setErrors(data.errors);
      setServerError(data?.error ?? "Something went wrong. Please check your details and try again.");
      setStatus("error");
    } catch {
      setServerError("No connection. Check your internet and try again.");
      setStatus("error");
    }
  }

  async function copyInvite() {
    const url = `${window.location.origin}/${locale}/waitlist`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      window.prompt?.(t("Copy this link:"), url);
    }
  }

  const err = (k: keyof WaitlistErrors) => (touched[k] ? errors[k] : undefined);
  const describedBy = (k: string, hasError: boolean, hint?: boolean) =>
    [hint ? id(`${k}-hint`) : "", hasError ? id(`${k}-error`) : ""].filter(Boolean).join(" ") || undefined;

  if (status === "success" && result) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        className="glass-strong rounded-[28px] p-8 text-center focus:outline-none md:p-12"
        role="status"
      >
        <span
          aria-hidden="true"
          className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue text-paper"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h3 className="mt-6 font-display text-3xl font-bold tracking-tight [text-wrap:balance]">
          <T>{result.duo
            ? (result.duplicate ? `Your Duo is already registered, ${result.firstName} & ${result.partnerFirstName}.` : `You're both founding members, ${result.firstName} & ${result.partnerFirstName}.`)
            : (result.duplicate ? `Your founding price is already reserved, ${result.firstName}.` : `You're a founding member, ${result.firstName}.`)}</T>
        </h3>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-mid"><T>{result.duo
          ? "Both contact details are saved together. Your founding prices are reserved. Your first update arrives within the next two weeks, and the first training module in December."
          : "Your price is reserved. Your first update arrives within the next two weeks, and the first training module in December."}</T></p>
        {!result.duo && <div className="mx-auto mt-8 max-w-md border-t border-ink/10 pt-6">
          <p className="text-sm font-semibold text-ink"><T>Starting as a Duo?</T></p>
          <p className="mt-1 text-sm text-mid"><T>Send this page to the person you want to build with.</T></p>
          <button
            type="button"
            onClick={copyInvite}
            className="mt-4 inline-flex min-h-11 cursor-pointer items-center justify-center rounded-full border border-ink/15 bg-paper px-5 py-2.5 text-sm font-semibold text-ink transition-colors duration-150 hover:border-ink"
          >
            <T>{copied ? "Link copied" : "Copy invite link"}</T>
          </button>
        </div>}
      </div>
    );
  }

  const submitting = status === "submitting";
  const all = [...priority, ...rest];
  const dial = all.find((c) => c.code === values.country)?.dial ?? "";
  // Someone typing their own +49 / 0049 doesn't need our prefix shown.
  const showDial = !!dial && !/^\s*(\+|00)/.test(values.phone);

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="glass-strong rounded-[28px] p-5 text-left sm:p-8 md:p-10"
      aria-describedby={heading ? id("intro") : undefined}
    >
      {heading && (
        <div className="mb-8">
          <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl"><T>Join the waitlist</T></h3>
          <p id={id("intro")} className="mt-2 text-sm leading-relaxed text-mid md:text-base"><T>
            Free and without commitment. Secure your founding member price.</T>
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={id("firstName")} className="mb-2 block text-sm font-semibold text-ink"><T>
            First name
          </T></label>
          <input
            id={id("firstName")}
            data-field="firstName"
            name="firstName"
            autoComplete="given-name"
            value={values.firstName}
            onChange={(e) => update("firstName", e.target.value)}
            onBlur={() => blur("firstName")}
            aria-invalid={!!err("firstName")}
            aria-describedby={describedBy("firstName", !!err("firstName"))}
            className={`${inputBase} ${err("firstName") ? inputErr : inputOk}`}
          />
          {err("firstName") && (
            <p id={id("firstName-error")} className="mt-2 text-sm text-red-600"><T>{err("firstName")}</T></p>
          )}
        </div>

        <div>
          <label htmlFor={id("lastName")} className="mb-2 block text-sm font-semibold text-ink"><T>
            Last name
          </T></label>
          <input
            id={id("lastName")}
            data-field="lastName"
            name="lastName"
            autoComplete="family-name"
            value={values.lastName}
            onChange={(e) => update("lastName", e.target.value)}
            onBlur={() => blur("lastName")}
            aria-invalid={!!err("lastName")}
            aria-describedby={describedBy("lastName", !!err("lastName"))}
            className={`${inputBase} ${err("lastName") ? inputErr : inputOk}`}
          />
          {err("lastName") && (
            <p id={id("lastName-error")} className="mt-2 text-sm text-red-600"><T>{err("lastName")}</T></p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={id("email")} className="mb-2 block text-sm font-semibold text-ink"><T>
            Email
          </T></label>
          <input
            id={id("email")}
            data-field="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            autoCapitalize="none"
            autoCorrect="off"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            onBlur={() => blur("email")}
            aria-invalid={!!err("email")}
            aria-describedby={describedBy("email", !!err("email"))}
            className={`${inputBase} ${err("email") ? inputErr : inputOk}`}
          />
          {err("email") && (
            <p id={id("email-error")} className="mt-2 text-sm text-red-600"><T>{err("email")}</T></p>
          )}
        </div>

        <div>
          <label htmlFor={id("country")} className="mb-2 block text-sm font-semibold text-ink"><T>
            Country
          </T></label>
          <select
            id={id("country")}
            data-field="country"
            name="country"
            autoComplete="country"
            value={values.country}
            onChange={(e) => {
              setTouched((t) => ({ ...t, country: true }));
              update("country", e.target.value);
            }}
            aria-invalid={!!err("country")}
            aria-describedby={describedBy("country", !!err("country"))}
            className={`${inputBase} ${err("country") ? inputErr : inputOk} cursor-pointer appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b6b6b' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")] bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10`}
          >
            <optgroup label={t("Most common")}>
              {priority.map((c) => (
                <option key={c.code} value={c.code}>
                  <T>{c.name}</T>
                </option>
              ))}
            </optgroup>
            <optgroup label={t("All countries")}>
              {rest.map((c) => (
                <option key={c.code} value={c.code}>
                  <T>{c.name}</T>
                </option>
              ))}
            </optgroup>
          </select>
          {err("country") && (
            <p id={id("country-error")} className="mt-2 text-sm text-red-600"><T>{err("country")}</T></p>
          )}
        </div>

        <div>
          <label htmlFor={id("phone")} className="mb-2 block text-sm font-semibold text-ink"><T>
            Phone </T><span className="font-normal text-mid"><T>(optional)</T></span>
          </label>
          <div className="relative">
            {showDial && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-base text-mid"
              >
                <T>{dial}</T>
              </span>
            )}
            <input
              id={id("phone")}
              data-field="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              placeholder={values.country === "CH" ? "79 123 45 67" : ""}
              value={values.phone}
              onChange={(e) => update("phone", e.target.value)}
              onBlur={() => blur("phone")}
              aria-invalid={!!err("phone")}
              aria-describedby={describedBy("phone", !!err("phone"))}
              style={showDial ? { paddingLeft: `${1.5 + dial.length * 0.6}rem` } : undefined}
              className={`${inputBase} ${err("phone") ? inputErr : inputOk}`}
            />
          </div>
          {err("phone") && (
            <p id={id("phone-error")} className="mt-1 text-sm text-red-600"><T>{err("phone")}</T></p>
          )}
        </div>

        <fieldset className="sm:col-span-2" data-field="start" tabIndex={-1}>
          <legend className="mb-2 block text-sm font-semibold text-ink"><T>How would you like to start?</T></legend>
          <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-describedby={err("start") ? id("start-error") : undefined}>
            {START_OPTIONS.map((o) => {
              const checked = values.start === o.value;
              return (
                <label
                  key={o.value}
                  className={`flex min-h-12 min-w-0 cursor-pointer items-center justify-center rounded-2xl border px-2 py-3 text-center text-sm font-semibold hyphens-auto [overflow-wrap:anywhere] transition-colors duration-150 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-blue/15 ${
                    checked
                      ? "border-ink bg-ink text-paper"
                      : `bg-paper/85 text-ink hover:border-ink/40 ${err("start") ? "border-red-600" : "border-ink/15"}`
                  }`}
                >
                  <input
                    type="radio"
                    name="start"
                    value={o.value}
                    checked={checked}
                    onChange={() => {
                      setTouched((t) => ({ ...t, start: true }));
                      update("start", o.value);
                    }}
                    className="sr-only"
                  />
                  <T>{o.label}</T>
                </label>
              );
            })}
          </div>
          {err("start") && (
            <p id={id("start-error")} className="mt-2 text-sm text-red-600"><T>{err("start")}</T></p>
          )}
        </fieldset>

        {values.start === "duo" && (
          <fieldset className="min-w-0 rounded-2xl border border-ink/15 p-4 sm:col-span-2 sm:p-5">
            <legend className="px-2 text-base font-semibold text-ink"><T>Second person’s contact details</T></legend>
            <p className="mb-5 text-sm leading-relaxed text-mid"><T>Register both of you together. Each person needs their own email address. Phone numbers are optional.</T></p>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {([
                { key: "partnerFirstName", label: "First name", type: "text", autoComplete: "section-partner given-name" },
                { key: "partnerLastName", label: "Last name", type: "text", autoComplete: "section-partner family-name" },
                { key: "partnerEmail", label: "Email", type: "email", autoComplete: "section-partner email" },
              ] as const).map((field) => (
                <div key={field.key} className={field.type === "email" ? "sm:col-span-2" : undefined}>
                  <label htmlFor={id(field.key)} className="mb-2 block text-sm font-semibold text-ink"><T>{field.label}</T></label>
                  <input
                    id={id(field.key)} name={field.key} data-field={field.key} type={field.type}
                    required autoComplete={field.autoComplete}
                    inputMode={field.type === "email" ? "email" : "text"}
                    spellCheck={field.type === "email" ? false : undefined}
                    autoCapitalize={field.type === "email" ? "none" : "words"}
                    value={values[field.key]}
                    onChange={(e) => update(field.key, e.target.value)} onBlur={() => blur(field.key)}
                    aria-invalid={!!err(field.key)} aria-describedby={describedBy(field.key, !!err(field.key))}
                    className={`${inputBase} ${err(field.key) ? inputErr : inputOk}`}
                  />
                  {err(field.key) && <p id={id(`${field.key}-error`)} className="mt-2 text-sm text-red-600"><T>{err(field.key)}</T></p>}
                </div>
              ))}
              <div>
                <label htmlFor={id("partnerCountry")} className="mb-2 block text-sm font-semibold text-ink"><T>Country</T></label>
                <select
                  id={id("partnerCountry")} name="partnerCountry" data-field="partnerCountry" required
                  autoComplete="section-partner country" value={values.partnerCountry}
                  onChange={(e) => { setTouched(t => ({ ...t, partnerCountry: true })); update("partnerCountry", e.target.value); }}
                  aria-invalid={!!err("partnerCountry")} aria-describedby={describedBy("partnerCountry", !!err("partnerCountry"))}
                  className={`${inputBase} ${err("partnerCountry") ? inputErr : inputOk} cursor-pointer`}
                >
                  <optgroup label={t("Most common")}>
                    {priority.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
                  </optgroup>
                  <optgroup label={t("All countries")}>
                    {rest.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
                  </optgroup>
                </select>
                {err("partnerCountry") && <p id={id("partnerCountry-error")} className="mt-2 text-sm text-red-600"><T>{err("partnerCountry")}</T></p>}
              </div>
              <div>
                <label htmlFor={id("partnerPhone")} className="mb-2 block text-sm font-semibold text-ink"><T>Phone </T><span className="font-normal text-mid"><T>(optional)</T></span></label>
                <input
                  id={id("partnerPhone")} name="partnerPhone" data-field="partnerPhone" type="tel" inputMode="tel"
                  autoComplete="section-partner tel" placeholder={values.partnerCountry === "CH" ? "+41 79 123 45 67" : ""}
                  value={values.partnerPhone} onChange={(e) => update("partnerPhone", e.target.value)} onBlur={() => blur("partnerPhone")}
                  aria-invalid={!!err("partnerPhone")} aria-describedby={describedBy("partnerPhone", !!err("partnerPhone"))}
                  className={`${inputBase} ${err("partnerPhone") ? inputErr : inputOk}`}
                />
                {err("partnerPhone") && <p id={id("partnerPhone-error")} className="mt-2 text-sm text-red-600"><T>{err("partnerPhone")}</T></p>}
              </div>
              <div className="sm:col-span-2">
                <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-mid">
                  <input
                    type="checkbox" name="partnerConsent" data-field="partnerConsent" required checked={values.partnerConsent}
                    onChange={(e) => { setTouched(t => ({ ...t, partnerConsent: true })); update("partnerConsent", e.target.checked); }}
                    aria-invalid={!!err("partnerConsent")} aria-describedby={err("partnerConsent") ? id("partnerConsent-error") : undefined}
                    className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--color-blue)]"
                  />
                  <span><T>The second person agrees to join the waitlist and receive BIAB updates by email until launch. They can unsubscribe at any time.</T>{" "}<Link href="/privacy" className="font-semibold text-ink underline underline-offset-4"><T>Privacy notice</T></Link></span>
                </label>
                {err("partnerConsent") && <p id={id("partnerConsent-error")} className="mt-2 text-sm text-red-600"><T>{err("partnerConsent")}</T></p>}
              </div>
            </div>
          </fieldset>
        )}

        <div className="sm:col-span-2">
          <label htmlFor={id("source")} className="mb-2 block text-sm font-semibold text-ink"><T>
            Where did you hear about BIAB? </T><span className="font-normal text-mid"><T>(optional)</T></span>
          </label>
          <select
            id={id("source")}
            name="source"
            value={values.source}
            onChange={(e) => update("source", e.target.value)}
            className={`${inputBase} ${inputOk} cursor-pointer appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b6b6b' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")] bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10`}
          >
            <option value=""><T>Choose one</T></option>
            {SOURCE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                <T>{o.label}</T>
              </option>
            ))}
          </select>
        </div>

        {/* Honeypot: hidden from people and assistive tech. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor={id("website")}><T>Website</T></label>
          <input
            id={id("website")}
            name="hp_extra_field"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(e) => setValues((v) => ({ ...v, website: e.target.value }))}
          />
        </div>

        <div className="sm:col-span-2">
          <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-mid">
            <input
              type="checkbox"
              data-field="consent"
              name="consent"
              checked={values.consent}
              onChange={(e) => {
                setTouched((t) => ({ ...t, consent: true }));
                update("consent", e.target.checked);
              }}
              aria-invalid={!!err("consent")}
              aria-describedby={err("consent") ? id("consent-error") : undefined}
              className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded accent-[var(--color-blue)]"
            />
            <span><T>
              I’d like to join the waitlist and receive BIAB updates by email until launch. I can unsubscribe at any time.</T><T>{" "}</T>
              <Link href="/privacy" className="font-semibold text-ink underline underline-offset-4"><T>
                Privacy notice
              </T></Link>
            </span>
          </label>
          {err("consent") && (
            <p id={id("consent-error")} className="mt-2 text-sm text-red-600"><T>{err("consent")}</T></p>
          )}
        </div>
      </div>

      {serverError && (
        <p role="alert" className="mt-6 rounded-2xl border border-red-600/30 bg-red-600/5 px-4 py-3 text-sm text-red-700">
          <T>{serverError}</T>
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-8 inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-2.5 rounded-full border border-ink bg-ink px-7 py-3.5 text-base font-bold tracking-tight text-paper transition-[background-color,transform] duration-150 hover:bg-charcoal active:scale-[0.98] disabled:cursor-wait disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue"
      >
        <T>{submitting ? "Saving…" : "Secure my founding price"}</T>
        {!submitting && <span aria-hidden="true">→</span>}
      </button>
      <p className="mt-4 text-center text-xs text-mid"><T>
        No payment now. Waitlist open until </T><T>{LAUNCH.waitlistCloses}</T>.
      </p>
    </form>
  );
}
