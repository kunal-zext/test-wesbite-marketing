"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface BlogPaginationProps {
  current: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/** Compact numbered page list with leading/trailing pages around the current. */
function pageWindow(current: number, total: number): number[] {
  const span = 2;
  const start = Math.max(1, current - span);
  const end = Math.min(total, current + span);
  const pages: number[] = [];
  for (let p = start; p <= end; p++) pages.push(p);
  return pages;
}

/**
 * Client-side numbered pagination. Prev/Next plus a window of page numbers,
 * each a button that updates the listing's current page in memory (static
 * export, no URL navigation). Renders nothing for a single page.
 */
export default function BlogPagination({
  current,
  totalPages,
  onPageChange,
}: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  const pages = pageWindow(current, totalPages);
  const hasPrev = current > 1;
  const hasNext = current < totalPages;

  const numberClass = (active: boolean) =>
    active
      ? "inline-flex size-9 items-center justify-center rounded-lg border border-secondary/40 bg-secondary/15 text-sm font-semibold text-white"
      : "inline-flex size-9 items-center justify-center rounded-lg border border-white/12 bg-white/5 text-sm font-medium text-white/65 transition-colors hover:border-white/25 hover:text-white";

  const edgeClass = (enabled: boolean) =>
    enabled
      ? "inline-flex size-9 items-center justify-center rounded-lg border border-white/12 bg-white/5 text-white/70 transition-colors hover:border-white/25 hover:text-white"
      : "inline-flex size-9 items-center justify-center rounded-lg border border-white/8 bg-white/2 text-white/25 pointer-events-none";

  return (
    <nav
      aria-label="Blog pagination"
      className="mt-12 flex items-center justify-center gap-2"
    >
      <button
        type="button"
        onClick={() => onPageChange(current - 1)}
        disabled={!hasPrev}
        aria-label="Previous page"
        className={edgeClass(hasPrev)}
      >
        <ChevronLeft className="size-4" strokeWidth={2} aria-hidden />
      </button>

      {pages[0] > 1 ? (
        <span className="px-1 text-sm text-white/35" aria-hidden>
          …
        </span>
      ) : null}

      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onPageChange(p)}
          aria-current={p === current ? "page" : undefined}
          className={numberClass(p === current)}
        >
          {p}
        </button>
      ))}

      {pages[pages.length - 1] < totalPages ? (
        <span className="px-1 text-sm text-white/35" aria-hidden>
          …
        </span>
      ) : null}

      <button
        type="button"
        onClick={() => onPageChange(current + 1)}
        disabled={!hasNext}
        aria-label="Next page"
        className={edgeClass(hasNext)}
      >
        <ChevronRight className="size-4" strokeWidth={2} aria-hidden />
      </button>
    </nav>
  );
}
