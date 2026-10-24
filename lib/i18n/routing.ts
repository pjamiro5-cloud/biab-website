export const locales = ["de", "en", "fr", "it"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const languageCookie = "biab-language";
export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
export function stripLocale(path: string) {
  return path.replace(/^\/(de|en|fr|it)(?=\/|[?#]|$)/, "") || "/";
}
export function localizedPath(path: string, locale: Locale): string {
  if (!path.startsWith("/") || path.startsWith("//") || (path === "/api" || path.startsWith("/api/"))) return path;
  const stripped = stripLocale(path);
  return `/${locale}${stripped === "/" ? "" : stripped}`;
}
export function preferredLocale(header: string | null, cookie?: string): Locale {
  if (cookie && isLocale(cookie)) return cookie;
  const preferences = (header ?? "").split(",").map((part, index) => {
    const [tag, ...params] = part.trim().split(";");
    const quality = params.find(p => p.trim().startsWith("q="));
    const q = quality ? Number(quality.trim().slice(2)) : 1;
    return { language: tag.toLowerCase().split("-")[0], q, index };
  }).filter(p => Number.isFinite(p.q) && p.q > 0 && p.q <= 1)
    .sort((a, b) => b.q - a.q || a.index - b.index);
  return preferences.find(p => isLocale(p.language))?.language as Locale ?? defaultLocale;
}
