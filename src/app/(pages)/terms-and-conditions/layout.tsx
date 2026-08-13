import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Zext Digital",
  description:
    "Terms governing use of the Zext Digital website and general engagement with Zext Digital LLP.",
  alternates: {
    canonical: "/terms-and-conditions",
  },
  openGraph: {
    title: "Terms & Conditions | Zext Digital",
    description:
      "Terms governing use of the Zext Digital website and general engagement with Zext Digital LLP.",
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
    title: "Terms & Conditions | Zext Digital",
    description:
      "Terms governing use of the Zext Digital website and general engagement with Zext Digital LLP.",
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

export default function TermsAndConditionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
