import { T } from "@/components/i18n/LocaleProvider";
/**
 * Hero product preview — a glass "app window" on the blue stage, showing
 * what a BIAB operator actually works with: a ranked lead list, an
 * outreach script, a pipeline and a won project. All data is illustrative.
 */

type Lead = {
  name: string;
  trade: string;
  canton: string;
  score: number;
  status: "New" | "Contacted" | "Meeting";
};

const LEADS: Lead[] = [
  { name: "Meier Sanitär AG", trade: "Sanitär", canton: "ZH", score: 92, status: "Meeting" },
  { name: "Keller Elektro GmbH", trade: "Elektro", canton: "TG", score: 88, status: "Contacted" },
  { name: "Brunner Malerei", trade: "Malerei", canton: "SG", score: 84, status: "New" },
  { name: "Gartenbau Huber", trade: "Garten", canton: "LU", score: 79, status: "New" },
];

const STATUS_STYLES: Record<Lead["status"], string> = {
  New: "bg-ink/[0.06] text-mid",
  Contacted: "bg-blue-tint text-blue",
  Meeting: "bg-blue text-paper",
};

function LeadRow({ lead }: { lead: Lead }) {
  return (
    <li className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-2xl px-3 py-3 sm:grid-cols-[1.4fr_1fr_auto] sm:px-4">
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-ink"><T>{lead.name}</T></p>
        <p className="mt-0.5 text-xs text-mid">
          <T>{lead.trade}</T> · <T>{lead.canton}</T>
        </p>
      </div>
      <div className="hidden items-center gap-3 sm:flex">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink/[0.07]">
          <div className="h-full rounded-full bg-blue" style={{ width: `${lead.score}%` }} />
        </div>
        <span className="w-7 text-right text-xs font-bold tabular-nums text-ink"><T>{lead.score}</T></span>
      </div>
      <span
        className={`justify-self-end rounded-full px-2.5 py-1 text-[11px] font-semibold ${STATUS_STYLES[lead.status]}`}
      >
        <T>{lead.status}</T>
      </span>
    </li>
  );
}

function MainWindow() {
  return (
    <div className="glass-strong rounded-[28px] p-2">
      <div className="flex items-center justify-between px-3 pb-2 pt-1.5">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
        </div>
        <span className="text-[11px] font-semibold uppercase tracking-widest text-mid"><T>
          BIAB · AI Automation
        </T></span>
        <span className="hidden w-12 sm:block" aria-hidden="true" />
      </div>

      <div className="rounded-[22px] bg-paper/90 p-3 sm:p-4">
        <div className="flex items-end justify-between gap-4 px-1 pb-3 sm:px-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-mid"><T>Your leads</T></p>
            <p className="mt-1 font-display text-xl font-bold tracking-tight sm:text-2xl"><T>
              150 new leads this month · Solo
            </T></p>
          </div>
          <span className="hidden shrink-0 rounded-full border border-ink/10 px-3 py-1 text-xs font-semibold text-mid sm:inline-block"><T>
            Sorted by score
          </T></span>
        </div>
        <ul className="divide-y divide-ink/[0.06]">
          {LEADS.map((lead) => (
            <LeadRow key={lead.name} lead={lead} />
          ))}
        </ul>
      </div>
    </div>
  );
}

function ScriptCard() {
  return (
    <div className="glass rounded-3xl p-4">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-mid"><T>Outreach script</T></p>
      <p className="mt-2 text-sm leading-relaxed text-ink"><T>
        &ldquo;Hi Mr. Meier — how does your team handle recurring customer enquiries?
        </T><span className="mock-cursor text-blue">|</span>&rdquo;
      </p>
    </div>
  );
}

function PipelineCard() {
  const stages = [
    { label: "Contacted", value: 18, width: "100%" },
    { label: "Meetings", value: 4, width: "35%" },
    { label: "Won", value: 1, width: "12%" },
  ];
  return (
    <div className="glass rounded-3xl p-4">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-mid"><T>Your pipeline</T></p>
      <div className="mt-3 space-y-2.5">
        {stages.map((s) => (
          <div key={s.label}>
            <div className="flex justify-between text-xs">
              <span className="font-medium text-ink"><T>{s.label}</T></span>
              <span className="font-bold tabular-nums text-ink"><T>{s.value}</T></span>
            </div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-ink/[0.07]">
              <div className="h-full rounded-full bg-blue" style={{ width: s.width }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WonCard() {
  return (
    <div className="glass-strong flex items-center gap-3 rounded-3xl p-4">
      <span
        aria-hidden="true"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue text-paper"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-mid"><T>Project won</T></p>
        <p className="truncate text-sm font-semibold text-ink"><T>AI automation · Meier Sanitär</T></p>
      </div>
      <span className="ml-auto shrink-0 font-display text-lg font-bold tracking-tight text-ink"><T>
        CHF 2&rsquo;400
      </T></span>
    </div>
  );
}

export default function HeroProduct() {
  return (
    <figure className="glass-stage rounded-[32px] px-4 pb-6 pt-8 sm:px-8 md:rounded-[40px] md:px-10 md:pb-12 md:pt-14">
      <div className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-4 lg:grid-cols-[1fr_1.9fr_1fr] lg:gap-5">
        {/* Left column — how you reach out */}
        <div className="hidden space-y-4 pt-16 lg:block">
          <ScriptCard />
          <div className="glass rounded-3xl p-4">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-mid"><T>Every lead includes</T></p>
            <ul className="mt-2 space-y-1.5 text-xs font-medium text-ink">
              <li><T>· Legal name &amp; address</T></li>
              <li><T>· Trade &amp; business purpose</T></li>
              <li><T>· Legal form &amp; canton</T></li>
            </ul>
          </div>
        </div>

        {/* Centre — the lead list */}
        <MainWindow />

        {/* Right column — where it ends up */}
        <div className="space-y-4 lg:pt-8">
          <div className="hidden lg:block">
            <PipelineCard />
          </div>
          <WonCard />
        </div>
      </div>
      <figcaption className="mt-6 text-center text-xs font-medium text-white/80"><T>
        Illustrative preview.
      </T></figcaption>
    </figure>
  );
}
