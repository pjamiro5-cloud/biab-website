import type { Metadata } from "next";
import { isLocale, locales, localizedPath } from "./routing";
import { getTranslator } from "./server";
export async function localizeMetadata(locale: string, path: string, metadata: Metadata): Promise<Metadata> {
  const lang = isLocale(locale) ? locale : "en";
  const t = await getTranslator(lang);
  return {
    ...metadata,
    ...(typeof metadata.title === "string" ? { title: t(metadata.title) } : {}),
    description: metadata.description ? t(metadata.description) : undefined,
    alternates: {
      canonical: `https://biab.ch${localizedPath(path, lang)}`,
      languages: Object.fromEntries([...locales.map(l => [l, `https://biab.ch${localizedPath(path, l)}`]), ["x-default", `https://biab.ch${localizedPath(path, "en")}`]]),
    },
    openGraph: {
      ...metadata.openGraph,
      title: typeof metadata.title === "string" ? t(metadata.title) : "BIAB — Business in a Box",
      description: metadata.description ? t(metadata.description) : undefined,
      locale: `${lang}_CH`,
      alternateLocale: locales.filter(l => l !== lang).map(l => `${l}_CH`),
      url: `https://biab.ch${localizedPath(path, lang)}`,
    },
  };
}
