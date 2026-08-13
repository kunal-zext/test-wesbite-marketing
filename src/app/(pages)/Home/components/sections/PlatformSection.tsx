"use client";

import { motion } from "motion/react";
import PlatformVideoPlayer from "./PlatformVideoPlayer";
import { PLATFORM_VIDEO_SOURCES } from "@/utils/constants/platformVideos";

const EASE = [0.22, 1, 0.36, 1] as const;

const headerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

const headerItem = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

const lineGrow = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 0.5, ease: EASE },
  },
};

const videoReveal = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

function PlatformSection() {
  return (
    <section
      id="platform-section"
      className="relative isolate w-full min-w-0 scroll-mt-8 overflow-hidden bg-[#d9d9d9] pt-12 pb-14 sm:pt-16 sm:pb-16 md:pt-20 md:pb-20"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_-10%,rgba(255,255,255,0.035),transparent_58%)]" />
        <div className="absolute bottom-0 left-1/2 h-[min(45vh,420px)] w-[min(85vw,640px)] -translate-x-1/2 translate-y-1/4 rounded-full bg-white/2.5 blur-[100px]" />
        <div className="absolute top-0 left-0 h-full w-[min(38%,24rem)] bg-linear-to-r from-white/2 to-transparent" />
        <div className="absolute inset-0 opacity-[0.18] bg-[repeating-linear-gradient(90deg,transparent,transparent_71px,rgba(255,255,255,0.025)_72px,rgba(255,255,255,0.025)_73px)]" />
      </div>
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-5 md:px-6 xl:max-w-[1600px]">
        <motion.header
          className="mb-12 max-w-3xl sm:mb-16 md:mb-20"
          variants={headerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-12% 0px" }}
        >
          <motion.div
            className="mb-5 flex flex-wrap items-center gap-4"
            variants={headerItem}
          >
            <span className="text-[1vh] font-medium tracking-[0.15em] text-sky-600 sm:text-xs sm:tracking-[0.2em] md:text-base uppercase">
              The platform
            </span>
            <motion.span
              className="hidden h-px min-w-16 flex-1 origin-left bg-linear-to-r from-black/20 to-transparent sm:block sm:max-w-[min(40vw,280px)]"
              style={{ transformOrigin: "left center" }}
              variants={lineGrow}
              aria-hidden
            />
          </motion.div>
          <motion.h2
            className="text-[clamp(1.75rem,4vw,3.25rem)] font-bold leading-[1.12] tracking-tight text-tertiary"
            variants={headerItem}
          >
            <span className="block">A governed AI operating layer</span>
            <span className="mt-1 block text-tertiary/55 sm:mt-2">
              built inside your environment.
            </span>
          </motion.h2>
        </motion.header>

        <motion.div
          variants={videoReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          <PlatformVideoPlayer
            className="mx-auto lg:max-w-5xl xl:max-w-6xl"
            sources={PLATFORM_VIDEO_SOURCES}
          />
        </motion.div>
      </div>
    </section>
  );
}

export default PlatformSection;
