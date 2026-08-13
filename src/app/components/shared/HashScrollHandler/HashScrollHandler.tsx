"use client";

import type Lenis from "lenis";
import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
/** Fixed header + `main` top padding - keep targets clear of the navbar. */
const SCROLL_OFFSET = -96;

function scrollToHash(lenis: Lenis) {
  const raw = window.location.hash.replace(/^#/, "");
  if (!raw) return;

  const el = document.getElementById(raw);
  if (!el) return;

  requestAnimationFrame(() => {
    lenis.scrollTo(el, { offset: SCROLL_OFFSET });
  });
}

function scrollTopOrHash(lenis: Lenis) {
  const raw = window.location.hash.replace(/^#/, "");
  if (raw) {
    const el = document.getElementById(raw);
    if (el) {
      lenis.scrollTo(el, { offset: SCROLL_OFFSET });
      return;
    }
  }
  lenis.scrollTo(0, { immediate: true });
}

/**
 * Home route: hash can be applied a frame after pathname (Next client nav). Retry
 * until the target exists (incl. `service-*` cards) before falling back to top.
 */
function runNavScroll(lenis: Lenis, pathname: string) {
  if (pathname !== "/") {
    scrollTopOrHash(lenis);
    return;
  }

  let frames = 0;
  const maxFrames = 48;
  let finished = false;

  const step = () => {
    if (finished) return;
    frames += 1;
    const raw = window.location.hash.replace(/^#/, "");

    if (raw) {
      const el = document.getElementById(raw);
      if (el) {
        lenis.scrollTo(el, { offset: SCROLL_OFFSET });
        finished = true;
        return;
      }
    }

    if (frames >= maxFrames) {
      lenis.scrollTo(0, { immediate: true });
      finished = true;
      return;
    }

    requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

/**
 * - After route changes: reset Lenis scroll for non-hash routes; resolve `/#` targets
 *   on home with a short retry (Next applies hash slightly after pathname).
 * - `hashchange`: in-page hash updates.
 */
export default function HashScrollHandler() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (!lenis) return;

    runNavScroll(lenis, pathname);

    const onHashChange = () => scrollToHash(lenis);
    window.addEventListener("hashchange", onHashChange);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [lenis, pathname]);

  return null;
}
