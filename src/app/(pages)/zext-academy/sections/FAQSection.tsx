"use client";

import { Plus } from "lucide-react";
import { cn } from "@/utils";
import { AccordionItem } from "../components/Accordion";
import { Reveal } from "../components/Reveal";
import { SectionHead } from "../components/SectionHead";
import { FAQS } from "../data";

export function FAQSection() {
  return (
    <section className="bg-background py-14 md:py-[84px]">
      <div className="mx-auto max-w-[1600px] md:max-w-6xl px-6">
        <Reveal>
          <SectionHead eyebrow={FAQS.eyebrow} heading={FAQS.heading} />
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mt-10 max-w-[780px]">
            {FAQS.items.map((item) => (
              <AccordionItem
                key={item.q}
                className="border-b border-white/10"
                buttonClassName="flex items-center justify-between gap-4 py-[22px] font-(family-name:--font-poppins) text-lg font-semibold text-white transition-colors duration-200 hover:text-secondary"
                panelClassName="pb-[22px]"
                header={(open) => (
                  <>
                    <span>{item.q}</span>
                    <Plus
                      className={cn(
                        "size-5 shrink-0 transition-transform duration-200",
                        open ? "rotate-45 text-secondary" : "text-white/55",
                      )}
                      strokeWidth={2}
                      aria-hidden
                    />
                  </>
                )}
              >
                <p className="max-w-[64ch] text-base leading-relaxed text-white/55">
                  {item.a}
                </p>
              </AccordionItem>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
