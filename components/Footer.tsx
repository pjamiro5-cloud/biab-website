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
    <footer className="bg-blue text-white">
      <Container className="grid grid-cols-2 gap-10 py-16 md:grid-cols-4 md:py-20">
        <div className="col-span-2 md:col-span-2">
          <span className="font-logo text-xl font-bold uppercase tracking-tight text-white">
            BIAB
          </span>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
            BIAB — Build something of your own.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.heading}>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/60">
              {col.heading}
            </h3>
            <ul className="mt-4 space-y-3">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-white transition-colors duration-150 hover:text-white/70"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>

      <Container className="flex flex-col gap-2 border-t border-white/20 py-6 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
        <span>&copy; {new Date().getFullYear()} BIAB. All rights reserved.</span>
        <span>Zürich, Switzerland</span>
      </Container>
    </footer>
  );
}
