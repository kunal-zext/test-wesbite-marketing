import { Suspense } from "react";
import NewsletterPageClient from "./NewsletterPageClient";

export default function NewsletterPage() {
  return (
    <Suspense fallback={null}>
      <NewsletterPageClient />
    </Suspense>
  );
}
