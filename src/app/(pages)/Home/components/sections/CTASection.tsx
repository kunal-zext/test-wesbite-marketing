"use client";

import { ArrowUpRight, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { SECTION_IDS } from "@/utils/homeAnchors";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget?: (opts: {
        url: string;
        parentElement: Element;
      }) => void;
    };
  }
}

const CALENDLY_URL =
  "https://calendly.com/zextdigital/30min?hide_gdpr_banner=1&background_color=291a48&text_color=ffffff&primary_color=8c52ff";

const CTASection = () => {
  const calendlyHostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    const host = calendlyHostRef.current;
    if (!host) return;

    // Clean any stale/partial embeds when navigating back.
    host.innerHTML = "";

    const tryInit = () => {
      if (cancelled) return true;
      const init = window.Calendly?.initInlineWidget;
      if (!init) return false;
      init({ url: CALENDLY_URL, parentElement: host });
      return true;
    };

    if (tryInit()) return () => void (cancelled = true);

    const start = Date.now();
    const t = window.setInterval(() => {
      if (tryInit()) window.clearInterval(t);
      if (Date.now() - start > 8000) window.clearInterval(t);
    }, 100);

    return () => {
      cancelled = true;
      window.clearInterval(t);
    };
  }, []);

  return (
    <section
      id={SECTION_IDS.getStarted}
      className="relative w-full min-w-0 scroll-mt-8 overflow-x-hidden bg-white/2 px-4 py-20 sm:px-5 sm:py-28 md:px-6 md:pt-24 md:pb-32 lg:pt-20 lg:pb-24 xl:pt-24 xl:pb-28 2xl:pt-28 2xl:pb-32"
    >
      <div className="mx-auto max-h-[min(100vh,56rem)] max-w-[1600px]">
        <div className="grid items-start gap-10 sm:gap-12 md:gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="mb-6 flex items-center gap-2 sm:mb-8 sm:gap-3">
              <span className="text-[1vh] font-medium tracking-[0.15em] text-secondary sm:text-xs sm:tracking-[0.2em] md:text-base uppercase">
                TALK TO US
              </span>
              <div className="h-px flex-1 bg-linear-to-r from-primary/50 to-transparent" />
            </div>
            <h2 className="mb-6 max-w-[90vh] text-3xl font-bold leading-[1.1] tracking-tight text-white sm:mb-8 sm:text-4xl xl:text-5xl">
              Build practical AI transformation inside your business.
            </h2>
            <p className="mb-8 max-w-[60vh] text-base leading-relaxed text-white/60 sm:mb-12 sm:text-lg">
              Book a discovery conversation to identify the right AI,
              automation, analytics or capability-building path for your
              organization.
            </p>

            <div className="space-y-3 sm:space-y-4">
              <Link
                href="mailto:contact@zextdigital.ai"
                className="group flex items-center gap-2 text-white/70 transition-colors hover:text-primary sm:gap-3"
              >
                <Mail className="size-4 shrink-0 sm:size-5" />
                <span className="break-all text-sm sm:text-base">
                  contact@zextdigital.ai
                </span>
                <ArrowUpRight className="size-3 shrink-0 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:size-4" />
              </Link>
              <Link
                href="tel:+917021215403"
                className="group flex items-center gap-2 text-white/70 transition-colors hover:text-primary sm:gap-3"
              >
                <Phone className="size-4 shrink-0 sm:size-5" />
                <span className="text-sm sm:text-base">+91 70212 15403</span>
                <ArrowUpRight className="size-3 shrink-0 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:size-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div
              ref={calendlyHostRef}
              className="h-[70vh] min-w-[min(100%,20rem)] w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
