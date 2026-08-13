import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Zext Digital",
  description:
    "How Zext Digital LLP collects, uses, and protects your information when you use our website and services.",
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Zext Digital",
    description:
      "How Zext Digital LLP collects, uses, and protects your information when you use our website and services.",
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
    title: "Privacy Policy | Zext Digital",
    description:
      "How Zext Digital LLP collects, uses, and protects your information when you use our website and services.",
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

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
};

