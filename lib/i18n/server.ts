import "server-only";
import type { Locale } from "./routing";
import { translate, type Messages } from "./translate";
export async function getMessages(locale: Locale): Promise<Messages> {
  if (locale === "en") return {};
  return (await import(`./messages/${locale}.json`)).default;
}
export async function getTranslator(locale: Locale) {
  const messages = await getMessages(locale);
  return (text: string) => translate(messages, text);
}
