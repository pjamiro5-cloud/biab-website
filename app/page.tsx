import Link from "next/link";
import Container from "@/components/Container";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import BIABSystem from "@/components/visuals/BIABSystem";
import ProcessFlow from "@/components/visuals/ProcessFlow";
import ProductDashboard from "@/components/visuals/ProductDashboard";
import ChaosVsClean from "@/components/visuals/ChaosVsClean";
import BoxCategories from "@/components/visuals/BoxCategories";
import {
  HOW_IT_WORKS,
  WHAT_YOU_GET,
  WEBSITE_BOX_EXAMPLE,
} from "@/lib/content";

export default function Home() {
  return (
    <>
      {/* Hero — tall scroll stage so the box can pack itself as the user scrolls */}
      <section
        className="relative"
        data-biab-scroll-stage
        style={{ minHeight: "calc(100vh + 650px)" }}
      >
        <div className="sticky top-16 flex min-h-[calc(100vh-4rem)] items-center md:top-20 md:min-h-[calc(100vh-5rem)]">
          <div className="mx-auto w-full max-w-[1600px] px-6 py-8 md:px-10 md:py-10 lg:flex lg:items-center lg:gap-12 xl:gap-20">
            <div className="lg:w-[420px] lg:shrink-0 xl:w-[460px]">
              <h1 className="font-display text-[56px] font-bold leading-[0.98] tracking-tight md:text-[84px] lg:text-[64px] xl:text-[76px]">
                Build something of <span className="text-blue">your own.</span>
              </h1>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-mid md:text-xl lg:text-base xl:text-lg">
                BIAB gives you the system, tools and support to start and
                build a real business.
              </p>
              <p className="mt-6 max-w-md text-base font-semibold leading-relaxed">
                Choose a business. Get your setup. Start building.
              </p>

              <ul className="mt-6 space-y-1.5 text-sm font-semibold text-mid">
                <li>No endless research.</li>
                <li>No overpriced coaching.</li>
                <li>No figuring everything out alone.</li>
              </ul>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row lg:flex-col xl:flex-row">
                <Button href="/pricing">Explore BIAB</Button>
                <Button href="/how-it-works" variant="secondary">
                  See how it works
                </Button>
              </div>
              <p className="mt-6 text-sm text-mid">
                Built for people who are ready to do the work.
              </p>
            </div>

            <div className="mt-16 min-w-0 lg:mt-0 lg:flex-1">
              <Reveal>
                <BIABSystem />
              </Reveal>
              <p className="mt-6 text-center text-xs font-semibold uppercase tracking-widest text-mid">
                Scroll to pack your box{" "}
                <span className="text-blue" aria-hidden="true">
                  ↓
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Container>
        <div className="divider" />
      </Container>

      {/* Section 2 — The problem */}
      <section>
        <Container className="grid grid-cols-1 gap-10 py-24 md:grid-cols-[1fr_1.4fr] md:gap-16 md:py-32">
          <h2 className="font-display text-3xl font-bold leading-[1.05] tracking-tight md:text-4xl">
            Starting shouldn&rsquo;t be the hardest part.
          </h2>
          <div className="space-y-5 text-base leading-relaxed text-mid md:text-lg">
            <p>
              There is more information about building a business than ever
              before. And yet starting one still feels unnecessarily
              difficult.
            </p>
            <ul className="space-y-2 border-l border-line pl-6 font-semibold text-ink">
              <li>What should you sell?</li>
              <li>Where do you find customers?</li>
              <li>What do you say to them?</li>
              <li>Which tools do you need?</li>
              <li>How do you actually deliver the service?</li>
            </ul>
            <p>
              You can spend months figuring all of this out yourself. Or you
              can start with a system that already gives you the foundation.
            </p>
            <p className="font-semibold text-ink">That&rsquo;s what BIAB is for.</p>
          </div>
        </Container>
      </section>

      {/* Section 3 — What BIAB is */}
      <section className="bg-tint">
        <Container className="grid grid-cols-1 gap-10 py-24 md:grid-cols-[1fr_1.4fr] md:gap-16 md:py-32">
          <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
            A business you can actually start.
          </h2>
          <div className="space-y-5 text-base leading-relaxed text-mid md:text-lg">
            <p>
              BIAB is not another course telling you how entrepreneurship
              works. It&rsquo;s the infrastructure to start doing it.
            </p>
            <p>
              Each Business Box gives you what you need to turn an idea into
              an operating business.
            </p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 font-semibold text-ink sm:grid-cols-2">
              <li>Your offer.</li>
              <li>Your processes.</li>
              <li>Your sales approach.</li>
              <li>Your tools.</li>
              <li>Your templates.</li>
              <li>Your customer opportunities.</li>
              <li>Your knowledge base.</li>
              <li>Your support.</li>
            </ul>
            <p>
              You still have to build the business. We simply make sure you
              don&rsquo;t have to start from zero.
            </p>
            <Button href="/pricing" variant="secondary" className="mt-4">
              Discover the Boxes
            </Button>
          </div>
        </Container>
      </section>

      {/* Section 4 preview — How it works */}
      <section>
        <Container className="py-24 md:py-32">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
              From idea to execution.
            </h2>
            <Link
              href="/how-it-works"
              className="font-semibold text-ink underline underline-offset-4 transition-colors duration-150 hover:text-mid"
            >
              Full breakdown →
            </Link>
          </div>

          <ProcessFlow steps={HOW_IT_WORKS} />
        </Container>
      </section>

      <Container>
        <div className="divider" />
      </Container>

      {/* Section 5 — What you actually get */}
      <section className="bg-blue-tint">
        <Container className="py-24 md:py-32">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
            <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
              More than information.
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-mid md:text-lg">
              <p>
                Knowing what to do and being able to do it are two different
                things. That&rsquo;s why BIAB doesn&rsquo;t stop at education.
              </p>
              <p>Depending on your Business Box, your setup can include:</p>
            </div>
          </div>

          <div className="mt-12">
            <ProductDashboard items={WHAT_YOU_GET} />
          </div>

          <div className="mt-12 border-t border-ink pt-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-mid">
              Everything exists for one purpose
            </p>
            <p className="mt-3 max-w-2xl font-display text-2xl font-bold leading-tight tracking-tight md:text-3xl">
              Helping you spend less time preparing to build a business and
              more time actually building one.
            </p>
          </div>
        </Container>
      </section>

      {/* Section 6 — Why BIAB */}
      <section className="bg-tint">
        <Container className="grid grid-cols-1 gap-10 py-24 md:grid-cols-[1fr_1.4fr] md:gap-16 md:py-32">
          <h2 className="font-display text-3xl font-bold leading-[1.15] tracking-tight md:text-4xl">
            <span className="text-mid">The internet gives you information.</span>
            <br />
            BIAB gives you a starting point.
          </h2>
          <div className="space-y-5 text-base leading-relaxed text-mid md:text-lg">
            <p>You could learn almost everything inside BIAB somewhere else.</p>
            <ul className="space-y-2 border-l border-line pl-6">
              <li>You could watch hundreds of videos.</li>
              <li>Build your own CRM.</li>
              <li>Find your own leads.</li>
              <li>Write your own scripts.</li>
              <li>Create your own templates.</li>
              <li>Test dozens of sales approaches.</li>
            </ul>
            <p>And eventually build the same infrastructure yourself.</p>
            <p className="font-semibold text-ink">
              BIAB exists because you shouldn&rsquo;t have to. We bring the
              pieces together so you can focus on execution.
            </p>
          </div>
          <div className="md:col-span-2">
            <ChaosVsClean />
          </div>
        </Container>
      </section>

      {/* Section 7 — Fair chance (brand moment) */}
      <section className="bg-ink text-paper">
        <Container className="py-28 md:py-40">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue">
            No network. No big budget. No experience.
          </p>
          <h2 className="mt-6 max-w-2xl font-display text-5xl font-bold leading-[1] tracking-tight md:text-7xl">
            Still a <span className="text-blue">fair chance.</span>
          </h2>
          <div className="mt-10 max-w-xl space-y-4 text-base leading-relaxed text-white/60 md:text-lg">
            <p>
              We believe people who are willing to work should have access to
              the infrastructure they need to compete.
            </p>
            <p>
              BIAB doesn&rsquo;t promise success. It doesn&rsquo;t promise
              you&rsquo;ll become rich. And it won&rsquo;t build the business
              for you.
            </p>
            <p className="font-semibold text-paper">
              What we can give you is a better starting position. What you do
              with it is up to you.
            </p>
          </div>
        </Container>
      </section>

      {/* Section 8 — Community */}
      <section className="bg-tint">
        <Container className="grid grid-cols-1 gap-10 py-24 md:grid-cols-[1fr_1.4fr] md:gap-16 md:py-32">
          <h2 className="font-display text-3xl font-bold leading-[1.05] tracking-tight md:text-4xl">
            Build your business. Not by yourself.
          </h2>
          <div className="space-y-5 text-base leading-relaxed text-mid md:text-lg">
            <p>
              Starting something can feel lonely. Inside BIAB, you&rsquo;re
              surrounded by people doing the same thing.
            </p>
            <ul className="space-y-2 border-l border-line pl-6">
              <li>People finding their first customers.</li>
              <li>People learning how to sell.</li>
              <li>People improving their service.</li>
              <li>People building their first real company.</li>
            </ul>
            <p>
              Ask questions. Share what works. Find people to collaborate
              with. Build together.
            </p>
            <p className="font-semibold text-ink">
              Because having your own business doesn&rsquo;t mean you have to
              figure everything out alone.
            </p>
          </div>
        </Container>
      </section>

      {/* Section 9 — Duos / Teams */}
      <section>
        <Container className="grid grid-cols-1 gap-10 py-24 md:grid-cols-[1fr_1.4fr] md:gap-16 md:py-32">
          <h2 className="font-display text-3xl font-bold leading-[1.05] tracking-tight md:text-4xl">
            Some businesses are better built together.
          </h2>
          <div className="space-y-5 text-base leading-relaxed text-mid md:text-lg">
            <p>
              You don&rsquo;t have to start alone. Build with a friend,
              partner or teammate.
            </p>
            <p>
              One of you might be better at sales. The other might be better
              at delivery. BIAB gives you the same system to work from so you
              can focus on what each of you does best.
            </p>
            <p className="font-display text-2xl font-bold tracking-tight text-ink">
              One business. One system. Built together.
            </p>
          </div>
        </Container>
      </section>

      <Container>
        <div className="divider" />
      </Container>

      {/* Section 10 — The Boxes */}
      <section className="bg-blue-tint">
        <Container className="py-24 md:py-32">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
            <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
              Start with one. Build from there.
            </h2>
            <div className="space-y-5 text-base leading-relaxed text-mid md:text-lg">
              <p>
                Every Business Box focuses on a specific way of making money
                by solving a real problem for businesses or customers.
              </p>
              <p>
                Your first Box gives you the foundation. As your business
                develops, additional Boxes can help you expand your
                capabilities.
              </p>
              <p className="font-semibold text-ink">
                Start with websites. Add SEO. Add content. Add new services.
                Build a stronger company over time.
              </p>
              <p>
                BIAB isn&rsquo;t designed around chasing the next side
                hustle. It&rsquo;s designed around building something that
                can grow.
              </p>
              <Button href="/pricing" className="mt-4">
                View available Boxes
              </Button>
            </div>
          </div>

          <div className="mt-16">
            <BoxCategories />

            <div className="mt-6 border border-blue bg-paper p-8 md:p-10">
              <span className="text-xs font-semibold uppercase tracking-widest text-blue">
                Example — Website Box
              </span>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed">
                {WEBSITE_BOX_EXAMPLE.description}
              </p>
              <p className="mt-4 text-sm font-semibold text-mid">
                {WEBSITE_BOX_EXAMPLE.pricing}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Section 11 — Long term */}
      <section>
        <Container className="grid grid-cols-1 gap-10 py-24 md:grid-cols-[1fr_1.4fr] md:gap-16 md:py-32">
          <h2 className="font-display text-3xl font-bold leading-[1.15] tracking-tight md:text-4xl">
            This isn&rsquo;t about making quick money.
            <br />
            <span className="text-mid">It&rsquo;s about ownership.</span>
          </h2>
          <div className="space-y-5 text-base leading-relaxed text-mid md:text-lg">
            <ul className="space-y-2 border-l border-line pl-6 font-semibold text-ink">
              <li>Your customers.</li>
              <li>Your skills.</li>
              <li>Your relationships.</li>
              <li>Your reputation.</li>
              <li>Your business.</li>
            </ul>
            <p>
              BIAB gives you a starting system. But what you build with it
              belongs to you.
            </p>
            <p className="font-semibold text-ink">
              The goal isn&rsquo;t to stay dependent on BIAB forever. The
              goal is to help you build something valuable enough that you
              have options.
            </p>
          </div>
        </Container>
      </section>

      {/* Section 12 — Reality / honesty */}
      <section className="bg-charcoal text-paper">
        <Container className="grid grid-cols-1 gap-10 py-24 md:grid-cols-[1fr_1.4fr] md:gap-16 md:py-32">
          <h2 className="font-display text-3xl font-bold leading-[1.05] tracking-tight md:text-4xl">
            We won&rsquo;t sell you a fantasy.
          </h2>
          <div className="space-y-5 text-base leading-relaxed text-white/70 md:text-lg">
            <p>
              There is no guaranteed revenue. There is no magic script. There
              is no AI tool that builds a successful company while you
              sleep.
            </p>
            <p>
              You&rsquo;ll have to contact people. You&rsquo;ll hear no.
              You&rsquo;ll make mistakes. You&rsquo;ll have to improve.
            </p>
            <p className="text-paper">
              BIAB simply removes many of the unnecessary obstacles between
              wanting to start and actually starting.
            </p>
            <p className="font-semibold text-paper">
              If you&rsquo;re looking for passive income without effort, BIAB
              probably isn&rsquo;t for you. If you&rsquo;re ready to build,
              it might be.
            </p>
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="bg-ink text-paper">
        <Container className="py-24 md:py-32">
          <h2 className="max-w-2xl font-display text-5xl font-bold leading-[1.02] tracking-tight md:text-6xl">
            You don&rsquo;t need another business idea.
            <br />
            You need a place to start.
          </h2>
          <p className="mt-6 max-w-md text-lg text-white/60">
            Choose your Business Box. Get your system. Build something of
            your own.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href="/pricing" variant="inverse">
              Start with BIAB
            </Button>
            <Button href="/pricing" variant="ghost-inverse">
              Explore the Boxes
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
