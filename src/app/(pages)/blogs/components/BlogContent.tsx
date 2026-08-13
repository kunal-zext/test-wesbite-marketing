import Image from "next/image";
import type { BlogContentBlock } from "@/types/blog";
import { headingId } from "./headings";

interface BlogContentProps {
  blocks: BlogContentBlock[];
}

/**
 * Renders a blog body from typed {@link BlogContentBlock}s. Pure presentation,
 * no client JS — add a `case` here to support a new block type. Headings get a
 * collision-safe `id` (shared with the table of contents via `headingId`).
 */
export default function BlogContent({ blocks }: BlogContentProps) {
  const seen = new Map<string, number>();
  return (
    <div className="flex flex-col gap-6">
      {blocks.map((block, i) => (
        <Block
          key={i}
          block={block}
          id={block.type === "heading" ? headingId(block.text, seen) : undefined}
        />
      ))}
    </div>
  );
}

function Block({ block, id }: { block: BlogContentBlock; id?: string }) {
  switch (block.type) {
    case "heading":
      if (block.level === 3) {
        return (
          <h3
            id={id}
            className="mt-3 scroll-mt-28 text-xl font-semibold leading-snug tracking-tight text-white sm:text-2xl"
          >
            {block.text}
          </h3>
        );
      }
      return (
        <h2
          id={id}
          className="mt-4 scroll-mt-28 text-2xl font-bold leading-snug tracking-tight text-white sm:text-3xl"
        >
          {block.text}
        </h2>
      );

    case "paragraph":
      return (
        <p className="text-base leading-relaxed text-white/70 sm:text-lg">
          {block.text}
        </p>
      );

    case "list": {
      const ListTag = block.ordered ? "ol" : "ul";
      return (
        <ListTag
          className={
            block.ordered
              ? "ml-5 flex list-decimal flex-col gap-3 text-base leading-relaxed text-white/70 marker:text-secondary sm:text-lg"
              : "ml-5 flex list-disc flex-col gap-3 text-base leading-relaxed text-white/70 marker:text-secondary sm:text-lg"
          }
        >
          {block.items.map((item, i) => (
            <li key={i} className="pl-1.5">
              {item}
            </li>
          ))}
        </ListTag>
      );
    }

    case "quote":
      return (
        <blockquote className="border-l-2 border-secondary/60 pl-5 sm:pl-6">
          <p className="text-lg font-medium italic leading-relaxed text-white/85 sm:text-xl">
            “{block.text}”
          </p>
          {block.cite ? (
            <cite className="mt-2 block text-sm not-italic text-white/45">
              — {block.cite}
            </cite>
          ) : null}
        </blockquote>
      );

    case "image":
      return (
        <figure className="my-2">
          <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl ring-1 ring-white/10">
            <Image
              src={block.src}
              alt={block.alt ?? ""}
              fill
              className="object-cover select-none"
              sizes="(min-width: 768px) 768px, 100vw"
              quality={100}
              unoptimized
              draggable={false}
            />
          </div>
          {block.caption ? (
            <figcaption className="mt-3 text-center text-sm text-white/45">
              {block.caption}
            </figcaption>
          ) : null}
        </figure>
      );

    default: {
      // Exhaustiveness guard: a new block type added to the union without a
      // case here becomes a compile error.
      const _exhaustive: never = block;
      return _exhaustive;
    }
  }
}
