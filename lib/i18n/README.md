# BIAB languages

Supported locales: de, en, fr, it. All public pages live below app/[locale]. The API remains /api/waitlist.

- A request without a locale is redirected according to the saved biab-language cookie, then the quality-weighted Accept-Language header. Regional tags such as de-CH and fr-CH are supported. Unsupported languages fall back to English.
- Explicit /de, /en, /fr and /it links always open that version. LanguageSelect stores an explicit choice for one year and keeps the current path, query and hash.
- LocaleProvider supplies the same locale and dictionary for server-rendered HTML and hydration. T translates text without additional DOM elements. Dictionaries use normalized English text as keys. New English copy needs matching entries in all three JSON dictionaries.
- Templates use {value} for a date or visitor name. Longer sentences are translated as whole messages, not by replacing words in the DOM.
- Internal links use LocalizedLink. API requests and external/mail links are not prefixed.
- Blog paragraphs and titles are translated on the server before Markdown rendering. Slugs are deliberately shared across languages.
- Country labels and their order are precomputed in countries.json for consistent server/browser rendering.
- When switching language, unfinished waitlist inputs are temporarily transferred through this tab's sessionStorage and removed on restoration. No registration is submitted by the switch. The selected language is sent with an actual registration so launch communication can use it.
- Metadata has localized titles/descriptions, canonical URLs and hreflang alternatives. The English marketing copy, launch dates, prices and product promises otherwise remain unchanged.

Mobile choice: native select instead of a custom dropdown. It stays visible in the header, independent of the collapsed menu. No extra scroll observers for localization. Long headings wrap at narrow widths.
