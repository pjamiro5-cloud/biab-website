"use client";
import Link from "next/link";
import type { ComponentProps } from "react";
import { localizedPath } from "@/lib/i18n/routing";
import { useLocale } from "./LocaleProvider";
export default function LocalizedLink({ href, ...props }: ComponentProps<typeof Link>) {
  const locale = useLocale();
  const localized = typeof href === "string" ? localizedPath(href, locale) : { ...href, pathname: localizedPath(href.pathname ?? "/", locale) };
  return <Link {...props} href={localized} />;
}
