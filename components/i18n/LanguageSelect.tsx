"use client";
import { usePathname, useRouter } from "next/navigation";
import { isLocale, languageCookie, localizedPath } from "@/lib/i18n/routing";
import { useLocale, useTranslation } from "./LocaleProvider";

export default function LanguageSelect() {
  const locale = useLocale();
  const t = useTranslation();
  const pathname = usePathname();
  const router = useRouter();
  return <div className="relative ml-auto lg:ml-2">
    <select aria-label={t("Language")} value={locale}
      onChange={event => {
        const selected = event.target.value;
        if (!isLocale(selected)) return;
        document.cookie = `${languageCookie}=${selected}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
        window.dispatchEvent(new Event("biab:language-change"));
        router.push(localizedPath(pathname, selected) + location.search + location.hash, { scroll: false });
      }}
      className="min-h-12 w-[7.5rem] cursor-pointer rounded-full border border-ink/10 bg-paper/70 pl-3 pr-2 text-sm font-semibold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue">
      <option value="de" lang="de">Deutsch</option>
      <option value="en" lang="en">English</option>
      <option value="fr" lang="fr">Français</option>
      <option value="it" lang="it">Italiano</option>
    </select>
  </div>;
}
