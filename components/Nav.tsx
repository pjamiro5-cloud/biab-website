"use client";

import { T } from "@/components/i18n/LocaleProvider";


import Link from "@/components/i18n/LocalizedLink";
import { usePathname } from "next/navigation";
import LanguageSelect from "./i18n/LanguageSelect";
import { stripLocale } from "@/lib/i18n/routing";
import { useTranslation } from "./i18n/LocaleProvider";
import { useState } from "react";

const LINKS = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
];

export default function Nav() {
  const pathname = stripLocale(usePathname());
  const t = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 md:px-6">
      <div className="glass-strong mx-auto w-full max-w-6xl rounded-[22px]">
        <div className="flex h-14 items-center justify-between pl-5 pr-2 md:h-16 md:pl-6">
          <Link
            href="/"
            className="font-logo text-xl font-bold uppercase tracking-tight"
            onClick={() => setOpen(false)}
          ><T>
            BIAB
          </T></Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label={t("Main")}>
            {LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full px-4 py-2 text-[15px] font-medium transition-colors duration-150 hover:text-ink ${
                    active ? "bg-ink/[0.06] text-ink" : "text-mid"
                  }`}
                >
                  <T>{link.label}</T>
                </Link>
              );
            })}
          </nav>

          <Link
            href="/waitlist"
            className="hidden rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-colors duration-150 hover:bg-charcoal active:scale-[0.97] lg:inline-flex"
          ><T>
            Join waitlist
          </T></Link>

          <LanguageSelect />

          <button
            type="button"
            aria-label={t(open ? "Close menu" : "Open menu")}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full lg:hidden"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 8h16M4 16h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>

        {open && (
          <div className="border-t border-ink/10 px-3 pb-3 lg:hidden">
            <nav className="flex flex-col py-2" aria-label={t("Mobile")}>
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-base font-medium text-ink"
                >
                  <T>{link.label}</T>
                </Link>
              ))}
            </nav>
            <Link
              href="/waitlist"
              onClick={() => setOpen(false)}
              className="block rounded-full bg-ink px-5 py-3 text-center text-sm font-semibold text-paper"
            ><T>
              Join waitlist
            </T></Link>
          </div>
        )}
      </div>
    </header>
  );
}
