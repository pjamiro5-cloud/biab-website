import { T } from "@/components/i18n/LocaleProvider";
import Reveal from "@/components/Reveal";

type Item = { title: string; description: string };

function LeadCardMock() {
  return (
    <div className="rounded-2xl border border-ink/15 bg-paper p-4 shadow-[0_10px_30px_-18px_rgba(20,34,90,0.35)]">
      <div className="flex items-center justify-between gap-2">
        <span className="font-display text-sm font-bold tracking-tight"><T>
          Meier Sanitär AG
        </T></span>
        <span className="shrink-0 rounded-full border border-blue px-2 py-0.5 text-[10px] font-bold text-blue"><T>
          SCORE 92
        </T></span>
      </div>
      <p className="mt-2 text-xs text-mid"><T>Zürich, ZH · Sanitär</T></p>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-line">
        <div className="h-full w-[92%] bg-blue" />
      </div>
    </div>
  );
}

function SalesScriptMock() {
  return (
    <div className="rounded-2xl border border-ink/15 bg-paper p-4 shadow-[0_10px_30px_-18px_rgba(20,34,90,0.35)]">
      <p className="text-xs leading-relaxed text-mid"><T>
        &ldquo;Hi Sandra — how does your team handle recurring customer enquiries?
        </T><span className="mock-cursor text-blue">|</span>&rdquo;
      </p>
      <div className="mt-3 flex gap-1.5" aria-hidden="true">
        <span className="h-1.5 w-1.5 bg-blue" />
        <span className="h-1.5 w-1.5 bg-line" />
        <span className="h-1.5 w-1.5 bg-line" />
      </div>
    </div>
  );
}

function CrmPipelineMock() {
  const stages = ["Contacted", "Meeting", "Won"];
  return (
    <div className="rounded-2xl border border-ink/15 bg-paper p-4 shadow-[0_10px_30px_-18px_rgba(20,34,90,0.35)]">
      <div className="flex items-center justify-between">
        {stages.map((s) => (
          <span key={s} className="crm-status text-xs font-semibold text-blue">
            <T>{s}</T>
          </span>
        ))}
      </div>
      <div className="mt-3 flex gap-1" aria-hidden="true">
        <span className="h-1.5 flex-1 bg-blue" />
        <span className="h-1.5 flex-1 bg-blue" />
        <span className="h-1.5 flex-1 bg-line" />
      </div>
    </div>
  );
}

function TemplateLibraryMock() {
  const files = ["Contract.pdf", "Offer.docx", "Follow-up.eml"];
  return (
    <div className="rounded-2xl border border-ink/15 bg-paper p-4 shadow-[0_10px_30px_-18px_rgba(20,34,90,0.35)]">
      <div className="relative h-16">
        {files.map((f, i) => (
          <div
            key={f}
            className="absolute inset-x-0 top-0 rounded-lg border border-line bg-paper px-3 py-2 text-xs font-medium text-mid"
            style={{
              transform: `translateY(${i * 10}px) rotate(${(i - 1) * 2}deg)`,
            }}
          >
            <T>{f}</T>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrainingModuleMock() {
  return (
    <div className="rounded-2xl border border-ink/15 bg-paper p-4 shadow-[0_10px_30px_-18px_rgba(20,34,90,0.35)]">
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-blue">
          <span
            aria-hidden="true"
            className="ml-0.5 h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-blue"
          />
        </span>
        <span className="text-xs font-semibold"><T>
          Module 3 — Closing the deal
        </T></span>
      </div>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-line">
        <div className="h-full w-[64%] bg-blue" />
      </div>
    </div>
  );
}

function SupportChatMock() {
  return (
    <div className="space-y-2 rounded-2xl border border-ink/15 bg-paper p-4 shadow-[0_10px_30px_-18px_rgba(20,34,90,0.35)]">
      <div className="max-w-[85%] rounded-2xl rounded-bl-md border border-line bg-tint px-3 py-2 text-xs text-mid"><T>
        My first client wants a rush delivery — how do I price that?
      </T></div>
      <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md border border-blue-line bg-blue-tint px-3 py-2 text-xs text-ink"><T>
        Add a 20% rush fee. Template is in your Box under Pricing.
      </T></div>
    </div>
  );
}

const MOCKS: Record<string, () => React.ReactElement> = {
  "Qualified opportunities": LeadCardMock,
  "Sales systems": SalesScriptMock,
  "Business tools": CrmPipelineMock,
  Templates: TemplateLibraryMock,
  Training: TrainingModuleMock,
  "Ongoing support": SupportChatMock,
};

export default function ProductDashboard({ items }: { items: readonly Item[] }) {
  return (
    <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[28px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => {
        const Mock = MOCKS[item.title];
        return (
          <Reveal key={item.title} delay={i * 80} className="bg-paper p-8">
            {Mock && <Mock />}
            <h3 className="mt-5 font-display text-xl font-bold tracking-tight">
              <T>{item.title}</T>
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-mid">
              <T>{item.description}</T>
            </p>
          </Reveal>
        );
      })}
    </div>
  );
}
