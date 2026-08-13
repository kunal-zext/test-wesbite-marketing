import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BlogPageBackground from "./components/BlogPageBackground";
import BlogListing from "./components/BlogListing";
import NewsletterSection from "./components/NewsletterSection";

export default function BlogsPage() {
  return (
    <div className="isolate relative w-full min-w-0 overflow-x-hidden bg-background">
      <BlogPageBackground />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-20 pt-8 sm:px-5 sm:pb-24 sm:pt-10 md:px-6 md:pt-12 xl:max-w-[1600px]">
        <Link
          href="/"
          className="group mb-10 inline-flex items-center gap-2 text-sm font-medium text-secondary transition-colors hover:text-secondary/80 sm:mb-12"
        >
          <ArrowLeft
            className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5"
            strokeWidth={2}
            aria-hidden
          />
          Back to home
        </Link>

        <header className="mb-10 sm:mb-12">
          <h1 className="text-[clamp(2rem,5vw,3rem)] font-bold leading-[1.1] tracking-tight text-white">
            Blog
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/50 sm:text-lg">
            Perspectives on AI implementation, automation, and digital
            transformation from the Zext Digital team.
          </p>
        </header>

        <BlogListing />
        <NewsletterSection />
      </div>
    </div>
  );
}
