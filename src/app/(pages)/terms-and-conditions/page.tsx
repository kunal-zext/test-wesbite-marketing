import ContentPage from "@/app/components/shared/ContentPage/ContentPage";

export default function TermsAndConditionsPage() {
  return (
    <ContentPage
      label="Legal"
      title="Terms & Conditions"
      intro="These terms govern your use of this website and general rules for engaging with Zext Digital LLP. Last updated: March 2026."
    >
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-white">1. Agreement</h2>
        <p>
          By accessing this website, you agree to these terms. If you do not
          agree, please do not use the site. Separate written agreements apply
          to paid services, pilots, and deliverables where executed.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-white">
          2. Informational use
        </h2>
        <p>
          Content on this site is for general information and marketing. It is
          not legal, financial, or technical advice for your specific situation.
          Any timelines, metrics, or examples are illustrative unless confirmed
          in a signed statement of work.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-white">
          3. Intellectual property
        </h2>
        <p>
          Trademarks, logos, copy, design, and other materials on this site are
          owned by Zext Digital LLP or its licensors. You may not copy, scrape,
          or redistribute them for commercial use without prior written consent.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-white">4. Acceptable use</h2>
        <p>
          You agree not to misuse the site - including attempting unauthorised
          access, disrupting services, harvesting data at scale, or using the
          site in violation of applicable law. We may suspend or block access
          where we reasonably believe these terms are breached.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-white">
          5. Limitation of liability
        </h2>
        <p>
          To the fullest extent permitted by law, Zext Digital LLP and its
          partners are not liable for any indirect, incidental, or consequential
          damages arising from use of this website or reliance on its content.
          Our total liability for claims relating to the site alone is limited
          where permitted to the minimum amount required by applicable law.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-white">6. Governing law</h2>
        <p>
          These terms are governed by the laws of India, subject to mandatory
          consumer protections where you reside. Courts at Mumbai, Maharashtra
          shall have exclusive jurisdiction for disputes arising from these
          website terms, without prejudice to mandatory forums elsewhere.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-white">7. Contact</h2>
        <p>
          Questions about these terms:{" "}
          <a
            href="mailto:contact@zextdigital.ai"
            className="text-secondary underline decoration-white/20 underline-offset-2 transition-colors hover:decoration-secondary"
          >
            contact@zextdigital.ai
          </a>
          .
        </p>
      </section>
    </ContentPage>
  );
}
