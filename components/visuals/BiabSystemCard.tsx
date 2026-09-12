function LeadsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="18" cy="8.5" r="2.6" opacity=".45" />
      <rect x="12.5" y="15" width="11" height="10" rx="5.5" opacity=".45" />
      <circle cx="9" cy="7" r="3.6" />
      <rect x="1.5" y="14" width="15" height="12" rx="7.5" />
    </svg>
  );
}

function CrmIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4 5.5v13c0 1.66 3.58 3 8 3s8-1.34 8-3v-13c0 1.66-3.58 3-8 3s-8-1.34-8-3z" />
      <ellipse cx="12" cy="5.5" rx="8" ry="3" />
      <path
        d="M4 11.5c0 1.66 3.58 3 8 3s8-1.34 8-3"
        fill="none"
        stroke="var(--color-paper)"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M5 2h9l5 5v15H5z" />
      <path d="M14 2v5h5" fill="var(--color-paper)" />
      <rect x="7.5" y="11.2" width="9" height="1.6" fill="var(--color-paper)" />
      <rect x="7.5" y="15.2" width="9" height="1.6" fill="var(--color-paper)" />
      <rect x="7.5" y="19.2" width="6" height="1.6" fill="var(--color-paper)" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M2 5h7l2 2h11v13H2z" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M2 4h20v13H9l-5 4v-4H2z" />
      <circle cx="7.5" cy="10.5" r="1.2" fill="var(--color-paper)" />
      <circle cx="12" cy="10.5" r="1.2" fill="var(--color-paper)" />
      <circle cx="16.5" cy="10.5" r="1.2" fill="var(--color-paper)" />
    </svg>
  );
}

function FlowArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      width="36"
      height="20"
      viewBox="0 0 36 20"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path d="M0 10h27" stroke="currentColor" strokeWidth="2" />
      <path
        d="M21 3l9 7-9 7"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="square"
      />
    </svg>
  );
}

const STACK = [
  { Icon: LeadsIcon, label: "Leads" },
  { Icon: CrmIcon, label: "CRM" },
  { Icon: DocumentIcon, label: "Sales Scripts" },
  { Icon: FolderIcon, label: "Templates" },
  { Icon: ChatIcon, label: "Support" },
];

const BAR_HEIGHTS = [4, 7, 9, 13, 17, 22, 28];

const CATEGORIES = ["Ideas", "Tools", "Opportunities", "Real businesses"];

export default function BiabSystemCard() {
  return (
    <div className="relative">
      <p className="mb-8 max-w-[160px] rotate-[-3deg] font-display text-base italic leading-snug text-mid">
        Everything you need.
        <br />
        In one place.
      </p>

      <div className="flex flex-wrap items-end gap-6 lg:flex-nowrap lg:gap-8">
        {/* Fanned stack + box */}
        <div className="shrink-0">
          <div className="relative h-[172px] w-[208px]">
            {STACK.map((item, i) => (
              <div
                key={item.label}
                className="absolute inset-x-0 flex items-center gap-3 border border-line bg-paper px-4 py-3"
                style={{
                  top: i * 32,
                  transform: `translateX(${i * 7}px)`,
                  zIndex: i,
                }}
              >
                <span className="shrink-0 text-blue">
                  <item.Icon />
                </span>
                <span className="text-sm font-semibold text-ink">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
          <div className="relative z-10 -mt-px border border-ink bg-paper px-5 py-3.5">
            <span className="font-logo text-lg font-bold uppercase tracking-tight">
              BIAB
            </span>
            <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-mid">
              Business in a Box
            </p>
          </div>
        </div>

        <FlowArrow className="hidden shrink-0 text-blue lg:block" />

        {/* Chart + client */}
        <div className="flex shrink-0 flex-col gap-5">
          <div className="w-[180px] border border-line bg-paper p-4">
            <p className="text-xs font-semibold leading-snug text-ink">
              From opportunity
              <br />
              to client.
            </p>
            <div className="mt-4 flex h-9 items-end gap-1">
              {BAR_HEIGHTS.map((h, i) => (
                <span
                  key={i}
                  className="w-2 bg-blue-line"
                  style={{ height: `${h}px` }}
                />
              ))}
              <span
                className="mb-1 h-2 w-2 shrink-0 rounded-full bg-blue"
                aria-hidden="true"
              />
            </div>
          </div>

          <FlowArrow className="rotate-90 self-center text-blue" />

          <div className="w-[164px] border border-blue bg-paper p-4">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-paper)"
                strokeWidth="3"
                aria-hidden="true"
              >
                <path d="M5 13l4 4L19 7" strokeLinecap="square" />
              </svg>
            </span>
            <p className="mt-2.5 font-display text-lg font-bold tracking-tight">
              Client
            </p>
            <p className="mt-0.5 text-xs text-mid">
              CHF 2&rsquo;400 <span className="text-line">&middot;&middot;&middot;</span>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 space-y-1">
        {CATEGORIES.map((word) => (
          <p
            key={word}
            className="text-xs font-bold uppercase tracking-[0.16em] text-line"
          >
            {word}
          </p>
        ))}
      </div>
    </div>
  );
}
