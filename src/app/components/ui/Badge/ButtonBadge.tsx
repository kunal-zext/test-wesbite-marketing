import { cn } from "@/utils";
import React from "react";

interface ButtonBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

const ButtonBadge = ({ className, children, ...props }: ButtonBadgeProps) => {
  return (
    <div
      className={cn(
        "bg-transparent border border-white/25 rounded-2xl p-4 w-fit",
        "shadow-[0_0_20px_rgba(140,82,255,0.1)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default ButtonBadge;
