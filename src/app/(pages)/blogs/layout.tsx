import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Zext Digital",
  description:
    "Perspectives on AI implementation, automation, and digital transformation from the Zext Digital team.",
  alternates: {
    canonical: "/blogs",
  },
  openGraph: {
    title: "Blog | Zext Digital",
    description:
      "Perspectives on AI implementation, automation, and digital transformation from the Zext Digital team.",
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
    title: "Blog | Zext Digital",
    description:
      "Perspectives on AI implementation, automation, and digital transformation from the Zext Digital team.",
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

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
