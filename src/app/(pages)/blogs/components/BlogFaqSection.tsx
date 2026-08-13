"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/utils";
import type { FAQItem } from "@/types/faq";

/**
 * FAQ accordion rendered below a blog's body. Mirrors the disclosure pattern of
 * the homepage FAQ section (single-open index, grid-rows height animation, ARIA
 * expanded/controls) but scoped to the narrower article column. Renders nothing
 * when there are no FAQs, so the article layout is unchanged for posts without them.
 */
export default function BlogFaqSection({ faqs }: { faqs?: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <section
      aria-labelledby="blog-faq-heading"
      className="mt-14 border-t border-white/10 pt-10 sm:mt-16"
    >
      <h2
        id="blog-faq-heading"
        className="mb-6 text-2xl font-bold tracking-tight text-white sm:text-3xl"
      >
        Frequently asked questions
      </h2>

      <div
        className="overflow-hidden rounded-xl border border-white/10 bg-white/2"
        role="list"
        aria-label="Frequently asked questions"
      >
        {faqs.map((item, index) => {
          const isOpen = openIndex === index;
          const panelId = `blog-faq-panel-${index}`;
          const triggerId = `blog-faq-trigger-${index}`;

          return (
            <div
              key={index}
              role="listitem"
              className={cn(
                "border-b border-white/8 last:border-b-0 transition-colors duration-300",
                isOpen
                  ? "bg-linear-to-br from-white/7 via-white/2 to-transparent"
                  : "hover:bg-white/3",
              )}
            >
              <button
                type="button"
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full cursor-pointer items-start justify-between gap-4 px-4 py-5 text-left sm:px-6 sm:py-6"
              >
                <span className="min-w-0 text-base font-semibold leading-snug tracking-tight text-white md:text-lg">
                  {item.question}
                </span>
                <span
                  className={cn(
                    "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl border border-white/10 text-secondary transition-colors duration-200",
                    isOpen && "border-secondary/40 bg-secondary/12 text-secondary",
                  )}
                  aria-hidden
                >
                  <ChevronDown
                    className={cn(
                      "size-4 transition-transform duration-300 ease-out",
                      isOpen && "rotate-180",
                    )}
                  />
                </span>
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
                  <p
                    className={cn(
                      "px-4 pb-5 text-sm leading-relaxed text-white/65 sm:px-6 sm:pb-6 md:text-base md:leading-relaxed",
                      "transition-opacity duration-200",
                      isOpen ? "opacity-100" : "opacity-0",
                    )}
                  >
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
