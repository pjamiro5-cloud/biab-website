const NODES = ["Box", "Leads", "CRM", "Sales", "Client"];

export default function SystemFlow() {
  return (
    <div className="border border-blue-line bg-blue-tint p-6 md:p-8">
      <span className="text-xs font-semibold uppercase tracking-widest text-blue">
        The system
      </span>
      <div className="relative mt-6 pl-1">
        <div className="absolute left-[19px] top-5 bottom-5 w-px bg-blue-line">
          <span
            aria-hidden="true"
            className="flow-pulse absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-blue"
          />
        </div>
        <div className="flex flex-col gap-5">
          {NODES.map((label, i) => (
            <div key={label} className="relative flex items-center gap-4">
              <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center border-2 border-blue bg-paper font-display text-sm font-bold text-blue">
                {i + 1}
              </span>
              <span className="border border-ink bg-paper px-4 py-2.5 font-display text-base font-bold tracking-tight md:text-lg">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
