import { localizeMetadata } from "@/lib/i18n/metadata";
import { T } from "@/components/i18n/LocaleProvider";
import type { Metadata } from "next";
import Container from "@/components/Container";
import CtaPanel from "@/components/CtaPanel";
import PageHero from "@/components/PageHero";
import { FAQS } from "@/lib/content";

const baseMetadata: Metadata = {
  title: "FAQ",
  description: "Questions worth asking before you start with BIAB.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero title="Questions worth asking.">
        <p><T>Straight answers before you join. If yours isn&rsquo;t here, email us.</T></p>
      </PageHero>

      <section>
        <Container className="pb-24 md:pb-32">
          <div className="mx-auto max-w-3xl space-y-3">
            {FAQS.map((item) => (
              <details
                key={item.q}
                className="group glass rounded-3xl px-6 py-5 md:px-8 md:py-6"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-semibold marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="text-base md:text-lg"><T>{item.q}</T></span>
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink/[0.05] transition-[transform,background-color] duration-200 group-open:rotate-45 group-open:bg-blue group-open:text-paper"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-mid md:text-base">
                  <T>{item.a}</T>
                </p>
              </details>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-3xl text-center text-sm text-mid"><T>
            Still have a question? Email us at</T><T>{" "}</T>
            <span className="select-all font-semibold text-ink"><T>hello@biab.ch</T></span><T> and we&rsquo;ll
            answer directly.
          </T></p>
        </Container>
      </section>

      <CtaPanel
        title="Ready when you are."
        text="Join the waitlist. It's free and doesn't commit you to anything."
        secondary={{ href: "/how-it-works", label: "How it works" }}
      />
    </>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return localizeMetadata(locale, "/faq", baseMetadata);
}
