import type { Metadata } from "next";
import NotFoundClient from "@/app/(pages)/NotFoundClient";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Zext Digital",
  description: "The page you are looking for does not exist.",
  openGraph: {
    title: "404 - Page Not Found | Zext Digital",
    description: "The page you are looking for does not exist.",
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
    title: "404 - Page Not Found | Zext Digital",
    description: "The page you are looking for does not exist.",
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

export default function NotFound() {
  return <NotFoundClient />;
}
