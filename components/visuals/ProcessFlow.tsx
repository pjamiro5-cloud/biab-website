import { T } from "@/components/i18n/LocaleProvider";
import Reveal from "@/components/Reveal";

type Step = {
  step: string;
  title: string;
  description: string;
};

export default function ProcessFlow({ steps }: { steps: readonly Step[] }) {
  return (
    <div className="relative mt-16">
      <Reveal className="absolute left-6 right-6 top-6 hidden h-px overflow-hidden bg-blue-line md:block">
        <div className="flow-line h-full w-full bg-blue" />
      </Reveal>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-6">
        {steps.map((item, i) => (
          <Reveal key={item.step} delay={i * 120}>
            <div className="relative z-10 mb-6 flex h-12 w-12 items-center justify-center rounded-full border-2 border-blue bg-paper font-display text-lg font-bold text-blue">
              <T>{i + 1}</T>
            </div>
            <h3 className="font-display text-2xl font-bold tracking-tight">
              <T>{item.title}</T>
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-mid">
              <T>{item.description}</T>
            </p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
