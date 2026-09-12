import type { Metadata } from "next";
import { Space_Grotesk, Inter, Oswald } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://biab.ch"),
  title: {
    default: "BIAB — Business in a Box",
    template: "%s — BIAB",
  },
  description:
    "BIAB gives you the system, tools and support to start and build a real business. Choose a business. Get your setup. Start building.",
  openGraph: {
    title: "BIAB — Business in a Box",
    description:
      "BIAB gives you the system, tools and support to start and build a real business. Choose a business. Get your setup. Start building.",
    url: "https://biab.ch",
    siteName: "BIAB",
    locale: "en_CH",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${oswald.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <SmoothScroll />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
