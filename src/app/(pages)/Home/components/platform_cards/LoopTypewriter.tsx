"use client";

import { cn } from "@/utils";
import { useEffect, useRef, useState } from "react";

export type LoopTypewriterOptions = {
  /** ms between each character while typing */
  typeMs?: number;
  /** ms between each character while deleting */
  deleteMs?: number;
  /** ms to hold the full phrase before deleting */
  holdMs?: number;
  /** ms before the first typed character (useful to stagger several instances) */
  startDelayMs?: number;
  /** ms after a full wipe before re-typing when `phrases` has a single entry */
  betweenLoopMs?: number;
};

const defaults: Required<LoopTypewriterOptions> = {
  typeMs: 42,
  deleteMs: 26,
  holdMs: 2200,
  startDelayMs: 0,
  betweenLoopMs: 360,
};

/**
 * Cycles through `phrases` with a typewriter effect (type → hold → delete → next).
 */
export function useLoopTypewriter(
  phrases: readonly string[],
  options: LoopTypewriterOptions = {},
): string {
  const { typeMs, deleteMs, holdMs, startDelayMs, betweenLoopMs } = {
    ...defaults,
    ...options,
  };
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const phraseKey = phrases.join("\u241e");
  const phrasesRef = useRef(phrases);
  phrasesRef.current = phrases;

  useEffect(() => {
    setPhraseIndex(0);
  }, [phraseKey]);

  useEffect(() => {
    const list = phrasesRef.current;
    if (list.length === 0) {
      setText("");
      return;
    }

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const phrase = list[phraseIndex % list.length];

    const run = (i: number, mode: "type" | "delete") => {
      if (cancelled) return;
      if (mode === "type") {
        if (i < phrase.length) {
          setText(phrase.slice(0, i + 1));
          timeoutId = setTimeout(() => run(i + 1, "type"), typeMs);
        } else {
          timeoutId = setTimeout(() => run(phrase.length - 1, "delete"), holdMs);
        }
      } else if (i >= 0) {
        setText(phrase.slice(0, i));
        if (i === 0) {
          if (list.length === 1) {
            timeoutId = setTimeout(() => run(0, "type"), betweenLoopMs);
          } else {
            setPhraseIndex((p) => (p + 1) % list.length);
          }
        } else {
          timeoutId = setTimeout(() => run(i - 1, "delete"), deleteMs);
        }
      }
    };

    timeoutId = setTimeout(() => run(0, "type"), startDelayMs);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [
    phraseIndex,
    phraseKey,
    typeMs,
    deleteMs,
    holdMs,
    startDelayMs,
    betweenLoopMs,
  ]);

  return text;
}

type LoopTypewriterTextProps = {
  phrases: readonly string[];
  className?: string;
  /** Show a blinking block cursor after the text */
  cursor?: boolean;
  cursorClassName?: string;
} & LoopTypewriterOptions;

export function LoopTypewriterText({
  phrases,
  className,
  cursor = true,
  cursorClassName,
  ...opts
}: LoopTypewriterTextProps) {
  const text = useLoopTypewriter(phrases, opts);
  return (
    <span className={cn("inline-flex max-w-full min-w-0 items-center gap-0.5", className)}>
      <span className="min-w-0 wrap-break-word">{text}</span>
      {cursor ? (
        <span
          className={cn(
            "mt-0.5 inline-block h-[0.85em] w-px shrink-0 animate-pulse bg-current opacity-90",
            cursorClassName,
          )}
          aria-hidden
        />
      ) : null}
    </span>
  );
}
