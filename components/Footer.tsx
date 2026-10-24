import { T } from "@/components/i18n/LocaleProvider";
import Link from "@/components/i18n/LocalizedLink";
import { LAUNCH } from "@/lib/content";

const COLUMNS = [
  {
    heading: "Product",
    links: [
      { href: "/how-it-works", label: "How it works" },
      { href: "/pricing", label: "Pricing" },
      { href: "/faq", label: "FAQ" },
      { href: "/waitlist", label: "Waitlist" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "mailto:hello@biab.ch", label: "Contact" },
      { href: "/privacy", label: "Privacy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="px-3 pb-24 pt-3 md:px-6 md:pb-6">
      <div className="glass-strong mx-auto max-w-[1240px] rounded-[32px] md:rounded-[40px]">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-6 py-14 md:grid-cols-4 md:px-10 md:py-16">
          <div className="col-span-2">
            <span className="font-logo text-xl font-bold uppercase tracking-tight"><T>BIAB</T></span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-mid"><T>
              Build your business with AI automation. Leads, sales system and tools — in one box.
            </T></p>
            <Link
              href="/waitlist"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-tint px-4 py-2 text-xs font-semibold text-blue transition-colors duration-150 hover:bg-blue hover:text-paper"
            ><T>
              Launching </T><T>{LAUNCH.label}</T>
            </Link>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-mid"><T>{col.heading}</T></h3>
              <ul className="mt-3 space-y-1">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-block py-1.5 text-sm font-medium text-ink transition-colors duration-150 hover:text-blue"
                    >
                      <T>{link.label}</T>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mx-auto flex max-w-6xl flex-col gap-2 border-t border-ink/10 px-6 py-6 text-xs text-mid md:flex-row md:items-center md:justify-between md:px-10">
          <span><T>&copy; </T><T>{new Date().getFullYear()}</T><T> BIAB. All rights reserved.</T></span>
          <span><T>Zürich, Switzerland</T></span>
        </div>
      </div>
    </footer>
  );
}
