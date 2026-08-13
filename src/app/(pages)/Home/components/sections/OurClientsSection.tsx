"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/utils";
import { SECTION_IDS } from "@/utils/homeAnchors";

const EASE = [0.22, 1, 0.36, 1] as const;

/** How long each testimonial stays visible before rotating (ms). */
const TESTIMONIAL_ROTATE_MS = 6500;

/** Logo grid entries; `testimonial` only when we have approved client copy (rotator shows those only). */
const OUR_CLIENTS: readonly {
  file: string;
  label: string;
  testimonial?: {
    quote: string;
    speaker: { readonly name: string; readonly role: string };
  };
}[] = [
  {
    file: "AAD Technologies.jpeg",
    label: "AAD Technologies",
  },
  {
    file: "Antique Broking Logo.png",
    label: "Antique Broking",
    testimonial: {
      quote:
        "We recently partnered with Zext Digital for an AI enablement program consisting of multiple workshops and seminars tailored for our Market Research, HR, Sales, and Investment Banking teams. The sessions were thoughtfully designed, introducing our teams to a wide range of AI tools and concepts that can immediately enhance productivity and reduce time spent on routine tasks. The response was overwhelmingly positive - a large majority of participants shared that they found the content directly applicable to their daily work, and several teams have already begun experimenting with the tools introduced. We see this as laying the foundation for the next wave of evolution in how we work, and we are proud to be among the pioneers in adopting AI within our industry. As an Institutional Broking organization, we truly value the expertise that Zext Digital brought in shaping this shift, and we strongly recommend them to organizations looking to embrace AI effectively.",
      speaker: {
        name: "Jignesh Sangani, Director",
        role: "Antique Stock Broking Ltd",
      },
    },
  },
  {
    file: "Bathiya Advisors Logo.png",
    label: "Bathiya Advisors",
  },
  {
    file: "Britti Group of Schools.jpg",
    label: "Britti Group of Schools",
    testimonial: {
      quote:
        "Working with Zext has changed how we think about content. They brought an AI-led approach to our creatives that we hadn't seen before. Faster turnaround, stronger visual consistency, and assets that actually feel on-brand. They also audited our existing content and flagged what wasn't working, which gave us a much clearer picture of where we stood. For an institution like ours, how you show up visually carries real weight, and Zext has made that side of things significantly sharper.",
      speaker: {
        name: "Akin Choudhary",
        role: "Director, Britti Group of Schools",
      },
    },
  },
  {
    file: "Greencell Logo.png",
    label: "Greencell Mobility",
    testimonial: {
      quote:
        "Incredible insight into the world of Generative AI! The session was engaging, clear, and-most importantly-directly applicable to our business needs. Our staff left feeling empowered to use these tools to drive better results.",
      speaker: { name: "Team", role: "Greencell Mobility" },
    },
  },
  {
    file: "Neebal Technologies Logo.png",
    label: "Neebal Technologies",
    testimonial: {
      quote:
        "We recently collaborated with Zext Digital for a full-day AI workshop with our technology team at Neebal. The session was highly engaging and hands-on, with over 50 of our developers and architects coding real-world AI applications during the day. The workshop combined deep technical knowledge with practical coding exercises, enabling our team to quickly grasp how to build and deploy AI-driven solutions. We walked away with not just concepts but also usable code snippets, frameworks, and confidence to accelerate AI adoption in our client projects. Zext Digital brought great expertise and structure, and we look forward to continuing this partnership.",
      speaker: {
        name: "Abhishek Satvi. VP - Operations",
        role: "Neebal Technologies Pvt Ltd",
      },
    },
  },
  {
    file: "Neelam Realtors Logo.png",
    label: "Neelam Realtors",
  },
  {
    file: "PSIPL Logo.png",
    label: "PSIPL",
    testimonial: {
      quote:
        "The session was an encouraging first step in building leadership alignment on AI. With hands-on Co-pilot examples and clearly defined cross-functional use cases, this momentum can be turned into real, on-ground adoption and value creation.",
      speaker: { name: "Leadership", role: "PSIPL" },
    },
  },
];

function clientLogoSrc(file: string) {
  return `/assets/clients/${encodeURIComponent(file)}`;
}

const LOGO_ROW_COUNTS = [12, 10, 8] as const;

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

type ClientTestimonialSlide = {
  id: string;
  company: string;
  quote: string;
  speaker: { readonly name: string; readonly role: string };
};

function ClientTestimonialRotator({
  items,
  reduceMotion,
}: {
  items: ClientTestimonialSlide[];
  reduceMotion: boolean;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion || items.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, TESTIMONIAL_ROTATE_MS);
    return () => window.clearInterval(id);
  }, [items.length, reduceMotion]);

  const current = items[index] ?? items[0];

  return (
    <div className="mx-auto w-full max-w-6xl 2xl:max-w-[1600px]">
      <div
        className={cn(
          "flex min-h-182 flex-col justify-center overflow-hidden rounded-[1.35rem] border border-white/10 bg-white/3 px-6 py-10 text-center shadow-[0_20px_50px_-24px_rgba(0,0,0,0.65)] backdrop-blur-sm sm:min-h-120 sm:px-10 sm:py-12 md:min-h-136 md:rounded-3xl md:py-14 lg:min-h-134",
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            className="w-full"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.38, ease: EASE }}
          >
            <blockquote className="text-pretty">
              <p className="text-[clamp(1rem,2.4vw,1.35rem)] font-medium leading-[1.55] tracking-tight text-white/88">
                <span className="text-secondary/90">&ldquo;</span>
                {current.quote}
                <span className="text-secondary/90">&rdquo;</span>
              </p>
              <footer className="mt-8 flex flex-col items-center gap-2 sm:mt-10">
                <div className="flex flex-wrap items-center justify-center gap-2.5">
                  <span
                    className="size-2 shrink-0 rounded-full bg-secondary shadow-[0_0_0_3px_rgba(143,224,255,0.2)]"
                    aria-hidden
                  />
                  <cite className="not-italic text-sm font-normal leading-snug text-white sm:text-[15px]">
                    {current.speaker.name}, {current.speaker.role}
                  </cite>
                </div>
                <p className="max-w-md text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45 sm:text-xs">
                  {current.company}
                </p>
              </footer>
            </blockquote>
          </motion.div>
        </AnimatePresence>
      </div>
      {!reduceMotion && items.length > 1 ? (
        <div
          className="mt-6 flex flex-wrap justify-center gap-1.5"
          role="tablist"
          aria-label="Testimonial slides"
        >
          {items.map((item, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Testimonial ${i + 1} of ${items.length}`}
              onClick={() => setIndex(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === index
                  ? "w-7 bg-secondary"
                  : "w-1.5 bg-white/25 hover:bg-white/45",
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function tileMotion(salt: number, reduceMotion: boolean) {
  if (reduceMotion) {
    return { rotate: 0, x: 0, y: 0 };
  }
  const rotate = ((salt * 7) % 13) - 6;
  const x = ((salt * 5) % 11) - 5;
  const y = ((salt * 11) % 9) - 4;
  return { rotate, x, y };
}

function floatKeyframes(
  salt: number,
  base: { x: number; y: number; rotate: number },
) {
  const { x: bx, y: by, rotate: br } = base;
  const ampY = 2.4 + (salt % 5) * 0.45;
  const ampX = 1.1 + (salt % 4) * 0.35;
  const ampR = 1.1 + (salt % 5) * 0.28;
  const dur = 4.2 + (salt % 7) * 0.38;
  const delay = (salt % 15) * 0.07;
  return {
    animate: {
      y: [by + ampY, by - ampY * 0.65, by + ampY * 0.35, by + ampY],
      x: [bx - ampX, bx + ampX * 0.85, bx - ampX * 0.4, bx - ampX],
      rotate: [br - ampR, br + ampR * 0.9, br - ampR * 0.35, br - ampR],
    },
    transition: {
      duration: dur,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay,
    },
  };
}

function FloatingClientLogoTile({
  file,
  label,
  salt,
  reduceMotion,
  index,
}: {
  file: string;
  label: string;
  salt: number;
  reduceMotion: boolean;
  index: number;
}) {
  const base = tileMotion(salt, reduceMotion);
  const float = reduceMotion ? null : floatKeyframes(salt, base);
  const src = clientLogoSrc(file);

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{
        duration: 0.45,
        ease: EASE,
        delay: reduceMotion ? 0 : Math.min(index * 0.04, 0.5),
      }}
      className="touch-manipulation h-full min-h-0 w-full"
    >
      <motion.div
        animate={float?.animate}
        transition={float?.transition}
        style={
          reduceMotion
            ? { x: base.x, y: base.y, rotate: base.rotate }
            : undefined
        }
        className="h-full min-h-0 w-full"
      >
        <div
          className="group aspect-square flex h-full min-h-0 w-full flex-col items-center rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          tabIndex={0}
          aria-label={label}
        >
          <motion.div
            whileHover={
              reduceMotion
                ? undefined
                : { scale: 1.06, transition: { duration: 0.22 } }
            }
            className={cn(
              "flex min-h-0 min-w-0 w-full flex-1 rounded-2xl bg-white p-1.5 shadow-[0_1px_0_rgba(0,0,0,0.06),0_8px_24px_-6px_rgba(0,0,0,0.35)] sm:rounded-3xl sm:p-2 md:rounded-[1.75rem]",
            )}
          >
            <Image
              src={src}
              alt=""
              width={112}
              height={112}
              className="h-full w-full min-h-0 min-w-0 object-contain select-none pointer-events-none"
              sizes="(max-width: 639px) 96px, (max-width: 767px) 64px, 72px"
              unoptimized
              loading="lazy"
              quality={100}
              aria-hidden
            />
          </motion.div>
          <div
            aria-hidden
            className={cn(
              "pointer-events-none mt-2.5 flex shrink-0 max-w-52 flex-col items-center px-0.5",
              reduceMotion
                ? "opacity-95"
                : [
                    "opacity-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] translate-y-1",
                    "group-hover:opacity-100 group-hover:translate-y-0",
                    "group-focus-within:opacity-100 group-focus-within:translate-y-0",
                  ],
            )}
          >
            <span
              className={cn(
                "mb-1.5 h-px w-9 bg-linear-to-r from-transparent via-secondary/55 to-transparent transition-opacity duration-300",
                reduceMotion
                  ? "opacity-80"
                  : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100",
              )}
            />
            <p className="text-balance text-center text-[10px] font-semibold leading-snug tracking-[-0.01em] text-white sm:text-[11px] sm:leading-snug">
              <span className="bg-linear-to-b from-white via-white to-white/75 bg-clip-text text-transparent">
                {label}
              </span>
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function OurClientsSection() {
  const reduceMotion = useReducedMotion() ?? false;

  const tiles = useMemo(() => {
    return OUR_CLIENTS.map((m, i) => ({
      file: m.file,
      label: m.label,
      salt: i * 3 + 1,
      key: m.file,
    }));
  }, []);

  const logoRows = useMemo(() => {
    const expected = LOGO_ROW_COUNTS.reduce((a, b) => a + b, 0);
    if (tiles.length !== expected) {
      console.warn(
        `OurClientsSection: logo row counts (${LOGO_ROW_COUNTS.join("+")}=${expected}) do not match OUR_CLIENTS length (${tiles.length}).`,
      );
    }
    return LOGO_ROW_COUNTS.map((count, rowIndex) => {
      const start = LOGO_ROW_COUNTS.slice(0, rowIndex).reduce(
        (acc, c) => acc + c,
        0,
      );
      return tiles.slice(start, start + count);
    });
  }, [tiles]);

  const clientTestimonials = useMemo((): ClientTestimonialSlide[] => {
    return OUR_CLIENTS.flatMap((c) =>
      c.testimonial
        ? [
            {
              id: c.file,
              company: c.label,
              quote: c.testimonial.quote,
              speaker: c.testimonial.speaker,
            },
          ]
        : [],
    );
  }, []);

  return (
    <section
      id={SECTION_IDS.clients}
      aria-labelledby="clients-heading"
      className="relative isolate w-full min-w-0 scroll-mt-8 overflow-hidden bg-tertiary py-16 sm:py-20 md:pt-20 md:pb-24"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_40%_at_50%_0%,rgba(255,255,255,0.04),transparent_60%)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl 2xl:max-w-[1600px] px-4 sm:px-5 md:px-6">
        <motion.header
          className="mb-10 text-center sm:mb-12 md:mb-14"
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
              className="hidden h-px w-10 origin-right bg-linear-to-r from-transparent to-white/20 sm:block sm:w-16 md:w-24"
              style={{ transformOrigin: "right center" }}
              variants={lineGrow}
              aria-hidden
            />
            <span className="text-[1vh] font-medium tracking-[0.15em] text-secondary sm:text-xs sm:tracking-[0.2em] md:text-base uppercase">
              Trusted By
            </span>
            <motion.span
              className="hidden h-px w-10 origin-left bg-linear-to-l from-transparent to-white/20 sm:block sm:w-16 md:w-24"
              style={{ transformOrigin: "left center" }}
              variants={lineGrow}
              aria-hidden
            />
          </motion.div>
          <motion.h2
            id="clients-heading"
            className="mx-auto max-w-2xl text-center text-[clamp(1.5rem,3.8vw,2.5rem)] font-bold leading-[1.12] tracking-tight text-white"
            variants={headerItem}
          >
            Teams we ship with
          </motion.h2>
          <motion.p
            className="mx-auto mt-4 max-w-[1600px] md:max-w-7xll text-center text-pretty text-sm leading-[1.65] text-white/50 sm:text-[15px] sm:leading-relaxed"
            variants={headerItem}
          >
            From discovery to production, we work shoulder-to-shoulder with
            teams who expect clarity, velocity, and ownership - not vendor
            theatre.
          </motion.p>
        </motion.header>

        <div
          role="group"
          aria-label="Client logos"
          className="flex w-full flex-col items-center gap-y-3 sm:gap-y-3.5 md:gap-y-4"
        >
          {logoRows.map((row, rowIndex) => {
            const rowStart = logoRows
              .slice(0, rowIndex)
              .reduce((acc, r) => acc + r.length, 0);
            return (
              <div
                key={rowIndex}
                className="flex max-w-full flex-wrap justify-center gap-x-3 gap-y-3 sm:gap-x-3.5 sm:gap-y-3.5 md:gap-x-4 md:gap-y-4"
              >
                {row.map((t, indexInRow) => (
                  <div
                    key={`${rowIndex}-${indexInRow}`}
                    className="flex min-h-34 w-23 shrink-0 items-stretch justify-center pt-1 sm:min-h-36 sm:w-24 md:w-25"
                  >
                    <FloatingClientLogoTile
                      file={t.file}
                      label={t.label}
                      salt={t.salt}
                      reduceMotion={reduceMotion}
                      index={rowStart + indexInRow}
                    />
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        <div
          id={SECTION_IDS.testimonials}
          role="region"
          aria-label="Client testimonials"
          aria-live="polite"
          className="scroll-mt-8 mt-14"
        >
          <ClientTestimonialRotator
            items={clientTestimonials}
            reduceMotion={reduceMotion}
          />
        </div>
      </div>
    </section>
  );
}

export default OurClientsSection;
