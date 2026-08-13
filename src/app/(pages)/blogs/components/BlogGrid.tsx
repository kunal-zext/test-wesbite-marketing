"use client";

import { useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/utils";
import type { NewsletterArticle } from "@/types/newsletter";
import ArticleCard from "./ArticleCard";

interface BlogGridProps {
  posts: NewsletterArticle[];
  isLoadingMore?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  className?: string;
}

export default function BlogGrid({
  posts,
  isLoadingMore = false,
  hasMore = false,
  onLoadMore,
  className,
}: BlogGridProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const loadingMoreRef = useRef(false);

  useEffect(() => {
    loadingMoreRef.current = isLoadingMore;
  }, [isLoadingMore]);

  useEffect(() => {
    const el = sentinelRef.current;
    const load = onLoadMore;
    if (!el || !load || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.some((e) => e.isIntersecting);
        if (!hit || loadingMoreRef.current) return;
        load();
      },
      { root: null, rootMargin: "240px 0px", threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, onLoadMore, posts.length]);

  if (posts.length === 0 && !isLoadingMore) {
    return (
      <p className="rounded-2xl px-6 py-16 text-center text-sm text-white/50">
        No articles match your filters yet.
      </p>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      <ul
        className={cn(
          "grid list-none grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3",
        )}
      >
        {posts.map((post) => (
          <li key={post.id}>
            <ArticleCard post={post} />
          </li>
        ))}
      </ul>

      {hasMore ? (
        <div
          ref={sentinelRef}
          className="pointer-events-none h-px w-full shrink-0"
          aria-hidden
        />
      ) : null}

      {isLoadingMore ? (
        <div
          className="flex justify-center py-10"
          role="status"
          aria-live="polite"
        >
          <Loader2
            className="size-6 animate-spin text-secondary"
            aria-hidden
          />
        </div>
      ) : null}
    </div>
  );
}
