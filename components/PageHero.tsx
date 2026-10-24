import { T } from "@/components/i18n/LocaleProvider";
import { ReactNode } from "react";
import Container from "./Container";

/** Shared page header: soft glow behind the floating nav, centred title. */
export default function PageHero({
  eyebrow,
  title,
  children,
  align = "center",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  children?: ReactNode;
  align?: "center" | "left";
}) {
  const centred = align === "center";
  return (
    <section className="hero-glow -mt-[68px] pt-[68px] md:-mt-[76px] md:pt-[76px]">
      <Container className={`pb-14 pt-16 md:pb-20 md:pt-24 ${centred ? "text-center" : ""}`}>
        {eyebrow && (
          <p className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-ink">
            <T>{eyebrow}</T>
          </p>
        )}
        <h1
          className={`${eyebrow ? "mt-7" : ""} ${centred ? "mx-auto" : ""} max-w-4xl font-display text-[44px] font-bold leading-[0.98] tracking-[-0.03em] [text-wrap:balance] md:text-[76px]`}
        >
          <T>{title}</T>
        </h1>
        {children && (
          <div className={`mt-6 max-w-2xl text-lg leading-relaxed text-mid ${centred ? "mx-auto" : ""}`}>
            <T>{children}</T>
          </div>
        )}
      </Container>
    </section>
  );
}
