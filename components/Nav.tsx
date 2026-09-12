"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Container from "./Container";

const LINKS = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink bg-paper">
      <Container className="flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          className="font-logo text-xl font-bold uppercase tracking-tight"
          onClick={() => setOpen(false)}
        >
          BIAB
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[15px] font-medium transition-colors duration-150 hover:text-ink ${
                  active ? "text-ink" : "text-mid"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/pricing"
          className="hidden border border-ink bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-colors duration-150 hover:bg-paper hover:text-ink md:inline-flex"
        >
          Get started
        </Link>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 cursor-pointer items-center justify-center md:hidden"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </Container>

      {open && (
        <div className="border-t border-ink bg-paper md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 text-base font-medium text-ink"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/pricing"
              onClick={() => setOpen(false)}
              className="mt-2 border border-ink bg-ink px-5 py-3 text-center text-sm font-semibold text-paper"
            >
              Get started
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}
