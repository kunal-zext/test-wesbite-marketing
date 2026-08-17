import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { THANK_YOU } from "../data";
import { AcademyLeadTracker } from "../components/AcademyLeadTracker";

const title = "Thank you | Zext Academy";
const description =
  "Your discovery session request has been received. Our founding team will reach out within 48 hours.";

export const metadata: Metadata = {
  title,
  description,
  // Post-conversion page; keep it out of search results.
  robots: { index: false, follow: true },
  alternates: { canonical: "/zext-academy/thank-you" },
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_IN",
    siteName: "Zext Digital",
    images: [
      { url: "/assets/Logo.png", width: 200, height: 136, alt: "Zext Digital" },
    ],
  },
  twitter: {
    title,
    description,
    images: [
      { url: "/assets/Logo.png", width: 200, height: 136, alt: "Zext Digital" },
    ],
  },
};

export default function ThankYouPage() {
  return (
    <section className="relative flex min-h-[60vh] items-center overflow-hidden py-20">
      <AcademyLeadTracker />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(143,224,255,0.16),transparent_55%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-2xl px-6 text-center">
        <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-secondary/15 ring-1 ring-secondary/30">
          <Check className="size-8 text-secondary" strokeWidth={2.5} aria-hidden />
        </span>
        <span className="mt-6 block font-(family-name:--font-space-mono) text-xs uppercase tracking-[0.26em] text-secondary">
          {THANK_YOU.eyebrow}
        </span>
        <h1 className="mt-3 font-(family-name:--font-poppins) text-[clamp(30px,5vw,44px)] font-bold leading-[1.12] tracking-tight text-white">
          {THANK_YOU.heading}
        </h1>
        <p className="mx-auto mt-4 max-w-[46ch] text-lg leading-relaxed text-white/55">
          {THANK_YOU.body}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/zext-academy"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-(family-name:--font-poppins) text-[15px] font-medium text-white/80 transition-colors duration-200 hover:border-secondary hover:text-white"
          >
            {THANK_YOU.backLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
