import type { Metadata } from "next";
import Container from "@/components/Container";
import Button from "@/components/Button";
import { FAQS } from "@/lib/content";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Questions worth asking before you start with BIAB.",
};

export default function FaqPage() {
  return (
    <>
      <section>
        <Container className="grid grid-cols-1 gap-10 py-20 md:grid-cols-[1fr_1.6fr] md:gap-16 md:py-28">
          <h1 className="font-display text-[48px] font-bold leading-[0.98] tracking-tight md:text-[72px]">
            Questions worth asking.
          </h1>

          <div className="divide-y divide-line border-t border-ink">
            {FAQS.map((item) => (
              <details key={item.q} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-semibold marker:content-none">
                  <span className="text-base transition-colors duration-150 group-hover:text-mid md:text-lg">
                    {item.q}
                  </span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="shrink-0 transition-transform duration-150 group-open:rotate-45"
                    aria-hidden="true"
                  >
                    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                  </svg>
                </summary>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-mid md:text-base">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ink text-paper">
        <Container className="py-24 md:py-32">
          <h2 className="max-w-lg font-display text-5xl font-bold leading-[1.02] tracking-tight md:text-6xl">
            Still have a question?
          </h2>
          <p className="mt-4 max-w-sm text-white/60">
            Email us and we&rsquo;ll answer directly.
          </p>
          <div className="mt-8">
            <Button href="mailto:hello@biab.ch" variant="inverse">
              Contact us
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
