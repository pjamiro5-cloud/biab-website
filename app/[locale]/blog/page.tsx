import { getMessages } from "@/lib/i18n/server";
import { isLocale } from "@/lib/i18n/routing";
import { localizeMetadata } from "@/lib/i18n/metadata";
import { T } from "@/components/i18n/LocaleProvider";
import type { Metadata } from "next";
import Link from "@/components/i18n/LocalizedLink";
import Container from "@/components/Container";
import CtaPanel from "@/components/CtaPanel";
import PageHero from "@/components/PageHero";
import { getAllPosts } from "@/lib/blog";

const baseMetadata: Metadata = {
  title: "Blog",
  description: "Notes on starting and running a BIAB business — getting started, building with a partner, and what's inside a Business Box.",
};

function formatDate(date: string, locale: string) {
  return new Date(date).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default async function BlogIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const posts = getAllPosts(await getMessages(isLocale(locale) ? locale : "en"));

  return (
    <>
      <PageHero title="Blog">
        <p><T>Notes on starting and running a BIAB business.</T></p>
      </PageHero>

      <section>
        <Container className="pb-24 md:pb-32">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group glass flex flex-col rounded-[28px] p-7 transition-transform duration-200 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue md:p-8"
              >
                <time dateTime={post.date} className="text-xs font-semibold uppercase tracking-wider text-mid">
                  <T>{formatDate(post.date, locale)}</T>
                </time>
                <h2 className="mt-4 font-display text-2xl font-bold tracking-tight [text-wrap:balance] md:text-[28px] md:leading-tight">
                  <T>{post.title}</T>
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-mid md:text-base"><T>{post.excerpt}</T></p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink"><T>
                  Read more
                  </T><span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-150 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CtaPanel
        title="Stop reading. Start building."
        text="Join the waitlist and be first in when BIAB opens."
      />
    </>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return localizeMetadata(locale, "/blog", baseMetadata);
}
