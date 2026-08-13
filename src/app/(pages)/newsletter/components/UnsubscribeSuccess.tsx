import Link from "next/link";
import { ArrowUpRight, CheckCircle } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const formShellClass =
  "overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-white/5 via-white/2 to-black/60 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_20px_48px_-24px_rgba(0,0,0,0.55)] sm:rounded-[1.35rem]";

export default function UnsubscribeSuccess() {
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
        className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full border border-white/15 bg-white/5 shadow-[0_0_40px_-8px_rgba(255,255,255,0.12)]"
      >
        <CheckCircle
          className="size-9 text-emerald-400/90"
          strokeWidth={1.5}
          aria-hidden
        />
      </motion.div>
      <h2 className="text-2xl font-bold tracking-tight text-white">
        You&apos;re unsubscribed.
      </h2>
      <p className="mx-auto mt-2 max-w-[36ch] text-sm leading-relaxed text-white/50">
        We&apos;ve received your request. Marketing emails to this address will
        stop shortly. Changed your mind?
      </p>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-6">
        <Link
          href="/newsletter"
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-secondary transition-colors hover:text-secondary/85"
        >
          Subscribe again
          <ArrowUpRight
            className="size-4 transition-transform group-hover:rotate-45"
            strokeWidth={2}
            aria-hidden
          />
        </Link>
        <span className="hidden text-white/15 sm:inline" aria-hidden>
          |
        </span>
        <Link
          href="/"
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-white/55 transition-colors hover:text-white/80"
        >
          Back to home
          <ArrowUpRight
            className="size-4 transition-transform group-hover:rotate-45"
            strokeWidth={2}
            aria-hidden
          />
        </Link>
      </div>
    </motion.div>
  );
}
