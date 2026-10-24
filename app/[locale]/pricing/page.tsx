import { localizeMetadata } from "@/lib/i18n/metadata";
import { T } from "@/components/i18n/LocaleProvider";
import type { Metadata } from "next";
import Link from "@/components/i18n/LocalizedLink";
import Container from "@/components/Container";
import Button from "@/components/Button";
import CtaPanel from "@/components/CtaPanel";
import PageHero from "@/components/PageHero";
import { FAQS, LAUNCH, PLANS, PLAN_FEATURES } from "@/lib/content";

const baseMetadata: Metadata = {
  title: "Pricing",
  description:
    "Sell AI automation systems with BIAB: Founding members pay CHF 250/month Solo or CHF 200/person/month as a Duo. 150 new scored leads per month with Solo or 250 as a Duo, sales system, tools and community. Cancel anytime.",
};

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      className="mt-0.5 shrink-0 text-blue"
      aria-hidden="true"
    >
      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PricingPage() {
  return (
    <>
      <PageHero eyebrow={`Prices at launch · ${LAUNCH.label}`} title="Simple pricing. No games.">
        <p><T>
          Starting your first business is uncertain enough. Pricing shouldn&rsquo;t be. Both plans
          include all systems, tools and training. Solo gets 150 new leads per month; Duo gets 250 shared between two people.
        </T></p>
      </PageHero>

      <section className="px-3 md:px-6">
        <div className="glass-stage mx-auto max-w-[1240px] rounded-[32px] px-4 py-10 sm:px-8 md:rounded-[40px] md:py-16">
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 md:grid-cols-2">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`${plan.highlight ? "glass-strong" : "glass"} flex flex-col rounded-[28px] p-8 md:p-10`}
              >
                <p className="mb-4 self-start rounded-full border border-blue/15 bg-blue-tint px-3 py-1 text-xs font-semibold text-blue"><T>Founding member price</T></p>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="font-display text-2xl font-bold tracking-tight"><T>{plan.name}</T></h2>
                  {plan.highlight && (
                    <span className="rounded-full bg-blue px-3 py-1 text-xs font-semibold text-paper"><T>
                      Save CHF 100/month together
                    </T></span>
                  )}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-mid md:min-h-[4.875em]"><T>{plan.tagline}</T></p>

                <p className="mt-8 text-lg text-mid"><del><T>{plan.regularPrice}</T></del></p>
                <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="font-display text-5xl font-bold tracking-tight md:text-6xl">
                    <T>{plan.price}</T>
                  </span>
                  <span className="text-sm text-mid"><T>{plan.unit}</T></span>
                </div>

                <ul className="mt-8 flex-1 space-y-3.5">
                  {[plan.leadFeature, ...PLAN_FEATURES].map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <CheckIcon />
                      <span><T>{feature}</T></span>
                    </li>
                  ))}
                  {plan.name === "Duo" && (
                    <li className="flex items-start gap-3 text-sm font-semibold">
                      <CheckIcon />
                      <span><T>Two seats with full access to leads and tools</T></span>
                    </li>
                  )}
                </ul>

                <Button
                  href="/waitlist"
                  variant={plan.highlight ? "primary" : "secondary"}
                  className="mt-10 w-full"
                ><T>
                  Secure my founding price
                </T></Button>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-white/85"><T>
            Founding member prices are for everyone on the waitlist who starts by 31 January 2027. They stay as long as your membership does.
          </T></p>
        </div>
      </section>

      <section>
        <Container className="grid grid-cols-1 gap-10 py-20 md:grid-cols-[1fr_1.6fr] md:gap-16 md:py-28">
          <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl"><T>
            Questions worth asking
          </T></h2>
          <div>
            <div className="divide-y divide-line border-t border-ink">
              {FAQS.slice(0, 4).map((item) => (
                <div key={item.q} className="py-6">
                  <h3 className="font-semibold"><T>{item.q}</T></h3>
                  <p className="mt-2 text-sm leading-relaxed text-mid md:text-base">
                    <T>{item.a}</T>
                  </p>
                </div>
              ))}
            </div>
            <Link
              href="/faq"
              className="mt-8 inline-block font-semibold text-ink underline underline-offset-4 transition-colors duration-150 hover:text-mid"
            ><T>
              See all questions →
            </T></Link>
          </div>
        </Container>
      </section>

      <CtaPanel
        title="Your first clients are already out there."
        text={`The waitlist is open until ${LAUNCH.waitlistCloses}.`}
      />
    </>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return localizeMetadata(locale, "/pricing", baseMetadata);
}
