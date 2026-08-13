import {
  Library,
  Bot,
  AppWindow,
  ClipboardCheck,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "../components/Reveal";
import { SectionHead } from "../components/SectionHead";
import { DELIVERABLES } from "../data";

const ICONS: LucideIcon[] = [Library, Bot, AppWindow, ClipboardCheck];

/** Light contrast band (#d9d9d9) — mirrors the other light sections on the site. */
export function DeliverablesSection() {
  return (
    <section className="bg-[#d9d9d9] py-14 md:py-[84px]">
      <div className="mx-auto max-w-[1600px] md:max-w-6xl px-6">
        <Reveal>
          <SectionHead
            eyebrow={DELIVERABLES.eyebrow}
            heading={DELIVERABLES.heading}
            sub={DELIVERABLES.sub}
            light
          />
        </Reveal>
        <div className="mt-11 grid gap-[18px] md:grid-cols-2">
          {DELIVERABLES.items.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={item.title} delay={i * 0.06}>
                <div className="flex h-full items-start gap-[18px] rounded-[14px] border-l-4 border-sky-500 bg-white p-6 shadow-[0_8px_26px_-18px_rgba(22,34,63,0.4)] sm:p-7">
                  <div className="flex size-[42px] shrink-0 items-center justify-center rounded-[10px] bg-sky-500/15">
                    <Icon
                      className="size-[22px] text-sky-600"
                      strokeWidth={2}
                      aria-hidden
                    />
                  </div>
                  <div>
                    <h3 className="mb-1 font-(family-name:--font-poppins) text-[17px] font-semibold text-tertiary">
                      {item.title}
                    </h3>
                    <p className="text-[14.5px] leading-relaxed text-tertiary/60">
                      {item.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
