"use client";

import { motion } from "motion/react";
import { GraduationCap, Users } from "lucide-react";
import { LoopTypewriterText } from "@/app/(pages)/Home/components/platform_cards/LoopTypewriter";

const EASE = [0.22, 1, 0.36, 1] as const;

const FEED_LINES = [
  "Cohort session live",
  "Hands-on GenAI lab",
  "Certification track…",
  "Corporate enablement",
] as const;

const SKILLS = [
  { label: "Prompting & GenAI tools", pct: 86 },
  { label: "Agent workflows", pct: 64 },
  { label: "AI governance", pct: 48 },
  { label: "Applied adoption", pct: 72 },
] as const;

/**
 * **AI Capability Building & Academy** - a capability tracker: per-skill mastery
 * bars filling across a cohort, with certification progress.
 */
export function TrainingUpskillingPlatformCard() {
  return (
    <div className="relative flex min-h-[260px] flex-1 flex-col overflow-hidden rounded-2xl border border-amber-400/35 bg-linear-to-b from-amber-900/30 via-[#101831] to-[#0b1126]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(251,191,36,0.9) 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
        aria-hidden
      />

      <header className="relative flex items-center justify-between gap-3 border-b border-amber-400/15 px-4 py-2.5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-200/85">
          Capability tracker
        </p>
        <span className="flex shrink-0 items-center gap-1.5 rounded-md border border-amber-400/25 bg-black/40 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-200/85">
          <Users className="size-3" strokeWidth={2} aria-hidden /> Cohort 24
        </span>
      </header>

      <div className="relative flex flex-1 flex-col gap-3 p-4">
        <LoopTypewriterText
          phrases={FEED_LINES}
          className="font-mono text-[10px] text-amber-200/70"
          typeMs={34}
          holdMs={2000}
        />

        <ul className="flex flex-1 flex-col justify-center gap-2.5">
          {SKILLS.map((s, i) => (
            <li key={s.label}>
              <div className="mb-1 flex items-baseline justify-between gap-2">
                <span className="min-w-0 truncate text-[11px] text-white/80">
                  {s.label}
                </span>
                <span className="shrink-0 font-mono text-[10px] font-semibold tabular-nums text-amber-200/85">
                  {s.pct}%
                </span>
              </div>
              <span
                className="block h-1.5 w-full overflow-hidden rounded-full bg-white/8"
                aria-hidden
              >
                <motion.span
                  className="block h-full origin-left rounded-full bg-linear-to-r from-amber-500/70 to-amber-300/90"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: s.pct / 100 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: EASE, delay: i * 0.1 }}
                />
              </span>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 rounded-lg border border-amber-400/20 bg-amber-400/6 px-2.5 py-2">
          <span className="flex size-6 shrink-0 items-center justify-center rounded-md border border-amber-400/35 bg-amber-500/15 text-amber-200">
            <GraduationCap className="size-3.5" strokeWidth={1.75} aria-hidden />
          </span>
          <span className="min-w-0 flex-1 text-[10.5px] text-white/75">
            Certification track
          </span>
          <span className="shrink-0 font-mono text-[10px] font-semibold tabular-nums text-amber-200/85">
            18 / 24 certified
          </span>
        </div>
      </div>
    </div>
  );
}
