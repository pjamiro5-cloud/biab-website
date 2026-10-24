import { T } from "@/components/i18n/LocaleProvider";
import Link from "@/components/i18n/LocalizedLink";
import Container from "@/components/Container";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import BIABSystem from "@/components/visuals/BIABSystem";
import HeroProduct from "@/components/visuals/HeroProduct";
import ProcessFlow from "@/components/visuals/ProcessFlow";
import ProductDashboard from "@/components/visuals/ProductDashboard";
import ChaosVsClean from "@/components/visuals/ChaosVsClean";
import BoxCategories from "@/components/visuals/BoxCategories";
import WaitlistSection from "@/components/WaitlistSection";
import { DIVISION, FACTS, PROBLEM_AREAS, HOW_IT_WORKS, MILESTONES, WHAT_YOU_GET } from "@/lib/content";

export default function Home() {
  return (
    <>
      {/* 1 — Hero: what you do, for whom, what you get. */}
      <section className="hero-glow -mt-[68px] pt-[68px] md:-mt-[76px] md:pt-[76px]">
        <Container className="pb-10 pt-14 text-center md:pb-14 md:pt-20">
          <Link
            href="#waitlist"
            className="glass mx-auto inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-ink transition-colors duration-150 hover:text-blue"
          ><T>
            Founding member price · Waitlist open until 31 December
          </T></Link>

          <h1 className="mx-auto mt-7 max-w-4xl font-display text-[44px] font-bold leading-[1] tracking-[-0.03em] sm:text-[60px] md:text-[80px]"><T>
            Everything you need to start your own </T><span className="text-blue"><T>AI automation business.</T></span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-mid md:text-xl"><T>
            No blank page, no endless research. You get working AI automation systems, Swiss business leads, sales scripts, a CRM and step-by-step training. All in one box, so you can finally stop planning and start selling.
          </T></p>

          <div className="mx-auto mt-9 flex max-w-sm flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:items-center">
            <Button href="#waitlist" className="w-full sm:w-auto"><T>Join the waitlist</T></Button>
            <Button href="/how-it-works" variant="secondary" className="w-full sm:w-auto"><T>
              How it works
            </T></Button>
          </div>

          <p className="mt-5 text-sm font-medium text-mid"><T>
            Free to join · Founding members pay CHF 250 instead of 300
          </T></p>
        </Container>

        <div className="mx-auto w-full max-w-[1240px] px-3 md:px-6">
          <Reveal>
            <HeroProduct />
          </Reveal>
        </div>
      </section>

      {/* 2 — Facts strip: the numbers that define the offer. */}
      <section>
        <Container className="py-16 md:py-20">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
            {FACTS.map((fact) => (
              <div key={fact.value} className="flex flex-col-reverse justify-end border-l-2 border-blue pl-4">
                <dt className="mt-2 text-sm leading-snug text-mid"><T>{fact.label}</T></dt>
                <dd className="font-display text-4xl font-bold tracking-tight md:text-5xl">
                  <T>{fact.value}</T>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <Container>
        <div className="divider" />
      </Container>

      {/* 3 — The business model, step by step. */}
      <section>
        <Container className="py-24 md:py-32">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-blue"><T>
                How you make money
              </T></p>
              <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl"><T>
                From first email to paid project.
              </T></h2>
              <p className="mt-5 text-base leading-relaxed text-mid md:text-lg"><T>
                You don&rsquo;t have to invent a business model. This one is
                already mapped out — you run it.
              </T></p>
            </div>
            <Link
              href="/how-it-works"
              className="inline-block self-start py-2 font-semibold text-ink underline underline-offset-4 transition-colors duration-150 hover:text-mid"
            ><T>
              Full breakdown →
            </T></Link>
          </div>

          <ProcessFlow steps={HOW_IT_WORKS} />
        </Container>
      </section>

      {/* 4 — What the systems solve for clients (problems only, no internals). */}
      <section className="hero-glow">
        <Container className="py-24 md:py-32">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue"><T>
              What you sell
            </T></p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight [text-wrap:balance] md:text-5xl"><T>
              Problems almost every small business has.
            </T></h2>
            <p className="mt-5 text-base leading-relaxed text-mid md:text-lg"><T>
              You don&rsquo;t sell &ldquo;AI&rdquo;. You sell a solution to a problem the owner
              already feels every week. Three examples of what BIAB&rsquo;s systems take care of:
            </T></p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
            {PROBLEM_AREAS.map((area, i) => (
              <Reveal key={area.title} delay={i * 80} className="glass flex flex-col rounded-[28px] p-7 md:p-8">
                <h3 className="font-display text-2xl font-bold tracking-tight [text-wrap:balance]">
                  <T>{area.title}</T>
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-mid"><T>{area.problem}</T></p>
                <div className="mt-5 flex-1 rounded-2xl bg-blue-tint p-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-blue"><T>With the system</T></p>
                  <p className="mt-1.5 text-sm font-medium leading-relaxed text-ink"><T>{area.result}</T></p>
                </div>
                <p className="mt-5 text-xs font-semibold text-mid"><T>{area.industries}</T></p>
              </Reveal>
            ))}
          </div>

          <p className="mt-10 max-w-2xl text-base font-semibold leading-relaxed text-ink"><T>
            A clear problem. A clear offer. Useful in many industries, and simple to explain.
          </T></p>
        </Container>
      </section>

      {/* 3b — Who does what: working systems, a clear plan, then independence. */}
      <section className="px-3 pb-16 md:px-6 md:pb-24">
        <div className="glass-stage mx-auto max-w-[1240px] rounded-[32px] md:rounded-[40px]">
          <Container className="py-16 md:py-24">
            <div className="max-w-2xl text-paper">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/80"><T>
                How the setup works
              </T></p>
              <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight [text-wrap:balance] md:text-5xl"><T>
                Working systems. A clear plan. Then it&rsquo;s yours.
              </T></h2>
              <p className="mt-5 text-base leading-relaxed text-white/85 md:text-lg"><T>
                You don&rsquo;t start from a blank page and you don&rsquo;t have to build anything
                from scratch. You get systems that already work, and you learn how to install them
                for your clients.
              </T></p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-[1.25fr_1fr]">
              <Reveal className="glass-strong rounded-[28px] p-7 md:p-9">
                <p className="text-xs font-semibold uppercase tracking-widest text-blue"><T>BIAB gives you</T></p>
                <ul className="mt-5 space-y-3.5">
                  {DIVISION.biab.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-base leading-snug text-ink">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="mt-1 shrink-0 text-blue" aria-hidden="true"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      <span><T>{item}</T></span>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={100} className="glass rounded-[28px] p-7 md:p-9">
                <p className="text-xs font-semibold uppercase tracking-widest text-mid"><T>You do</T></p>
                <ul className="mt-5 space-y-3.5">
                  {DIVISION.you.map((item, i) => (
                    <li key={item} className="flex items-start gap-3 text-base leading-snug text-ink">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-bold text-paper">
                        <T>{i + 1}</T>
                      </span>
                      <span><T>{item}</T></span>
                    </li>
                  ))}
                </ul>
                <p className="mt-8 border-t border-ink/10 pt-5 text-sm font-semibold leading-relaxed text-ink"><T>
                  The goal: you become completely independent. BIAB is where you finally start.
                </T></p>
              </Reveal>
            </div>
          </Container>
        </div>
      </section>

      {/* 5 — What's in the box (scroll-packing animation). */}
      <section className="relative biab-hero-stage" data-biab-scroll-stage>
        <div className="biab-hero-content">
          <Container className="pt-14 text-center md:pt-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue"><T>
              Your Business Box
            </T></p>
            <h2 className="mx-auto mt-4 max-w-4xl font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl"><T>
              Everything you need. All in one place.
            </T></h2>
          </Container>
          <div className="mx-auto w-full max-w-[920px] px-6 pb-16 pt-6 md:px-10">
            <BIABSystem scrollDistance={420} />
            <p className="mt-4 text-center text-xs font-semibold uppercase tracking-widest text-mid"><T>
              Scroll to pack your box</T><T>{" "}</T>
              <span className="text-blue" aria-hidden="true">
                ↓
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* 6 — What you actually get. */}
      <section className="bg-blue-tint">
        <Container className="py-24 md:py-32">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
            <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl"><T>
              More than information.
            </T></h2>
            <p className="text-base leading-relaxed text-mid md:text-lg"><T>
              Knowing what to do and being able to do it are two different
              things. That&rsquo;s why BIAB doesn&rsquo;t stop at education —
              you get the working parts of the business.
            </T></p>
          </div>

          <div className="mt-12">
            <ProductDashboard items={WHAT_YOU_GET} />
          </div>
        </Container>
      </section>

      {/* 7 — Why BIAB vs. doing it all yourself. */}
      <section className="bg-tint">
        <Container className="grid grid-cols-1 gap-10 py-24 md:grid-cols-[1fr_1.4fr] md:gap-16 md:py-32">
          <h2 className="font-display text-3xl font-bold leading-[1.15] tracking-tight md:text-4xl">
            <span className="text-mid"><T>The internet gives you information.</T></span>
            <br /><T>
            BIAB gives you a starting point.
          </T></h2>
          <div className="space-y-5 text-base leading-relaxed text-mid md:text-lg">
            <p><T>
              You could watch hundreds of videos, build your own CRM, find
              your own leads and write your own scripts. And eventually end up
              with the same setup.
            </T></p>
            <p className="font-semibold text-ink"><T>
              BIAB exists so you don&rsquo;t have to. We bring the pieces
              together so you can focus on execution.
            </T></p>
          </div>
          <div className="md:col-span-2">
            <ChaosVsClean />
          </div>
        </Container>
      </section>

      {/* 8 — Fair chance (brand moment). */}
      <section className="bg-ink text-paper">
        <Container className="py-28 md:py-40">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue"><T>
            No network. No big budget. No experience.
          </T></p>
          <h2 className="mt-6 max-w-2xl font-display text-5xl font-bold leading-[1] tracking-tight md:text-7xl"><T>
            Still a </T><span className="text-blue"><T>fair chance.</T></span>
          </h2>
          <div className="mt-10 max-w-xl space-y-4 text-base leading-relaxed text-white/65 md:text-lg">
            <p><T>
              We believe people who are willing to work should have access to
              the infrastructure they need to compete.
            </T></p>
            <p className="font-semibold text-paper"><T>
              We can give you a better starting position. What you do with it
              is up to you.
            </T></p>
          </div>
        </Container>
      </section>

      {/* 9 — Not alone: community and Duos. */}
      <section className="hero-glow">
        <Container className="py-24 md:py-32">
          <h2 className="max-w-2xl font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl"><T>
            Build your business. Not by yourself.
          </T></h2>
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
            <Reveal className="glass rounded-[28px] p-8 md:p-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-blue"><T>Community</T></p>
              <h3 className="mt-4 font-display text-2xl font-bold tracking-tight"><T>
                People doing the same thing.
              </T></h3>
              <p className="mt-4 text-base leading-relaxed text-mid"><T>
                Others finding their first clients, learning to sell and
                improving their service. Ask questions, share what works,
                celebrate the first reply and the first contract.
              </T></p>
            </Reveal>
            <Reveal delay={100} className="glass rounded-[28px] p-8 md:p-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-blue"><T>Duo</T></p>
              <h3 className="mt-4 font-display text-2xl font-bold tracking-tight"><T>
                Start with a friend.
              </T></h3>
              <p className="mt-4 text-base leading-relaxed text-mid"><T>
                One of you sells, the other builds. Same system, 250 new leads per month shared between you,
                split by skill. Founding members pay CHF 200 per person instead of CHF 250.
              </T></p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 10 — Honesty + realistic timeline. */}
      <section className="bg-charcoal text-paper">
        <Container className="grid grid-cols-1 gap-12 py-24 md:grid-cols-[1fr_1.3fr] md:gap-16 md:py-32">
          <div>
            <h2 className="font-display text-3xl font-bold leading-[1.05] tracking-tight md:text-4xl"><T>
              We won&rsquo;t sell you a fantasy.
            </T></h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-white/70 md:text-lg">
              <p><T>
                No guaranteed revenue. No magic script. You&rsquo;ll contact
                people, hear no, make mistakes and improve.
              </T></p>
              <p className="font-semibold text-paper"><T>
                If you want passive income without effort, BIAB isn&rsquo;t
                for you. If you&rsquo;re ready to build, it might be.
              </T></p>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/55"><T>
              What progress actually looks like
            </T></p>
            <ol className="mt-5 divide-y divide-white/10 border-y border-white/10">
              {MILESTONES.map((m, i) => (
                <li key={m.title} className="grid grid-cols-[44px_1fr] gap-x-4 py-5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/25 text-sm font-bold text-paper">
                    <T>{i + 1}</T>
                  </span>
                  <div>
                    <p className="font-display text-lg font-bold tracking-tight text-paper"><T>{m.title}</T></p>
                    <p className="mt-1 text-sm leading-relaxed text-white/65"><T>{m.text}</T></p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-xs leading-relaxed text-white/55"><T>
              How fast you move through these steps depends on your time, effort and market. We
              don&rsquo;t promise income.
            </T></p>
          </div>
        </Container>
      </section>

      {/* 11 — AI automation systems. Ownership. */}
      <section>
        <Container className="grid grid-cols-1 gap-10 py-24 md:grid-cols-[1fr_1.4fr] md:gap-16 md:py-32">
          <h2 className="font-display text-3xl font-bold leading-[1.15] tracking-tight md:text-4xl"><T>
            Start with AI automation.
            </T><br />
            <span className="text-mid"><T>Build from there.</T></span>
          </h2>
          <div className="space-y-5 text-base leading-relaxed text-mid md:text-lg">
            <p><T>
              AI automation systems are what you can sell with BIAB. Your
              membership brings those systems together with leads, sales
              resources, a CRM and training to help you build your business.
            </T></p>
            <BoxCategories />
            <p className="font-semibold text-ink"><T>
              Your clients, your skills, your reputation — what you build
              belongs to you. The goal isn&rsquo;t to keep you dependent on
              BIAB. It&rsquo;s to build something that gives you options.
            </T></p>
          </div>
        </Container>
      </section>

      {/* Final — the waitlist. */}
      <WaitlistSection />
    </>
  );
}
