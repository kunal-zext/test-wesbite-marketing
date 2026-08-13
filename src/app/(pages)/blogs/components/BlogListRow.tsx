import Image from "next/image";
import Link from "next/link";
import { cn } from "@/utils";
import type { Blog } from "@/types/blog";
import { isFallbackCover } from "../data/blogs";

interface BlogListRowProps {
  blog: Blog;
}

/**
 * Compact horizontal row for the non-featured blog posts beneath the
 * {@link BlogFeatureCard}. Thumbnail beside title/meta — text-forward and
 * deliberately lighter than the featured hero.
 */
export default function BlogListRow({ blog }: BlogListRowProps) {
  const href = `/blogs/${blog.slug}/`;
  const isLogoCover = isFallbackCover(blog.cover_image);

  return (
    <article className="group h-full">
      <Link
        href={href}
        aria-label={blog.title}
        draggable={false}
        className="flex h-full items-center gap-4 rounded-xl p-3 ring-1 ring-white/10 transition-shadow duration-300 group-hover:ring-secondary/25"
      >
        <div className="relative size-20 shrink-0 overflow-hidden rounded-lg sm:size-24">
          <Image
            src={blog.cover_image}
            alt={blog.title}
            fill
            className={cn(
              "transition-transform duration-300 group-hover:scale-[1.03] select-none",
              isLogoCover
                ? "object-contain object-center p-3.5"
                : "object-cover",
            )}
            sizes="96px"
            quality={100}
            unoptimized
            draggable={false}
          />
        </div>
        <div className="min-w-0">
          <p className="text-xs capitalize text-white/45">{blog.category}</p>
          <h3 className="mt-1 line-clamp-2 font-bold leading-snug tracking-tight text-white transition-colors duration-200 group-hover:text-secondary">
            {blog.title}
          </h3>
          <p className="mt-1 text-xs text-white/45">
            {blog.reading_minutes} min read
          </p>
        </div>
      </Link>
    </article>
  );
}
