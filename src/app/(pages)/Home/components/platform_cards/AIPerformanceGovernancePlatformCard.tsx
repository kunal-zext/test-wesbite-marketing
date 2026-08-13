"use client";

import { motion } from "motion/react";
import { Check, FileCheck2, Coins, ShieldCheck, Gauge } from "lucide-react";
import { LoopTypewriterText } from "@/app/(pages)/Home/components/platform_cards/LoopTypewriter";

const EASE = [0.22, 1, 0.36, 1] as const;

const STATUS_LINES = [
  "router.select(balanced)",
  "eval.accuracy 98.6%",
  "cost.guard −18%",
  "compliance.check ✓",
] as const;

const RELIABILITY = 0.994;
const R = 30;
const CIRC = 2 * Math.PI * R;

const READOUTS = [
  { icon: Coins, label: "Token cost", value: "−18%" },
  { icon: Gauge, label: "Accuracy", value: "98.6%" },
] as const;

const GUARDRAILS = [
  { icon: Coins, label: "Cost cap" },
  { icon: ShieldCheck, label: "PII filter" },
  { icon: Gauge, label: "Eval gate" },
  { icon: FileCheck2, label: "Audit log" },
] as const;

/**
 * **AI Performance, Governance & Reliability** - a reliability monitor: a radial
 * uptime gauge with cost/accuracy readouts, over a row of enforced guardrails
 * (cost cap, PII filter, eval gate, audit log).
 */
export function AIPerformanceGovernancePlatformCard() {
  return (
    <div className="relative flex min-h-[260px] flex-1 flex-col overflow-hidden rounded-2xl border border-violet-400/35 bg-linear-to-b from-violet-900/30 via-[#101831] to-[#0b1126]">
      <div
        className="pointer-events-none absolute -right-16 -top-12 size-44 rounded-full bg-violet-500/10 blur-3xl"
        aria-hidden
      />

      <header className="relative flex items-center justify-between gap-3 border-b border-violet-400/15 px-4 py-2.5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-200/85">
          Reliability monitor
        </p>
        <span className="flex shrink-0 items-center gap-1.5 rounded-md border border-violet-400/25 bg-black/40 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-violet-200/85">
          <span className="relative flex size-1.5" aria-hidden>
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-violet-400/70" />
            <span className="relative inline-flex size-1.5 rounded-full bg-violet-300" />
          </span>
          Live
        </span>
      </header>

      <div className="relative flex flex-1 flex-col gap-3 p-4">
        <LoopTypewriterText
          phrases={STATUS_LINES}
          className="font-mono text-[10px] text-violet-200/70"
          typeMs={34}
          holdMs={2000}
        />

        <div className="flex items-center gap-4">
          <div className="relative size-[84px] shrink-0">
            <svg viewBox="0 0 72 72" className="size-full -rotate-90" aria-hidden>
              <circle
                cx="36"
                cy="36"
                r={R}
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="6"
              />
              <motion.circle
                cx="36"
                cy="36"
                r={R}
                fill="none"
                stroke="rgb(196 181 253)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={CIRC}
                initial={{ strokeDashoffset: CIRC }}
                whileInView={{ strokeDashoffset: CIRC * (1 - RELIABILITY) }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: EASE }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-mono text-[15px] font-semibold tabular-nums text-white">
                99.4%
              </span>
              <span className="text-[8px] uppercase tracking-wider text-white/40">
                Uptime
              </span>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-2">
            {READOUTS.map((m) => {
              const Icon = m.icon;
              return (
                <div
                  key={m.label}
                  className="flex items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/3 px-2.5 py-1.5"
                >
                  <span className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-white/45">
                    <Icon
                      className="size-3.5 text-violet-200/80"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                    {m.label}
                  </span>
                  <span className="font-mono text-[12px] font-semibold tabular-nums text-white">
                    {m.value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-auto grid grid-cols-2 gap-2">
          {GUARDRAILS.map((g, i) => {
            const Icon = g.icon;
            return (
              <motion.div
                key={g.label}
                className="flex items-center gap-2 rounded-lg border border-violet-400/15 bg-violet-400/6 px-2.5 py-1.5"
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: EASE, delay: 0.3 + i * 0.1 }}
              >
                <Icon
                  className="size-3.5 shrink-0 text-violet-200/75"
                  strokeWidth={1.75}
                  aria-hidden
                />
                <span className="min-w-0 flex-1 truncate text-[10.5px] text-white/75">
                  {g.label}
                </span>
                <span className="flex size-4 shrink-0 items-center justify-center rounded-full border border-violet-400/40 bg-violet-500/15 text-violet-200">
                  <Check className="size-2.5" strokeWidth={3} aria-hidden />
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
