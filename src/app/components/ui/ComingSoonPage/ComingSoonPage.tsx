"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

type ComingSoonPageProps = {
  title: string;
  subtitle: string;
  backHref?: string;
  backLabel?: string;
  ctaHref?: string;
  ctaLabel?: string;
};

export default function ComingSoonPage({
  title,
  subtitle,
  ctaHref,
  ctaLabel,
  backHref = "/",
  backLabel = "Back to home",
}: ComingSoonPageProps) {
  return (
    <section className="relative min-h-[calc(100vh-80px)] w-full overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-0 top-0 size-[560px] rounded-full bg-secondary/6 blur-[90px]" />
        <div className="absolute right-0 top-[20%] size-[520px] rounded-full bg-violet-500/5 blur-[90px]" />
        <div className="absolute bottom-0 left-[35%] size-[520px] rounded-full bg-emerald-500/5 blur-[90px]" />
      </div>

      <div className="relative z-10 mx-auto min-h-screen w-full max-w-6xl px-4 py-10 sm:px-5 sm:py-12 md:px-6 lg:max-w-[1600px]">
        <Link
          href={backHref}
          className="group z-40 absolute left-4 top-10 inline-flex w-fit items-center gap-2 text-sm font-medium text-white/50 transition-colors hover:text-secondary sm:left-5 sm:top-12 md:left-6"
        >
          <ArrowLeft className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
          {backLabel}
        </Link>

        <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-5 md:px-6">
          <div className="w-full max-w-3xl rounded-2xl border border-white/10 bg-white/3 p-7 text-center shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_24px_60px_-30px_rgba(0,0,0,0.8)] sm:rounded-[1.35rem] sm:p-10 md:p-12">
            <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
              <Sparkles className="size-3.5 text-secondary" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-secondary">
                Coming Soon
              </span>
            </div>

            <h1 className="text-balance text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.08] tracking-tight text-white">
              {title}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-white/55 sm:text-lg">
              {subtitle}
            </p>

            {ctaHref && ctaLabel ? (
              <div className="mt-8">
                <Link
                  href={ctaHref}
                  className="inline-flex items-center justify-center rounded-full border border-secondary/35 bg-secondary/10 px-6 py-3 text-sm font-semibold text-secondary transition-colors hover:border-secondary/60 hover:bg-secondary/15"
                >
                  {ctaLabel}
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
