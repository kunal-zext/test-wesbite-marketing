import { cn } from "@/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button = ({ children, className, disabled, ...props }: ButtonProps) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        "relative inline-flex rounded-xl overflow-hidden p-[0.2vh] transition-all duration-300 ease-in-out group",
        !disabled && "cursor-pointer hover:scale-[1.02]",
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
      {...props}
    >
      <div
        className="pointer-events-none absolute w-[300%] h-[55%] opacity-90 bottom-[-12px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
        style={{
          background: "radial-gradient(circle, #8c52ff, transparent 12%)",
          animationDuration: "6s",
        }}
      />
      <div
        className="pointer-events-none absolute w-[300%] h-[55%] opacity-90 top-[-12px] left-[-250%] rounded-full animate-star-movement-top z-0"
        style={{
          background: "radial-gradient(circle, #8c52ff, transparent 12%)",
          animationDuration: "6s",
        }}
      />
      <span className="relative z-10 flex w-full items-center justify-center rounded-[1vh] bg-tertiary px-4 py-2 text-sm font-medium text-white border border-white/25 transition-colors duration-300 group-hover:border-white/40">
        {children}
      </span>
    </button>
  );
};

export default Button;
