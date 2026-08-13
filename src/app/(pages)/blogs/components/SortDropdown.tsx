"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/utils";

export type BlogSortOption = "newest" | "oldest" | "title";

const SORT_OPTIONS: { value: BlogSortOption; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "title", label: "Title A–Z" },
];

interface SortDropdownProps {
  value: BlogSortOption;
  onChange: (sort: BlogSortOption) => void;
  className?: string;
}

export default function SortDropdown({
  value,
  onChange,
  className,
}: SortDropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const current =
    SORT_OPTIONS.find((o) => o.value === value) ?? SORT_OPTIONS[0];

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current?.contains(e.target as Node)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div
      ref={rootRef}
      className={cn(
        "inline-flex flex-wrap items-center gap-2 text-sm text-white/55",
        className,
      )}
    >
      <span className="shrink-0" id={`${listId}-label`}>
        Sort by:
      </span>
      <div className="relative font-sans">
        <button
          type="button"
          className={cn(
            "flex h-10 min-w-42 items-center justify-between gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-left text-sm font-medium text-white outline-none transition-[border-color,background-color,box-shadow]",
            "hover:border-white/25 hover:bg-white/8",
            "focus-visible:border-secondary/40 focus-visible:ring-2 focus-visible:ring-secondary/25",
            open && "border-secondary/35 bg-white/8 ring-1 ring-secondary/20",
          )}
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-controls={listId}
          aria-labelledby={`${listId}-label`}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="truncate">{current.label}</span>
          <ChevronDown
            className={cn(
              "size-4 shrink-0 text-white/50 transition-transform duration-200",
              open && "rotate-180",
            )}
            aria-hidden
          />
        </button>

        {open ? (
          <ul
            id={listId}
            role="listbox"
            aria-labelledby={`${listId}-label`}
            className={cn(
              "absolute right-0 top-full z-50 mt-1.5 min-w-42 overflow-hidden rounded-lg border border-white/15 py-1 font-sans shadow-[0_16px_48px_-12px_rgba(0,0,0,0.75)]",
              "bg-[#121214] backdrop-blur-md",
            )}
          >
            {SORT_OPTIONS.map((opt) => {
              const selected = value === opt.value;
              return (
                <li key={opt.value} role="presentation">
                  <button
                    type="button"
                    role="option"
                    aria-selected={selected}
                    className={cn(
                      "flex w-full items-center px-3 py-2.5 text-left text-sm font-medium tracking-normal text-white/90 antialiased",
                      "transition-colors outline-none",
                      "hover:bg-white/8 hover:text-white",
                      "focus-visible:bg-white/10 focus-visible:text-white",
                      selected &&
                        "bg-secondary/12 text-secondary hover:bg-secondary/16 hover:text-secondary",
                    )}
                    onClick={() => {
                      onChange(opt.value);
                      setOpen(false);
                    }}
                  >
                    {opt.label}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
