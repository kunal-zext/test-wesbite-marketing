import Link from "next/link";
import { cn } from "@/utils";

type Props = {
  href: string;
  children: React.ReactNode;
  /** Opens in a new tab with rel=noopener (use for the external Calendly link). */
  external?: boolean;
  size?: "sm" | "md" | "lg";
  /** Trailing arrow glyph; the header CTA omits it. */
  arrow?: boolean;
  className?: string;
};

const SIZES = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-7 py-4 text-base",
  lg: "px-9 py-[18px] text-lg",
} as const;

/** Primary CTA — brand cyan (`secondary`) pill on a dark navy label, with glow. */
export function BookButton({
  href,
  children,
  external,
  size = "md",
  arrow = true,
  className,
}: Props) {
  const external_props = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  return (
    <Link
      href={href}
      {...external_props}
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-full font-(family-name:--font-poppins) font-semibold",
        "bg-secondary text-[#0a1024] shadow-[0_12px_30px_-8px_rgba(143,224,255,0.5)]",
        "transition-[transform,box-shadow,background-color] duration-200",
        "hover:-translate-y-0.5 hover:bg-[#a7e9ff] hover:shadow-[0_18px_38px_-10px_rgba(143,224,255,0.6)]",
        "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        SIZES[size],
        className,
      )}
    >
      {children}
      {arrow ? (
        <span
          className="transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden
        >
          →
        </span>
      ) : null}
    </Link>
  );
}
