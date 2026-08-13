import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/utils";

interface ContentPageProps {
  label: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
  className?: string;
}

export default function ContentPage({
  label,
  title,
  intro,
  children,
  className,
}: ContentPageProps) {
  return (
    <div
      className={cn(
        "w-full min-w-0 overflow-x-hidden bg-background",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-x-clip"
        aria-hidden
      >
        <div className="absolute left-0 top-0 size-[600px] rounded-full bg-secondary/4 blur-[80px]" />
        <div className="absolute right-0 top-[30%] size-[500px] rounded-full bg-violet-500/4 blur-[70px]" />
        <div className="absolute bottom-0 left-[40%] size-[550px] rounded-full bg-emerald-500/4 blur-[75px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-20 pt-8 sm:px-5 sm:pb-24 sm:pt-10 md:px-6 md:pt-12 xl:max-w-[1600px]">
        <Link
          href="/"
          className="group mb-10 inline-flex items-center gap-2 text-sm font-medium text-white/50 transition-colors hover:text-secondary sm:mb-12"
        >
          <ArrowLeft className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
          Back to home
        </Link>

        <header className="mb-12 max-w-3xl sm:mb-14 md:mb-16">
          <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-secondary opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(143,224,255,0.6)]" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-secondary">
              {label}
            </span>
          </div>
          <h1 className="mb-5 text-[clamp(2rem,5vw,3rem)] font-bold leading-[1.1] tracking-tight text-white">
            {title}
          </h1>
          {intro ? (
            <p className="text-base leading-relaxed text-white/50 sm:text-lg">
              {intro}
            </p>
          ) : null}
        </header>

        <div className="max-w-3xl space-y-6 text-sm leading-relaxed text-white/65 sm:text-base sm:leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}
