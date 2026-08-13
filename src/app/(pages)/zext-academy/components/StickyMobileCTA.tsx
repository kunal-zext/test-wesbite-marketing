import { BOOK_PATH } from "../data";
import { BookButton } from "./BookButton";

/** Bottom-fixed booking bar shown only on small screens (header CTA is hidden there). */
export function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-60 flex items-center justify-between gap-3 border-t border-white/10 bg-background/95 px-4 py-3 backdrop-blur-md md:hidden max-[520px]:justify-center">
      <span className="font-(family-name:--font-space-mono) text-xs leading-tight text-white/55 max-[520px]:hidden">
        Free 30-min call
        <br />
        No pressure
      </span>
      <BookButton href={BOOK_PATH} size="sm">
        Book a session
      </BookButton>
    </div>
  );
}
