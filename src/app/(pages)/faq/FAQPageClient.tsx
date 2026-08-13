"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/utils";
import { FAQ_ITEMS } from "@/utils/constants/faq";

export default function FAQPageClient() {
  const [activeId, setActiveId] = useState(
    () => FAQ_ITEMS[0]?.category ?? "",
  );

  const active =
    FAQ_ITEMS.find((c) => c.category === activeId) ?? FAQ_ITEMS[0];

  return (
    <div className="min-h-[calc(100vh-80px)] bg-background px-5 pb-20 sm:px-8 md:px-10 lg:px-14 xl:px-16">
      <div className="mx-auto max-w-[120vh] xl:max-w-[1600px]">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-secondary transition-colors hover:text-secondary/80 sm:mb-10"
        >
          <ArrowLeft className="size-4 shrink-0" strokeWidth={2} aria-hidden />
          Back to home
        </Link>
        <p className="mb-2 text-[1vh] font-medium tracking-[0.2em] text-secondary uppercase sm:text-xs">
          FAQ
        </p>
        <h1 className="mb-4 max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Questions we hear before the first call
        </h1>

        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12 xl:gap-16">
          <aside className="shrink-0 lg:w-[min(100%,280px)] xl:w-[30vh]">
            <nav aria-label="FAQ categories" className="lg:sticky lg:top-28">
              <p className="mb-3 text-[1vh] font-medium tracking-[0.15em] text-white/35 uppercase sm:text-[1.1vh]">
                Browse by topic
              </p>
              <ul className="flex flex-col gap-1 sm:gap-1.5">
                {FAQ_ITEMS.map((cat, index) => {
                  const isActive = cat.category === activeId;
                  return (
                    <li key={index}>
                      <button
                        type="button"
                        onClick={() => setActiveId(cat.category)}
                        aria-current={isActive ? "true" : undefined}
                        className={cn(
                          "w-full rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors sm:py-3.5",
                          isActive
                            ? "border-secondary/40 bg-secondary/10 text-white shadow-[0_0_24px_-8px_rgba(143,224,255,0.35)]"
                            : "border-white/10 bg-white/2 text-white/65 hover:border-white/15 hover:bg-white/4 hover:text-white",
                        )}
                      >
                        {cat.title}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          <main className="min-w-0 flex-1 border-t border-white/10 pt-8 lg:border-t-0 lg:border-l lg:border-white/10 lg:pt-0 lg:pl-10 xl:pl-12">
            {active ? (
              <>
                <header className="mb-8 border-b border-white/[0.07] pb-6">
                  <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                    {active.title}
                  </h2>
                  {active.description ? (
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/45 sm:text-[1.5vh]">
                      {active.description}
                    </p>
                  ) : null}
                </header>
                <ul className="space-y-10">
                  {active.items.map((item, i) => (
                    <li
                      key={i}
                      className="border-b border-white/6 pb-10 last:border-b-0 last:pb-0"
                    >
                      <h3 className="mb-3 text-lg font-semibold leading-snug text-white sm:text-xl">
                        {item.question}
                      </h3>
                      <p className="max-w-2xl leading-relaxed text-white/65">
                        {item.answer}
                      </p>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </main>
        </div>
      </div>
    </div>
  );
}
