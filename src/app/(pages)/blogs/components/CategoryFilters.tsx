"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/utils";
import type { BlogCategoryFilter } from "./category";

interface CategoryFiltersProps {
  categories: readonly BlogCategoryFilter[];
  value: BlogCategoryFilter;
  onChange: (category: BlogCategoryFilter) => void;
}

export default function CategoryFilters({
  categories,
  value,
  onChange,
}: CategoryFiltersProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  // Whether more chips exist past each edge — drives the fades that signal the
  // row is swipeable on mobile. Both false (everything fits / wrapped at md+)
  // means no fade at all.
  const [edges, setEdges] = useState({ left: false, right: false });

  const updateEdges = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setEdges({
      left: scrollLeft > 1,
      right: scrollLeft + clientWidth < scrollWidth - 1,
    });
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateEdges();
    el.addEventListener("scroll", updateEdges, { passive: true });
    const ro = new ResizeObserver(updateEdges);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      ro.disconnect();
    };
  }, [updateEdges]);

  // A mask is background-independent: it fades the chips themselves to
  // transparent at a scrollable edge. Omitted entirely when nothing overflows.
  const fade =
    edges.left || edges.right
      ? `linear-gradient(to right, ${
          edges.left ? "transparent" : "#000"
        } 0, #000 2rem, #000 calc(100% - 2rem), ${
          edges.right ? "transparent" : "#000"
        } 100%)`
      : undefined;

  return (
    <div
      ref={scrollRef}
      style={{ maskImage: fade, WebkitMaskImage: fade }}
      className={cn(
        // Mobile: a single swipeable row instead of wrapping into ~19 rows.
        // Scrollbar hidden; the edge fade signals there's more to swipe to.
        "flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        // md+: restore the wrapped chip layout (there's room to lay them out).
        "md:flex-wrap md:overflow-visible",
      )}
      role="tablist"
      aria-label="Filter by category"
    >
      {categories.map((cat) => {
        const selected = value === cat;
        return (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(cat)}
            className={cn(
              "shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors capitalize",
              selected
                ? "border-secondary/35 bg-secondary/10 text-secondary shadow-[inset_0_1px_0_0_rgba(143,224,255,0.12)]"
                : "border-transparent bg-transparent text-white/55 hover:border-white/10 hover:bg-white/5 hover:text-white",
            )}
          >
            {cat.replace("_", " ")}
          </button>
        );
      })}
    </div>
  );
}
