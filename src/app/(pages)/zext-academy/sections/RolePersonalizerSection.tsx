"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/utils";
import { ROLES } from "../data";

type RoleOption = (typeof ROLES.options)[number];

export function RolePersonalizerSection() {
  const [active, setActive] = useState<RoleOption>(ROLES.options[0]);

  return (
    <section className="bg-background py-14 md:py-[84px]">
      <div className="mx-auto max-w-[1600px] md:max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-tertiary to-background p-8 text-center sm:p-12">
          <div
            className="pointer-events-none absolute -top-[40%] left-1/2 size-[500px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(143,224,255,0.12),transparent_60%)]"
            aria-hidden
          />
          <div className="relative">
            <span className="inline-block font-(family-name:--font-space-mono) text-xs uppercase tracking-[0.28em] text-secondary">
              {ROLES.eyebrow}
            </span>
            <h2 className="mt-3 font-(family-name:--font-poppins) text-[clamp(24px,3.4vw,32px)] font-bold leading-[1.1] tracking-tight text-white">
              {ROLES.heading}
            </h2>

            <div className="my-7 flex flex-wrap justify-center gap-3">
              {ROLES.options.map((opt) => {
                const isActive = opt.key === active.key;
                return (
                  <button
                    key={opt.key}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActive(opt)}
                    className={cn(
                      "cursor-pointer rounded-full border-[1.5px] px-[22px] py-[11px] font-(family-name:--font-poppins) text-[15px] font-semibold transition-colors duration-200",
                      "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      isActive
                        ? "border-secondary bg-secondary text-[#0a1024]"
                        : "border-white/10 text-white/55 hover:border-secondary hover:text-white",
                    )}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>

            <div className="flex min-h-[70px] items-center justify-center">
              <motion.p
                key={active.key}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="max-w-[34ch] font-(family-name:--font-poppins) text-[clamp(18px,2.4vw,22px)] font-medium leading-snug text-white"
              >
                {active.before}
                <span className="text-secondary">{active.highlight}</span>
                {active.after}
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
