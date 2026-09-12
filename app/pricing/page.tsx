import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import Button from "@/components/Button";
import { MEMBERSHIP, FAQS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "CHF 300/month for BIAB Membership: your Business Box, tools, resources, training, community and support. No hidden upsells.",
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
      className="mt-0.5 shrink-0"
      aria-hidden="true"
    >
      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PricingPage() {
  return (
    <>
      <section>
        <Container className="py-20 md:py-28">
          <h1 className="max-w-2xl font-display text-[48px] font-bold leading-[0.98] tracking-tight md:text-[80px]">
            Simple pricing. No games.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-mid">
            Starting your first business is already uncertain enough.
            Pricing shouldn&rsquo;t be.
          </p>
        </Container>
      </section>

      <section className="border-y border-ink">
        <Container className="py-20 md:py-28">
          <div className="mx-auto max-w-xl border border-ink bg-tint p-10 md:p-14">
            <h2 className="font-display text-2xl font-bold tracking-tight">
              {MEMBERSHIP.name}
            </h2>

            <div className="mt-8 flex items-baseline gap-2">
              <span className="font-display text-6xl font-bold tracking-tight md:text-7xl">
                {MEMBERSHIP.price}
              </span>
              <span className="text-mid">{MEMBERSHIP.unit}</span>
            </div>

            <ul className="mt-8 space-y-4">
              {MEMBERSHIP.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm">
                  <CheckIcon />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              href="mailto:hello@biab.ch?subject=Starting%20with%20BIAB"
              className="mt-10 w-full"
            >
              Start building
            </Button>

            <p className="mt-6 text-sm text-mid">
              No hidden upsells required to make the basic system usable.
            </p>
          </div>
          <p className="mt-6 text-center text-xs text-mid">
            Specific resources and inclusions may differ between Business
            Boxes.
          </p>
        </Container>
      </section>

      <section className="bg-tint">
        <Container className="grid grid-cols-1 gap-10 py-20 md:grid-cols-[1fr_1.6fr] md:gap-16 md:py-28">
          <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
            Questions worth asking
          </h2>
          <div>
            <div className="divide-y divide-line border-t border-ink">
              {FAQS.slice(0, 4).map((item) => (
                <div key={item.q} className="py-6">
                  <h3 className="font-semibold">{item.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mid md:text-base">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
            <Link
              href="/faq"
              className="mt-8 inline-block font-semibold text-ink underline underline-offset-4 transition-colors duration-150 hover:text-mid"
            >
              See all questions →
            </Link>
          </div>
        </Container>
      </section>

      <section className="bg-ink text-paper">
        <Container className="py-24 md:py-32">
          <h2 className="max-w-xl font-display text-5xl font-bold leading-[1.02] tracking-tight md:text-6xl">
            Choose your Business Box. Get your system.
          </h2>
          <div className="mt-10">
            <Button
              href="mailto:hello@biab.ch?subject=Starting%20with%20BIAB"
              variant="inverse"
            >
              Start now
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
