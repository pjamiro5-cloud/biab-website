import { NextResponse } from "next/server";
import {
  countryName,
  parsePhone,
  SOURCE_OPTIONS,
  validateWaitlist,
  type WaitlistInput,
  type WaitlistRecord,
} from "@/lib/waitlist";

/**
 * Receives waitlist sign-ups, validates them again on the server and
 * forwards them to the Google Sheet (Apps Script web app).
 *
 * Environment variables (see integrations/google-sheets/README.md):
 *   WAITLIST_WEBHOOK_URL  – the Apps Script web app URL
 *   WAITLIST_SECRET       – shared secret, must match the script's SECRET property
 */

export const runtime = "nodejs";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

function str(value: unknown, max = 300): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const attributionRaw =
    body.attribution && typeof body.attribution === "object"
      ? (body.attribution as Record<string, unknown>)
      : {};

  const input: WaitlistInput = {
    firstName: str(body.firstName, 80),
    lastName: str(body.lastName, 80),
    email: str(body.email, 200).toLowerCase(),
    country: str(body.country, 2).toUpperCase(),
    phone: str(body.phone, 40),
    start: str(body.start, 20),
    source: str(body.source, 20),
    consent: body.consent === true,
    website: str(body.website, 200),
    elapsedMs: typeof body.elapsedMs === "number" ? body.elapsedMs : 0,
    ...(body.start === "duo" ? {
      partnerFirstName: str(body.partnerFirstName, 80),
      partnerLastName: str(body.partnerLastName, 80),
      partnerEmail: str(body.partnerEmail, 200).toLowerCase(),
      partnerCountry: str(body.partnerCountry, 2).toUpperCase(),
      partnerPhone: str(body.partnerPhone, 40),
      partnerConsent: body.partnerConsent === true,
    } : {}),
  };

  // Bots: filled honeypot or submitted faster than a person can type.
  // Answer as if it worked, so they don't learn what tripped them.
  if (input.website || (input.elapsedMs ?? 0) < 2500) {
    return NextResponse.json({ ok: true });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Please wait a few minutes and try again." },
      { status: 429 }
    );
  }

  const errors = validateWaitlist(input);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const phone = input.phone ? parsePhone(input.phone, input.country) : undefined;
  const partnerPhone = input.partnerPhone ? parsePhone(input.partnerPhone, input.partnerCountry ?? "") : undefined;

  const record: WaitlistRecord = {
    submittedAt: new Date().toISOString(),
    firstName: input.firstName,
    lastName: input.lastName,
    email: input.email,
    phone: phone?.number ?? "",
    country: countryName(input.country),
    countryCode: input.country,
    start: input.start,
    source: SOURCE_OPTIONS.some((o) => o.value === input.source) ? input.source : "",
    consent: "yes",
    utmSource: str(attributionRaw.utm_source, 120),
    utmMedium: str(attributionRaw.utm_medium, 120),
    utmCampaign: str(attributionRaw.utm_campaign, 120),
    utmContent: str(attributionRaw.utm_content, 120),
    utmTerm: str(attributionRaw.utm_term, 120),
    referrer: str(attributionRaw.referrer, 300),
    landingPage: str(attributionRaw.landing_page, 300),
    language: str(attributionRaw.language, 20),
    partnerFirstName: input.partnerFirstName ?? "",
    partnerLastName: input.partnerLastName ?? "",
    partnerEmail: input.partnerEmail ?? "",
    partnerPhone: partnerPhone?.number ?? "",
    partnerCountry: input.partnerCountry ? countryName(input.partnerCountry) : "",
    partnerCountryCode: input.partnerCountry ?? "",
    partnerConsent: input.partnerConsent ? "yes" : "",
  };

  const webhook = process.env.WAITLIST_WEBHOOK_URL;
  const secret = process.env.WAITLIST_SECRET;

  if (!webhook || !secret) {
    if (process.env.NODE_ENV !== "production") {
      // Local development without a sheet: show the record in the terminal.
      console.info("[waitlist] Not connected to Google Sheets yet. Sign-up:", record);
      return NextResponse.json({ ok: true, firstName: record.firstName, dev: true });
    }
    console.error("[waitlist] WAITLIST_WEBHOOK_URL or WAITLIST_SECRET is missing.");
    return NextResponse.json(
      { ok: false, error: "Sign-ups are temporarily unavailable. Please try again later." },
      { status: 503 }
    );
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, record }),
      redirect: "follow",
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    const data = (await res.json().catch(() => null)) as
      | { ok?: boolean; duplicate?: boolean; duoSaved?: boolean; error?: string }
      | null;

    if (data?.error === "email_conflict") {
      return NextResponse.json(
        { ok: false, error: "One of these email addresses is already registered. Contact hello@biab.ch to link or change your Duo." },
        { status: 409 }
      );
    }

    if (!res.ok || !data?.ok) {
      console.error("[waitlist] Sheet rejected the sign-up:", res.status, data?.error);
      return NextResponse.json(
        { ok: false, error: "We couldn't save your sign-up. Please try again in a moment." },
        { status: 502 }
      );
    }

    if (input.start === "duo" && data.duoSaved !== true) {
      console.error("[waitlist] The sheet script did not confirm both Duo contacts. Update waitlist.gs.");
      return NextResponse.json(
        { ok: false, error: "We couldn't save both Duo contacts. Please try again later." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      ok: true,
      duplicate: data.duplicate === true,
      firstName: record.firstName,
    });
  } catch (error) {
    console.error("[waitlist] Could not reach the sheet:", error);
    return NextResponse.json(
      { ok: false, error: "We couldn't save your sign-up. Please try again in a moment." },
      { status: 502 }
    );
  }
}
