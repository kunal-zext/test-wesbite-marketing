import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Figtree } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import LayoutWrapper from "./wrappers/LayoutWrapper";
import { cn } from "@/utils";
import { SITE_URL } from "@/utils/constants/site";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Zext Digital | From AI Ambition to AI Execution",
  description:
    "Zext Digital deploys working AI solutions inside your environment in 2-3 months. AI-led digital content, advisory, implementation, and training for enterprises in India.",
  keywords: [
    "AI transformation company",
    "AI digital marketing agency",
    "AI consulting India",
    "AI implementation India",
    "enterprise AI solutions",
    "AI-powered content creation",
    "HR AI screening",
    "content audit AI",
    "AI training corporate",
    "generative AI consulting",
  ],
  authors: [{ name: "Zext Digital LLP" }],
  openGraph: {
    title: "Zext Digital | From AI Ambition to AI Execution",
    description:
      "We deploy working AI solutions inside your environment in 2-3 months. AI-led content, advisory, and training for India enterprises.",
    type: "website",
    locale: "en_IN",
    siteName: "Zext Digital",
    images: [
      {
        url: "/assets/Logo.png",
        width: 200,
        height: 136,
        alt: "Zext Digital",
      },
    ],
  },
  twitter: {
    title: "Zext Digital | From AI Ambition to AI Execution",
    description:
      "Build practical AI transformation inside your business. Working solutions deployed in 2-3 months.",
    images: [
      {
        url: "/assets/Logo.png",
        width: 200,
        height: 136,
        alt: "Zext Digital",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", figtree.variable)}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
      </head>
      <body
        className={`${plusJakarta.className} antialiased bg-background overflow-x-hidden`}
      >
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="lazyOnload"
        />
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
