import { T } from "@/components/i18n/LocaleProvider";
const CATEGORIES = [
  { label: "AI Automation Systems", color: "bg-box-ai", available: true },
];

export default function BoxCategories() {
  return (
    <ul className="flex flex-wrap gap-2.5" aria-label="Business Boxes">
      {CATEGORIES.map((cat) => (
        <li
          key={cat.label}
          className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold ${
            cat.available ? "border-ink text-ink" : "border-line text-mid"
          }`}
        >
          <T>{cat.label}</T>
          <span className={cat.available ? "text-blue" : "text-mid"}>
            <T>{cat.available ? "Available" : "Later"}</T>
          </span>
        </li>
      ))}
    </ul>
  );
}
