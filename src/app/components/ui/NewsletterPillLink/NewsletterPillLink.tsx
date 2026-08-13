"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/utils";

type NewsletterPillLinkProps = {
  href?: string;
  className?: string;
  /** Small uppercase kicker above the label. */
  eyebrow?: string;
  /** Main pill label. */
  label?: string;
  "aria-label"?: string;
};

export function NewsletterPillLink({
  href = "/newsletter",
  className,
  eyebrow = "Daily AI briefing",
  label = "Get the newsletter",
  "aria-label": ariaLabel = "Check out our newsletter",
}: NewsletterPillLinkProps) {
  const [entered, setEntered] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setEntered(true)}
      onMouseLeave={() => setEntered(false)}
      className={cn(
        "group relative flex items-center gap-0 overflow-hidden",
        className,
      )}
      aria-label={ariaLabel}
    >
      <motion.span
        animate={
          entered
            ? { opacity: 1, scale: 1.15 }
            : { opacity: 0.5, scale: 1 }
        }
        transition={{ duration: 0.35 }}
        className="pointer-events-none absolute inset-0 rounded-full border border-secondary/30 shadow-[0_0_28px_rgba(143,224,255,0.18)]"
      />

      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
        <span
          className="absolute inset-0 animate-spin rounded-full animation-duration-[3s]"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0%, rgba(143,224,255,0.35) 20%, transparent 40%)",
          }}
        />
      </span>

      <span className="relative flex items-center gap-2.5 rounded-full border border-white/10 bg-background/80 px-4 py-2.5 backdrop-blur-md transition-all duration-300 group-hover:border-secondary/40 group-hover:bg-secondary/6">
        <span className="relative flex size-2 shrink-0">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-secondary/60 opacity-80" />
          <span className="relative inline-flex size-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(143,224,255,0.7)]" />
        </span>

        <span className="flex flex-col leading-tight">
          <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/30">
            {eyebrow}
          </span>
          <motion.span
            animate={
              entered
                ? { color: "rgba(143,224,255,1)" }
                : { color: "rgba(255,255,255,0.85)" }
            }
            transition={{ duration: 0.2 }}
            className="text-[13px] font-semibold leading-snug"
          >
            {label}
          </motion.span>
        </span>

        <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/5 transition-all duration-300 group-hover:border-secondary/45 group-hover:bg-secondary/15">
          <ArrowUpRight
            className="size-3.5 text-white/45 transition-all duration-300 group-hover:rotate-45 group-hover:text-secondary"
            strokeWidth={2.5}
            aria-hidden
          />
        </span>
      </span>
    </Link>
  );
}
