"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

type Props = {
  /** Header receives the open state so callers can rotate chevrons / restyle nodes. */
  header: (open: boolean) => React.ReactNode;
  children: React.ReactNode;
  className?: string;
  buttonClassName?: string;
  panelClassName?: string;
};

/** Single expand/collapse disclosure — shared by the curriculum and FAQ lists. */
export function AccordionItem({
  header,
  children,
  className,
  buttonClassName,
  panelClassName,
}: Props) {
  const [open, setOpen] = useState(false);
  return (
    <div className={className}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "w-full cursor-pointer text-left",
          "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          buttonClassName,
        )}
      >
        {header(open)}
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: EASE }}
        className="overflow-hidden"
      >
        <div className={panelClassName}>{children}</div>
      </motion.div>
    </div>
  );
}
