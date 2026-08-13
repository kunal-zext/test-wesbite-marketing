"use client";

import { motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import { BookButton } from "../components/BookButton";
import { ConstellationCanvas } from "../components/ConstellationCanvas";
import { Reveal } from "../components/Reveal";
import { BOOK_PATH, HERO } from "../data";

const CHIP_POS = [
  "top-[13%] right-[7%]",
  "top-[31%] right-[21%]",
  "top-[55%] right-[5%]",
  "top-[73%] right-[17%]",
] as const;

export function AcademyHero() {
  const reduce = useReducedMotion() ?? false;

  return (
    <section className="relative overflow-hidden pt-16 pb-14 sm:pt-24 sm:pb-[84px]">
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 35%, black, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 35%, black, transparent 75%)",
        }}
        aria-hidden
      />
      <ConstellationCanvas className="absolute inset-0 z-0 size-full" />

      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div className="absolute -top-[20%] -right-[10%] size-[720px] rounded-full bg-[radial-gradient(circle,rgba(143,224,255,0.2),transparent_62%)]" />
        <div className="absolute top-1/4 left-1/3 size-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(143,224,255,0.1),transparent_60%)]" />
        <div className="absolute -bottom-[30%] -left-[15%] size-[640px] rounded-full bg-[radial-gradient(circle,rgba(140,82,255,0.18),transparent_62%)]" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1] hidden md:block" aria-hidden>
        {HERO.chips.map((chip, i) => (
          <motion.span
            key={chip}
            className={`absolute rounded-full border border-white/10 bg-[#1d2e52]/55 px-3.5 py-1.5 font-(family-name:--font-space-mono) text-[13px] text-white/55 backdrop-blur-sm ${CHIP_POS[i]}`}
            animate={reduce ? undefined : { y: [0, -14, 0] }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.4,
            }}
          >
            {chip}
          </motion.span>
        ))}
      </div>

      <div className="relative z-2 mx-auto max-w-[1600px] md:max-w-6xl px-6">
        <Reveal>
          <span className="inline-block font-(family-name:--font-space-mono) text-xs uppercase tracking-[0.28em] text-secondary">
            {HERO.eyebrow}
          </span>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="mt-4 max-w-[16ch] font-(family-name:--font-poppins) text-[clamp(38px,6vw,62px)] font-bold leading-[1.1] tracking-tight text-white">
            {HERO.titleLine1}
            <br />
            <span className="text-secondary">{HERO.titleLine2}</span>
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-5 max-w-[50ch] text-[clamp(17px,2.2vw,20px)] leading-relaxed text-white/55">
            {HERO.sub}
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-4 max-[520px]:flex-col max-[520px]:items-start">
            <BookButton href={BOOK_PATH}>{HERO.cta}</BookButton>
            <span className="inline-flex items-center gap-2.5 font-(family-name:--font-space-mono) text-[13px] text-white/55">
              <PulseDot />
              {HERO.scarcity}
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            {HERO.trust.map((t) => (
              <span
                key={t}
                className="flex items-center gap-2 font-(family-name:--font-space-mono) text-xs tracking-widest text-white/55"
              >
                <Check
                  className="size-[15px] shrink-0 text-secondary"
                  strokeWidth={2.5}
                  aria-hidden
                />
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PulseDot() {
  return (
    <span className="relative flex size-2" aria-hidden>
      <span className="absolute inline-flex size-full animate-ping rounded-full bg-secondary/60" />
      <span className="relative inline-flex size-2 rounded-full bg-secondary" />
    </span>
  );
}
