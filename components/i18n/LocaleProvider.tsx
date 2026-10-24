"use client";
import { createContext, useContext, type ReactNode } from "react";
import type { Locale } from "@/lib/i18n/routing";
import { translate, type Messages } from "@/lib/i18n/translate";

const LocaleContext = createContext<{ locale: Locale; messages: Messages }>({ locale: "en", messages: {} });
export function LocaleProvider({ locale, messages, children }: { locale: Locale; messages: Messages; children: ReactNode }) {
  return <LocaleContext.Provider value={{ locale, messages }}>{children}</LocaleContext.Provider>;
}
export function useLocale() { return useContext(LocaleContext).locale; }
export function useTranslation() {
  const { messages } = useContext(LocaleContext);
  return (text: string) => translate(messages, text);
}
// Render text only: no additional DOM nodes, so existing layouts stay intact.
export function T({ children }: { children: ReactNode }) {
  const t = useTranslation();
  function localize(value: ReactNode): ReactNode {
    if (typeof value === "string") {
      const leading = /^\s/.test(value) ? " " : "";
      const trailing = /\s$/.test(value) ? " " : "";
      return leading + t(value.trim().replace(/\s+/g, " ")) + trailing;
    }
    if (Array.isArray(value)) return value.map(localize);
    return value;
  }
  return <>{localize(children)}</>;
}
