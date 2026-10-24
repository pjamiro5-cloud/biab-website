import { T } from "@/components/i18n/LocaleProvider";
import { ReactNode } from "react";
import Button from "./Button";
import Container from "./Container";

/** The closing blue glass panel used at the end of every page. */
export default function CtaPanel({
  title,
  text,
  primary = { href: "/waitlist", label: "Join the waitlist" },
  secondary,
}: {
  title: ReactNode;
  text?: ReactNode;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="px-3 pb-3 md:px-6 md:pb-6">
      <div className="glass-stage mx-auto max-w-[1240px] rounded-[32px] md:rounded-[40px]">
        <Container className="py-20 text-center md:py-28">
          <h2 className="mx-auto max-w-3xl font-display text-4xl font-bold leading-[1.02] tracking-tight text-paper [text-wrap:balance] md:text-6xl">
            <T>{title}</T>
          </h2>
          {text && <p className="mx-auto mt-6 max-w-md text-lg text-white/85"><T>{text}</T></p>}
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={primary.href} variant="inverse">
              <T>{primary.label}</T>
            </Button>
            {secondary && (
              <Button href={secondary.href} variant="ghost-inverse">
                <T>{secondary.label}</T>
              </Button>
            )}
          </div>
        </Container>
      </div>
    </section>
  );
}
