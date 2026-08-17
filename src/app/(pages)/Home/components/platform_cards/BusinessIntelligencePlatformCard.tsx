"use client";

import { motion } from "motion/react";
import { AlertTriangle, Search, TrendingDown, TrendingUp } from "lucide-react";
import { LoopTypewriterText } from "@/app/(pages)/Home/components/platform_cards/LoopTypewriter";

const EASE = [0.22, 1, 0.36, 1] as const;

const QUESTIONS = [
  "Why did margin dip in Q3?",
  "Which region grew fastest?",
  "Top driver of churn?",
] as const;

const INSIGHTS = [
  {
    icon: TrendingDown,
    text: "Logistics cost +6%, Q3 margin driver",
    tag: "Top driver",
    tone: "down" as const,
  },
  {
    icon: TrendingUp,
    text: "APAC revenue +18%, fastest region",
    tag: "Growth",
    tone: "up" as const,
  },
  {
    icon: AlertTriangle,
    text: "Onboarding delay linked to churn",
    tag: "Risk",
    tone: "warn" as const,
  },
] as const;

const TONE = {
  up: "border-emerald-400/35 bg-emerald-500/10 text-emerald-300/90",
  down: "border-rose-400/35 bg-rose-500/10 text-rose-300/90",
  warn: "border-amber-400/35 bg-amber-500/10 text-amber-300/90",
} as const;

/**
 * **Business Intelligence & Decision Systems** - a decision copilot: a natural
 * language question resolving into ranked, sourced insights across finance,
 * operations and sales.
 */
export function BusinessIntelligencePlatformCard() {
  return (
    <div className="relative flex min-h-[260px] flex-1 flex-col overflow-hidden rounded-2xl border border-sky-400/35 bg-linear-to-b from-sky-900/30 via-[#101831] to-[#0b1126]">
      <div
        className="pointer-events-none absolute -left-16 -top-12 size-44 rounded-full bg-sky-500/12 blur-3xl"
        aria-hidden
      />

      <header className="relative flex items-center justify-between gap-3 border-b border-sky-400/15 px-4 py-2.5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-200/85">
          Decision copilot
        </p>
        <span className="shrink-0 rounded-md border border-sky-400/25 bg-black/40 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-sky-200/85">
          Confidence 96%
        </span>
      </header>

      <div className="relative flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center gap-2 rounded-xl border border-sky-400/25 bg-black/30 px-3 py-2">
          <Search
            className="size-3.5 shrink-0 text-sky-300/80"
            strokeWidth={2}
            aria-hidden
          />
          <LoopTypewriterText
            phrases={QUESTIONS}
            className="min-w-0 text-[11px] text-white/85"
            cursorClassName="bg-sky-300"
            typeMs={38}
            holdMs={2200}
          />
        </div>

        <ul className="flex flex-1 flex-col justify-center gap-2">
          {INSIGHTS.map((ins, i) => {
            const Icon = ins.icon;
            return (
              <motion.li
                key={ins.text}
                className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/3 px-2.5 py-2"
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: EASE, delay: 0.25 + i * 0.12 }}
              >
                <span
                  className={`flex size-6 shrink-0 items-center justify-center rounded-md border ${TONE[ins.tone]}`}
                >
                  <Icon className="size-3" strokeWidth={2} aria-hidden />
                </span>
                <span className="min-w-0 flex-1 text-[11px] leading-snug text-white/80">
                  {ins.text}
                </span>
                <span className="shrink-0 font-mono text-[8.5px] uppercase tracking-wider text-sky-200/70">
                  {ins.tag}
                </span>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
