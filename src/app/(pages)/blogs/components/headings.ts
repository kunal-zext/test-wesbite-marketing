import type { BlogContentBlock } from "@/types/blog";

export type BlogHeading = { id: string; text: string; level: 2 | 3 };

/** Turn heading text into a URL-safe anchor fragment. */
export function slugifyHeading(text: string): string {
  return (
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-") || "section"
  );
}

/**
 * Collision-safe id for a heading. Pass a shared `seen` map and call once per
 * heading **in document order** so the TOC and the rendered `<h2>`s agree on
 * ids. Mutates `seen`.
 */
export function headingId(text: string, seen: Map<string, number>): string {
  const base = slugifyHeading(text);
  const count = seen.get(base) ?? 0;
  seen.set(base, count + 1);
  return count === 0 ? base : `${base}-${count}`;
}

/** All `heading` blocks in document order, with their anchor ids. */
export function extractHeadings(blocks: BlogContentBlock[]): BlogHeading[] {
  const seen = new Map<string, number>();
  const headings: BlogHeading[] = [];
  for (const block of blocks) {
    if (block.type !== "heading") continue;
    headings.push({
      id: headingId(block.text, seen),
      text: block.text,
      level: block.level ?? 2,
    });
  }
  return headings;
}
