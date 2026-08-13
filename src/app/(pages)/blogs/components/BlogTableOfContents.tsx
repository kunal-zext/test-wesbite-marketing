"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { useLenis } from "lenis/react";
import { cn } from "@/utils";
import type { BlogHeading } from "./headings";

/** Match the navbar offset used by the global hash-scroll handler. */
const SCROLL_OFFSET = -96;

interface BlogTableOfContentsProps {
  headings: BlogHeading[];
  className?: string;
  /**
   * Suppress the built-in "On this page" label. Used when an outer element
   * already provides it — e.g. the mobile `<summary>` toggle.
   */
  hideHeading?: boolean;
}

/**
 * Sticky in-page navigation listing every `h2`. Clicking smooth-scrolls via
 * Lenis (consistent with the rest of the site) and the entry for the section
 * currently in view is highlighted.
 */
export default function BlogTableOfContents({
  headings,
  className,
  hideHeading = false,
}: BlogTableOfContentsProps) {
  const lenis = useLenis();
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? "");

  useEffect(() => {
    if (headings.length === 0) return;

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          );
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      // Activate a heading once it crosses below the navbar, until the next
      // one reaches the upper third of the viewport.
      { rootMargin: "-96px 0px -66% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  const handleClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    setActiveId(id);
    if (lenis) {
      lenis.scrollTo(el, { offset: SCROLL_OFFSET });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <nav aria-label="Table of contents" className={className}>
      {!hideHeading ? (
        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/40">
          On this page
        </p>
      ) : null}
      <ul className="border-l border-white/10">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              onClick={(e) => handleClick(e, h.id)}
              className={cn(
                "-ml-px block border-l-2 py-1.5 text-sm leading-snug transition-colors",
                h.level === 3 ? "pl-7 text-[13px]" : "pl-4",
                activeId === h.id
                  ? "border-secondary font-medium text-white"
                  : "border-transparent text-white/45 hover:text-white/80",
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
