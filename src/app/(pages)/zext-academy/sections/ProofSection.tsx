import Image from "next/image";
import { Check } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { SectionHead } from "../components/SectionHead";
import { PROOF } from "../data";

export function ProofSection() {
  return (
    <section className="relative overflow-hidden bg-tertiary py-14 md:py-[84px]">
      <div
        className="pointer-events-none absolute -top-20 -left-20 size-[420px] rounded-full bg-primary/8 blur-[130px]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-[1600px] md:max-w-6xl px-6">
        <Reveal>
          <SectionHead
            eyebrow={PROOF.eyebrow}
            heading={PROOF.heading}
            sub={
              <>
                {PROOF.lead}
                <b className="font-semibold text-white">{PROOF.leadBold}</b>
              </>
            }
          />
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mt-10 flex flex-col gap-[22px] rounded-[18px] border border-white/10 bg-linear-to-b from-white/6 to-white/2 p-8 sm:flex-row sm:items-start">
            <Image
              src={PROOF.founder.image}
              alt={PROOF.founder.name}
              width={60}
              height={60}
              className="size-[60px] shrink-0 rounded-full object-cover ring-1 ring-white/15"
            />
            <div>
              <h3 className="font-(family-name:--font-poppins) text-xl font-semibold text-white">
                {PROOF.founder.name}
              </h3>
              <div className="my-1 mb-3 font-(family-name:--font-space-mono) text-[13.5px] tracking-[0.03em] text-secondary">
                {PROOF.founder.role}
              </div>
              <p className="text-[15.5px] leading-relaxed text-white/55">
                {PROOF.founder.bio}
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {PROOF.quotes.map((quote, i) => (
            <Reveal key={quote.who} delay={i * 0.06}>
              <figure className="h-full rounded-xl border border-l-[3px] border-white/10 border-l-secondary bg-linear-to-b from-white/6 to-white/2 p-7 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_60px_-28px_rgba(143,224,255,0.3)]">
                <span
                  className="font-(family-name:--font-poppins) text-[44px] font-extrabold leading-[0.5] text-secondary"
                  aria-hidden
                >
                  &ldquo;
                </span>
                <blockquote className="mt-3.5 font-(family-name:--font-poppins) text-lg font-semibold leading-snug text-white">
                  {quote.q}
                </blockquote>
                <figcaption className="mt-3.5 text-[13.5px] leading-relaxed text-white/55">
                  {quote.detail}
                  <br />- {quote.who}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.06}>
          <div className="mt-7 flex flex-wrap gap-3.5">
            {PROOF.creds.map((cred) => (
              <span
                key={cred.strong}
                className="flex items-center gap-2 rounded-full border border-white/10 px-[18px] py-2.5 font-(family-name:--font-space-mono) text-xs tracking-[0.08em] text-white/55"
              >
                <Check
                  className="size-3.5 text-secondary"
                  strokeWidth={2.5}
                  aria-hidden
                />
                <b className="font-bold text-white">{cred.strong}</b> {cred.rest}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
