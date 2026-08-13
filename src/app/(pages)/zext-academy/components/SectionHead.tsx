import { cn } from "@/utils";

type Props = {
  eyebrow: string;
  heading: React.ReactNode;
  sub?: React.ReactNode;
  center?: boolean;
  /** On the light (`#d9d9d9`) section, flip ink + accent to readable dark tones. */
  light?: boolean;
  className?: string;
};

/** Eyebrow + heading (+ optional sub) used at the top of every section. */
export function SectionHead({
  eyebrow,
  heading,
  sub,
  center,
  light,
  className,
}: Props) {
  return (
    <div className={cn("max-w-[60ch]", center && "mx-auto text-center", className)}>
      <span
        className={cn(
          "inline-block font-(family-name:--font-space-mono) text-xs uppercase tracking-[0.28em]",
          light ? "text-sky-600" : "text-secondary",
        )}
      >
        {eyebrow}
      </span>
      <h2
        className={cn(
          "mt-3.5 font-(family-name:--font-poppins) text-[clamp(1.75rem,4vw,2.625rem)] font-bold leading-[1.1] tracking-tight",
          light ? "text-tertiary" : "text-white",
        )}
      >
        {heading}
      </h2>
      {sub ? (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed",
            light ? "text-tertiary/60" : "text-white/55",
          )}
        >
          {sub}
        </p>
      ) : null}
    </div>
  );
}
