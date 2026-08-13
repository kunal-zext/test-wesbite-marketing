"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Bot, CheckCircle2, Cog, Zap } from "lucide-react";
import { LoopTypewriterText } from "@/app/(pages)/Home/components/platform_cards/LoopTypewriter";
import { cn } from "@/utils";

const FEED_LINES = [
  "workflow.trigger(onboarding)…",
  "agent.run(invoice)…",
  "task.completed ✓",
  "human.handoff →",
] as const;

const NODES = [
  { icon: Zap, label: "Trigger" },
  { icon: Bot, label: "AI Agent" },
  { icon: Cog, label: "Action" },
  { icon: CheckCircle2, label: "Done" },
] as const;

const STATS = [
  { label: "Tasks automated", value: "1,284" },
  { label: "Hrs saved / wk", value: "37" },
] as const;

const STEP_MS = 1600;

/**
 * **Enterprise AI Automation** - an agent workflow runtime: a Trigger → Agent →
 * Action → Done node graph with an active step travelling the connectors, plus
 * automation run stats and the business functions covered.
 */
export function EnterpriseAutomationPlatformCard() {
  const reduceMotion = useReducedMotion() ?? false;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % NODES.length);
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const progress =
    NODES.length <= 1 ? 1 : activeIndex / (NODES.length - 1);

  return (
    <div className="relative flex min-h-[260px] flex-1 flex-col overflow-hidden rounded-2xl border border-cyan-400/35 bg-linear-to-b from-cyan-900/30 via-[#101831] to-[#0b1126]">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 -top-12 size-44 rounded-full bg-cyan-500/12 blur-3xl"
        aria-hidden
      />

      <header className="relative flex items-center justify-between gap-3 border-b border-cyan-400/15 px-4 py-2.5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-200/85">
          Automation runtime
        </p>
        <span className="flex shrink-0 items-center gap-1.5 rounded-md border border-cyan-400/25 bg-black/40 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-cyan-200/85">
          <span className="relative flex size-1.5" aria-hidden>
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan-400/70" />
            <span className="relative inline-flex size-1.5 rounded-full bg-cyan-300" />
          </span>
          Live
        </span>
      </header>

      <div className="relative flex flex-1 flex-col gap-4 p-4">
        <LoopTypewriterText
          phrases={FEED_LINES}
          className="font-mono text-[10px] text-cyan-200/70"
          typeMs={32}
          holdMs={1800}
        />

        <div
          className="relative mx-auto w-full max-w-[360px] py-1"
          aria-label="Automation workflow: Trigger, AI Agent, Action, Done"
        >
          <div
            className="pointer-events-none absolute inset-x-[12%] top-[18px] h-[2px]"
            aria-hidden
          >
            <div className="absolute inset-0 rounded-full bg-white/10" />
            <motion.div
              className="absolute inset-y-0 left-0 origin-left rounded-full bg-linear-to-r from-cyan-500/60 to-cyan-300/90 shadow-[0_0_10px_rgba(143,224,255,0.25)]"
              style={{ width: "100%" }}
              initial={false}
              animate={{ scaleX: progress }}
              transition={{ type: "spring", stiffness: 240, damping: 30 }}
            />
          </div>

          <ol className="relative flex items-start justify-between">
            {NODES.map((n, i) => {
              const Icon = n.icon;
              const isActive = i === activeIndex;
              const isDone = i < activeIndex;
              return (
                <li
                  key={n.label}
                  className="flex w-14 flex-col items-center gap-1.5 text-center"
                >
                  <motion.span
                    className={cn(
                      "flex size-9 items-center justify-center rounded-full border transition-colors duration-300",
                      isActive
                        ? "border-cyan-400/65 bg-cyan-400/15 text-cyan-100 shadow-[0_0_14px_-2px_rgba(143,224,255,0.4)]"
                        : isDone
                          ? "border-cyan-400/40 bg-cyan-500/10 text-cyan-200/80"
                          : "border-white/12 bg-black/50 text-white/45",
                    )}
                    animate={
                      reduceMotion ? { scale: 1 } : { scale: isActive ? 1.1 : 1 }
                    }
                    transition={{ type: "spring", stiffness: 420, damping: 22 }}
                    aria-hidden
                  >
                    <Icon className="size-4" strokeWidth={1.75} />
                  </motion.span>
                  <span
                    className={cn(
                      "text-[9px] font-medium uppercase tracking-wider transition-colors duration-300",
                      isActive ? "text-white" : "text-white/45",
                    )}
                  >
                    {n.label}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-auto flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-lg border border-white/10 bg-white/3 px-2.5 py-1.5"
              >
                <p className="font-mono text-[13px] font-semibold tabular-nums text-white">
                  {s.value}
                </p>
                <p className="text-[8.5px] uppercase tracking-wider text-white/40">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center font-mono text-[9px] uppercase tracking-[0.18em] text-cyan-200/55">
            HR · Ops · Finance · Sales
          </p>
        </div>
      </div>
    </div>
  );
}
