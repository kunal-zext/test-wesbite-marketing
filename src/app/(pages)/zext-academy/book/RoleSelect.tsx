"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

type Props = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder?: string;
  invalid?: boolean;
};

export function RoleSelect({
  id,
  value,
  onChange,
  options,
  placeholder = "Select one",
  invalid,
}: Props) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const i = options.indexOf(value);
    setActive(i >= 0 ? i : 0);
  }, [open, value, options]);

  function choose(index: number) {
    const opt = options[index];
    if (opt == null) return;
    onChange(opt);
    setOpen(false);
    btnRef.current?.focus();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      const dir = e.key === "ArrowDown" ? 1 : -1;
      setActive((a) => (a + dir + options.length) % options.length);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (open && active >= 0) choose(active);
      else setOpen((o) => !o);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        id={id}
        ref={btnRef}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-invalid={invalid || undefined}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onKeyDown}
        className={cn(
          "flex w-full items-center justify-between gap-3 rounded-xl border bg-tertiary px-4 py-3.5 text-left text-[15px] outline-none transition-[border-color,box-shadow] duration-200 focus-visible:ring-2",
          invalid
            ? "border-rose-400/60 focus-visible:border-rose-400 focus-visible:ring-rose-400/25"
            : "border-white/10 focus-visible:border-secondary focus-visible:ring-secondary/25",
          value ? "text-white" : "text-white/30",
        )}
      >
        <span className="truncate">{value || placeholder}</span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 transition-transform duration-200",
            open ? "rotate-180 text-secondary" : "text-white/40",
          )}
          strokeWidth={2}
          aria-hidden
        />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16, ease: EASE }}
            className="absolute z-30 mt-2 max-h-64 w-full overflow-auto rounded-xl border border-white/10 bg-[#0f1830] p-1.5 shadow-[0_24px_60px_-24px_rgba(5,12,30,0.9)]"
          >
            {options.map((opt, i) => {
              const selected = opt === value;
              const isActive = i === active;
              return (
                <li
                  key={opt}
                  role="option"
                  aria-selected={selected}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => choose(i)}
                  className={cn(
                    "flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-[14.5px] transition-colors duration-150",
                    isActive ? "bg-secondary/10 text-white" : "text-white/75",
                    selected && "text-secondary",
                  )}
                >
                  <span className="truncate">{opt}</span>
                  {selected ? (
                    <Check
                      className="size-4 shrink-0 text-secondary"
                      strokeWidth={2.5}
                      aria-hidden
                    />
                  ) : null}
                </li>
              );
            })}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
