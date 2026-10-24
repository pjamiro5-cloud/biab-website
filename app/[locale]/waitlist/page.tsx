import { localizeMetadata } from "@/lib/i18n/metadata";
import { T } from "@/components/i18n/LocaleProvider";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import WaitlistSection from "@/components/WaitlistSection";
import { LAUNCH } from "@/lib/content";

const baseMetadata: Metadata = {
  title: "Join the waitlist",
  description: `BIAB launches on ${LAUNCH.label}. Join the free waitlist and be the first to know when you can start your AI automation business.`,
};

export default function WaitlistPage() {
  return (
    <>
      <PageHero eyebrow={`Launching ${LAUNCH.label}`} title="Build your business with AI automation.">
        <p><T>
          BIAB gives you AI automation systems to sell, leads to contact, sales scripts, a CRM and
          training. Join the waitlist and we&rsquo;ll contact you before the doors open.
        </T></p>
      </PageHero>
      <WaitlistSection />
    </>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return localizeMetadata(locale, "/waitlist", baseMetadata);
}
