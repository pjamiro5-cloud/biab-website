import { localizeMetadata } from "@/lib/i18n/metadata";
import { T } from "@/components/i18n/LocaleProvider";
import type { Metadata } from "next";
import { Space_Grotesk, Inter, Oswald } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import MobileWaitlistBar from "@/components/MobileWaitlistBar";
import "../globals.css";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import { getMessages } from "@/lib/i18n/server";
import { isLocale, locales } from "@/lib/i18n/routing";
import { notFound } from "next/navigation";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

// Used only for the "BIAB" wordmark, per the brand design system.
const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["700"],
});

const baseMetadata: Metadata = {
  metadataBase: new URL("https://biab.ch"),
  title: {
    default: "BIAB — Business in a Box",
    template: "%s — BIAB",
  },
  description:
    "Build your business with AI automation. BIAB gives you 150 new scored Swiss business leads per month with Solo or 250 as a Duo, the sales system and the tools to turn them into paying clients.",
  openGraph: {
    title: "BIAB — Business in a Box",
    description:
      "Build your business with AI automation. BIAB gives you 150 new scored Swiss business leads per month with Solo or 250 as a Duo, the sales system and the tools to turn them into paying clients.",
    url: "https://biab.ch",
    siteName: "BIAB",
    locale: "en_CH",
    type: "website",
  },
};

export function generateStaticParams() { return locales.map(locale => ({ locale })); }

export default async function RootLayout({
  children, params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const messages = await getMessages(locale);
  return (
    <html
      lang={locale}
      className={`${spaceGrotesk.variable} ${inter.variable} ${oswald.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <LocaleProvider locale={locale} messages={messages}>
        <Nav />
        <main className="flex-1"><T>{children}</T></main>
        <Footer />
        <MobileWaitlistBar />
        </LocaleProvider>
      </body>
    </html>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return localizeMetadata(locale, "/", baseMetadata);
}
