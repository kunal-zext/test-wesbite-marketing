"use client";

import { ChevronDown } from "lucide-react";
import { cn } from "@/utils";
import { AccordionItem } from "../components/Accordion";
import { CountUp } from "../components/CountUp";
import { Reveal } from "../components/Reveal";
import { SectionHead } from "../components/SectionHead";
import { CURRICULUM } from "../data";

export function CurriculumSection() {
  return (
    <section className="bg-background py-14 md:py-[84px]">
      <div className="mx-auto max-w-[1600px] md:max-w-6xl px-6">
        <Reveal>
          <SectionHead eyebrow={CURRICULUM.eyebrow} heading={CURRICULUM.heading} />
          <div className="mt-5 flex flex-wrap gap-x-11 gap-y-4">
            {CURRICULUM.stats.map((s) => (
              <div key={s.label}>
                <b className="block bg-linear-to-br from-secondary to-primary bg-clip-text font-(family-name:--font-poppins) text-[clamp(34px,5vw,46px)] font-extrabold leading-none text-transparent">
                  <CountUp value={s.value} suffix={"suffix" in s ? s.suffix : ""} />
                </b>
                <span className="font-(family-name:--font-space-mono) text-[13px] tracking-[0.08em] text-white/55">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="relative mt-11">
            <div
              className="absolute top-6 bottom-6 left-[23px] w-0.5 bg-linear-to-b from-secondary to-secondary/15"
              aria-hidden
            />
            {CURRICULUM.chapters.map((ch, i) => (
              <AccordionItem
                key={ch.title}
                className="relative mb-1"
                buttonClassName="flex items-center justify-between gap-4 rounded-xl py-[18px] pr-5 pl-16 transition-colors duration-200 hover:bg-tertiary"
                panelClassName="pr-5 pb-[18px] pl-16"
                header={(open) => (
                  <>
                    <span
                      className={cn(
                        "absolute top-[18px] left-3 flex size-6 items-center justify-center rounded-full border-2 border-secondary font-(family-name:--font-space-mono) text-[11px] font-bold transition-all duration-200",
                        open
                          ? "bg-secondary text-[#0a1024] shadow-[0_0_0_6px_rgba(143,224,255,0.15)]"
                          : "bg-tertiary text-secondary",
                      )}
                      aria-hidden
                    >
                      {i + 1}
                    </span>
                    <span className="min-w-0">
                      <span className="font-(family-name:--font-poppins) text-lg font-semibold text-white">
                        {ch.title}
                      </span>{" "}
                      <span className="font-(family-name:--font-space-mono) text-[11px] text-white/55">
                        {ch.modules}
                      </span>
                    </span>
                    <ChevronDown
                      className={cn(
                        "size-[18px] shrink-0 transition-transform duration-200",
                        open ? "rotate-180 text-secondary" : "text-white/55",
                      )}
                      strokeWidth={2}
                      aria-hidden
                    />
                  </>
                )}
              >
                <p className="max-w-[60ch] text-[15px] leading-relaxed text-white/55">
                  {ch.body}
                </p>
              </AccordionItem>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
