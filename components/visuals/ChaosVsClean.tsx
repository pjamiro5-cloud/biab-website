const CHAOS_TAGS = [
  { label: "YouTube tutorials", rotate: -6, x: "2%", y: "2%" },
  { label: "Random Notion doc", rotate: 4, x: "40%", y: "0%" },
  { label: "sales_script_v3_FINAL.docx", rotate: -3, x: "10%", y: "34%" },
  { label: "17 browser tabs open", rotate: 7, x: "48%", y: "40%" },
  { label: "“how to find leads” — Google", rotate: -8, x: "18%", y: "66%" },
  { label: "old-crm-template.xlsx", rotate: 5, x: "0%", y: "92%" },
];

const CLEAN_ROWS = ["Leads", "CRM", "Templates", "Support"];

export default function ChaosVsClean() {
  return (
    <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8">
      <div>
        <span className="text-xs font-semibold uppercase tracking-widest text-mid">
          Without BIAB
        </span>
        <div className="relative mt-4 h-72 border border-line bg-tint">
          {CHAOS_TAGS.map((tag) => (
            <span
              key={tag.label}
              className="absolute border border-line bg-paper px-3 py-1.5 text-xs font-medium text-mid shadow-[2px_2px_0_0_var(--color-line)]"
              style={{
                left: tag.x,
                top: tag.y,
                transform: `rotate(${tag.rotate}deg)`,
              }}
            >
              {tag.label}
            </span>
          ))}
        </div>
      </div>

      <div>
        <span className="text-xs font-semibold uppercase tracking-widest text-blue">
          With BIAB
        </span>
        <div className="mt-4 h-72 border border-blue bg-blue-tint p-6">
          <span className="font-display text-sm font-bold tracking-tight">
            BIAB Workspace
          </span>
          <div className="mt-4 space-y-2">
            {CLEAN_ROWS.map((row) => (
              <div
                key={row}
                className="flex items-center justify-between border border-blue-line bg-paper px-3 py-2.5 text-sm font-semibold"
              >
                <span>{row}</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-blue"
                  aria-hidden="true"
                >
                  <path d="M5 13l4 4L19 7" strokeLinecap="square" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
