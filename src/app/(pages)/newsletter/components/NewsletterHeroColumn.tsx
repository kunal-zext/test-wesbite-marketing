import {
  Bot,
  Rss,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react";

const TOPICS = [
  { icon: Bot, label: "AI tool drops" },
  { icon: TrendingUp, label: "Industry trends" },
  { icon: Zap, label: "Automation tips" },
  { icon: Sparkles, label: "Weekly picks" },
] as const;

const PERKS = [
  { icon: Rss, value: "Curated", label: "not aggregated noise" },
  { icon: ShieldCheck, value: "No spam", label: "unsubscribe in one click" },
  { icon: Star, value: "Free", label: "no paywall ever" },
] as const;

export default function NewsletterHeroColumn() {
  return (
    <div className="order-2 min-w-0 lg:order-1">
      <div className="mb-6 flex items-center gap-2 sm:gap-3">
        <span className="shrink-0 text-[11px] font-medium uppercase tracking-[0.28em] text-secondary sm:text-xs sm:tracking-[0.2em]">
          Stay ahead
        </span>
        <div className="h-px min-w-12 flex-1 bg-linear-to-r from-primary/50 to-transparent sm:max-w-[min(40vw,280px)]" />
      </div>

      <h1 className="mb-5 text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.08] tracking-tight text-white">
        <span className="block">AI insights,</span>
        <span className="mt-1 block text-white/40 sm:mt-2">delivered daily.</span>
      </h1>

      <p className="mb-8 max-w-[44ch] text-pretty text-base leading-relaxed text-white/55 sm:text-lg">
        The sharpest AI signal, distilled. Know what&apos;s worth your attention
        before everyone else does.
      </p>

      <div className="mb-10 flex flex-wrap gap-2">
        {TOPICS.map(({ icon: Icon, label }) => (
          <span
            key={label}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/4 px-3.5 py-2 text-xs font-medium text-white/65 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition-colors duration-300 hover:border-secondary/30 hover:bg-secondary/6 hover:text-white/85"
          >
            <Icon
              className="size-3.5 shrink-0 text-secondary/90"
              strokeWidth={2}
              aria-hidden
            />
            {label}
          </span>
        ))}
      </div>

      <div
        className="grid max-w-md grid-cols-3 gap-px overflow-hidden rounded-xl border border-white/8 bg-white/8 sm:rounded-2xl"
        aria-label="Newsletter benefits"
      >
        {PERKS.map(({ icon: Icon, value, label }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-1 bg-background px-2 py-4 text-center sm:px-4 sm:py-5"
          >
            <Icon
              className="size-4 text-secondary/80 sm:size-5"
              strokeWidth={1.75}
              aria-hidden
            />
            <span className="text-sm font-bold text-white sm:text-base">
              {value}
            </span>
            <span className="text-[10px] leading-snug text-white/38 sm:text-xs">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
