"use client";

import { cn } from "@/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { CSSProperties, MouseEventHandler, ReactNode } from "react";

interface AnimatedButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  scroll?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  external?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  style?: CSSProperties;
  icon?: ReactNode;
}

const AnimatedButton = ({
  children,
  href,
  onClick,
  scroll = true,
  className = "",
  size = "md",
  external = false,
  type = "button",
  disabled = false,
  style,
  icon,
}: AnimatedButtonProps) => {
  const sizeClasses = {
    sm: "pl-4 py-2 text-sm pr-[4.25rem]",
    md: "pl-5 py-3 text-sm pr-[4.75rem]",
    lg: "pl-6 py-4 text-base pr-[5.25rem]",
  };

  const iconSizes = {
    sm: "w-12 h-7",
    md: "w-15 h-9",
    lg: "w-18 h-11",
  };

  const iconClasses = {
    sm: "size-4",
    md: "size-5",
    lg: "size-6",
  };

  const outerClasses = cn(
    "relative inline-flex rounded-full overflow-hidden p-[0.3vh] transition-all duration-300 ease-in-out group",
    !disabled && "cursor-pointer active:scale-95",
    disabled && "opacity-50 cursor-not-allowed pointer-events-none",
    className
  );

  const innerClasses = cn(
    "relative flex w-full min-w-0 items-center justify-center rounded-full bg-tertiary text-white border border-white/40 transition-colors duration-300 group-hover:border-white/55",
    sizeClasses[size]
  );

  const starBorderElements = (
    <>
      <div
        className="pointer-events-none absolute w-[300%] h-[60%] opacity-100 bottom-[-14px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
        style={{
          background: "radial-gradient(circle, #8c52ff 0%, rgba(140,82,255,0.55) 18%, transparent 42%)",
          animationDuration: "5s",
        }}
      />
      <div
        className="pointer-events-none absolute w-[300%] h-[60%] opacity-100 top-[-14px] left-[-250%] rounded-full animate-star-movement-top z-0"
        style={{
          background: "radial-gradient(circle, #8c52ff 0%, rgba(140,82,255,0.55) 18%, transparent 42%)",
          animationDuration: "5s",
        }}
      />
    </>
  );

  const content = (
    <>
      {starBorderElements}
      <div className={innerClasses}>
        <span
          className={cn(
            "min-w-0 flex-1 text-center font-medium leading-tight relative z-10 px-1 truncate",
            size === "lg" ? "text-base" : "text-sm",
          )}
        >
          {children}
        </span>
        <div
          className={cn(
            "absolute right-1 top-1/2 -translate-y-1/2 bg-white flex items-center justify-center transition-all duration-500 ease-in-out z-20",
            iconSizes[size],
            "rounded-full",
            "group-hover:h-[calc(100%-0.8vh)] group-hover:w-[calc(100%-0.8vh)] group-hover:rounded-[inherit]"
          )}
        >
          {icon ?? (
            <ArrowUpRight
              className={cn(
                "text-black group-hover:rotate-45 transition-all duration-500 ease-in-out",
                iconClasses[size]
              )}
            />
          )}
        </div>
      </div>
    </>
  );

  if (href) {
    if (external) {
      return (
        <Link
          href={href}
          className={outerClasses}
          style={style}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content}
        </Link>
      );
    }
    return (
      <Link
        href={href}
        className={outerClasses}
        style={style}
        scroll={scroll}
        onClick={onClick as MouseEventHandler<HTMLAnchorElement> | undefined}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={outerClasses}
      style={style}
    >
      {content}
    </button>
  );
};

export default AnimatedButton;
