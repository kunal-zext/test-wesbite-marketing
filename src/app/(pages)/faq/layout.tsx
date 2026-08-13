import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | Zext Digital",
  description:
    "Short answers about what Zext delivers, timelines, pricing, and how we collaborate.",
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "FAQ | Zext Digital",
    description:
      "Short answers about what Zext delivers, timelines, pricing, and how we collaborate.",
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
    title: "FAQ | Zext Digital",
    description:
      "Short answers about what Zext delivers, timelines, pricing, and how we collaborate.",
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

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
