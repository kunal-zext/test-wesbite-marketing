"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion, type Variants } from "motion/react";
import { cn } from "@/utils";
import { FAQItem } from "@/types/faq";
import { FAQ_ITEMS } from "@/utils/constants/faq";

const EASE = [0.16, 1, 0.3, 1] as const;

const headerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

const headerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

const lineGrow: Variants = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 0.5, ease: EASE },
  },
};

function FAQSection() {
  const HOMEPAGE_FAQ_ITEMS: FAQItem[] = [
    FAQ_ITEMS[0].items[1],
    FAQ_ITEMS[1].items[0],
    FAQ_ITEMS[2].items[0],
    FAQ_ITEMS[3].items[1],
    FAQ_ITEMS[4].items[1],
  ];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq-section"
      className="relative isolate w-full min-w-0 scroll-mt-8 overflow-hidden bg-background py-16 sm:py-20 md:pt-20 md:pb-28"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_110%,rgba(140,82,255,0.06),transparent_50%)]" />
        <div className="absolute top-0 right-0 h-[min(70vh,560px)] w-[min(50vw,420px)] bg-[radial-gradient(ellipse_at_top_right,rgba(143,224,255,0.05),transparent_65%)]" />
        <div className="absolute inset-0 opacity-20 bg-size-[24px_24px] bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)]" />
      </div>
      <div className="relative z-10 mx-auto min-w-0 w-full max-w-6xl px-4 sm:px-5 md:px-6 xl:max-w-[1600px]">
        <div className="max-w-3xl xl:max-w-2xl">
          <motion.header
            variants={headerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-12% 0px" }}
          >
            <motion.div
              className="mb-5 flex flex-wrap items-center gap-4"
              variants={headerItem}
            >
              <span className="text-[1vh] font-medium tracking-[0.15em] text-secondary sm:text-xs sm:tracking-[0.2em] md:text-base uppercase">
                FAQ
              </span>
              <motion.span
                className="hidden h-px min-w-16 flex-1 origin-left bg-linear-to-r from-white/25 to-transparent sm:block sm:max-w-[min(40vw,280px)]"
                style={{ transformOrigin: "left center" }}
                variants={lineGrow}
                aria-hidden
              />
            </motion.div>
            <motion.h2
              className="text-[clamp(1.75rem,4vw,3.25rem)] font-bold leading-[1.12] tracking-tight text-white"
              variants={headerItem}
            >
              <span className="block">Questions we hear</span>
              <span className="mt-1 block text-white/45 sm:mt-2">
                before the first call.
              </span>
            </motion.h2>
          </motion.header>
        </div>

        <div
          className="relative mt-10 w-full min-w-0 overflow-hidden rounded-xl border border-white/10 bg-white/2 backdrop-blur-sm sm:mt-12"
          role="list"
          aria-label="Frequently asked questions"
        >
          <div className="pointer-events-none absolute inset-0 opacity-90">
            <div className="absolute -left-20 -top-28 size-72 rounded-full bg-primary/18 blur-3xl" />
            <div className="absolute -right-16 top-1/2 size-64 -translate-y-1/2 rounded-full bg-secondary/10 blur-3xl" />
            <div className="absolute -bottom-32 left-1/3 size-56 rounded-full bg-primary/10 blur-3xl" />
          </div>

          <div className="relative">
            {HOMEPAGE_FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index;
              const num = String(index + 1).padStart(2, "0");
              const panelId = `faq-section-panel-${index}`;
              const triggerId = `faq-section-trigger-${index}`;

              return (
                <motion.div
                  key={index}
                  role="listitem"
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{
                    once: true,
                    amount: 0.12,
                    margin: "0px 0px -8% 0px",
                  }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.03,
                    ease: EASE,
                  }}
                  className={cn(
                    "border-b border-white/8 last:border-b-0 transition-[background,box-shadow] duration-300",
                    isOpen &&
                      "bg-linear-to-br from-white/7 via-white/2 to-transparent shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]",
                    !isOpen && "hover:bg-white/3",
                  )}
                >
                  <button
                    type="button"
                    id={triggerId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="group grid w-full cursor-pointer grid-cols-[2.5rem_1fr] gap-x-4 px-4 py-6 text-left sm:grid-cols-[3rem_1fr] sm:gap-x-5 sm:px-6 sm:py-7 md:px-7 md:py-8"
                  >
                    <span
                      className="pt-1 font-mono text-xs tabular-nums text-secondary/75"
                      aria-hidden
                    >
                      {num}
                    </span>
                    <div className="flex min-w-0 items-start justify-between gap-4">
                      <span className="min-w-0 text-base font-semibold leading-snug tracking-tight text-white transition-colors duration-200 group-hover:text-white md:text-lg">
                        {item.question}
                      </span>
                      <span
                        className={cn(
                          "mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 p-0 text-secondary transition-colors duration-200",
                          isOpen &&
                            "border-secondary/40 bg-secondary/12 text-secondary shadow-[0_0_20px_-4px_rgba(143,224,255,0.35)]",
                        )}
                        aria-hidden
                      >
                        <ChevronDown
                          className={cn(
                            "size-4 transition-transform duration-300 ease-out sm:size-4.5",
                            isOpen && "rotate-180",
                          )}
                        />
                      </span>
                    </div>
                  </button>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    aria-hidden={!isOpen}
                    className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div className="grid grid-cols-[2.5rem_1fr] gap-x-4 px-4 pb-6 sm:grid-cols-[3rem_1fr] sm:gap-x-5 sm:px-6 sm:pb-7 md:px-7 md:pb-8">
                        <span className="select-none" aria-hidden />
                        <p
                          className={cn(
                            "border-t border-white/8 pt-4 text-sm leading-relaxed text-white/65 md:text-base md:leading-relaxed",
                            "transition-opacity duration-200",
                            isOpen ? "opacity-100" : "opacity-0",
                          )}
                        >
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex justify-center sm:mt-10">
          <Link
            href="/faq"
            className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-8 py-3 text-sm font-medium text-white transition-colors hover:border-white/25 hover:bg-white/10"
          >
            View all
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
