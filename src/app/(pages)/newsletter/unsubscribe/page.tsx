import type { Metadata } from "next";
import { Suspense } from "react";
import UnsubscribePageClient from "./UnsubscribePageClient";

export const metadata: Metadata = {
  title: "Newsletter Unsubscribe | Zext Digital",
  description:
    "Unsubscribe from Zext Digital marketing emails. Tell us why you're leaving. We read every response.",
  alternates: {
    canonical: "/newsletter/unsubscribe",
  },
  openGraph: {
    title: "Newsletter Unsubscribe | Zext Digital",
    description:
      "Unsubscribe from Zext Digital marketing emails. Tell us why you're leaving. We read every response.",
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
    title: "Newsletter Unsubscribe | Zext Digital",
    description:
      "Unsubscribe from Zext Digital marketing emails. Tell us why you're leaving. We read every response.",
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

export default function UnsubscribePage() {
  return (
    <Suspense fallback={null}>
      <UnsubscribePageClient />
    </Suspense>
  );
}
