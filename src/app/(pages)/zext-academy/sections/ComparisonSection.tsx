import { Check, X } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { SectionHead } from "../components/SectionHead";
import { COMPARISON } from "../data";

export function ComparisonSection() {
  return (
    <section className="bg-background py-14 md:py-[84px]">
      <div className="mx-auto max-w-[1600px] md:max-w-6xl px-6">
        <Reveal>
          <SectionHead
            eyebrow={COMPARISON.eyebrow}
            heading={COMPARISON.heading}
            sub={COMPARISON.sub}
          />
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mt-11 overflow-hidden rounded-[18px] border border-white/10 shadow-[0_40px_100px_-50px_rgba(143,224,255,0.45)]">
            <div className="grid grid-cols-2">
              {/* heads */}
              <div className="border-b border-white/10 bg-tertiary px-5 py-5 font-(family-name:--font-poppins) text-[17px] font-bold text-white/45 sm:px-6">
                {COMPARISON.leftHead}
              </div>
              <div className="border-b border-l border-white/10 bg-linear-to-b from-secondary/12 to-secondary/3 px-5 py-5 font-(family-name:--font-poppins) text-[17px] font-bold text-white sm:px-6">
                <span className="mb-1 block font-(family-name:--font-space-mono) text-[10px] font-normal tracking-[0.16em] text-secondary">
                  {COMPARISON.rightTag}
                </span>
                {COMPARISON.rightHead}
              </div>

              {/* rows */}
              {COMPARISON.rows.map((row) => (
                <Row key={row.right} left={row.left} right={row.right} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Row({ left, right }: { left: string; right: string }) {
  return (
    <>
      <div className="flex items-start gap-3 border-b border-white/10 bg-tertiary px-4 py-4 text-[15px] text-white/45 sm:px-6 sm:py-5">
        <X
          className="mt-0.5 size-[19px] shrink-0 text-white/25"
          strokeWidth={2.5}
          aria-hidden
        />
        {left}
      </div>
      <div className="flex items-start gap-3 border-b border-l border-white/10 bg-secondary/5 px-4 py-4 text-[15px] text-white sm:px-6 sm:py-5">
        <Check
          className="mt-0.5 size-[19px] shrink-0 text-secondary"
          strokeWidth={2.5}
          aria-hidden
        />
        {right}
      </div>
    </>
  );
}
