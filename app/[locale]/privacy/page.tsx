import { localizeMetadata } from "@/lib/i18n/metadata";
import { T } from "@/components/i18n/LocaleProvider";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";

const baseMetadata: Metadata = {
  title: "Privacy notice",
  description: "What BIAB does with the details you share when you join the waitlist.",
};

const SECTIONS = [
  {
    title: "What we collect",
    body: [
      "When you join the waitlist, we store your first and last name, email address and country, your phone number if you share it, how you'd like to start (Solo, Duo or not sure yet) and, if you tell us, where you heard about BIAB.",
      "When registering as a Duo, we also store the second person's name, email address, country, optional phone number and agreement to receive updates. Both contacts are linked in one Duo registration.",
      "We remember your language choice in a cookie so you do not have to select it again. It is used only for this preference.",
      "We also store how you reached the page (for example the campaign link you clicked and the referring website) and your browser language. This helps us understand which marketing works.",
    ],
  },
  {
    title: "Why we collect it",
    body: [
      "We also use your email address to send you BIAB updates until launch, about every two weeks. Every email contains a link to unsubscribe.",
      "We use your details to manage your waitlist registration, reserve your founding member price and plan the launch. We do not sell your details or pass them on for other companies' advertising.",
    ],
  },
  {
    title: "Where it is stored",
    body: [
      "Sign-ups are stored in a Google Sheet in BIAB's Google account (Google Workspace). Google may process data on servers outside Switzerland.",
    ],
  },
  {
    title: "How long we keep it",
    body: [
      "We keep your details until the launch phase is over, or until you ask us to delete them, whichever comes first.",
    ],
  },
  {
    title: "Your rights",
    body: [
      "You can ask at any time what we store about you, ask us to correct it or ask us to delete it. Write to hello@biab.ch and we'll take care of it.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero title="Privacy notice" align="left">
        <p><T>What happens with the details you share when you join the BIAB waitlist.</T></p>
      </PageHero>

      <section>
        <Container className="pb-24 md:pb-32">
          <div className="max-w-2xl space-y-12">
            {SECTIONS.map((s) => (
              <div key={s.title}>
                <h2 className="font-display text-2xl font-bold tracking-tight"><T>{s.title}</T></h2>
                <div className="mt-4 space-y-4 text-base leading-relaxed text-mid">
                  {s.body.map((p) => (
                    <p key={p}><T>{p}</T></p>
                  ))}
                </div>
              </div>
            ))}
            <p className="border-t border-line pt-6 text-sm text-mid"><T>
              Contact: </T><span className="font-semibold text-ink select-all"><T>hello@biab.ch</T></span>
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return localizeMetadata(locale, "/privacy", baseMetadata);
}
