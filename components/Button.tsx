import { T } from "@/components/i18n/LocaleProvider";
import Link from "@/components/i18n/LocalizedLink";
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
    "group inline-flex min-h-12 cursor-pointer items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-base font-bold tracking-tight transition-[background-color,color,border-color,transform] duration-150 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue";

  const styles = {
    primary: "bg-ink text-paper border border-ink hover:bg-charcoal hover:border-charcoal",
    secondary:
      "bg-paper/70 text-ink border border-ink/15 backdrop-blur-md hover:border-ink",
    // For use on dark or blue sections.
    inverse: "bg-paper text-ink border border-paper hover:bg-white/85",
    // Secondary action on dark sections — outline only, no fill.
    "ghost-inverse":
      "bg-white/5 text-paper border border-white/40 backdrop-blur-md hover:bg-white/15 hover:border-white",
  }[variant];

  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      <T>{children}</T>
      <span
        aria-hidden="true"
        className="inline-block transition-transform duration-150 group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}
