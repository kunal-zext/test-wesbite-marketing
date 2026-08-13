"use client";

import {
  AIPerformanceGovernancePlatformCard,
  AIVisibilityPlatformCard,
  BusinessIntelligencePlatformCard,
  EnterpriseAutomationPlatformCard,
  StrategyAnalyticsPlatformCard,
  TrainingUpskillingPlatformCard,
} from "@/app/(pages)/Home/components/platform_cards";
import { cn } from "@/utils";
import { SECTION_IDS, serviceCardId } from "@/utils/homeAnchors";
import { useLenis } from "lenis/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, Variants } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

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

type ServiceKey =
  | "visibility"
  | "automation"
  | "governance"
  | "intelligence"
  | "strategy"
  | "academy";

interface ServiceCard {
  key: ServiceKey;
  navLabel: string;
  title: string;
  description: string;
  platformCard?: React.ReactNode;
}

/** Each service's signature preview card, keyed so reordering `serviceDefs` needs no remap. */
const PLATFORM_CARD_BY_KEY: Record<ServiceKey, () => React.ReactNode> = {
  visibility: () => <AIVisibilityPlatformCard />,
  automation: () => <EnterpriseAutomationPlatformCard />,
  governance: () => <AIPerformanceGovernancePlatformCard />,
  intelligence: () => <BusinessIntelligencePlatformCard />,
  strategy: () => <StrategyAnalyticsPlatformCard />,
  academy: () => <TrainingUpskillingPlatformCard />,
};

const STICKY_CARD_MIN_FLOOR_PX = 580;
const STICKY_MIN_HEIGHT_TAPER_PX = 60;

const STICKY_STACK_BASE_TOP_PX = 80;
const STICKY_SECTION_TOP_STEP_PX = 60;

/** Viewport line (ratio from top): section is "active" when its top has crossed this line. */
const ACTIVE_CARD_VIEWPORT_RATIO = 0.38;

function computeActiveCardIndex(
  sections: (HTMLElement | null)[],
  activationY: number,
): number {
  let active = 0;
  for (let i = 0; i < sections.length; i++) {
    const el = sections[i];
    if (!el) continue;
    if (el.getBoundingClientRect().top <= activationY) active = i;
  }
  return active;
}

function ServiceVisualPlaceholder({ accent }: { accent: number }) {
  const hueShift = accent % 3;
  const blob =
    hueShift === 0
      ? "from-secondary/25 via-emerald-400/10 to-transparent"
      : hueShift === 1
        ? "from-cyan-400/20 via-secondary/15 to-transparent"
        : "from-violet-400/15 via-secondary/10 to-transparent";

  return (
    <div
      className={cn(
        "relative flex min-h-[240px] flex-1 flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/40 lg:min-h-0",
        "bg-linear-to-br",
        blob,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
        aria-hidden
      />
      <div className="relative flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="size-2.5 rounded-full bg-white/12" aria-hidden />
        <span className="size-2.5 rounded-full bg-white/8" aria-hidden />
        <span className="size-2.5 rounded-full bg-white/6" aria-hidden />
      </div>
      <div className="relative flex flex-1 flex-col items-center justify-center gap-6 p-8">
        <div className="flex gap-2 opacity-40" aria-hidden>
          {[0, 1, 2, 3].map((j) => (
            <div
              key={j}
              className="size-10 rotate-45 rounded-md border border-white/20 bg-white/5 shadow-[0_0_40px_rgba(143,224,255,0.08)]"
            />
          ))}
        </div>
        <p className="max-w-[220px] text-center text-[11px] uppercase tracking-[0.2em] text-white/35">
          Preview area
        </p>
      </div>
    </div>
  );
}

const ServiceSection = () => {
  const cardStackRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const lenis = useLenis();

  const serviceDefs: Omit<ServiceCard, "platformCard">[] = [
    {
      key: "visibility",
      navLabel: "AI Visibility & Revenue Systems",
      title: "AI Visibility & Revenue Systems",
      description:
        "We help businesses improve visibility across Google, ChatGPT, Gemini, Perplexity, LinkedIn and social platforms, then convert visibility into customer acquisition, qualified leads and revenue pipelines.",
    },
    {
      key: "automation",
      navLabel: "Enterprise AI Automation",
      title: "Enterprise AI Automation",
      description:
        "We design and deploy AI agents, workflow automations and custom AI systems across business functions, reducing manual work and improving execution speed.",
    },
    {
      key: "governance",
      navLabel: "AI Performance & Governance",
      title: "AI Performance, Governance & Reliability",
      description:
        "We help organizations monitor, govern and optimize AI systems across cost, token usage, model selection, prompt design, accuracy, compliance and executive reporting.",
    },
    {
      key: "intelligence",
      navLabel: "Business Intelligence & Decision Systems",
      title: "Business Intelligence & Decision Systems",
      description:
        "We build MIS frameworks, dashboards, reporting systems and intelligence layers that give leadership visibility into finance, operations, sales and performance.",
    },
    {
      key: "strategy",
      navLabel: "AI-Augmented Strategy & Analytics",
      title: "AI-Augmented Strategy & Analytics",
      description:
        "We combine strategic advisory, analytics, feasibility studies, DPRs, business planning, financial modelling and investment readiness to help organizations evaluate opportunities and scale with confidence.",
    },
    {
      key: "academy",
      navLabel: "AI Capability Building & Academy",
      title: "AI Capability Building & Academy",
      description:
        "We help founders, CXOs, teams, institutions and professionals build practical AI capability through executive workshops, corporate enablement, cohort learning and FDE programs.",
    },
  ];

  const SERVICES: ServiceCard[] = serviceDefs.map((d) => ({
    ...d,
    platformCard: PLATFORM_CARD_BY_KEY[d.key](),
  }));

  const updateActiveIndex = useCallback(() => {
    if (typeof window === "undefined") return;
    const activationY = window.innerHeight * ACTIVE_CARD_VIEWPORT_RATIO;
    const next = computeActiveCardIndex(sectionRefs.current, activationY);
    setActiveIndex((prev) => (prev === next ? prev : next));
  }, []);

  useEffect(() => {
    updateActiveIndex();
  }, [updateActiveIndex, SERVICES.length]);

  useEffect(() => {
    const stack = cardStackRef.current;
    const onResize = () => updateActiveIndex();
    window.addEventListener("resize", onResize, { passive: true });
    const ro =
      typeof ResizeObserver !== "undefined" && stack
        ? new ResizeObserver(() => updateActiveIndex())
        : null;
    if (ro && stack) ro.observe(stack);

    if (lenis) {
      const unsub = lenis.on("scroll", updateActiveIndex);
      return () => {
        unsub();
        ro?.disconnect();
        window.removeEventListener("resize", onResize);
      };
    }

    window.addEventListener("scroll", updateActiveIndex, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateActiveIndex);
      ro?.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [lenis, updateActiveIndex]);

  return (
    <section
      id={SECTION_IDS.services}
      className={cn("w-full min-w-0 top-0 bg-[#d9d9d9] pt-20")}
    >
      <div className="relative z-20 mx-auto flex max-w-6xl min-h-[calc(100dvh-9.5rem)] flex-col overflow-visible px-4 sm:px-5 sm:min-h-[calc(100dvh-10rem)] md:min-h-[calc(100dvh-10.5rem)] md:px-6 lg:min-h-[calc(100dvh-6rem)] 2xl:max-w-[1600px]">
        <motion.header
          className="mb-12 max-w-5xl"
          variants={headerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-12% 0px" }}
        >
          <motion.div
            className="mb-5 flex flex-wrap items-center gap-4"
            variants={headerItem}
          >
            <span className="text-[1vh] font-medium tracking-[0.15em] text-sky-600 sm:text-xs sm:tracking-[0.2em] md:text-base uppercase">
              Services
            </span>
            <motion.span
              className="hidden h-px min-w-16 flex-1 origin-left bg-linear-to-r from-black/20 to-transparent sm:block sm:max-w-[min(40vw,280px)]"
              style={{ transformOrigin: "left center" }}
              variants={lineGrow}
              aria-hidden
            />
          </motion.div>
          <motion.h2
            className="text-[clamp(1.75rem,4vw,3.25rem)] font-bold leading-[1.12] tracking-tight text-tertiary"
            variants={headerItem}
          >
            <span className="block">Six service lines.</span>
            <span className="mt-1 block text-tertiary/55 sm:mt-2">
              One execution-led AI transformation partner.
            </span>
          </motion.h2>
        </motion.header>

        <div className="mt-10 grid w-full grid-cols-1 gap-10 lg:mt-14 lg:grid-cols-[minmax(0,16.66%)_1fr] lg:gap-14">
          <div className="relative hidden lg:block">
            <div className="sticky top-32 flex flex-col gap-5 py-8 sm:py-10 lg:py-12">
              {SERVICES.map((service, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3.5"
                  aria-current={activeIndex === i ? "true" : undefined}
                >
                  <div
                    className={cn(
                      "mt-[2px] size-2 shrink-0 rounded-[1px] transition-colors duration-300",
                      activeIndex === i
                        ? "bg-sky-600 shadow-[0_0_12px_rgba(2,132,199,0.45)]"
                        : "bg-black/25",
                    )}
                  />
                  <div
                    className={cn(
                      "text-[11px] font-medium uppercase leading-snug tracking-[0.14em] transition-colors duration-300",
                      activeIndex === i ? "text-tertiary" : "text-tertiary/45",
                    )}
                  >
                    {service.navLabel}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="min-w-0">
            <div ref={cardStackRef} className="relative">
              {SERVICES.map((service, i) => (
                <section
                  key={i}
                  id={serviceCardId(i)}
                  ref={(el) => {
                    sectionRefs.current[i] = el;
                  }}
                  className={cn(
                    "mb-8 flex w-full flex-col border-t border-black/12 bg-[#d9d9d9] text-tertiary lg:sticky lg:mb-0 lg:min-h-0 lg:overflow-hidden",
                    i === 1 && "lg:-mt-[180px]",
                    i === 2 && "lg:-mt-[120px]",
                    i === 3 && "lg:-mt-[60px]",
                    i === 4 && "lg:-mt-[30px]",
                    i === 5 && "lg:-mt-[30px]",
                    i === 6 && "lg:-mt-[30px]",
                  )}
                  style={{
                    zIndex: (i + 1) * 10,
                    top:
                      STICKY_STACK_BASE_TOP_PX + i * STICKY_SECTION_TOP_STEP_PX,
                    minHeight:
                      STICKY_CARD_MIN_FLOOR_PX +
                      (SERVICES.length - 1 - i) * STICKY_MIN_HEIGHT_TAPER_PX,
                  }}
                >
                  <div className="flex w-full shrink-0 items-center gap-3 bg-tertiary px-0 py-3 sm:py-3.5 lg:px-1">
                    <h3 className="min-w-0 flex-1 text-xl font-semibold leading-snug tracking-tight text-white sm:text-2xl lg:text-3xl lg:truncate">
                      {service.title}
                    </h3>
                  </div>

                  <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
                    <div className="flex flex-col gap-5 px-0 py-8 sm:py-10 lg:w-[42%] lg:max-w-[1600px] md:max-w-7xll lg:shrink-0 lg:gap-6 lg:py-10 lg:pr-10">
                      <p className="text-[15px] leading-relaxed text-tertiary/70 sm:text-base">
                        {service.description}
                      </p>
                    </div>

                    <div className="flex flex-1 flex-col px-0 pb-8 pt-2 sm:px-1 lg:px-2 lg:pb-12 lg:pl-4 lg:pt-8">
                      <div className="relative border border-black/10 bg-black/5 lg:border-l lg:border-t-0">
                        <div className="pointer-events-none absolute -left-px -top-px h-px w-24 bg-linear-to-r from-sky-600/40 to-transparent" />
                        <div className="p-4 sm:p-5 lg:p-6">
                          {service.platformCard ?? (
                            <ServiceVisualPlaceholder accent={i} />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
