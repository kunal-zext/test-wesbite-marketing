"use client";

import { motion, type Variants, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/utils";
import { SECTION_IDS } from "@/utils/homeAnchors";
import { useState, useRef, useEffect } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const headerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

const headerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

const lineGrow: Variants = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 0.5, ease: EASE },
  },
};

type VisualId = "consultants" | "boutique" | "saas";

const CARDS: readonly {
  id: string;
  headline: string;
  description: string;
  visual: VisualId;
  stageClass: string;
  glowClass: string;
}[] = [
  {
    id: "consultants",
    headline: "Roadmaps without a system",
    description:
      "Large consultants send junior teams, take 12–18 months, and hand you a roadmap. No working system.",
    visual: "consultants",
    stageClass:
      "border-secondary/20 bg-linear-to-b from-secondary/[0.07] to-black/60",
    glowClass: "shadow-[0_0_40px_-12px_rgba(143,224,255,0.25)]",
  },
  {
    id: "boutique",
    headline: "The pilot peaks - then stalls",
    description:
      "Boutique AI agencies build a pilot. It impresses the room. Then it stalls.",
    visual: "boutique",
    stageClass:
      "border-violet-400/20 bg-linear-to-b from-violet-500/[0.08] to-black/60",
    glowClass: "shadow-[0_0_40px_-12px_rgba(167,139,250,0.22)]",
  },
  {
    id: "saas",
    headline: "Fast to buy. Impossible to fit.",
    description:
      "SaaS tools are fast to buy and generic by design. Your workflows don't fit their boxes.",
    visual: "saas",
    stageClass:
      "border-cyan-400/18 bg-linear-to-b from-cyan-500/[0.07] to-black/60",
    glowClass: "shadow-[0_0_40px_-12px_rgba(34,211,238,0.2)]",
  },
];

function ProblemCardVisual({
  variant,
  className,
}: {
  variant: VisualId;
  className?: string;
}) {
  if (variant === "consultants") {
    return (
      <svg
        viewBox="0 0 220 112"
        className={cn(
          "h-30 w-full max-w-54 sm:h-33 transition-all duration-500",
          className,
        )}
        aria-hidden
      >
        <motion.line
          x1="12"
          y1="88"
          x2="208"
          y2="88"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1"
          animate={{ opacity: [0.45, 0.9, 0.45] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.text
          x="12"
          y="104"
          fill="rgba(255,255,255,0.35)"
          fontSize="9"
          fontFamily="system-ui, sans-serif"
          animate={{ opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        >
          Month 0
        </motion.text>
        <motion.text
          x="168"
          y="104"
          fill="rgba(255,255,255,0.35)"
          fontSize="9"
          fontFamily="system-ui, sans-serif"
          animate={{ opacity: [0.5, 0.85, 0.5] }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.4,
          }}
        >
          12-18 mo
        </motion.text>
        <motion.path
          d="M 18 52 C 45 28 75 72 105 48 S 165 22 198 40"
          fill="none"
          stroke="rgba(143,224,255,0.45)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="5 4"
          animate={{
            strokeDashoffset: [0, -50],
            opacity: [0.75, 1, 0.75],
          }}
          transition={{
            strokeDashoffset: {
              duration: 2.4,
              repeat: Infinity,
              ease: "linear",
            },
            opacity: { duration: 2.8, repeat: Infinity, ease: "easeInOut" },
          }}
        />
        {[28, 52, 76].map((cx, i) => (
          <motion.g
            key={i}
            animate={{
              y: [0, -3, 0],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          >
            <circle
              cx={cx}
              cy="72"
              r="5"
              fill="rgba(255,255,255,0.06)"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="1"
            />
            <rect
              x={cx - 3}
              y="78"
              width="6"
              height="4"
              rx="1"
              fill="rgba(255,255,255,0.1)"
            />
          </motion.g>
        ))}
        <motion.rect
          x="158"
          y="18"
          width="34"
          height="42"
          rx="4"
          fill="rgba(255,255,255,0.06)"
          stroke="rgba(143,224,255,0.35)"
          strokeWidth="1"
          animate={{
            scale: [1, 1.04, 1],
            y: [0, -1.5, 0],
          }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "175px 39px" }}
        />
        <motion.line
          x1="165"
          y1="28"
          x2="185"
          y2="28"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="1.5"
          animate={{ opacity: [0.45, 0.95, 0.45] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.line
          x1="165"
          y1="34"
          x2="192"
          y2="34"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1"
          animate={{ opacity: [0.25, 0.65, 0.25] }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2,
          }}
        />
        <motion.text
          x="164"
          y="48"
          fill="rgba(143,224,255,0.75)"
          fontSize="8"
          fontWeight="600"
          fontFamily="system-ui, sans-serif"
          animate={{ opacity: [0.65, 1, 0.65] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        >
          ROADMAP
        </motion.text>
        <motion.circle
          cx="108"
          cy="88"
          r="14"
          stroke="rgba(255,80,80,0.35)"
          strokeWidth="1.2"
          fill="none"
          strokeDasharray="3 2"
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "108px 88px" }}
        />
        <motion.text
          x="98"
          y="91"
          fill="rgba(255,255,255,0.35)"
          fontSize="7"
          fontFamily="system-ui, sans-serif"
          animate={{
            fill: [
              "rgba(255,255,255,0.35)",
              "rgba(255,80,80,0.55)",
              "rgba(255,255,255,0.35)",
            ],
          }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          System
        </motion.text>
        <motion.line
          x1="98"
          y1="96"
          x2="118"
          y2="80"
          stroke="rgba(255,80,80,0.5)"
          strokeWidth="1.2"
          animate={{ opacity: [0.45, 0.85, 0.45] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    );
  }

  if (variant === "boutique") {
    return (
      <svg
        viewBox="0 0 220 112"
        className={cn(
          "h-30 w-full max-w-54 sm:h-33 transition-all duration-500",
          className,
        )}
        aria-hidden
      >
        <defs>
          <linearGradient id="pilotGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(167,139,250,0.45)" />
            <stop offset="55%" stopColor="rgba(167,139,250,0.08)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </linearGradient>
        </defs>
        <motion.line
          x1="16"
          y1="86"
          x2="204"
          y2="86"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
          animate={{ opacity: [0.35, 0.85, 0.35] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M 16 86 L 16 86 L 52 86 L 72 28 L 92 86 L 204 86 L 204 86 Z"
          fill="url(#pilotGlow)"
          opacity="0.9"
          animate={{ opacity: [0.45, 0.85, 0.45] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M 16 86 L 72 28 L 92 86 L 204 86"
          fill="none"
          stroke="rgba(167,139,250,0.75)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: [0, 1],
            opacity: [0.65, 1, 0.65],
          }}
          transition={{
            pathLength: {
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            },
            opacity: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
          }}
        />
        <motion.circle
          cx="72"
          cy="28"
          r="10"
          fill="rgba(167,139,250,0.2)"
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.2, 0.45, 0.2],
          }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "72px 28px" }}
        />
        <motion.path
          d="M72 20v16M64 28h16"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="1.5"
          strokeLinecap="round"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.08, 1],
          }}
          transition={{
            rotate: {
              duration: 14,
              repeat: Infinity,
              ease: "linear",
            },
            scale: {
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          style={{ transformOrigin: "72px 28px" }}
        />
        <motion.text
          x="52"
          y="22"
          fill="rgba(255,255,255,0.55)"
          fontSize="8"
          fontFamily="system-ui, sans-serif"
          animate={{ opacity: [0.45, 1, 0.45] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          Demo
        </motion.text>
        <motion.text
          x="130"
          y="78"
          fill="rgba(255,255,255,0.3)"
          fontSize="9"
          fontFamily="system-ui, sans-serif"
          animate={{
            opacity: [0.25, 0.55, 0.25],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          …then flat
        </motion.text>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 220 112"
      className={cn(
        "h-30 w-full max-w-54 sm:h-33 transition-all duration-500",
        className,
      )}
      aria-hidden
    >
      {Array.from({ length: 12 }).map((_, i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        return (
          <motion.rect
            key={i}
            x={32 + col * 36}
            y={18 + row * 26}
            width="28"
            height="20"
            rx="3"
            fill="rgba(255,255,255,0.04)"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="1"
            animate={{
              opacity: [0.45, 0.95, 0.45],
              scale: [0.97, 1, 0.97],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              delay: i * 0.12,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: `${46 + col * 36}px ${28 + row * 26}px` }}
          />
        );
      })}
      <motion.path
        d="M 24 56 Q 70 20 110 52 T 198 48"
        fill="none"
        stroke="rgba(34,211,238,0.65)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="0"
        initial={{ pathLength: 0 }}
        animate={{
          pathLength: [0, 1],
          opacity: [0.55, 1, 0.55],
        }}
        transition={{
          pathLength: {
            duration: 2.8,
            repeat: Infinity,
            ease: "easeInOut",
          },
          opacity: { duration: 2.8, repeat: Infinity, ease: "easeInOut" },
        }}
      />
      <motion.circle
        cx="24"
        cy="56"
        r="4"
        fill="rgba(34,211,238,0.9)"
        animate={{
          scale: [1, 1.25, 1],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ transformOrigin: "24px 56px" }}
      />
      <motion.circle
        cx="198"
        cy="48"
        r="4"
        fill="rgba(34,211,238,0.5)"
        animate={{
          scale: [1, 1.25, 1],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.55,
        }}
        style={{ transformOrigin: "198px 48px" }}
      />
      <motion.text
        x="78"
        y="104"
        fill="rgba(255,255,255,0.4)"
        fontSize="8"
        fontFamily="system-ui, sans-serif"
        animate={{ opacity: [0.35, 0.75, 0.35] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        Your process
      </motion.text>
      <motion.text
        x="132"
        y="104"
        fill="rgba(255,255,255,0.28)"
        fontSize="8"
        fontFamily="system-ui, sans-serif"
        animate={{ opacity: [0.2, 0.45, 0.2] }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.3,
        }}
      >
        Their template
      </motion.text>
    </svg>
  );
}

function InteractiveProblemCard({
  card,
  index,
  isFocused,
}: {
  card: (typeof CARDS)[number];
  index: number;
  isFocused: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const emphasis = isHovered || isFocused;
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(0, { stiffness: 150, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);

    mouseX.set(deltaX);
    mouseY.set(deltaY);

    rotateY.set(deltaX * 8);
    rotateX.set(-deltaY * 8);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.li
      key={card.id}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: EASE,
      }}
      className="min-w-0"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={cn(
          "group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/2.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] transition-all duration-300 sm:rounded-[1.35rem]",
          card.glowClass,
          emphasis && "scale-[1.02] border-white/20 shadow-2xl",
          isFocused && "ring-1 ring-inset ring-secondary/25",
        )}
      >
        <motion.div
          className={cn(
            "relative flex min-h-42 items-center justify-center border-b border-white/6 px-5 pb-6 pt-7 transition-all duration-300 sm:min-h-46 sm:px-6 sm:pb-7 sm:pt-8",
            card.stageClass,
          )}
          animate={{
            scale: emphasis ? 1.05 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            aria-hidden
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
                backgroundSize: "20px 20px",
              }}
            />
          </div>
          <motion.div
            className={cn(
              "pointer-events-none absolute inset-0 transition-opacity duration-300",
              emphasis ? "opacity-100" : "opacity-0",
            )}
            style={{
              background:
                "radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.08), transparent 50%)",
              // @ts-ignore
              "--mouse-x": `${mouseX.get() * 50 + 50}%`,
              "--mouse-y": `${mouseY.get() * 50 + 50}%`,
            }}
            aria-hidden
          />
          <ProblemCardVisual variant={card.visual} className="relative z-1" />
        </motion.div>

        <div className="flex flex-1 flex-col px-6 pb-8 pt-6 text-center sm:px-8 sm:pb-9 sm:pt-7">
          <motion.h3
            className="text-lg font-bold leading-snug tracking-tight text-white sm:text-xl"
            animate={{
              scale: emphasis ? 1.02 : 1,
            }}
            transition={{ duration: 0.2 }}
          >
            {card.headline}
          </motion.h3>
          <motion.p
            className="mt-3 text-sm leading-relaxed text-white sm:text-[15px] sm:leading-relaxed text-balance"
            animate={{
              opacity: emphasis ? 0.75 : 0.5,
            }}
            transition={{ duration: 0.2 }}
          >
            {card.description}
          </motion.p>
        </div>

        <motion.div
          className={cn(
            "pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 sm:rounded-[1.35rem]",
            emphasis ? "opacity-100" : "opacity-0",
          )}
          style={{
            background:
              "radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.06), transparent 40%)",
            // @ts-ignore
            "--mouse-x": `${mouseX.get() * 50 + 50}%`,
            "--mouse-y": `${mouseY.get() * 50 + 50}%`,
          }}
          aria-hidden
        />
      </motion.div>
    </motion.li>
  );
}

function ProblemStatementSection() {
  const [focusIndex, setFocusIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setFocusIndex((i) => (i + 1) % CARDS.length);
    }, 4800);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      id={SECTION_IDS.problemStatement}
      aria-labelledby="problem-statement-heading"
      className="relative isolate w-full min-w-0 scroll-mt-8 overflow-hidden bg-tertiary py-16 sm:py-20 md:py-24"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(140,82,255,0.07),transparent_55%)]" />
        <div className="absolute bottom-0 left-1/2 h-px w-[min(100%,48rem)] -translate-x-1/2 bg-linear-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-5 md:px-6 xl:max-w-[1600px]">
        <motion.header
          className="mx-auto max-w-4xl text-center"
          variants={headerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          <motion.div
            className="mb-5 flex items-center justify-center gap-3 sm:gap-4"
            variants={headerItem}
          >
            <motion.span
              className="h-px w-10 shrink-0 bg-linear-to-r from-transparent to-white/25 sm:w-14 md:w-16"
              style={{ transformOrigin: "right center" }}
              variants={lineGrow}
              aria-hidden
            />
            <span className="text-[1vh] font-medium tracking-[0.15em] text-secondary sm:text-xs sm:tracking-[0.2em] md:text-base uppercase">
              PROBLEM STATEMENT
            </span>
            <motion.span
              className="h-px w-10 shrink-0 bg-linear-to-l from-transparent to-white/25 sm:w-14 md:w-16"
              style={{ transformOrigin: "left center" }}
              variants={lineGrow}
              aria-hidden
            />
          </motion.div>

          <motion.h2
            id="problem-statement-heading"
            className="text-balance text-center text-[clamp(1.25rem,3.2vw,1.875rem)] font-bold leading-snug tracking-tight text-white"
            variants={headerItem}
          >
            Most AI initiatives fail between strategy and execution.
          </motion.h2>

          <motion.p
            className="mx-auto mt-5 max-w-3xl text-pretty text-center text-sm leading-relaxed text-white/55 sm:mt-6 sm:text-base sm:leading-relaxed"
            variants={headerItem}
          >
            Zext closes this gap by designing, deploying and governing AI systems that work inside real business processes.
          </motion.p>
        </motion.header>

        <ul
          className="mt-12 grid gap-5 sm:mt-14 sm:gap-6 lg:grid-cols-3"
          role="list"
          style={{ perspective: "1000px" }}
        >
          {CARDS.map((card, index) => (
            <InteractiveProblemCard
              key={card.id}
              card={card}
              index={index}
              isFocused={focusIndex === index}
            />
          ))}
        </ul>

        <motion.div
          className="mx-auto mt-12 max-w-3xl text-center sm:mt-16 md:mt-18"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8% 0px" }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <p className="text-pretty text-sm leading-relaxed text-white/55 sm:text-base sm:leading-relaxed">
            The result is the same in every case - money spent, pilots
            abandoned, and AI still sitting on a slide deck somewhere.
          </p>
          <p className="mt-4 text-pretty text-[clamp(1.25rem,3.2vw,1.875rem)] font-bold leading-snug tracking-tight text-white sm:mt-5">
            That is the problem Zext exists to solve.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default ProblemStatementSection;
