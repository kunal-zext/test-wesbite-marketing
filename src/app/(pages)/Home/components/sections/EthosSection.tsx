"use client";

import {
  motion,
  type Variants,
  useAnimationFrame,
  useReducedMotion,
} from "motion/react";
import { useState } from "react";
import { cn } from "@/utils";
import { SECTION_IDS } from "@/utils/homeAnchors";

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

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

const ETHOS_CARDS = [
  {
    id: "complexity",
    headline: "Complexity is our job, not yours.",
    body: "We take something that feels overwhelming and make it simple, practical, and liveable inside your organisation.",
  },
  {
    id: "honesty",
    headline: "Honesty over revenue.",
    body: "We tell clients the truth, even when it costs us the deal.",
  },
  {
    id: "long-term",
    headline: "Long-term over transactional.",
    body: "We are not interested in one-off projects. We want to grow alongside our clients.",
  },
] as const;

const INTEGRITY_STORY_TITLE = "The Integrity Story";
const INTEGRITY_STORY_QUOTE =
  "We were once trusted by a client to evaluate a significant technology investment on their behalf. After a thorough assessment, we recommended they do not proceed. We lost the engagement. The client kept their capital - and their trust in us. That is the kind of partner we want to be.";

function IntegrityStoryCard() {
  return (
    <div className="rounded-2xl border border-white/10 bg-linear-to-br from-white/4 to-black/60 p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] sm:rounded-[1.35rem] sm:p-10 md:p-12">
      <h3 className="mb-6 text-center text-lg font-bold tracking-tight text-white sm:text-xl">
        {INTEGRITY_STORY_TITLE}
      </h3>
      <blockquote className="text-pretty text-center italic leading-relaxed text-white/70 sm:text-lg sm:leading-relaxed">
        {INTEGRITY_STORY_QUOTE}
      </blockquote>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Card 1 – Complexity  
   A stack of "layers" that lift, re-order, and collapse in a loop
   ───────────────────────────────────────────────────────── */
function ComplexityVisual() {
  /* 3 layers rise one by one, then collapse */
  const layers = [
    {
      delay: 0,
      color: "rgba(143,224,255,0.22)",
      border: "rgba(143,224,255,0.45)",
      label: "raw complexity",
    },
    {
      delay: 0.55,
      color: "rgba(143,224,255,0.13)",
      border: "rgba(143,224,255,0.28)",
      label: "structured",
    },
    {
      delay: 1.1,
      color: "rgba(143,224,255,0.06)",
      border: "rgba(143,224,255,0.15)",
      label: "simple",
    },
  ];

  return (
    <div
      className="relative flex h-28 w-full items-end justify-center pb-2"
      aria-hidden
    >
      {layers.map((l, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 rounded-lg border"
          style={{
            width: `${84 - i * 12}%`,
            height: 26,
            background: l.color,
            borderColor: l.border,
            translateX: "-50%",
          }}
          animate={{
            bottom: [8 + i * 8, 8 + i * 30, 8 + i * 8],
            opacity: [0.5, 1, 0.5],
            scale: [0.97, 1, 0.97],
          }}
          transition={{
            duration: 3.8,
            delay: l.delay,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.45, 1],
          }}
        >
          <span className="absolute inset-0 flex items-center justify-center font-mono text-[8px] uppercase tracking-widest text-secondary/50">
            {l.label}
          </span>
        </motion.div>
      ))}

      {/* scanning line that sweeps across the stack */}
      <motion.div
        className="pointer-events-none absolute left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(143,224,255,0.55), transparent)",
        }}
        animate={{ top: ["15%", "85%", "15%"] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function ComplexityCard({
  headline,
  body,
  isActive,
  onToggle,
}: {
  headline: string;
  body: string;
  isActive: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      className={cn(
        "group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border transition-all duration-500 sm:rounded-[1.35rem]",
        isActive
          ? "border-secondary/40 bg-linear-to-br from-secondary/12 via-secondary/4 to-black/80 shadow-[0_0_50px_-12px_rgba(143,224,255,0.35)]"
          : "border-white/10 bg-linear-to-br from-white/3 to-black/60 hover:border-white/20 hover:from-white/5",
      )}
      onClick={onToggle}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      {/* Subtle moving grid */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-20"
        aria-hidden
        animate={{ backgroundPositionY: ["0px", "24px"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Hover: secondary wash + drifting glow (behind content) */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-5%,rgba(143,224,255,0.14),transparent_62%)]" />
        <motion.div
          className="absolute -left-[20%] top-1/2 h-[130%] w-[70%] -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(143,224,255,0.16),transparent_68%)] blur-3xl"
          animate={{ x: ["-4%", "8%", "-4%"] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "linear-gradient(118deg, transparent 36%, rgba(143,224,255,0.14) 48%, transparent 60%)",
            backgroundSize: "220% 100%",
          }}
          animate={{ backgroundPosition: ["0% 0%", "100% 0%"] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 flex flex-1 flex-col p-6 sm:p-8">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div
            className={cn(
              "flex size-12 shrink-0 items-center justify-center rounded-xl border transition-all duration-500",
              isActive
                ? "border-secondary/50 bg-secondary/20 shadow-[0_0_24px_-6px_rgba(143,224,255,0.5)]"
                : "border-white/15 bg-white/5 group-hover:border-white/25",
            )}
          >
            {/* Layers icon with staggered stroke animation */}
            <svg
              viewBox="0 0 24 24"
              className={cn(
                "size-6 transition-all duration-500",
                isActive
                  ? "text-secondary"
                  : "text-white/60 group-hover:text-white/80",
              )}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {[
                "M12 2L2 7l10 5 10-5-10-5z",
                "M2 17l10 5 10-5",
                "M2 12l10 5 10-5",
              ].map((d, i) => (
                <motion.path
                  key={i}
                  d={d}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{
                    duration: 2.4,
                    delay: i * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </svg>
          </div>
          <motion.div
            className={cn(
              "grid size-8 shrink-0 place-items-center rounded-full border transition-colors duration-500",
              isActive
                ? "border-secondary/40 bg-secondary/15"
                : "border-white/15 bg-white/5",
            )}
            animate={{ rotate: [0, 90, 180, 90, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "50% 50%" }}
          >
            <svg
              viewBox="0 0 24 24"
              className={cn(
                "size-[15px] shrink-0 transition-colors duration-500",
                isActive ? "text-secondary" : "text-white/50",
              )}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </motion.div>
        </div>

        {/* The animated layer stack visual */}
        <ComplexityVisual />

        <h3 className="mb-3 mt-2 text-xl font-bold leading-snug tracking-tight text-white sm:text-2xl">
          {headline}
        </h3>
        <p
          className={cn(
            "text-sm leading-relaxed transition-colors duration-500 sm:text-base sm:leading-relaxed",
            isActive
              ? "text-white/75"
              : "text-white/50 group-hover:text-white/65",
          )}
        >
          {body}
        </p>

        {/* Progress bar that fills then drains */}
        <div
          className="mt-6 h-1 w-full overflow-hidden rounded-full bg-white/8"
          aria-hidden
        >
          <motion.div
            className={cn(
              "h-full rounded-full",
              isActive
                ? "bg-secondary shadow-[0_0_16px_rgba(143,224,255,0.6)]"
                : "bg-white/25",
            )}
            animate={{ width: ["0%", "100%", "0%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   Card 2 – Honesty  
   A checkmark that draws itself, then ripples outward
   ───────────────────────────────────────────────────────── */
function HonestyVisual() {
  return (
    <div
      className="relative flex h-28 w-full items-center justify-center"
      aria-hidden
    >
      {/* Ripple rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-violet-400/40"
          animate={{
            width: [40, 110],
            height: [40, 110],
            opacity: [0.7, 0],
          }}
          transition={{
            duration: 2.2,
            delay: i * 0.7,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Central checkmark in a circle */}
      <div className="relative flex size-12 items-center justify-center rounded-full border border-violet-400/50 bg-violet-500/20">
        <svg
          viewBox="0 0 24 24"
          className="size-6"
          fill="none"
          stroke="rgba(196,168,255,0.95)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path
            d="M20 6L9 17l-5-5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 1, 0] }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.4, 0.7, 1],
            }}
          />
        </svg>
      </div>

      {/* Truth labels that fade in sequence */}
      {[
        { text: "honest", x: -64, y: -20, delay: 0.6 },
        { text: "direct", x: 54, y: -12, delay: 1.1 },
        { text: "clear", x: -48, y: 28, delay: 1.6 },
      ].map((item) => (
        <motion.span
          key={item.text}
          className="pointer-events-none absolute font-mono text-[9px] uppercase tracking-widest text-violet-300/60"
          style={{
            left: `calc(50% + ${item.x}px)`,
            top: `calc(50% + ${item.y}px)`,
          }}
          animate={{ opacity: [0, 0.8, 0] }}
          transition={{
            duration: 2.8,
            delay: item.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {item.text}
        </motion.span>
      ))}
    </div>
  );
}

function HonestyCard({
  headline,
  body,
  isActive,
  onToggle,
}: {
  headline: string;
  body: string;
  isActive: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      className={cn(
        "group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border transition-all duration-500 sm:rounded-[1.35rem]",
        isActive
          ? "border-violet-400/40 bg-linear-to-br from-violet-500/[0.14] via-violet-500/5 to-black/80 shadow-[0_0_50px_-12px_rgba(167,139,250,0.35)]"
          : "border-white/10 bg-linear-to-br from-white/3 to-black/60 hover:border-white/20 hover:from-white/5",
      )}
      onClick={onToggle}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
    >
      {/* Ambient glow blob that drifts */}
      <motion.div
        className="pointer-events-none absolute right-0 top-0 size-52 rounded-full bg-violet-500/10 blur-3xl"
        aria-hidden
        animate={{
          x: [0, -20, 0],
          y: [0, 20, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Hover: violet bloom + slow shimmer (behind content) */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_95%_70%_at_80%_20%,rgba(167,139,250,0.16),transparent_60%)]" />
        <motion.div
          className="absolute bottom-0 left-0 h-40 w-[85%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.2),transparent_70%)] blur-3xl"
          animate={{ scale: [1, 1.08, 1], opacity: [0.55, 0.85, 0.55] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "linear-gradient(125deg, transparent 38%, rgba(167,139,250,0.12) 50%, transparent 62%)",
            backgroundSize: "200% 100%",
          }}
          animate={{ backgroundPosition: ["100% 0%", "0% 0%"] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 flex flex-1 flex-col p-6 sm:p-8">
        <div className="mb-4 flex items-center gap-3">
          <div
            className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-lg border transition-all duration-500",
              isActive
                ? "border-violet-400/50 bg-violet-500/20"
                : "border-white/15 bg-white/5 group-hover:border-white/25",
            )}
          >
            <svg
              viewBox="0 0 24 24"
              className={cn(
                "size-5 transition-all duration-500",
                isActive
                  ? "text-violet-300"
                  : "text-white/60 group-hover:text-white/80",
              )}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <motion.path
                d="M20 6L9 17l-5-5"
                animate={{ pathLength: [0, 1, 1, 0] }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.4, 0.7, 1],
                }}
              />
            </svg>
          </div>
          {/* Horizontal "signal" line that pulses */}
          <div className="relative h-px flex-1 overflow-hidden rounded-full bg-white/8">
            <motion.div
              className={cn(
                "absolute inset-y-0 rounded-full",
                isActive ? "bg-violet-400/70" : "bg-white/30",
              )}
              animate={{ left: ["-100%", "100%"] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ width: "40%" }}
            />
          </div>
        </div>

        {/* Central visual animation */}
        <HonestyVisual />

        <h3 className="mb-3 mt-2 text-xl font-bold leading-snug tracking-tight text-white sm:text-2xl">
          {headline}
        </h3>
        <p
          className={cn(
            "text-sm leading-relaxed transition-colors duration-500 sm:text-base sm:leading-relaxed",
            isActive
              ? "text-white/75"
              : "text-white/50 group-hover:text-white/65",
          )}
        >
          {body}
        </p>

        <div className="mt-auto pt-6">
          <motion.div
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-all duration-500",
              isActive
                ? "border-violet-400/40 bg-violet-500/15 text-violet-200"
                : "border-white/15 bg-white/5 text-white/50 group-hover:border-white/25 group-hover:text-white/70",
            )}
          >
            <motion.span
              className={cn(
                "size-1.5 rounded-full",
                isActive ? "bg-violet-400" : "bg-white/40",
              )}
              animate={{
                scale: [1, 1.6, 1],
                opacity: [1, 0.4, 1],
              }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              aria-hidden
            />
            Truth first
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   Card 3 – Long-term  
   A glowing dot that journeys along a wave path endlessly
   ───────────────────────────────────────────────────────── */
function LongTermVisual() {
  /* We animate a dot travelling along the SVG path via offsetDistance */
  return (
    <div className="relative h-28 w-full overflow-hidden" aria-hidden>
      <svg
        viewBox="0 0 300 100"
        className="absolute inset-0 size-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="waveGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(34,211,238,0)" />
            <stop offset="40%" stopColor="rgba(34,211,238,0.5)" />
            <stop offset="100%" stopColor="rgba(34,211,238,0.12)" />
          </linearGradient>
        </defs>

        {/* Background faint wave */}
        <motion.path
          id="wavePath"
          d="M 0 62 C 40 20, 90 90, 150 50 S 240 10, 300 50"
          fill="none"
          stroke="rgba(34,211,238,0.12)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          animate={{ strokeDashoffset: [0, -24] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
        />

        {/* Brighter animated foreground wave that draws itself */}
        <motion.path
          d="M 0 62 C 40 20, 90 90, 150 50 S 240 10, 300 50"
          fill="none"
          stroke="url(#waveGrad)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, pathOffset: 0 }}
          animate={{ pathLength: [0, 0.6, 0], pathOffset: [0, 0.4, 1] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Second wave lower, opposite phase */}
        <motion.path
          d="M 0 72 C 50 40, 100 100, 160 62 S 250 20, 300 62"
          fill="none"
          stroke="rgba(34,211,238,0.07)"
          strokeWidth="1"
          strokeDasharray="3 6"
          animate={{ strokeDashoffset: [0, 36] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
        />

        {/* Milestone dots on the path */}
        {[
          { cx: 0, cy: 62, delay: 0 },
          { cx: 80, cy: 72, delay: 0.6 },
          { cx: 150, cy: 50, delay: 1.2 },
          { cx: 230, cy: 30, delay: 1.8 },
          { cx: 300, cy: 50, delay: 2.4 },
        ].map((pt, i) => (
          <motion.circle
            key={i}
            cx={pt.cx}
            cy={pt.cy}
            r="3.5"
            fill="rgba(34,211,238,0.9)"
            stroke="rgba(34,211,238,0.3)"
            strokeWidth="4"
            animate={{
              scale: [0.6, 1.1, 0.6],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3.2,
              delay: pt.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: `${pt.cx}px ${pt.cy}px` }}
          />
        ))}
      </svg>

      {/* "Year" labels that scroll in from right */}
      {[
        { label: "Year 1", delay: 0 },
        { label: "Year 2", delay: 1.2 },
        { label: "Year 3+", delay: 2.4 },
      ].map((item) => (
        <motion.span
          key={item.label}
          className="pointer-events-none absolute top-2 font-mono text-[8px] uppercase tracking-widest text-cyan-300/55"
          animate={{ x: [60, 0, -60], opacity: [0, 1, 0] }}
          transition={{
            duration: 3.6,
            delay: item.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ left: "50%", translateX: "-50%" }}
        >
          {item.label}
        </motion.span>
      ))}
    </div>
  );
}

function LongTermCard({
  headline,
  body,
  isActive,
  onToggle,
}: {
  headline: string;
  body: string;
  isActive: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      className={cn(
        "group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border transition-all duration-500 sm:rounded-[1.35rem]",
        isActive
          ? "border-cyan-400/40 bg-linear-to-br from-cyan-500/12 via-cyan-500/4 to-black/80 shadow-[0_0_50px_-12px_rgba(34,211,238,0.35)]"
          : "border-white/10 bg-linear-to-br from-white/3 to-black/60 hover:border-white/20 hover:from-white/5",
      )}
      onClick={onToggle}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.5, delay: 0.16, ease: EASE }}
    >
      {/* Hover: cyan horizon + travelling sheen (behind content) */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_55%_at_50%_110%,rgba(34,211,238,0.14),transparent_55%)]" />
        <motion.div
          className="absolute right-0 top-1/2 size-44 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.22),transparent_72%)] blur-2xl"
          animate={{ x: [0, -28, 0], opacity: [0.5, 0.95, 0.5] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-0 opacity-65"
          style={{
            background:
              "linear-gradient(110deg, transparent 35%, rgba(34,211,238,0.11) 50%, transparent 65%)",
            backgroundSize: "240% 100%",
          }}
          animate={{ backgroundPosition: ["0% 0%", "100% 0%"] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 flex flex-1 flex-col p-6 sm:p-8">
        <div className="mb-4 flex items-center justify-between">
          {/* Three dots that light up sequentially */}
          <div className="flex items-center gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className={cn(
                  "size-2 rounded-full",
                  isActive ? "bg-cyan-400" : "bg-white/20",
                )}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                  boxShadow: [
                    "0 0 0px rgba(34,211,238,0)",
                    "0 0 10px rgba(34,211,238,0.8)",
                    "0 0 0px rgba(34,211,238,0)",
                  ],
                }}
                transition={{
                  duration: 2.4,
                  delay: i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                aria-hidden
              />
            ))}
          </div>

          {/* Arrow that nudges right */}
          <motion.svg
            viewBox="0 0 24 24"
            className={cn(
              "size-6 transition-colors duration-500",
              isActive ? "text-cyan-400" : "text-white/40",
            )}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </motion.svg>
        </div>

        {/* Journey wave visual */}
        <LongTermVisual />

        <h3 className="mb-3 mt-2 text-xl font-bold leading-snug tracking-tight text-white sm:text-2xl">
          {headline}
        </h3>
        <p
          className={cn(
            "text-sm leading-relaxed transition-colors duration-500 sm:text-base sm:leading-relaxed",
            isActive
              ? "text-white/75"
              : "text-white/50 group-hover:text-white/65",
          )}
        >
          {body}
        </p>

        {/* Progress timeline bar with travelling glow */}
        <div className="mt-6 flex items-center gap-2">
          <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/8">
            <motion.div
              className={cn(
                "absolute inset-y-0 rounded-full",
                isActive
                  ? "bg-linear-to-r from-cyan-500/0 via-cyan-400 to-cyan-400/60"
                  : "bg-linear-to-r from-white/0 via-white/40 to-white/10",
              )}
              animate={{ left: ["-40%", "100%"] }}
              transition={{
                duration: 2.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ width: "40%" }}
            />
          </div>
          <motion.div
            className={cn(
              "size-3 shrink-0 rounded-full border-2 transition-colors duration-500",
              isActive
                ? "border-cyan-400 bg-cyan-400/40"
                : "border-white/30 bg-white/10",
            )}
            animate={{
              scale: [1, 1.3, 1],
              boxShadow: [
                "0 0 0px rgba(34,211,238,0)",
                "0 0 14px rgba(34,211,238,0.7)",
                "0 0 0px rgba(34,211,238,0)",
              ],
            }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />
        </div>
      </div>
    </motion.div>
  );
}

function EthosSection() {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  return (
    <section
      id={SECTION_IDS.ethos}
      aria-labelledby="ethos-heading"
      className="relative isolate w-full min-w-0 scroll-mt-8 overflow-hidden bg-tertiary py-16 sm:py-20 md:py-24"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(140,82,255,0.06),transparent_60%)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-5 md:px-6 xl:max-w-[1600px]">
        <motion.header
          className="mx-auto max-w-4xl text-center"
          variants={headerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          <motion.div
            className="mb-5 flex items-center justify-center gap-3 sm:gap-4"
            variants={headerItem}
          >
            <motion.span
              className="h-px w-10 shrink-0 bg-linear-to-r from-transparent to-white/25 sm:w-14 md:w-16"
              style={{ transformOrigin: "right center" }}
              variants={lineGrow}
              aria-hidden
            />
            <span className="text-[1vh] font-medium tracking-[0.15em] text-secondary sm:text-xs sm:tracking-[0.2em] md:text-base uppercase">
              ETHOS
            </span>
            <motion.span
              className="h-px w-10 shrink-0 bg-linear-to-l from-transparent to-white/25 sm:w-14 md:w-16"
              style={{ transformOrigin: "left center" }}
              variants={lineGrow}
              aria-hidden
            />
          </motion.div>

          <motion.h2
            id="ethos-heading"
            className="text-balance text-center text-[clamp(1.5rem,3.5vw,2.25rem)] font-bold leading-snug tracking-tight text-white"
            variants={headerItem}
          >
            Three Core Beliefs
          </motion.h2>
        </motion.header>

        <div className="mt-12 grid justify-items-center gap-5 sm:mt-14 sm:gap-6 lg:grid-cols-3">
          <ComplexityCard
            headline={ETHOS_CARDS[0].headline}
            body={ETHOS_CARDS[0].body}
            isActive={activeCard === ETHOS_CARDS[0].id}
            onToggle={() =>
              setActiveCard((prev) =>
                prev === ETHOS_CARDS[0].id ? null : ETHOS_CARDS[0].id,
              )
            }
          />
          <HonestyCard
            headline={ETHOS_CARDS[1].headline}
            body={ETHOS_CARDS[1].body}
            isActive={activeCard === ETHOS_CARDS[1].id}
            onToggle={() =>
              setActiveCard((prev) =>
                prev === ETHOS_CARDS[1].id ? null : ETHOS_CARDS[1].id,
              )
            }
          />
          <LongTermCard
            headline={ETHOS_CARDS[2].headline}
            body={ETHOS_CARDS[2].body}
            isActive={activeCard === ETHOS_CARDS[2].id}
            onToggle={() =>
              setActiveCard((prev) =>
                prev === ETHOS_CARDS[2].id ? null : ETHOS_CARDS[2].id,
              )
            }
          />
        </div>

        <motion.div
          className="mx-auto mt-16 max-w-3xl sm:mt-20 md:mt-24"
          variants={cardVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-8% 0px" }}
        >
          <IntegrityStoryCard />
        </motion.div>
      </div>
    </section>
  );
}

export default EthosSection;
