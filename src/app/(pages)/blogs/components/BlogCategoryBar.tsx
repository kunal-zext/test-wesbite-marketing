"use client";

import type { BlogCategory } from "../data/blogs";

interface BlogCategoryBarProps {
  categories: BlogCategory[];
  /** Currently active category, or "all". */
  active: string;
  /** Select a category (or "all"). */
  onSelect: (category: string) => void;
}

/**
 * Category filter for the blog listing. Chips are buttons that update the
 * client-side active category — the listing filters in memory (static export,
 * no server navigation).
 */
export default function BlogCategoryBar({
  categories,
  active,
  onSelect,
}: BlogCategoryBarProps) {
  if (categories.length === 0) return null;

  const chips = [{ category: "all", count: 0 }, ...categories];

  return (
    <nav
      aria-label="Filter blogs by category"
      className="mb-8 flex flex-wrap gap-2"
    >
      {chips.map(({ category }) => {
        const isActive = active === category;
        return (
          <button
            key={category}
            type="button"
            onClick={() => onSelect(category)}
            aria-pressed={isActive}
            className={
              isActive
                ? "rounded-full border border-secondary/40 bg-secondary/15 px-3.5 py-1.5 text-xs font-medium capitalize text-white"
                : "rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium capitalize text-white/65 transition-colors hover:border-white/25 hover:text-white/90"
            }
          >
            {category === "all" ? "All" : category}
          </button>
        );
      })}
    </nav>
  );
}
