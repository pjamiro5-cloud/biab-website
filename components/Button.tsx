import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "inverse" | "ghost-inverse";
  className?: string;
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const base =
    "group inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-bold tracking-tight transition-colors duration-150 cursor-pointer";

  const styles = {
    primary: "bg-ink text-paper border border-ink hover:bg-paper hover:text-ink",
    secondary: "bg-paper text-ink border border-ink hover:bg-ink hover:text-paper",
    // For use on dark (bg-ink) sections.
    inverse: "bg-paper text-ink border border-paper hover:bg-ink hover:text-paper",
    // Secondary action on dark sections — outline only, no fill.
    "ghost-inverse":
      "bg-transparent text-paper border border-paper hover:bg-paper hover:text-ink",
  }[variant];

  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
      <span
        aria-hidden="true"
        className="inline-block transition-transform duration-150 group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}
