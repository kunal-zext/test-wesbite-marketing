"use client";

import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowRight, Check, X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/utils";

const HTMLFlipBook = dynamic(
  () => import("react-pageflip").then((m) => m.default),
  {
    ssr: false,
    loading: () => (
      <div
        className="mx-auto h-[min(400px,60vw)] w-full max-w-4xl animate-pulse rounded-2xl bg-black/5"
        aria-hidden
      />
    ),
  },
);

const EASE = [0.22, 1, 0.36, 1] as const;

const POINTS = [
  {
    id: "speed-to-production",
    title: "Speed & measurability",
    pain: "6-18 months AI rollouts that never feel real",
    lead: "We rapidly transform pilots into production-ready solutions.",
    subtext: "Practical, scalable, and deployed within your environment.",
  },
  {
    id: "senior-team",
    title: "Senior practitioners",
    pain: "Generic vendors or rotating junior teams",
    lead: "Founders & senior practitioners on every Zext engagement.",
    subtext: "Discovery to delivery.",
  },
  {
    id: "data-sovereignty",
    title: "Data where you trust it",
    pain: "Your data in a black-box vendor cloud",
    lead: "AI runs where you already trust your data - your stack, your rules.",
    subtext:
      "Built for enterprises that need DPDP, GDPR, and PDPL alignment without outsourcing trust.",
  },
  {
    id: "accountability",
    title: "Accountability for impact",
    pain: "AI transformation with no one owning results",
    lead: "We stay accountable for adoption and impact, not just deployment.",
    subtext:
      "Training, governance, and handover - so the change sticks after we leave the room.",
  },
  {
    id: "honest-scoping",
    title: "Honest scoping",
    pain: "Selling every stack or scope to win the deal",
    lead: "We'd rather say no than sell the wrong AI journey.",
    subtext:
      "The same long-term view you'll see in our advisory and education work.",
  },
] as const;

type Point = (typeof POINTS)[number];

const headerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};
const headerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};
const lineGrow: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.5, ease: EASE } },
};

const noiseBg = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
} as const;

/** StPageFlip / react-pageflip expects each page to forward ref to a DOM node. */
const OldPage = forwardRef<HTMLDivElement, { point: Point; stepNum: number }>(
  function OldPage({ point, stepNum }, ref) {
    const num = String(stepNum).padStart(2, "0");
    return (
      <div
        ref={ref}
        className="relative flex h-full w-full flex-col overflow-hidden bg-[#2a1414] p-7 sm:p-9"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={noiseBg}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: [
              "radial-gradient(ellipse 90% 70% at 100% 0%, rgba(220,54,46,0.2), transparent 55%)",
              "radial-gradient(ellipse 60% 50% at 0% 100%, rgba(220,54,46,0.09), transparent 52%)",
              "radial-gradient(ellipse 100% 55% at 50% -10%, rgba(220,54,46,0.06), transparent 48%)",
            ].join(", "),
          }}
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-linear-to-l from-black/30 to-transparent" />

        <div className="relative z-10 flex h-full flex-col">
          <div className="mb-5 flex items-center gap-2.5 sm:mb-6">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-[#dc362e]/35 bg-[#dc362e]/10 sm:size-9">
              <X
                className="size-4 text-[#dc362e]"
                strokeWidth={2.5}
                aria-hidden
              />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#dc362e]/80 sm:text-[12px]">
              The old way
            </span>
          </div>

          <div className="flex flex-1 flex-col justify-center gap-4">
            <p
              className="text-pretty font-medium leading-snug text-white/40 line-through decoration-[#dc362e]/80 decoration-2"
              style={{ fontSize: "clamp(1rem, 2.3vw, 1.28rem)" }}
            >
              {point.pain}
            </p>
            <p className="flex items-center gap-1.5 text-base font-medium text-[#dc362e]/45">
              <ArrowRight
                className="size-3.5 shrink-0 text-[#dc362e]/80"
                strokeWidth={2}
                aria-hidden
              />
              There&apos;s a better way
            </p>
          </div>

          <p className="mt-auto text-[11px] tabular-nums text-white/15">
            {num} / {String(POINTS.length).padStart(2, "0")}
          </p>
        </div>
      </div>
    );
  },
);

const ZextPage = forwardRef<HTMLDivElement, { point: Point; stepNum: number }>(
  function ZextPage({ point, stepNum }, ref) {
    const num = String(stepNum).padStart(2, "0");
    return (
      <div
        ref={ref}
        className="relative flex h-full w-full flex-col overflow-hidden bg-[#0d1228] p-7 sm:p-9"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={noiseBg}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: [
              "radial-gradient(ellipse 90% 75% at 0% 0%, rgba(140,82,255,0.16), transparent 58%)",
              "radial-gradient(ellipse 60% 50% at 100% 100%, rgba(140,82,255,0.14), transparent 58%)",
              "radial-gradient(ellipse 50% 42% at 0% 100%, rgba(143,224,255,0.07), transparent 55%)",
              "radial-gradient(ellipse 100% 60% at 50% -12%, rgba(255,255,255,0.06), transparent 50%)",
            ].join(", "),
          }}
        />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-linear-to-r from-black/30 to-transparent" />

        <div className="relative z-10 flex h-full flex-col">
          <div className="mb-5 flex items-center gap-2.5 sm:mb-6">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/12 bg-black/35 sm:size-9">
              <Check
                className="size-4 text-secondary/80"
                strokeWidth={2.5}
                aria-hidden
              />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.26em] text-secondary/55 sm:text-[12px]">
              The Zext way
            </span>
          </div>

          <div className="flex flex-1 flex-col justify-center gap-3">
            <h3
              className="text-balance font-bold leading-[1.15] tracking-tight text-white"
              style={{ fontSize: "clamp(1.15rem, 2.7vw, 1.75rem)" }}
            >
              {point.title}
            </h3>
            <p
              className="text-pretty font-semibold leading-snug text-white/85"
              style={{ fontSize: "clamp(0.9rem, 2vw, 1.06rem)" }}
            >
              {point.lead}
            </p>
            <p className="text-pretty text-base leading-relaxed text-white/50">
              {point.subtext}
            </p>
          </div>

          <div className="mt-auto flex items-center justify-between">
            <div
              className="h-0.5 w-10 rounded-full bg-secondary/35"
              aria-hidden
            />
            <p className="text-[11px] tabular-nums text-white/15">
              {num} / {String(POINTS.length).padStart(2, "0")}
            </p>
          </div>
        </div>
      </div>
    );
  },
);

type PageFlipApi = {
  flipNext: (corner?: "top" | "bottom") => void;
  flipPrev: (corner?: "top" | "bottom") => void;
  turnToPage: (page: number) => void;
  getCurrentPageIndex: () => number;
};

type BookRef = { pageFlip: () => PageFlipApi | undefined };

function pageIndexToSpread(pageIndex: number) {
  return Math.floor(pageIndex / 2);
}

function spreadToPageIndex(spread: number) {
  return spread * 2;
}

function WhyUsFlipBook({ reduceMotion }: { reduceMotion: boolean }) {
  const bookRef = useRef<BookRef | null>(null);
  const [spread, setSpread] = useState(0);
  const totalSpreads = POINTS.length;

  const getApi = useCallback((): PageFlipApi | undefined => {
    return bookRef.current?.pageFlip?.();
  }, []);

  const syncSpreadFromBook = useCallback(() => {
    const api = getApi();
    if (!api) return;
    const page = api.getCurrentPageIndex();
    setSpread(pageIndexToSpread(page));
  }, [getApi]);

  const handleFlip = useCallback(
    (e: { data: number | string | boolean | object }) => {
      if (typeof e.data === "number") {
        setSpread(pageIndexToSpread(e.data));
      }
    },
    [],
  );

  const goNext = useCallback(() => {
    getApi()?.flipNext("top");
  }, [getApi]);

  const goPrev = useCallback(() => {
    getApi()?.flipPrev("top");
  }, [getApi]);

  const goToSpread = useCallback(
    (targetSpread: number) => {
      const api = getApi();
      if (!api) return;
      api.turnToPage(spreadToPageIndex(targetSpread));
      setSpread(targetSpread);
    },
    [getApi],
  );

  useEffect(() => {
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === "ArrowRight") goNext();
      if (ev.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  const flippingTime = reduceMotion ? 120 : 850;

  const prevInactive = spread === 0;
  const nextInactive = spread >= totalSpreads - 1;

  return (
    <div className="flex w-full min-w-0 max-w-full flex-col items-center gap-8">
      <div className="relative w-full min-w-0 max-w-4xl py-6 sm:py-10">
        <div className="absolute inset-x-4 -bottom-2 -z-10 h-full rounded-2xl border border-black/8 bg-black/3 sm:inset-x-6" />
        <div className="absolute inset-x-2 -bottom-1 -z-10 h-full rounded-2xl border border-black/10 bg-black/4 sm:inset-x-4" />

        <HTMLFlipBook
          ref={bookRef as any}
          className="why-us-stflip mx-auto w-full min-w-0 max-w-full overflow-visible rounded-2xl border border-black/10 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.35)]"
          style={{ width: "100%", maxWidth: "100%" }}
          width={400}
          height={400}
          size="stretch"
          minWidth={280}
          maxWidth={920}
          minHeight={280}
          maxHeight={480}
          maxShadowOpacity={0.55}
          flippingTime={flippingTime}
          startPage={0}
          drawShadow
          usePortrait
          showCover={false}
          mobileScrollSupport
          clickEventForward
          useMouseEvents
          swipeDistance={30}
          showPageCorners
          disableFlipByClick={false}
          autoSize
          startZIndex={0}
          onFlip={handleFlip}
          onInit={syncSpreadFromBook}
        >
          {POINTS.flatMap((point, i) => {
            const step = i + 1;
            return [
              <OldPage key={`${point.id}-old`} point={point} stepNum={step} />,
              <ZextPage
                key={`${point.id}-zext`}
                point={point}
                stepNum={step}
              />,
            ];
          })}
        </HTMLFlipBook>
        {/* eslint-enable @typescript-eslint/no-explicit-any */}
      </div>

      <div className="flex w-full min-w-0 max-w-4xl items-center justify-between gap-4">
        <button
          type="button"
          aria-disabled={prevInactive}
          aria-label="Previous spread"
          onClick={() => {
            if (prevInactive) return;
            goPrev();
          }}
          className={cn(
            "group flex items-center gap-2 rounded-full border px-4 py-2.5 text-base font-medium transition-all duration-200",
            prevInactive
              ? "pointer-events-none cursor-not-allowed border-black/10 text-tertiary/30 opacity-40"
              : "border-black/15 bg-black/5 text-tertiary/70 hover:border-black/25 hover:bg-black/10 hover:text-tertiary",
          )}
        >
          <ChevronLeft
            className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5"
            strokeWidth={2}
            aria-hidden
          />
          <span className="hidden sm:inline">Previous</span>
        </button>

        <div
          className="flex items-center gap-2"
          role="tablist"
          aria-label="Spread indicators"
        >
          {POINTS.map((p, i) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={i === spread}
              aria-label={`Go to spread ${i + 1}: ${p.title}`}
              onClick={() => goToSpread(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === spread
                  ? "w-7 bg-sky-600"
                  : "w-1.5 bg-black/20 hover:bg-black/40",
              )}
            />
          ))}
        </div>

        <button
          type="button"
          aria-disabled={nextInactive}
          aria-label="Next spread"
          onClick={() => {
            if (nextInactive) return;
            goNext();
          }}
          className={cn(
            "group flex items-center gap-2 rounded-full border px-4 py-2.5 text-base font-medium transition-all duration-200",
            nextInactive
              ? "pointer-events-none cursor-not-allowed border-black/10 text-tertiary/30 opacity-40"
              : "border-black/15 bg-black/5 text-tertiary/70 hover:border-black/25 hover:bg-black/10 hover:text-tertiary",
          )}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight
            className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
            strokeWidth={2}
            aria-hidden
          />
        </button>
      </div>

      <p className="text-[12px] text-tertiary/50">
        Drag a page corner, tap edges, or use{" "}
        <kbd className="rounded border border-black/15 bg-black/5 px-1.5 py-0.5 font-mono text-[11px] text-tertiary/60">
          ←
        </kbd>
        {" / "}
        <kbd className="rounded border border-black/15 bg-black/5 px-1.5 py-0.5 font-mono text-[11px] text-tertiary/60">
          →
        </kbd>
      </p>
    </div>
  );
}

function WhyUsSection() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section
      id="why-us-section"
      aria-labelledby="why-us-heading"
      className="relative isolate w-full min-w-0 scroll-mt-8 overflow-x-clip bg-[#d9d9d9] py-16 pb-16 sm:py-20 sm:pb-20 md:pt-20 md:pb-24"
    >
      <div className="relative z-20 mx-auto min-w-0 max-w-6xl overflow-x-clip px-4 sm:px-5 md:px-6 xl:max-w-[1600px]">
        <motion.header
          className="mb-12 max-w-3xl sm:mb-14 md:mb-16"
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
              Why Zext
            </span>
            <motion.span
              className="hidden h-px min-w-16 flex-1 origin-left bg-linear-to-r from-black/20 to-transparent sm:block sm:max-w-[min(40vw,280px)]"
              style={{ transformOrigin: "left center" }}
              variants={lineGrow}
              aria-hidden
            />
          </motion.div>
          <motion.h2
            id="why-us-heading"
            className="text-[clamp(1.85rem,4.2vw,3.4rem)] font-bold leading-[1.12] tracking-tight text-tertiary"
            variants={headerItem}
          >
            <span className="block">Why organizations</span>
            <span className="mt-1 block text-tertiary/55 sm:mt-2">
              choose Zext
            </span>
          </motion.h2>
          <motion.p
            className="mt-4 text-base leading-relaxed text-tertiary/60 sm:text-lg"
            variants={headerItem}
          >
            <motion.span
              className="inline text-sky-600"
              animate={reduceMotion ? { opacity: 1 } : { opacity: [1, 0.2, 1] }}
              transition={
                reduceMotion
                  ? undefined
                  : {
                      duration: 1.35,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
              }
            >
              Turn the pages
            </motion.span>{" "}
            - the old industry way on the left, the Zext approach on the right.
          </motion.p>
        </motion.header>

        <motion.div
          className="min-w-0 max-w-full"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8% 0px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
        >
          <WhyUsFlipBook reduceMotion={reduceMotion} />
        </motion.div>
      </div>
    </section>
  );
}

export default WhyUsSection;
