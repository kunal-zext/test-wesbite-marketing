"use client";

import Link from "next/link";
import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";

/** Match `HashScrollHandler` so in-page targets clear the fixed header. */
const HASH_SCROLL_OFFSET = -96;

export function parseHashFromHref(href: string): { path: string; hash: string } | null {
  const i = href.indexOf("#");
  if (i === -1) return null;
  const hash = href.slice(i + 1);
  if (!hash) return null;
  const pathPart = i === 0 ? "/" : href.slice(0, i) || "/";
  return { path: pathPart === "" ? "/" : pathPart, hash };
}

export function useHomeHashClick() {
  const pathname = usePathname();
  const lenis = useLenis();

  return (e: MouseEvent<HTMLAnchorElement>, href: string): boolean => {
    const parsed = parseHashFromHref(href);
    if (!parsed) return false;
    const { path, hash } = parsed;

    if (path !== "/") return false;

    /**
     * From any non-home route, Next.js client navigation often strips the hash
     * from `href="/#id"`. Use a full navigation so the URL and scroll target match.
     */
    if (pathname !== "/") {
      e.preventDefault();
      window.location.assign(href);
      return true;
    }

    e.preventDefault();

    const el = document.getElementById(hash);
    if (el && lenis) {
      lenis.scrollTo(el, { offset: HASH_SCROLL_OFFSET });
      window.history.replaceState(null, "", `/#${hash}`);
      return true;
    }

    /* Target missing briefly (rare); hash navigation lets HashScrollHandler retry. */
    window.location.hash = hash;
    return true;
  };
}

type LinkProps = ComponentProps<typeof Link>;

type HomeHashLinkProps = Omit<LinkProps, "scroll"> & {
  scroll?: boolean;
};

/**
 * Use for `href` values like `/#services-section`.
 * On `/`, intercepts for Lenis scroll; on other routes, uses full navigation so `#` is kept.
 */
export function HomeHashLink({
  href,
  onClick,
  scroll = false,
  ...rest
}: HomeHashLinkProps) {
  const handleHomeHash = useHomeHashClick();
  const hrefString = typeof href === "string" ? href : "";

  return (
    <Link
      href={href}
      scroll={scroll}
      onClick={(e) => {
        if (hrefString && parseHashFromHref(hrefString)) {
          handleHomeHash(e, hrefString);
        }
        onClick?.(e);
      }}
      {...rest}
    />
  );
}
