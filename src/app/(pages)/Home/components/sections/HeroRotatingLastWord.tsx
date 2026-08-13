"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const WORDS = [
  "perform",
  "evolve",
  "sustain",
  "compel",
  "thrive",
  "deliver",
  "matter",
];

const INTERVAL_MS = 2800;

export default function HeroRotatingLastWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % WORDS.length),
      INTERVAL_MS,
    );
    return () => clearInterval(id);
  }, []);

  const longestWord = WORDS.reduce((a, b) => (a.length > b.length ? a : b));

  return (
    <span className="hero-word relative inline-flex align-bottom">
      {/* Invisible longest word to lock the container width */}
      <span aria-hidden className="hero-word-inner invisible whitespace-nowrap">
        {longestWord}.
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={WORDS[index]}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="hero-word-inner hero-rotating-word-gradient absolute left-0 top-0"
        >
          {WORDS[index]}.
        </motion.span>
      </AnimatePresence>
    </span>
  );
}