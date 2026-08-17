"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { Heart } from "lucide-react";
import { cn } from "@/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const stagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.11, delayChildren: 0.06 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

const fadeUpBody: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE, delay: 0.22 },
  },
};

function AmbientField({ reduced }: { reduced: boolean }) {
  if (reduced) {
    return (
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-secondary/6"
        aria-hidden
      />
    );
  }
  return (
    <>
      <motion.div
        className="pointer-events-none absolute -left-[20%] top-1/2 size-[min(400px,95vw)] -translate-y-1/2 rounded-full bg-secondary/18 blur-[90px]"
        aria-hidden
        animate={{
          x: [0, 28, 0],
          opacity: [0.28, 0.48, 0.28],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -right-[15%] -top-[10%] size-[min(260px,70vw)] rounded-full bg-violet-500/12 blur-[72px]"
        aria-hidden
        animate={{
          y: [0, 22, 0],
          x: [0, -16, 0],
        }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        aria-hidden
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
        animate={{ backgroundPosition: ["0px 0px", "28px 28px"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
    </>
  );
}

function EmpathyMark({ reduced }: { reduced: boolean }) {
  return (
    <div className="mb-8 flex items-center gap-4" aria-hidden>
      <motion.div
        className="relative flex size-14 shrink-0 items-center justify-center rounded-2xl border border-secondary/30 bg-secondary/10 shadow-[0_0_40px_-12px_rgba(143,224,255,0.35)]"
        whileHover={reduced ? undefined : { scale: 1.06 }}
        transition={{ type: "spring", stiffness: 420, damping: 26 }}
      >
        <Heart
          className="size-6 text-secondary"
          strokeWidth={1.5}
          fill="currentColor"
          fillOpacity={0.12}
        />
        {!reduced ? (
          <motion.span
            className="absolute inset-0 rounded-2xl border border-secondary/40"
            animate={{ scale: [1, 1.2, 1], opacity: [0.45, 0, 0.45] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
          />
        ) : null}
      </motion.div>
      <div className="relative h-1 min-w-16 flex-1 max-w-[140px] overflow-hidden rounded-full bg-linear-to-r from-secondary/45 via-secondary/10 to-transparent">
        {!reduced ? (
          <motion.div
            className="absolute top-0 h-full w-14 rounded-full bg-linear-to-r from-transparent via-secondary to-transparent opacity-95 shadow-[0_0_12px_rgba(143,224,255,0.45)]"
            initial={{ x: -56 }}
            animate={{ x: [-56, 200] }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 0.35,
            }}
          />
        ) : null}
      </div>
    </div>
  );
}

export default function UnsubscribeHeroColumn() {
  const reduced = useReducedMotion() ?? false;

  return (
    <motion.article
      className={cn(
        "group relative order-2 min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-white/3 p-6 sm:p-8 lg:p-10",
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),0_24px_80px_-32px_rgba(0,0,0,0.65)]",
        "transition-[transform,box-shadow,border-color] duration-500",
        "hover:border-secondary/25 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_32px_90px_-28px_rgba(143,224,255,0.12)]",
      )}
      initial={reduced ? undefined : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: EASE }}
      whileHover={reduced ? undefined : { y: -3 }}
    >
      <AmbientField reduced={reduced} />

      <div className="relative z-10">
        <EmpathyMark reduced={reduced} />

        <motion.h1
          variants={stagger}
          initial="hidden"
          animate="show"
          className="mb-6 text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.08] tracking-tight text-white"
        >
          <motion.span variants={fadeUp} className="block">
            Are you leaving?
          </motion.span>
          <motion.span
            variants={fadeUp}
            className="mt-2 block text-[clamp(1.125rem,2.5vw,1.5rem)] font-medium leading-snug text-white/45"
          >
            That&apos;s completely okay.
          </motion.span>
        </motion.h1>

        <motion.p
          variants={fadeUpBody}
          initial="hidden"
          animate="show"
          className="max-w-[40ch] text-pretty text-base leading-relaxed text-white/50 sm:text-lg"
        >
          Inboxes fill up, priorities shift, and sometimes mail just isn&apos;t a
          fit anymore. If you go, we&apos;ll stop writing to this address. No hard
          feelings, and you can always come back when the timing is right.
        </motion.p>

        <motion.p
          className="mt-8 text-xs font-medium uppercase tracking-[0.2em] text-secondary/70"
          initial={reduced ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.5, ease: EASE }}
        >
          Take care, we mean it
        </motion.p>
      </div>
    </motion.article>
  );
}
