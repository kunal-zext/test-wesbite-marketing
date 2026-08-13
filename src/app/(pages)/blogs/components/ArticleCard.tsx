"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/utils";
import type { NewsletterArticle } from "@/types/newsletter";
import { resolveArticleCoverImage } from "./articleCategoryImage";
import AuthorInfo from "./AuthorInfo";

function formatPostDate(isoDate: string) {
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

interface ArticleCardProps {
  post: NewsletterArticle;
  className?: string;
}

function isExternalArticleUrl(url: string): boolean {
  return /^https?:\/\//i.test(url) || url.startsWith("//");
}

export default function ArticleCard({
  post,
  className,
}: ArticleCardProps) {
  const trimmedLink = post.link?.trim() ?? "";
  const href = trimmedLink || `/blogs/${post.slug}/`;
  const openInNewTab = trimmedLink ? isExternalArticleUrl(trimmedLink) : false;
  const dateRaw = post.date || post.created_at;
  const dateLabel = formatPostDate(dateRaw);
  const meta = dateLabel ? `${dateLabel} • Newsletter` : "Newsletter";
  const cover = resolveArticleCoverImage(post.image_url, post.category);
  const excerpt = post.description?.trim() || "";
  const categoryLabel = post.category?.trim() || "Article";
  const authorName = post.source?.trim() || "Zext Digital";

  return (
    <article className={cn("group flex flex-col", className)}>
      <Link
        href={href}
        className="block"
        {...(openInNewTab
          ? { target: "_blank" as const, rel: "noopener noreferrer" as const }
          : {})}
        aria-label={post.title}
        draggable={false}
      >
        <div className="relative overflow-hidden rounded-2xl ring-1 ring-white/10 transition-shadow duration-300 group-hover:ring-secondary/25">
          <div className="relative aspect-16/10 w-full">
            <Image
              src={cover}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02] select-none"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              quality={100}
              unoptimized
              draggable={false}
              loading="eager"
            />
          </div>
          <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/55 px-3 py-1 text-xs font-medium text-white/95 backdrop-blur-sm capitalize">
            {categoryLabel}
          </span>
        </div>
      </Link>

      <div className="mt-4 flex min-h-0 flex-1 flex-col">
        <p className="text-xs text-white/45 sm:text-sm">{meta}</p>
        <Link
          href={href}
          className="mt-2 block"
          {...(openInNewTab
            ? { target: "_blank" as const, rel: "noopener noreferrer" as const }
            : {})}
          aria-label={post.title}
          draggable={false}
        >
          <h3 className="line-clamp-2 text-lg font-bold leading-snug tracking-tight text-white transition-colors duration-200 hover:text-secondary">
            {post.title}
          </h3>
        </Link>
        {excerpt ? (
          <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-white/55">
            {excerpt}
          </p>
        ) : null}
        <AuthorInfo
          name={authorName.replace("_", " ")}
          source={post.source || "zext"}
          className="mt-5"
        />
      </div>
    </article>
  );
}
