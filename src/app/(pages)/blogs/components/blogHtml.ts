import { headingId, type BlogHeading } from "./headings";

/** Minimal entity decode for TOC link text (display only). */
function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&hellip;/g, "…");
}

export type PreparedBlogHtml = { html: string; headings: BlogHeading[] };

/**
 * Prepare raw article HTML from the blog API for rendering:
 *  - strips `<style>`/`<script>` blocks (styling lives in globals.css instead),
 *  - removes the template's own "back to blog" link (the page provides one),
 *  - injects collision-safe `id`s into every `<h2>`/`<h3>` and returns them as
 *    the table-of-contents headings (in document order).
 */
export function prepareBlogHtml(raw: string): PreparedBlogHtml {
  let html = raw
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<a\b[^>]*class="[^"]*\bback-link\b[^"]*"[^>]*>[\s\S]*?<\/a>/gi, "");

  const seen = new Map<string, number>();
  const headings: BlogHeading[] = [];

  html = html.replace(
    /<(h2|h3)\b([^>]*)>([\s\S]*?)<\/\1>/gi,
    (match, tag: string, attrs: string, inner: string) => {
      const text = decodeEntities(inner.replace(/<[^>]+>/g, "").trim());
      if (!text) return match;
      const id = headingId(text, seen);
      const level = tag.toLowerCase() === "h3" ? 3 : 2;
      headings.push({ id, text, level });
      const attrsNoId = attrs.replace(/\s+id="[^"]*"/i, "");
      return `<${tag}${attrsNoId} id="${id}">${inner}</${tag}>`;
    },
  );

  return { html, headings };
}
