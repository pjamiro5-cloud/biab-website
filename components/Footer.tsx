import Link from "next/link";
import Container from "./Container";

const COLUMNS = [
  {
    heading: "Product",
    links: [
      { href: "/how-it-works", label: "How it works" },
      { href: "/pricing", label: "Pricing" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "mailto:hello@biab.ch", label: "Contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-ink">
      <Container className="grid grid-cols-2 gap-10 py-16 md:grid-cols-4 md:py-20">
        <div className="col-span-2 md:col-span-2">
          <span className="font-logo text-xl font-bold uppercase tracking-tight">
            BIAB
          </span>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-mid">
            BIAB — Build something of your own.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.heading}>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-mid">
              {col.heading}
            </h3>
            <ul className="mt-4 space-y-3">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-ink transition-colors duration-150 hover:text-mid"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>

      <Container className="flex flex-col gap-2 border-t border-ink py-6 text-xs text-mid md:flex-row md:items-center md:justify-between">
        <span>&copy; {new Date().getFullYear()} BIAB. All rights reserved.</span>
        <span>Zürich, Switzerland</span>
      </Container>
    </footer>
  );
}
