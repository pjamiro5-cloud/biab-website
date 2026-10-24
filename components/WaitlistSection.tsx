import { T } from "@/components/i18n/LocaleProvider";
import WaitlistForm from "./WaitlistForm";
import { LAUNCH } from "@/lib/content";

const NEXT_STEPS = [
  { when: "Now", text: "Join the waitlist. Free and without commitment." },
  { when: "Every two weeks", text: "Updates on what we're building, first insights and practical tips on AI automation." },
  { when: "December", text: "You get the first training module and can start learning." },
  { when: LAUNCH.label, text: "BIAB opens. Start at the founding member price." },
];

/** Blue glass panel with the waitlist form — used on the home and waitlist pages. */
export default function WaitlistSection({
  id = "waitlist",
  title = "Become a founding member.",
}: {
  id?: string;
  title?: string;
}) {
  return (
    <section id={id} className="scroll-mt-24 px-3 pb-3 md:px-6 md:pb-6">
      <div className="glass-stage mx-auto max-w-[1240px] rounded-[32px] md:rounded-[40px]">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-12 sm:px-8 md:px-10 md:py-20 lg:grid-cols-[1fr_1.15fr] lg:grid-rows-[auto_1fr] lg:gap-x-14 lg:gap-y-10">
          <div className="text-paper lg:col-start-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/80"><T>
              Launch · </T><T>{LAUNCH.label}</T>
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-[1.02] tracking-tight [text-wrap:balance] md:text-6xl">
              <T>{title}</T>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-white/85"><T>
              Join the waitlist before 31 December and you get three things: the founding member price for as long as you stay, our first training module in December, and an email every two weeks on how BIAB is coming together.
            </T></p>
          </div>

          <div className="min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <WaitlistForm />
          </div>

          <div className="text-paper lg:col-start-1 lg:self-start">
            <ol className="space-y-3">
              {NEXT_STEPS.map((s, i) => (
                <li key={s.when} className="glass flex items-start gap-4 rounded-3xl p-4 text-ink">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue text-sm font-bold text-paper">
                    <T>{i + 1}</T>
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-mid"><T>{s.when}</T></p>
                    <p className="mt-1 text-sm leading-relaxed text-ink"><T>{s.text}</T></p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="mt-8 text-sm text-white/85"><T>
              Founding members: CHF 250/month Solo or CHF 200/person/month as a Duo, instead of CHF 300 and CHF 250. Valid if you start by 31 January 2027.
            </T></p>
          </div>
        </div>
      </div>
    </section>
  );
}
