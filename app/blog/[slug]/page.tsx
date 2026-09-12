import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import Button from "@/components/Button";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
    },
  };
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <article>
      <Container className="py-16 md:py-24">
        <Link
          href="/blog"
          className="text-sm font-semibold text-mid transition-colors duration-150 hover:text-ink"
        >
          ← All posts
        </Link>
        <time className="mt-8 block text-xs font-semibold uppercase tracking-wider text-mid">
          {formatDate(post.date)}
        </time>
        <h1 className="mt-4 max-w-3xl font-display text-[40px] font-bold leading-[1.05] tracking-tight md:text-[64px]">
          {post.title}
        </h1>
      </Container>

      <Container>
        <div className="divider" />
      </Container>

      <Container className="py-16 md:py-24">
        <div
          className="max-w-2xl text-base leading-relaxed text-ink [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mt-12 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:tracking-tight [&_li]:mt-2 [&_p]:mt-6 [&_p:first-child]:mt-0 [&_strong]:font-semibold [&_ul]:mt-6 [&_ul]:list-disc [&_ul]:pl-5"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </Container>

      <section className="bg-ink text-paper">
        <Container className="py-20 md:py-28">
          <h2 className="max-w-lg font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
            Ready to work your first batch of leads?
          </h2>
          <div className="mt-8">
            <Button href="/pricing" variant="inverse">
              See pricing
            </Button>
          </div>
        </Container>
      </section>
    </article>
  );
}
