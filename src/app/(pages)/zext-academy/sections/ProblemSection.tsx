import { Map, LayoutGrid, type LucideIcon } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { SectionHead } from "../components/SectionHead";
import { PROBLEM } from "../data";

const ICONS: LucideIcon[] = [Map, LayoutGrid];

export function ProblemSection() {
  return (
    <section className="border-y border-white/10 bg-tertiary py-14 md:py-[84px]">
      <div className="mx-auto max-w-[1600px] md:max-w-6xl px-6">
        <Reveal>
          <SectionHead eyebrow={PROBLEM.eyebrow} heading={PROBLEM.heading} />
        </Reveal>
        <div className="mt-11 grid gap-6 md:grid-cols-2">
          {PROBLEM.cards.map((card, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={card.title} delay={i * 0.06}>
                <div className="group h-full rounded-[18px] border border-white/10 bg-linear-to-b from-white/6 to-white/2 p-8 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-[0_22px_60px_-24px_rgba(143,224,255,0.35)]">
                  <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-secondary/10 ring-1 ring-inset ring-secondary/20 transition-colors duration-300 group-hover:bg-secondary/15">
                    <Icon
                      className="size-6 text-secondary"
                      strokeWidth={2}
                      aria-hidden
                    />
                  </div>
                  <h3 className="mb-2.5 font-(family-name:--font-poppins) text-[22px] font-semibold text-white">
                    {card.title}
                  </h3>
                  <p className="text-base leading-relaxed text-white/55">
                    {card.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
