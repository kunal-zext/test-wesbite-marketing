"use client";

import { motion } from "motion/react";
import { Bot, Globe, Share2, Sparkles } from "lucide-react";
import { LoopTypewriterText } from "@/app/(pages)/Home/components/platform_cards/LoopTypewriter";

const EASE = [0.22, 1, 0.36, 1] as const;

const FEED_LINES = [
  "Cited on ChatGPT…",
  "Ranked #2 on Google…",
  "Lead captured…",
  "Pipeline +₹4.2L…",
] as const;

const FUNNEL = [
  { label: "Reach", value: "1.2M" },
  { label: "Qualified leads", value: "340" },
  { label: "Pipeline", value: "₹4.2Cr" },
] as const;

const CHANNELS = [
  { icon: Globe, name: "Google", status: "#2", meter: 0.82 },
  { icon: Bot, name: "ChatGPT", status: "Cited", meter: 0.74 },
  { icon: Sparkles, name: "Perplexity", status: "Cited", meter: 0.61 },
  { icon: Share2, name: "LinkedIn", status: "Top voice", meter: 0.68 },
] as const;

/**
 * **AI Visibility & Revenue Systems** - a visibility-to-revenue board: a funnel
 * KPI strip (reach → leads → pipeline) over per-channel presence meters across
 * search and AI engines.
 */
export function AIVisibilityPlatformCard() {
  return (
    <div className="relative flex min-h-[260px] flex-1 flex-col overflow-hidden rounded-2xl border border-rose-400/35 bg-linear-to-b from-rose-900/30 via-[#101831] to-[#0b1126]">
      <div
        className="pointer-events-none absolute -right-16 -top-12 size-44 rounded-full bg-rose-500/12 blur-3xl"
        aria-hidden
      />

      <header className="relative flex items-center justify-between gap-3 border-b border-rose-400/15 px-4 py-2.5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-rose-200/85">
          Visibility index
        </p>
        <LoopTypewriterText
          phrases={FEED_LINES}
          className="font-mono text-[9px] text-rose-200/60"
          typeMs={32}
          holdMs={1900}
        />
      </header>

      <div className="relative flex flex-1 flex-col gap-3 p-4">
        <div className="grid grid-cols-3 gap-2">
          {FUNNEL.map((f, i) => (
            <div
              key={f.label}
              className="relative rounded-xl border border-white/10 bg-white/3 px-2.5 py-2"
            >
              <p className="font-mono text-[13px] font-semibold tabular-nums text-white">
                {f.value}
              </p>
              <p className="mt-0.5 text-[8.5px] uppercase tracking-wider text-white/40">
                {f.label}
              </p>
              {i < FUNNEL.length - 1 ? (
                <span
                  className="absolute -right-[7px] top-1/2 z-10 -translate-y-1/2 text-rose-300/70"
                  aria-hidden
                >
                  ›
                </span>
              ) : null}
            </div>
          ))}
        </div>

        <ul className="flex flex-1 flex-col justify-center gap-2">
          {CHANNELS.map((c, i) => {
            const Icon = c.icon;
            return (
              <li key={c.name} className="flex items-center gap-2.5">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-md border border-rose-400/20 bg-rose-400/10 text-rose-200/90">
                  <Icon className="size-3" strokeWidth={1.75} aria-hidden />
                </span>
                <span className="w-16 shrink-0 truncate text-[11px] text-white/75">
                  {c.name}
                </span>
                <span
                  className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/8"
                  aria-hidden
                >
                  <motion.span
                    className="block h-full origin-left rounded-full bg-linear-to-r from-rose-400/70 to-rose-300/90"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: c.meter }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: EASE, delay: i * 0.08 }}
                  />
                </span>
                <span className="w-14 shrink-0 text-right font-mono text-[9px] uppercase tracking-wider text-rose-200/70">
                  {c.status}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
