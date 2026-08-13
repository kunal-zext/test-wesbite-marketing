"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, type Variants } from "motion/react";
import { cn } from "@/utils";
import { useState } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const founders = [
  {
    initials: "AT",
    name: "Ashish Tibdewal",
    role: "Co-Founder & Chief Strategist",
    bio: "25+ years in finance and operations leadership. Scaled large enterprises and driven P&L across multiple sectors. Brings a finance-first lens ensuring every technology decision is grounded in real business outcomes.",
    linkedin: "https://linkedin.com/in/ashish-tibdewal-z",
    image: "/assets/team/ashish.png",
  },
  {
    initials: "KS",
    name: "Kushal Sanghavi",
    role: "Co-Founder & CTO",
    bio: "15+ years in building AI platforms, data systems, and enterprise automation for global clients. Designs the agent architectures, security frameworks, and deployment models that power Zext's products.",
    linkedin: "https://linkedin.com/in/kushal-sanghavi",
    image: "/assets/team/kushal-sanghavi.png",
  },
  {
    initials: "NP",
    name: "Nidhi Pandya",
    role: "Co-Founder & Brand Lead",
    bio: "10+ years across executive assistance, HR operations, and strategic marketing. Drives brand visibility and ensures seamless execution across content, client management, and leadership functions.",
    linkedin: "https://www.linkedin.com/in/nidhipandya-/",
    image: "/assets/team/nidhi-pandya.png",
  },
] as const;

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

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, ease: EASE },
  },
};

function LinkedInGlyph({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      fill="currentColor"
      className={cn("shrink-0", className)}
      viewBox="0 0 16 16"
      aria-hidden
    >
      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
    </svg>
  );
}

function FoundersSection() {
  const [highlight, setHighlight] = useState<
    "finance" | "architecture" | "brand" | null
  >(null);

  return (
    <section
      id="founders-section"
      className="relative isolate w-full min-w-0 scroll-mt-8 overflow-hidden bg-[#d9d9d9] py-16 sm:py-20 md:pt-20 md:pb-28"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-x-[15%] bottom-0 h-[min(50vh,420px)] bg-[radial-gradient(ellipse_at_bottom,rgba(251,191,36,0.04),transparent_70%)]" />
        <div className="absolute top-1/4 -left-[8%] size-[340px] rounded-full bg-rose-500/3 blur-[100px]" />
        <div className="absolute bottom-1/4 -right-[5%] size-[300px] rounded-full bg-secondary/4 blur-[90px]" />
      </div>
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-5 md:px-6 xl:max-w-[1600px]">
        <motion.header
          className="mb-12 sm:mb-16 md:mb-20"
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
              Leadership Behind Zext
            </span>
            <motion.span
              className="hidden h-px min-w-16 flex-1 origin-left bg-linear-to-r from-black/20 to-transparent sm:block sm:max-w-[min(40vw,280px)]"
              style={{ transformOrigin: "left center" }}
              variants={lineGrow}
              aria-hidden
            />
          </motion.div>
          <motion.h2
            className="max-w-6xl text-[clamp(1.75rem,4vw,3rem)] font-bold leading-[1.12] tracking-tight"
            variants={headerItem}
          >
            <span className="text-tertiary transition-colors duration-200 ease-in-out">
              <span
                className={cn(
                  highlight === "finance" && "text-sky-600!",
                  "transition-colors duration-200 ease-in-out",
                )}
              >
                Finance-first strategy
              </span>{" "}
              +{" "}
              <span
                className={cn(
                  highlight === "architecture" && "text-sky-600!",
                  "transition-colors duration-200 ease-in-out",
                )}
              >
                AI architecture & FDE capability
              </span>{" "}
              +{" "}
              <span
                className={cn(
                  highlight === "brand" && "text-sky-600!",
                  "transition-colors duration-200 ease-in-out",
                )}
              >
                brand execution
              </span>{" "}
              ={" "}
            </span>
            <span className="text-tertiary/55">
              practical AI transformation
            </span>
          </motion.h2>
        </motion.header>

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-10 md:gap-12 lg:grid-cols-3 lg:gap-14">
          {founders.map((founder, index) => (
            <motion.article
              key={founder.name}
              className="group min-w-0"
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ delay: index * 0.06 }}
              onMouseEnter={() => {
                if (index === 0) setHighlight("finance");
                else if (index === 1) setHighlight("architecture");
                else if (index === 2) setHighlight("brand");
              }}
              onMouseLeave={() => setHighlight(null)}
            >
              <div className="mb-6 flex justify-center sm:mb-8 sm:justify-start">
                <div className="relative aspect-square w-full max-w-[220px] overflow-hidden rounded-2xl border border-black/10 transition-colors duration-200 group-hover:border-black/20 sm:max-w-none sm:h-40 sm:w-40 md:h-48 md:w-48">
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    fill
                    className={cn(
                      "object-cover grayscale transition-all duration-300 group-hover:grayscale-0",
                      // Ashish's head sits high in the frame; anchor the crop
                      // higher so the top of his head isn't clipped.
                      founder.initials === "AT" && "object-[center_20%]",
                    )}
                    sizes="(max-width: 640px) 220px, (max-width: 768px) 160px, 192px"
                    quality={75}
                  />
                </div>
              </div>

              <h3 className="mb-1 text-lg font-bold leading-tight text-tertiary sm:mb-2 sm:text-2xl md:text-3xl">
                {founder.name}
              </h3>
              <p className="mb-4 text-xs font-medium text-sky-600 sm:mb-6 sm:text-sm">
                {founder.role}
              </p>

              <p className="mb-6 max-w-[55ch] text-sm leading-relaxed text-tertiary/70 sm:mb-8 sm:text-base">
                {founder.bio}
              </p>

              {founder.linkedin ? (
                <Link
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-2 text-xs font-medium text-tertiary/70 transition-colors duration-200 hover:text-sky-600 sm:text-sm"
                >
                  <LinkedInGlyph />
                  <span>Connect on LinkedIn</span>
                  <ArrowUpRight className="size-2.5 shrink-0 -translate-x-1 opacity-0 transition-all duration-200 group-hover/link:translate-x-0 group-hover/link:opacity-100 sm:size-3" />
                </Link>
              ) : null}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FoundersSection;
