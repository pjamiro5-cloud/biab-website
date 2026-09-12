import Reveal from "@/components/Reveal";

type Item = { title: string; description: string };

function LeadCardMock() {
  return (
    <div className="border border-ink bg-paper p-4">
      <div className="flex items-center justify-between gap-2">
        <span className="font-display text-sm font-bold tracking-tight">
          Meier Sanitär AG
        </span>
        <span className="shrink-0 border border-blue px-2 py-0.5 text-[10px] font-bold text-blue">
          SCORE 92
        </span>
      </div>
      <p className="mt-2 text-xs text-mid">Zürich, ZH · Sanitär</p>
      <div className="mt-3 h-1.5 w-full bg-line">
        <div className="h-full w-[92%] bg-blue" />
      </div>
    </div>
  );
}

function SalesScriptMock() {
  return (
    <div className="border border-ink bg-paper p-4">
      <p className="text-xs leading-relaxed text-mid">
        &ldquo;Hi Sandra — noticed your site hasn&rsquo;t changed since 2019
        <span className="mock-cursor text-blue">|</span>&rdquo;
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
    <div className="border border-ink bg-paper p-4">
      <div className="flex items-center justify-between">
        {stages.map((s) => (
          <span key={s} className="crm-status text-xs font-semibold text-blue">
            {s}
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
    <div className="border border-ink bg-paper p-4">
      <div className="relative h-16">
        {files.map((f, i) => (
          <div
            key={f}
            className="absolute inset-x-0 top-0 border border-line bg-paper px-3 py-2 text-xs font-medium text-mid"
            style={{
              transform: `translateY(${i * 10}px) rotate(${(i - 1) * 2}deg)`,
            }}
          >
            {f}
          </div>
        ))}
      </div>
    </div>
  );
}

function TrainingModuleMock() {
  return (
    <div className="border border-ink bg-paper p-4">
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-blue">
          <span
            aria-hidden="true"
            className="ml-0.5 h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-blue"
          />
        </span>
        <span className="text-xs font-semibold">
          Module 3 — Closing the deal
        </span>
      </div>
      <div className="mt-3 h-1.5 w-full bg-line">
        <div className="h-full w-[64%] bg-blue" />
      </div>
    </div>
  );
}

function SupportChatMock() {
  return (
    <div className="space-y-2 border border-ink bg-paper p-4">
      <div className="max-w-[85%] border border-line bg-tint px-3 py-2 text-xs text-mid">
        My first client wants a rush delivery — how do I price that?
      </div>
      <div className="ml-auto max-w-[85%] border border-blue bg-blue-tint px-3 py-2 text-xs text-ink">
        Add a 20% rush fee. Template is in your Box under Pricing.
      </div>
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
    <div className="grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => {
        const Mock = MOCKS[item.title];
        return (
          <Reveal key={item.title} delay={i * 80} className="bg-paper p-8">
            {Mock && <Mock />}
            <h3 className="mt-5 font-display text-xl font-bold tracking-tight">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-mid">
              {item.description}
            </p>
          </Reveal>
        );
      })}
    </div>
  );
}
