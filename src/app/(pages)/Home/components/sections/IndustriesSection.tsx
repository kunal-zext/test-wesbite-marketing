"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

interface Industry {
  name: string;
  image: string;
  gradient: string;
}

const industries: Industry[] = [
  {
    name: "Healthcare",
    image: "/assets/industries/healthcare.png",
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    name: "Education (K-12)",
    image: "/assets/industries/k-12.png",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    name: "Banks & Private Banking",
    image: "/assets/industries/banking.png",
    gradient: "from-violet-500/20 to-purple-500/20",
  },
  {
    name: "Real Estate",
    image: "/assets/industries/real-estate.png",
    gradient: "from-orange-500/20 to-amber-500/20",
  },
  {
    name: "Retail",
    image: "/assets/industries/retail.png",
    gradient: "from-pink-500/20 to-rose-500/20",
  },
  {
    name: "Professional Services",
    image: "/assets/industries/professional-services.png",
    gradient: "from-sky-500/20 to-indigo-500/20",
  },
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

const lineGrow: Variants = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 0.5, ease: EASE },
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

function IndustryCard({
  industry,
  index,
}: {
  industry: (typeof industries)[number];
  index: number;
}) {
  return (
    <div className="group relative flex w-[280px] shrink-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-white/3 to-white/1 p-1 transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_40px_rgba(143,224,255,0.15)] sm:w-[320px]">
      <div
        className={`absolute inset-0 bg-linear-to-br ${industry.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
      />

      <div className="relative z-10 flex h-full flex-col">
        <div className="relative aspect-16/10 w-full overflow-hidden rounded-xl bg-black/60">
          <Image
            src={industry.image}
            alt={industry.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="320px"
            quality={85}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
        </div>

        <div className="flex flex-col gap-2 p-4 pb-5">
          <div className="flex items-center justify-center gap-2">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-secondary opacity-75 group-hover:opacity-100" />
              <span className="relative inline-flex size-1.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(143,224,255,0.6)]" />
            </span>
            <h3 className="text-base font-bold text-white transition-colors duration-300 group-hover:text-secondary sm:text-lg">
              {industry.name}
            </h3>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 transition-all duration-300 group-hover:ring-white/20" />
    </div>
  );
}

function MarqueeRow({ direction = "left" }: { direction?: "left" | "right" }) {
  return (
    <div className="flex gap-4 sm:gap-6">
      {industries.map((industry, idx) => (
        <IndustryCard
          key={`${direction}-${industry.name}`}
          industry={industry}
          index={idx}
        />
      ))}
    </div>
  );
}

function IndustriesSection() {
  return (
    <section
      id="industries-section"
      className="relative isolate w-full min-w-0 scroll-mt-8 overflow-hidden bg-background py-16 sm:py-20 md:pt-20 md:pb-24"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-0 top-0 size-[600px] rounded-full bg-secondary/4 blur-[80px]" />
        <div className="absolute right-0 top-[30%] size-[500px] rounded-full bg-violet-500/4 blur-[70px]" />
        <div className="absolute bottom-0 left-[40%] size-[550px] rounded-full bg-emerald-500/4 blur-[75px]" />
      </div>

      <div className="relative z-10 mb-10 px-4 text-center sm:mb-12 sm:px-5 md:mb-16 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
        >
          <motion.div
            className="mb-5 flex justify-center items-center gap-4"
            variants={headerItem}
          >
            <motion.span
              className="h-px w-10 shrink-0 bg-linear-to-r from-transparent to-white/25 sm:w-14 md:w-16"
              style={{ transformOrigin: "right center" }}
              variants={lineGrow}
              aria-hidden
            />
            <span className="text-[1vh] font-medium tracking-[0.15em] text-secondary sm:text-xs sm:tracking-[0.2em] md:text-base uppercase">
              Sectors
            </span>
            <motion.span
              className="h-px w-10 shrink-0 bg-linear-to-l from-transparent to-white/25 sm:w-14 md:w-16"
              style={{ transformOrigin: "left center" }}
              variants={lineGrow}
              aria-hidden
            />
          </motion.div>

          <motion.h2
            className="mb-4 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1] tracking-tight text-white"
            variants={headerItem}
          >
            Built across sectors where operations, data and compliance matter
          </motion.h2>

          <motion.p
            className="mx-auto max-w-2xl text-sm leading-relaxed text-white/50 sm:text-base md:text-lg"
            variants={headerItem}
          >
            We deploy AI where your data lives, with governance and outcomes
            that match how India&apos;s enterprises actually operate.
          </motion.p>
        </motion.div>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-[10%] bg-linear-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-[10%] bg-linear-to-l from-background to-transparent" />

        <div className="flex flex-col gap-4 sm:gap-6">
          <div className="relative flex overflow-hidden">
            <motion.div
              className="flex min-w-0 gap-4 will-change-transform sm:gap-6"
              animate={{
                x: [0, -1920],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
            >
              <MarqueeRow direction="left" />
              <MarqueeRow direction="left" />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}

export default IndustriesSection;
