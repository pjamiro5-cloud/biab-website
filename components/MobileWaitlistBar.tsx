"use client";

import { T } from "@/components/i18n/LocaleProvider";


import Link from "@/components/i18n/LocalizedLink";
import { stripLocale } from "@/lib/i18n/routing";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Phone-only bar at the bottom of the screen (the thumb zone) with the main
 * action. Appears after the first screen and hides while the waitlist form
 * itself is on screen, so it never covers the form it points to.
 */
export default function MobileWaitlistBar() {
  const pathname = stripLocale(usePathname());
  const [scrolled, setScrolled] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const target = document.getElementById("waitlist");
    let observer: IntersectionObserver | undefined;
    if (target) {
      observer = new IntersectionObserver(([entry]) => setFormVisible(entry.isIntersecting), {
        threshold: 0.05,
      });
      observer.observe(target);
    } else {
      setFormVisible(false);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
    };
  }, [pathname]);

  const onWaitlistPage = pathname === "/waitlist" || pathname === "/privacy";
  const show = scrolled && !formVisible && !onWaitlistPage;
  const href = pathname === "/" ? "#waitlist" : "/waitlist";

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-[transform,opacity] duration-300 md:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <div className="glass-strong flex flex-col items-stretch gap-2 rounded-[22px] p-2">
        <p className="text-center text-xs font-semibold leading-snug text-ink"><T>
          Founding price until 31 Dec
          </T>
        </p>
        <Link
          href={href}
          tabIndex={show ? 0 : -1}
          className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-5 text-sm font-bold text-paper active:scale-[0.97]"
        ><T>
          Join the waitlist </T><span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
