const CATEGORIES = [
  { label: "Websites", color: "bg-box-websites" },
  { label: "SEO", color: "bg-box-seo" },
  { label: "Content", color: "bg-box-content" },
  { label: "AI Automation", color: "bg-box-ai" },
  { label: "Recruiting", color: "bg-box-recruiting" },
];

export default function BoxCategories() {
  return (
    <div className="flex flex-wrap gap-3">
      {CATEGORIES.map((cat) => (
        <span
          key={cat.label}
          className="inline-flex items-center gap-2 border border-line px-3 py-1.5 text-xs font-semibold text-ink"
        >
          <span className={`h-2.5 w-2.5 shrink-0 ${cat.color}`} aria-hidden="true" />
          {cat.label}
        </span>
      ))}
    </div>
  );
}
