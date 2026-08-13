import type { Metadata } from "next";
import { Poppins, Inter, Space_Mono } from "next/font/google";
import { cn } from "@/utils";
import { AcademyHeader } from "./components/AcademyHeader";
import { AcademyFooter } from "./components/AcademyFooter";
import { MetaPixel } from "./components/MetaPixel";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

const title = "Zext Academy | Make AI actually change how you work";
const description =
  "A 1-on-1 AI programme built around your real work. Not a course - a co-pilot. Book a free discovery session with our founding team.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/zext-academy" },
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

export default function ZextAcademyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        poppins.variable,
        inter.variable,
        spaceMono.variable,
        "flex min-h-screen flex-col bg-background font-(family-name:--font-inter) text-white",
      )}
    >
      <MetaPixel />
      <AcademyHeader />
      <div className="flex-1">{children}</div>
      <AcademyFooter />
    </div>
  );
}
