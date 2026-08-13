import { Reveal } from "../components/Reveal";
import { SectionHead } from "../components/SectionHead";
import { HOW } from "../data";

export function HowItWorksSection() {
  return (
    <section className="relative overflow-hidden bg-background py-14 md:py-[84px]">
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[680px] -translate-x-1/2 rounded-full bg-secondary/8 blur-[120px]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-[1600px] md:max-w-6xl px-6">
        <Reveal>
          <SectionHead eyebrow={HOW.eyebrow} heading={HOW.heading} center />
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {HOW.steps.map((step, i) => {
            const free = "free" in step ? step.free : null;
            return (
              <Reveal key={step.n} delay={i * 0.06}>
                <div className="group h-full rounded-[18px] border border-white/10 bg-linear-to-b from-white/6 to-white/2 p-7 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-[0_22px_60px_-24px_rgba(143,224,255,0.3)] sm:p-8">
                  <div className="mb-[18px] flex size-[38px] items-center justify-center rounded-full bg-secondary font-(family-name:--font-poppins) text-[15px] font-extrabold text-[#0a1024] shadow-[0_0_24px_-2px_rgba(143,224,255,0.7)]">
                    {step.n}
                  </div>
                  <h3 className="mb-2 font-(family-name:--font-poppins) text-xl font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-white/55">
                    {step.body}
                  </p>
                  {free ? (
                    <span className="mt-3 inline-block font-(family-name:--font-space-mono) text-[11px] tracking-widest text-secondary">
                      {free}
                    </span>
                  ) : null}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
