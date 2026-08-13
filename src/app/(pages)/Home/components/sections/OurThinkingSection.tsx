"use client";

import { useMemo, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
  type Variants,
} from "motion/react";
import { cn } from "@/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const BELIEFS = [
  {
    id: "design-first",
    text: "Design first, always. Every product starts with empathy and storytelling.",
  },
  {
    id: "amplify-humans",
    text: "AI should amplify humans, not replace them.",
  },
  {
    id: "impact",
    text: "Innovation is only meaningful when it drives impact.",
  },
] as const;

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

function BeliefIndex({ index }: { index: number }) {
  const s = String(index + 1).padStart(2, "0");
  return (
    <div
      className="shrink-0 font-mono text-sm font-bold tabular-nums leading-none sm:pt-1 sm:text-base"
      aria-hidden
    >
      <span className="text-white/40">{s[0]}</span>
      <span className="text-secondary">{s[1]}</span>
    </div>
  );
}

function BeliefWord({
  progress,
  wordIndex,
  wordCount,
  reducedMotion,
  children,
}: {
  progress: MotionValue<number>;
  wordIndex: number;
  wordCount: number;
  reducedMotion: boolean;
  children: string;
}) {
  const from = wordIndex / wordCount;
  const to = (wordIndex + 1) / wordCount;
  const opacity = useTransform(progress, [from, to], [0.25, 1]);

  if (reducedMotion) {
    return <span className="text-white">{children}</span>;
  }

  return (
    <motion.span className="inline text-white" style={{ opacity }}>
      {children}
    </motion.span>
  );
}

function BeliefCard({
  id,
  text,
  index,
  reducedMotion,
}: {
  id: string;
  text: string;
  index: number;
  reducedMotion: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    // Animation starts when card enters at 85%, completes when card top reaches 25% from top.
    offset: ["start 95%", "start 60%"],
  });

  const words = useMemo(() => text.split(/\s+/).filter(Boolean), [text]);

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border border-white/10 bg-white/2 px-5 py-7 sm:px-7 sm:py-9 md:px-8",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_16px_40px_-28px_rgba(0,0,0,0.55)]",
        "transition-[border-color,box-shadow,background-color] duration-300",
        "hover:border-white/14 hover:bg-white/3",
      )}
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-baseline sm:gap-8 md:gap-10">
        <BeliefIndex index={index} />
        <p className="min-w-0 text-xl font-bold leading-snug tracking-tight sm:text-2xl md:text-3xl lg:text-[clamp(1.5rem,2.8vw,2.125rem)]">
          {words.map((word, wi) => (
            <span key={`${id}-${wi}`}>
              <BeliefWord
                progress={scrollYProgress}
                wordIndex={wi}
                wordCount={words.length}
                reducedMotion={reducedMotion}
              >
                {word}
              </BeliefWord>
              {wi < words.length - 1 ? " " : ""}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

function OurThinkingSection() {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <section
      id="our-thinking-section"
      aria-labelledby="our-thinking-heading"
      className="relative isolate w-full min-w-0 scroll-mt-8 overflow-hidden bg-background py-16 sm:py-20 md:pt-20 md:pb-28"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-x-0 top-0 h-[55%] bg-[radial-gradient(ellipse_90%_80%_at_50%_-20%,rgba(255,255,255,0.04),transparent_60%)]" />
        <div className="absolute inset-0 bg-linear-to-b from-secondary/2 via-transparent to-transparent" />
        <div className="absolute right-0 bottom-0 h-[45%] w-1/2 max-w-3xl bg-[radial-gradient(ellipse_at_bottom_right,rgba(140,82,255,0.05),transparent_65%)]" />
      </div>
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-5 md:px-6 xl:max-w-[1600px]">
        <motion.header
          className="mb-10 max-w-3xl sm:mb-12 md:mb-14"
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
              Our thinking
            </span>
            <motion.span
              className="hidden h-px min-w-16 flex-1 origin-left bg-linear-to-r from-white/25 to-transparent sm:block sm:max-w-[min(40vw,280px)]"
              style={{ transformOrigin: "left center" }}
              variants={lineGrow}
              aria-hidden
            />
          </motion.div>
          <motion.h2
            id="our-thinking-heading"
            className="text-[clamp(1.75rem,4vw,3.25rem)] font-bold leading-[1.12] tracking-tight text-white"
            variants={headerItem}
          >
            How we think
          </motion.h2>
          <motion.p
            className="mt-4 max-w-2xl text-base leading-relaxed text-white/48 sm:mt-5 sm:text-lg"
            variants={headerItem}
          >
            We don&apos;t just build products - we build{" "}
            <span className="text-white/70">momentum</span>.
          </motion.p>
        </motion.header>

        <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-secondary/90 sm:mb-6">
          Core beliefs
        </p>

        <div className="flex flex-col gap-4 sm:gap-5">
          {BELIEFS.map((belief, index) => (
            <BeliefCard
              key={belief.id}
              id={belief.id}
              text={belief.text}
              index={index}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default OurThinkingSection;
