import { localizeMetadata } from "@/lib/i18n/metadata";
import { T } from "@/components/i18n/LocaleProvider";
import type { Metadata } from "next";
import Container from "@/components/Container";
import CtaPanel from "@/components/CtaPanel";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { HOW_IT_WORKS, LAUNCH } from "@/lib/content";

const baseMetadata: Metadata = {
  title: "How it works",
  description:
    "Get your leads, reach out, close the project, deliver and get paid. The full BIAB process, step by step.",
};

export default function HowItWorksPage() {
  return (
    <>
      <PageHero eyebrow="Four steps, every month" title="From first email to paid project.">
        <p><T>
          Every BIAB business runs the same loop, Solo or as a Duo. Here is what each step looks
          like.
        </T></p>
      </PageHero>

      <section className="px-3 md:px-6">
        <div className="glass-stage mx-auto max-w-[1240px] rounded-[32px] md:rounded-[40px]">
          <Container className="py-12 md:py-20">
            <ol className="relative grid grid-cols-1 gap-4 md:gap-5">
              {HOW_IT_WORKS.map((item, i) => (
                <li key={item.step}>
                  <Reveal
                    delay={i * 80}
                    className="glass-strong grid grid-cols-1 gap-4 rounded-[28px] p-7 md:grid-cols-[140px_1fr] md:gap-10 md:p-10"
                  >
                    <span className="font-display text-6xl font-bold leading-none tracking-tight text-blue md:text-7xl">
                      <T>{item.step}</T>
                    </span>
                    <div className="max-w-2xl">
                      <h2 className="font-display text-2xl font-bold tracking-tight md:text-4xl">
                        <T>{item.title}</T>
                      </h2>
                      <p className="mt-3 text-base leading-relaxed text-mid md:text-lg">
                        <T>{item.description}</T>
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </Container>
        </div>
      </section>

      <section>
        <Container className="py-20 text-center md:py-28">
          <p className="mx-auto max-w-2xl font-display text-3xl font-bold tracking-tight [text-wrap:balance] md:text-4xl"><T>
            Simple idea. Real execution.
          </T></p>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-mid md:text-lg"><T>
            Then repeat with next month&rsquo;s leads. That&rsquo;s the whole loop.
          </T></p>
        </Container>
      </section>

      <CtaPanel
        title="Ready to start the loop?"
        text={`BIAB opens on ${LAUNCH.label}. Join the waitlist to be first in.`}
        secondary={{ href: "/pricing", label: "See pricing" }}
      />
    </>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return localizeMetadata(locale, "/how-it-works", baseMetadata);
}
