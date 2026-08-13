"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import LightRays from "@/app/components/ui/LightRays/LightRays";
import StarsBackground from "@/app/components/ui/StarsBackground/StarsBackground";
import { homeHashPath, SECTION_IDS } from "@/utils/homeAnchors";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function NotFoundClient() {
  return (
    <div className="isolate w-full overflow-x-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 z-0">
        <StarsBackground />
      </div>
      <div className="pointer-events-none absolute inset-0 z-2">
        <LightRays />
      </div>

      <div className="pointer-events-none absolute inset-0 z-1" aria-hidden>
        <div className="absolute left-0 top-0 size-[600px] rounded-full bg-secondary/4 blur-[80px]" />
        <div className="absolute right-0 top-[30%] size-[500px] rounded-full bg-violet-500/4 blur-[70px]" />
        <div className="absolute bottom-0 left-[40%] size-[550px] rounded-full bg-rose-500/4 blur-[75px]" />
      </div>

      <div className="relative z-20 mx-auto flex min-h-[calc(100dvh-9.5rem)] max-w-6xl flex-col items-center justify-center overflow-visible px-4 sm:min-h-[calc(100dvh-10rem)] sm:px-5 md:min-h-[calc(100dvh-10.5rem)] md:px-6 lg:min-h-[calc(100dvh-10.5rem)] 2xl:max-w-[1600px]">
        <div className="my-auto flex h-fit w-full max-w-2xl flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="relative select-none"
            aria-hidden
          >
            <span
              className="block font-bold tabular-nums leading-none tracking-tighter text-white"
              style={{
                fontSize: "clamp(6rem, 25vw, 15rem)",
                WebkitTextStroke: "1px rgba(143,224,255,0.2)",
                color: "transparent",
                backgroundImage:
                  "linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.25) 70%, transparent 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              404
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
            className="mt-5 flex w-full flex-col items-center gap-5 sm:mt-6 sm:gap-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 backdrop-blur-sm">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-rose-400/60" />
                <span className="relative inline-flex size-1.5 rounded-full bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/60">
                Page not found
              </span>
            </span>

            <h1 className="text-balance text-2xl font-bold leading-snug tracking-tight text-white sm:text-3xl md:text-4xl">
              Looks like you&apos;ve gone off-map.
            </h1>

            <p className="max-w-sm text-pretty text-sm leading-relaxed text-white/50 sm:max-w-md sm:text-base">
              The link may be broken or the page has moved. Head back to the
              home page or reach us through the footer.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.22 }}
            className="mt-7 flex w-full max-w-md flex-col items-stretch gap-3 sm:mt-8 sm:flex-row sm:items-center sm:justify-center"
          >
            <Link
              href="/"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-white py-3 pl-8 pr-7 text-sm font-semibold text-black shadow-[0_0_0_1px_rgba(255,255,255,0.2)] transition-all duration-200 hover:bg-white/90 hover:shadow-[0_4px_24px_rgba(255,255,255,0.15)]"
            >
              <ArrowLeft className="size-4 shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5" />
              Back to home
            </Link>

            <Link
              href={homeHashPath(SECTION_IDS.getStarted)}
              scroll={false}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-secondary/35 bg-secondary/10 py-3 pl-7 pr-8 text-sm font-semibold text-secondary shadow-[0_0_0_1px_rgba(143,224,255,0.08)] transition-all duration-200 hover:border-secondary/55 hover:bg-secondary/15 hover:shadow-[0_4px_24px_rgba(143,224,255,0.12)]"
            >
              Get in touch
              <ArrowUpRight className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
