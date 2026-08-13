import Link from "next/link";
import {
  ArrowUpRight,
  Bot,
  CheckCircle,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const formShellClass =
  "overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-white/5 via-white/2 to-black/60 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_20px_48px_-24px_rgba(0,0,0,0.55)] sm:rounded-[1.35rem]";

const TOPICS = [
  { icon: Bot, label: "AI tool drops" },
  { icon: TrendingUp, label: "Industry trends" },
  { icon: Zap, label: "Automation tips" },
  { icon: Sparkles, label: "Weekly picks" },
] as const;

export default function NewsletterSubscribeSuccess() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.45, ease: EASE }}
      className={cn(formShellClass, "p-8 text-center sm:p-10")}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          delay: 0.12,
          type: "spring",
          stiffness: 260,
          damping: 18,
        }}
        className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full border border-secondary/30 bg-secondary/10 shadow-[0_0_40px_-8px_rgba(143,224,255,0.35)]"
      >
        <CheckCircle
          className="size-9 text-secondary"
          strokeWidth={1.5}
          aria-hidden
        />
      </motion.div>
      <h2 className="text-2xl font-bold tracking-tight text-white">
        You&apos;re in.
      </h2>
      <p className="mx-auto mt-2 max-w-[42ch] text-sm leading-relaxed text-white/50">
        Curated AI news, tools, and picks are on their way to your inbox.
        Welcome aboard.
      </p>
      <div className="mx-auto mt-8 flex max-w-sm flex-wrap justify-center gap-2">
        {TOPICS.map(({ icon: Icon, label }) => (
          <span
            key={label}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/4 px-3 py-1.5 text-xs font-medium text-white/55"
          >
            <Icon
              className="size-3.5 text-secondary/80"
              strokeWidth={2}
              aria-hidden
            />
            {label}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
