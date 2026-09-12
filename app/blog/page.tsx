import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on running a BIAB agency — pricing, timelines, and the Primary Owner Model.",
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <section>
      <Container className="py-20 md:py-28">
        <h1 className="max-w-2xl font-display text-[48px] font-bold leading-[0.98] tracking-tight md:text-[80px]">
          Blog
        </h1>
        <p className="mt-6 max-w-xl text-lg text-mid">
          Notes on running a BIAB agency — pricing, timelines, and the
          Primary Owner Model.
        </p>
      </Container>

      <Container>
        <div className="divider" />
      </Container>

      <Container className="divide-y divide-line">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group -mx-6 block px-6 py-10 transition-colors duration-200 hover:bg-tint md:-mx-10 md:px-10 md:py-14"
          >
            <time className="text-xs font-semibold uppercase tracking-wider text-mid">
              {formatDate(post.date)}
            </time>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight underline-offset-4 group-hover:underline md:text-4xl">
              {post.title}
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-mid">
              {post.excerpt}
            </p>
            <span className="mt-4 inline-flex items-center gap-2 font-semibold text-ink">
              Read more
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-150 group-hover:translate-x-1"
              >
                →
              </span>
            </span>
          </Link>
        ))}
      </Container>
    </section>
  );
}
