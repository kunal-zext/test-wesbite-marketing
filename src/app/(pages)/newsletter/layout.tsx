import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter | Zext Digital",
  description:
    "Subscribe to our newsletter to get the latest updates about Zext Digital and AI.",
  alternates: {
    canonical: "/newsletter",
  },
  openGraph: {
    title: "Newsletter | Zext Digital",
    description:
      "Subscribe to our newsletter to get the latest updates about Zext Digital and AI.",
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
    title: "Newsletter | Zext Digital",
    description:
      "Subscribe to our newsletter to get the latest updates about Zext Digital and AI.",
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

export default function NewsletterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
