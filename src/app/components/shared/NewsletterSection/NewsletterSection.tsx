"use client";

import { useEffect, useRef, useState } from "react";
import { NewsletterPillLink } from "@/app/components/ui/NewsletterPillLink/NewsletterPillLink";
import { SECTION_IDS } from "@/utils/homeAnchors";

const BRIEFING_PAGE = "/newsletter";

const NewsletterSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={SECTION_IDS.newsletter}
      className="relative w-full overflow-x-hidden bg-background px-4 pb-16 sm:px-6 sm:pb-20 md:px-8 lg:pb-14 xl:pb-16"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-16 h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent sm:mb-20" />

        <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5 xl:col-span-4">
            <div
              className={`mb-6 flex transform items-center gap-2 transition-all duration-700 sm:gap-3 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-10 opacity-0"
              }`}
            >
              <span className="text-[1vh] font-medium tracking-[0.15em] text-secondary sm:text-xs sm:tracking-[0.2em] md:text-base">
                STAY AHEAD
              </span>
              <div className="h-px flex-1 bg-linear-to-r from-primary/50 to-transparent" />
            </div>

            <h2
              className={`mb-4 transform text-3xl font-bold leading-[1.1] tracking-tight transition-all duration-700 sm:mb-5 sm:text-4xl xl:text-5xl ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              <span className="block text-white">AI insights,</span>
              <span className="block text-white/40">delivered daily.</span>
            </h2>

            <p
              className={`mb-8 max-w-[44ch] transform text-sm leading-relaxed text-white/55 transition-all duration-700 sm:text-base ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              The sharpest AI signal, distilled. Know what&apos;s worth your
              attention before everyone else does.
            </p>
          </div>

          <div
            className={`transform transition-all duration-700 lg:col-span-7 xl:col-span-8 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
            style={{ transitionDelay: "350ms" }}
          >
            <div
              className={`mt-4 grid grid-cols-3 gap-px overflow-hidden border border-white/8 bg-white/8 transform transition-all duration-700 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: "500ms" }}
            >
              {[
                { value: "Curated", label: "not aggregated" },
                { value: "Focused", label: "on what matters" },
                { value: "Free", label: "no paywall ever" },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-0.5 bg-background px-3 py-3 text-center sm:px-4 sm:py-4"
                >
                  <span className="text-base font-bold text-white sm:text-lg">
                    {value}
                  </span>
                  <span className="text-[10px] text-white/35 sm:text-xs">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-center">
              <NewsletterPillLink href={BRIEFING_PAGE} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
