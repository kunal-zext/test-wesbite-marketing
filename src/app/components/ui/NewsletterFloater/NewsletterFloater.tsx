"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";
import { NewsletterPillLink } from "@/app/components/ui/NewsletterPillLink/NewsletterPillLink";

export default function NewsletterFloater() {
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
          key="floater"
          initial={{ opacity: 0, x: 24, y: 8 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 24, y: 8 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-7 right-5 z-90 sm:bottom-8 sm:right-7"
        >
          <NewsletterPillLink />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
