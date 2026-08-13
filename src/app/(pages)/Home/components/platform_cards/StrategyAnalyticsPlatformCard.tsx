"use client";

import { motion } from "motion/react";
import { GitBranch } from "lucide-react";
import { LoopTypewriterText } from "@/app/(pages)/Home/components/platform_cards/LoopTypewriter";

const EASE = [0.22, 1, 0.36, 1] as const;

const FEED_LINES = [
  "feasibility.run()…",
  "sensitivity.test()…",
  "financial.model()…",
  "investor.pack ✓",
] as const;

const SCENARIOS: {
  name: string;
  roi: string;
  payback: string;
  primary?: boolean;
}[] = [
  { name: "Conservative", roi: "1.4×", payback: "18 mo" },
  { name: "Base", roi: "2.1×", payback: "12 mo", primary: true },
  { name: "Aggressive", roi: "3.3×", payback: "8 mo" },
];

// Connector endpoints align with the vertical centres of three equal rows.
const BRANCHES = [
  "M0 50 C 14 50 10 17 24 17",
  "M0 50 C 14 50 14 50 24 50",
  "M0 50 C 14 50 10 83 24 83",
] as const;

/**
 * **AI-Augmented Strategy & Analytics** - a scenario planner: a base case
 * branching into conservative / base / aggressive paths, each tagged with
 * modelled ROI and payback.
 */
export function StrategyAnalyticsPlatformCard() {
  return (
    <div className="relative flex min-h-[260px] flex-1 flex-col overflow-hidden rounded-2xl border border-emerald-400/35 bg-linear-to-b from-emerald-900/30 via-[#101831] to-[#0b1126]">
      <div
        className="pointer-events-none absolute -right-14 -top-10 size-40 rounded-full bg-emerald-500/10 blur-3xl"
        aria-hidden
      />

      <header className="relative flex items-center justify-between gap-3 border-b border-emerald-400/15 px-4 py-2.5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-200/85">
          Scenario planner
        </p>
        <span className="flex shrink-0 items-center gap-1 text-[10px] font-semibold text-emerald-300/90">
          <GitBranch className="size-3" strokeWidth={2} aria-hidden /> 3 paths
        </span>
      </header>

      <div className="relative flex flex-1 flex-col gap-3 p-4">
        <LoopTypewriterText
          phrases={FEED_LINES}
          className="font-mono text-[10px] text-emerald-200/65"
          typeMs={32}
          holdMs={1900}
        />

        <div className="flex flex-1 items-stretch">
          <div className="flex items-center">
            <span className="flex w-14 flex-col items-center gap-1 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-2 py-2 text-center">
              <span className="text-[10px] font-semibold leading-tight text-white">
                Base
              </span>
              <span className="text-[8px] uppercase tracking-wider text-emerald-200/60">
                case
              </span>
            </span>
          </div>

          <div className="relative w-7 self-stretch" aria-hidden>
            <svg
              viewBox="0 0 24 100"
              preserveAspectRatio="none"
              className="absolute inset-0 size-full"
            >
              {BRANCHES.map((d, i) => (
                <motion.path
                  key={d}
                  d={d}
                  fill="none"
                  stroke="rgb(110 231 183)"
                  strokeOpacity="0.5"
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.2 + i * 0.1 }}
                />
              ))}
            </svg>
          </div>

          <ul className="flex flex-1 flex-col justify-between gap-2">
            {SCENARIOS.map((s, i) => (
              <motion.li
                key={s.name}
                className={`flex flex-1 items-center justify-between gap-2 rounded-lg border px-2.5 py-1.5 ${
                  s.primary
                    ? "border-emerald-400/40 bg-emerald-500/10"
                    : "border-white/10 bg-white/3"
                }`}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: EASE, delay: 0.3 + i * 0.1 }}
              >
                <span className="min-w-0 truncate text-[10.5px] text-white/80">
                  {s.name}
                </span>
                <span className="flex shrink-0 items-baseline gap-1.5">
                  <span className="font-mono text-[12px] font-semibold tabular-nums text-emerald-200">
                    {s.roi}
                  </span>
                  <span className="font-mono text-[8.5px] uppercase tracking-wider text-white/40">
                    {s.payback}
                  </span>
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
