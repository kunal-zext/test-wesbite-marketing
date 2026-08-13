"use client";

import Image from "next/image";
import { cn } from "@/utils";

interface AuthorInfoProps {
  name: string;
  className?: string;
  source?: string;
}

export default function AuthorInfo({
  name,
  className,
  source,
}: AuthorInfoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="size-9 rounded-full ring-2 ring-white/10 p-1">
        <Image
          src={
            source && (source === "reddit" || source === "google_news")
              ? `/assets/svgs/${source}.svg`
              : "/assets/Logo.svg"
          }
          alt={source || "Zext Digital"}
          width={36}
          height={36}
          className="size-full rounded-full object-contain object-center select-none"
          quality={100}
          unoptimized
          draggable={false}
        />
      </div>
      <span className="text-sm font-medium text-white/90 capitalize">
        {name || "Zext Digital"}
      </span>
    </div>
  );
}
