import Image from "next/image";
import { FOOTER_INFO } from "../data";

export function AcademyFooter() {
  return (
    <footer className="border-t border-white/10 bg-background pt-10 pb-28 md:pb-10">
      <div className="mx-auto flex max-w-[1600px] md:max-w-6xl flex-wrap items-center justify-between gap-4 px-6">
        <Image
          src="/assets/Logo.svg"
          alt="Zext Digital"
          width={110}
          height={30}
          className="h-7 w-auto object-contain"
          style={{ width: "auto" }}
        />
        <div className="font-(family-name:--font-space-mono) text-[13px] tracking-[0.03em] text-white/45">
          {FOOTER_INFO.legal} ·{" "}
          <a
            href={`mailto:${FOOTER_INFO.email}`}
            className="text-secondary hover:underline"
          >
            {FOOTER_INFO.email}
          </a>{" "}
          ·{" "}
          <a
            href={FOOTER_INFO.numberHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:underline"
          >
            {FOOTER_INFO.number}
          </a>
        </div>
      </div>
    </footer>
  );
}
