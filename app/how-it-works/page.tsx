import type { Metadata } from "next";
import Container from "@/components/Container";
import Button from "@/components/Button";
import { HOW_IT_WORKS } from "@/lib/content";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Choose your business, get your system, start building, then improve and grow. Here's the full BIAB process, step by step.",
};

export default function HowItWorksPage() {
  return (
    <>
      <section>
        <Container className="py-20 md:py-28">
          <h1 className="max-w-2xl font-display text-[48px] font-bold leading-[0.98] tracking-tight md:text-[80px]">
            From idea to execution.
          </h1>
        </Container>
      </section>

      <Container>
        <div className="divider" />
      </Container>

      <section>
        <Container>
          {HOW_IT_WORKS.map((item, i) => (
            <div
              key={item.step}
              className={`grid grid-cols-1 gap-6 py-14 md:grid-cols-[160px_1fr] md:gap-16 md:py-20 ${
                i !== HOW_IT_WORKS.length - 1 ? "border-b border-line" : ""
              }`}
            >
              <span className="font-display text-7xl font-bold tracking-tight text-mid md:text-8xl">
                {item.step}
              </span>
              <div className="max-w-2xl">
                <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                  {item.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-mid md:text-lg">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </Container>
      </section>

      <section className="bg-tint">
        <Container className="py-16 md:py-20">
          <p className="font-display text-2xl font-bold tracking-tight md:text-3xl">
            Simple idea. Real execution.
          </p>
        </Container>
      </section>

      <section className="bg-ink text-paper">
        <Container className="py-24 md:py-32">
          <h2 className="max-w-xl font-display text-5xl font-bold leading-[1.02] tracking-tight md:text-6xl">
            Ready to start the loop?
          </h2>
          <div className="mt-10">
            <Button href="/pricing" variant="inverse">
              See pricing
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
