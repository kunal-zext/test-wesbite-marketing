import Image from "next/image";
import Link from "next/link";
import { BOOK_PATH, NAV_TAG } from "../data";
import { BookButton } from "./BookButton";

/** Sticky landing header: real logo, programme tag, and a scroll-to-book CTA. */
export function AcademyHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
      <div className="relative mx-auto flex h-[68px] max-w-[1600px] md:max-w-6xl items-center justify-between px-6">
        <Link href="/" aria-label="Zext Digital home" className="flex items-center">
          <Image
            src="/assets/Logo.svg"
            alt="Zext Digital"
            width={120}
            height={34}
            className="h-8 w-auto object-contain"
            style={{ width: "auto" }}
            priority
          />
        </Link>
        <span className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 font-(family-name:--font-space-mono) text-[11px] uppercase tracking-[0.22em] text-white/45 md:block">
          {NAV_TAG}
        </span>
        <BookButton
          href={BOOK_PATH}
          size="sm"
          arrow={false}
          className="hidden md:inline-flex"
        >
          Book a session
        </BookButton>
      </div>
    </header>
  );
}
