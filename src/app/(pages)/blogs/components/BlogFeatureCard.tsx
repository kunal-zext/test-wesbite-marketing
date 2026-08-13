import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/utils";
import type { Blog } from "@/types/blog";
import { isFallbackCover } from "../data/blogs";

function formatDate(isoDate: string): string {
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

interface BlogFeatureCardProps {
  blog: Blog;
}

/**
 * The hero of the Blogs section: a full-width horizontal card (cover image
 * beside the text) that reads as editorial and stands apart from the uniform
 * vertical newsletter grid below it. Stacks to image-over-text on mobile.
 */
export default function BlogFeatureCard({ blog }: BlogFeatureCardProps) {
  const href = `/blogs/${blog.slug}/`;
  const dateLabel = formatDate(blog.date);
  const isLogoCover = isFallbackCover(blog.cover_image);

  return (
    <article className="group">
      <Link
        href={href}
        aria-label={blog.title}
        draggable={false}
        className="flex flex-col overflow-hidden rounded-2xl ring-1 ring-white/10 transition-shadow duration-300 group-hover:ring-secondary/25 md:flex-row"
      >
        <div className="relative aspect-16/10 w-full shrink-0 overflow-hidden md:aspect-auto md:w-1/2">
          <Image
            src={blog.cover_image}
            alt={blog.title}
            fill
            className={cn(
              "transition-transform duration-300 group-hover:scale-[1.02] select-none",
              isLogoCover
                ? "object-contain object-center p-10 sm:p-14"
                : "object-cover",
            )}
            sizes="(min-width: 768px) 50vw, 100vw"
            quality={100}
            unoptimized
            draggable={false}
          />
        </div>

        <div className="flex flex-1 flex-col justify-center gap-5 p-6 sm:p-8 md:p-10">
          <div>
            <span className="inline-block rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium capitalize text-white/80">
              {blog.category}
            </span>
            <h3 className="mt-4 text-2xl font-bold leading-tight tracking-tight text-white transition-colors duration-200 group-hover:text-secondary sm:text-3xl">
              {blog.title}
            </h3>
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/55 sm:text-base">
              {blog.excerpt}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
            <div className="flex items-center gap-2.5">
              <div className="size-9 rounded-full p-0.5 ring-2 ring-white/10">
                <Image
                  src={blog.author.avatar ?? "/assets/Logo.svg"}
                  alt={blog.author.name}
                  width={36}
                  height={36}
                  className="size-full rounded-full object-contain object-center select-none"
                  quality={100}
                  unoptimized
                  draggable={false}
                />
              </div>
              <span className="font-medium text-white/90">
                {blog.author.name}
              </span>
            </div>
            <span className="text-white/20" aria-hidden>
              •
            </span>
            <span className="text-white/45">
              {dateLabel ? `${dateLabel} · ` : ""}
              {blog.reading_minutes} min read
            </span>
          </div>

          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-secondary">
            Read article
            <ArrowRight
              className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
              strokeWidth={2}
              aria-hidden
            />
          </span>
        </div>
      </Link>
    </article>
  );
}
