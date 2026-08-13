import { BookButton } from "../components/BookButton";
import { BOOK_ANCHOR, BOOK_PATH, FINAL } from "../data";

export function FinalCTASection() {
  return (
    <section
      id={BOOK_ANCHOR}
      className="relative overflow-hidden border-t border-white/10 bg-tertiary scroll-mt-[68px]"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(143,224,255,0.18),transparent_55%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-[1600px] md:max-w-6xl px-6 py-20 text-center sm:py-[92px]">
        <h2 className="font-(family-name:--font-poppins) text-[clamp(30px,5vw,52px)] font-bold leading-[1.1] tracking-tight text-white">
          {FINAL.headingLine1}
          <span className="block text-secondary">{FINAL.headingLine2}</span>
        </h2>
        <p className="mx-auto mt-5 max-w-[42ch] text-lg leading-relaxed text-white/55">
          {FINAL.body}
        </p>
        <div className="mt-8 flex justify-center">
          <BookButton href={BOOK_PATH} size="lg">
            {FINAL.cta}
          </BookButton>
        </div>
        <div className="mt-5 flex justify-center">
          <span className="inline-flex items-center gap-2.5 font-(family-name:--font-space-mono) text-[13px] text-white/55">
            <span className="relative flex size-2" aria-hidden>
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-secondary/60" />
              <span className="relative inline-flex size-2 rounded-full bg-secondary" />
            </span>
            {FINAL.scarcity}
          </span>
        </div>
      </div>
    </section>
  );
}
