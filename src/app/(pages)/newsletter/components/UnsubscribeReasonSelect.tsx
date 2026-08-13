"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronDown } from "lucide-react";
import { UNSUBSCRIBE_LEAVE_REASONS } from "@/utils/constants/unsubscribeLeaveReasons";
import { cn } from "@/utils";

const PLACEHOLDER = "Select a reason";

const EASE = [0.22, 1, 0.36, 1] as const;

type UnsubscribeReasonSelectProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  hasError?: boolean;
};

export default function UnsubscribeReasonSelect({
  value,
  onChange,
  disabled,
  hasError,
}: UnsubscribeReasonSelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (disabled) setOpen(false);
  }, [disabled]);

  const selected = UNSUBSCRIBE_LEAVE_REASONS.find((r) => r.value === value);
  const display = selected?.label ?? PLACEHOLDER;

  const borderClass = hasError
    ? "border-rose-400/45 focus-visible:border-rose-400/60 focus-visible:ring-rose-400/15"
    : "border-white/10 focus-visible:border-secondary/45 focus-visible:ring-secondary/15";

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        id="unsub-reason-trigger"
        disabled={disabled}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={open ? listId : undefined}
        onClick={() => {
          if (!disabled) setOpen((o) => !o);
        }}
        className={cn(
          "flex h-12 w-full items-center rounded-xl border bg-white/4 py-2.5 pl-4 pr-11 text-left text-sm outline-none transition-all duration-200 focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
          !selected && "text-white/40",
          selected && "text-white",
          borderClass,
          open &&
            !hasError &&
            "border-secondary/45 ring-2 ring-secondary/15 ring-offset-0",
        )}
      >
        <span className="min-w-0 flex-1 truncate">{display}</span>
      </button>
      <ChevronDown
        className={cn(
          "pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-secondary/75 transition-transform duration-200",
          open && "rotate-180",
        )}
        strokeWidth={2}
        aria-hidden
      />

      <AnimatePresence>
        {open ? (
          <motion.ul
            key="unsub-reason-listbox"
            id={listId}
            role="listbox"
            aria-label="Reason for leaving"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: EASE }}
            className={cn(
              "absolute left-0 right-0 top-[calc(100%+6px)] z-60 max-h-[min(240px,calc(100dvh-14rem))] overflow-y-auto rounded-xl border border-white/10 bg-[linear-gradient(145deg,rgba(24,24,27,0.98),rgba(9,9,11,0.99))] p-1 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.85),inset_0_1px_0_0_rgba(255,255,255,0.06)] ring-1 ring-white/5 backdrop-blur-xl",
              "[scrollbar-gutter:stable]",
              "[scrollbar-width:thin]",
              "[scrollbar-color:rgba(255,255,255,0.35)_rgba(255,255,255,0.06)]",
              "[&::-webkit-scrollbar]:w-2",
              "[&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-white/[0.06]",
              "[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/30 [&::-webkit-scrollbar-thumb]:hover:bg-white/45",
            )}
          >
            {UNSUBSCRIBE_LEAVE_REASONS.map((opt) => {
              const isActive = value === opt.value;
              return (
                <li key={opt.value} role="presentation" className="p-0">
                  <button
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-lg px-2.5 py-2.5 text-left text-sm transition-colors duration-150",
                      isActive
                        ? "bg-secondary/12 text-secondary"
                        : "text-white/85 hover:bg-white/[0.07] hover:text-white",
                    )}
                    onClick={() => {
                      onChange(opt.value);
                      setOpen(false);
                    }}
                  >
                    <span className="flex size-5 shrink-0 items-center justify-center">
                      {isActive ? (
                        <Check
                          className="size-4 text-secondary"
                          strokeWidth={2.5}
                          aria-hidden
                        />
                      ) : null}
                    </span>
                    <span className="min-w-0 flex-1 leading-snug">{opt.label}</span>
                  </button>
                </li>
              );
            })}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
