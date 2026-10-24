import { getMessages } from "@/lib/i18n/server";
import { isLocale } from "@/lib/i18n/routing";
import { localizeMetadata } from "@/lib/i18n/metadata";
import { T } from "@/components/i18n/LocaleProvider";
import type { Metadata } from "next";
import Link from "@/components/i18n/LocalizedLink";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import CtaPanel from "@/components/CtaPanel";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = getPostBySlug(slug, await getMessages(isLocale(locale) ? locale : "en"));
  if (!post) return {};

  return localizeMetadata(locale, `/blog/${slug}`, {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
    },
  });
}

function formatDate(date: string, locale: string) {
  return new Date(date).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const post = getPostBySlug(slug, await getMessages(isLocale(locale) ? locale : "en"));

  if (!post) notFound();

  return (
    <article>
      <section className="hero-glow -mt-[68px] pt-[68px] md:-mt-[76px] md:pt-[76px]">
        <Container className="pb-12 pt-14 md:pb-16 md:pt-20">
          <Link
            href="/blog"
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-ink transition-colors duration-150 hover:text-blue"
          >
            <span aria-hidden="true">←</span><T> All posts
          </T></Link>
          <time dateTime={post.date} className="mt-8 block text-xs font-semibold uppercase tracking-wider text-mid">
            <T>{formatDate(post.date, locale)}</T>
          </time>
          <h1 className="mt-4 max-w-3xl font-display text-[40px] font-bold leading-[1.05] tracking-[-0.02em] [text-wrap:balance] md:text-[64px]">
            <T>{post.title}</T>
          </h1>
        </Container>
      </section>

      <Container className="pb-24 pt-4 md:pb-32">
        <div
          className="max-w-2xl text-base leading-relaxed text-ink [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mt-12 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:tracking-tight [&_li]:mt-2 [&_p]:mt-6 [&_p:first-child]:mt-0 [&_strong]:font-semibold [&_ul]:mt-6 [&_ul]:list-disc [&_ul]:pl-5"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </Container>

      <CtaPanel
        title="Ready to build something of your own?"
        text="Join the waitlist. BIAB opens on 7 January 2027."
        secondary={{ href: "/how-it-works", label: "How it works" }}
      />
    </article>
  );
}
