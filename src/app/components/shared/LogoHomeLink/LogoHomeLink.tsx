"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import type { ComponentProps } from "react";

export type LogoHomeLinkProps = Omit<ComponentProps<typeof Link>, "href" | "scroll">;

/**
 * Brand logo link: always targets `/` and scrolls to the top.
 * On other routes, Next scroll restoration is enabled. On `/`, hash is cleared and Lenis scrolls to 0.
 */
export function LogoHomeLink({ onClick, ...props }: LogoHomeLinkProps) {
  const pathname = usePathname();
  const lenis = useLenis();

  return (
    <Link
      href="/"
      scroll={pathname !== "/"}
      onClick={(e) => {
        if (pathname === "/") {
          e.preventDefault();
          window.history.replaceState(null, "", "/");
          if (lenis) {
            lenis.scrollTo(0, { immediate: false });
          } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }
        onClick?.(e);
      }}
      {...props}
    />
  );
}
