import type { Metadata } from "next";
import { BookForm } from "./BookForm";

const title = "Book your free discovery session | Zext Academy";
const description =
  "Leave your details and our founding team will reach out to schedule your free 30-minute AI discovery session.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/zext-academy/book" },
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

export default function BookPage() {
  return <BookForm />;
}
