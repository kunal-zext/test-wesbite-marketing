"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";
import { NewsletterPillLink } from "@/app/components/ui/NewsletterPillLink/NewsletterPillLink";

/**
 * Floating "Book your seat" pill promoting Zext Academy on the home page. Shares
 * NewsletterPillLink's styling/animation with the newsletter floater, but anchors
 * to the bottom-left on `sm`+ so the two never overlap. On mobile (where opposite
 * corners would collide) it stacks just above the newsletter pill in the
 * bottom-right instead. Fades in after a beat, hides once the hero is scrolled past.
 */
export default function AcademyFloater() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) {
      setShow(false);
      return;
    }

    const openTimer = setTimeout(() => setShow(true), 1800);

    const onScroll = () => {
      setShow(window.scrollY < window.innerHeight * 0.9);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(openTimer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [isHome]);

  if (!isHome) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="academy-floater"
          initial={{ opacity: 0, x: -24, y: 8 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -24, y: 8 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-24 right-5 z-90 sm:bottom-8 sm:left-7 sm:right-auto"
        >
          <NewsletterPillLink
            href="/zext-academy"
            eyebrow="Zext Academy"
            label="Book your seat"
            aria-label="Explore Zext Academy and book your seat"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
