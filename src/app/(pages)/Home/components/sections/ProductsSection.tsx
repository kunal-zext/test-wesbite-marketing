"use client";

import {
  FileCheck,
  FileSearch,
  ListChecks,
  ShieldAlert,
  type LucideIcon,
} from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/utils";
import { PRODUCT_ANCHOR_IDS } from "@/utils/homeAnchors";

type ProductAccent = "cyan" | "violet";

interface ProductStat {
  value: string;
  suffix: string;
  label: string;
}

interface ProductFeature {
  text: string;
  icon: LucideIcon;
}

interface Product {
  number: string;
  title: string;
  tagline: string;
  accent: ProductAccent;
  stats: ProductStat[];
  features: ProductFeature[];
  anchorId: string;
}

const products: Product[] = [
  {
    number: "01",
    anchorId: PRODUCT_ANCHOR_IDS.contentAuditAgent,
    title: "Content Audit Agent",
    tagline:
      "A deployed AI agent that audits large content estates for brand, compliance, accuracy and governance issues at scale.",
    accent: "cyan",
    stats: [
      { value: "5", suffix: "K+", label: "Pages audited" },
      { value: "150", suffix: "K+", label: "Issues identified" },
      { value: "<2", suffix: " days", label: "Time to completion" },
    ],
    features: [
      {
        text: "Checks 100% of your content estate continuously",
        icon: FileSearch,
      },
      { text: "Enforces 40+ custom rules simultaneously", icon: ListChecks },
      {
        text: "Flags issues with severity, location, and recommended fix",
        icon: ShieldAlert,
      },
      {
        text: "Handles configurable compliance and brand rules based on your internal requirements.",
        icon: FileCheck,
      },
    ],
  },
];

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

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

const statList = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.12 },
  },
};

const statItem = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE },
  },
};

const featureList = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05, delayChildren: 0.2 },
  },
};

const featureItem = {
  hidden: { opacity: 0, x: 12 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: EASE },
  },
};

function accentGlowClass(accent: ProductAccent) {
  return accent === "cyan" ? "bg-secondary/25" : "bg-violet-500/20";
}

function iconShellClass(accent: ProductAccent) {
  return accent === "cyan"
    ? "border-secondary/30 bg-secondary/10 text-secondary"
    : "border-violet-400/25 bg-violet-500/10 text-violet-300";
}

function statValueClass(accent: ProductAccent) {
  return accent === "cyan" ? "text-secondary" : "text-violet-300";
}

function ProductsSection() {
  return (
    <section
      id="products-section"
      className="relative isolate w-full min-w-0 scroll-mt-8 overflow-hidden bg-background py-16 sm:py-20 md:pt-20 md:pb-28"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_70%_at_50%_-25%,rgba(140,82,255,0.1),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_100%_15%,rgba(143,224,255,0.06),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_0%_90%,rgba(139,92,246,0.06),transparent_55%)]" />
        <div className="absolute inset-0 opacity-25 mask-[radial-gradient(ellipse_75%_65%_at_50%_40%,#000_12%,transparent_72%)] bg-size-[52px_52px] bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [-webkit-mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,#000_12%,transparent_72%)]" />
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
            <span className="text-[1vh] font-medium tracking-[0.15em] text-secondary sm:text-xs sm:tracking-[0.2em] md:text-base uppercase">
              Products
            </span>
            <motion.span
              className="hidden h-px min-w-16 flex-1 origin-left bg-linear-to-r from-white/25 to-transparent sm:block sm:max-w-[min(40vw,280px)]"
              style={{ transformOrigin: "left center" }}
              variants={lineGrow}
              aria-hidden
            />
          </motion.div>
          <motion.h2
            className="text-[clamp(1.75rem,4vw,3.25rem)] font-bold leading-[1.12] tracking-tight text-white"
            variants={headerItem}
          >
            <span className="block">Content Audit Agent</span>
          </motion.h2>
        </motion.header>

        <div className="flex flex-col gap-6 sm:gap-8">
          {products.map((product, index) => (
            <motion.article
              key={product.title}
              id={product.anchorId}
              data-product-card
              className={cn(
                "relative isolate overflow-hidden rounded-2xl border border-white/10",
                "shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_24px_48px_-20px_rgba(0,0,0,0.65)]",
                "transition-[border-color,box-shadow] duration-300",
                "hover:border-white/15 hover:shadow-[0_0_0_1px_rgba(143,224,255,0.08),0_28px_56px_-18px_rgba(0,0,0,0.7)]",
              )}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ delay: index * 0.06 }}
            >
              <div
                className={cn(
                  "pointer-events-none absolute inset-0 opacity-80",
                  product.accent === "cyan"
                    ? "bg-linear-to-br from-secondary/7 via-transparent to-transparent"
                    : "bg-linear-to-br from-violet-500/6 via-transparent to-transparent",
                )}
                aria-hidden
              />
              <div
                className={cn(
                  "pointer-events-none absolute -top-28 -right-28 size-56 rounded-full blur-3xl sm:size-72",
                  accentGlowClass(product.accent),
                )}
                aria-hidden
              />

              <div className="relative z-10 p-6 sm:p-8 lg:p-10">
                <div className="mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:items-start sm:gap-6">
                  {/* <span className="text-xs font-medium tabular-nums tracking-wider text-white/35">
                    {product.number}
                  </span> */}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xl font-bold leading-tight tracking-tight text-white sm:text-2xl lg:text-3xl">
                      {product.tagline}
                    </h3>
                    {/* <p className="mt-2 text-sm leading-relaxed text-white/55 sm:text-base">
                      {product.tagline}
                    </p> */}
                  </div>
                </div>

                <motion.div
                  className="mb-6 grid grid-cols-1 gap-3 sm:mb-8 sm:grid-cols-3 sm:gap-4"
                  variants={statList}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-5% 0px" }}
                >
                  {product.stats.map((stat) => (
                    <motion.div
                      key={stat.label}
                      variants={statItem}
                      className={cn(
                        "rounded-xl border border-white/10 bg-white/3 px-3 py-4 text-center",
                        "transition-colors duration-300 hover:border-white/15",
                      )}
                    >
                      <div
                        className={cn(
                          "text-2xl font-bold tabular-nums leading-none sm:text-3xl",
                          statValueClass(product.accent),
                        )}
                      >
                        {stat.value}
                        <span className="ml-0.5 text-base font-semibold sm:text-lg">
                          {stat.suffix}
                        </span>
                      </div>
                      <p className="mt-2 text-[11px] leading-snug text-white/40 sm:text-xs">
                        {stat.label}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.ul
                  className="grid list-none gap-3 sm:grid-cols-2 sm:gap-4"
                  variants={featureList}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-5% 0px" }}
                >
                  {product.features.map((feature) => {
                    const Icon = feature.icon;
                    return (
                      <motion.li
                        key={feature.text}
                        variants={featureItem}
                        className="flex gap-3 text-sm leading-relaxed text-white/70"
                      >
                        <span
                          className={cn(
                            "flex size-9 shrink-0 items-center justify-center rounded-lg border",
                            iconShellClass(product.accent),
                          )}
                        >
                          <Icon
                            className="size-4"
                            strokeWidth={2}
                            aria-hidden
                          />
                        </span>
                        <span className="pt-1">{feature.text}</span>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductsSection;
