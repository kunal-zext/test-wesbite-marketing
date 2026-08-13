import ContentPage from "@/app/components/shared/ContentPage/ContentPage";

export default function PrivacyPolicyPage() {
  return (
    <ContentPage
      label="Legal"
      title="Privacy Policy"
      intro="This policy describes how Zext Digital LLP (“we”, “us”) handles information when you visit our website or engage with us. Last updated: March 2026."
    >
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-white">1. Who we are</h2>
        <p>
          Zext Digital LLP is an AI transformation company based in Mumbai,
          India. For privacy-related requests, contact us at{" "}
          <a
            href="mailto:contact@zextdigital.ai"
            className="text-secondary underline decoration-white/20 underline-offset-2 transition-colors hover:decoration-secondary"
          >
            contact@zextdigital.ai
          </a>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-white">
          2. Information we may collect
        </h2>
        <p>
          Depending on how you interact with us, we may process identifiers and
          contact details you provide (such as name, email, company, and message
          content), technical data from your device and browser (such as IP
          address and approximate location, device type, and pages viewed), and
          communication records when you email or otherwise contact us.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-white">
          3. How we use information
        </h2>
        <p>
          We use this information to respond to enquiries, operate and improve
          our website, analyse aggregate traffic patterns, comply with legal
          obligations, and protect our legitimate interests in running our
          business securely and professionally.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-white">
          4. Sharing and retention
        </h2>
        <p>
          We do not sell your personal data. We may share information with
          service providers who assist us (for example hosting, analytics, or
          email delivery) under appropriate safeguards, or when required by law.
          We retain data only as long as needed for the purposes described above
          or as required by law.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-white">5. Your choices</h2>
        <p>
          Where applicable law provides rights to access, correct, delete, or
          restrict processing of your personal data, you may contact us using
          the email above. We will respond in line with applicable requirements.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-white">6. Updates</h2>
        <p>
          We may update this policy from time to time. The “Last updated” date
          at the top will change when we do; continued use of the site after
          changes constitutes acceptance of the revised policy where permitted
          by law.
        </p>
      </section>

      <p className="pt-4 text-white/45">
        Full legal text for specific jurisdictions or enterprise engagements may
        be provided separately as part of contracts or statements of work.
      </p>
    </ContentPage>
  );
}
