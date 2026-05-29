import { createFileRoute, Link } from "@tanstack/react-router";

const sections = [
  {
    title: "Information We Collect",
    points: [
      "Contact details such as name, email address, and phone number when you submit inquiries.",
      "Business/project details you choose to share for proposals, planning, and delivery.",
      "Basic usage and analytics data to improve website performance and user experience.",
    ],
  },
  {
    title: "How We Use Information",
    points: [
      "To respond to inquiries, provide estimates, and deliver requested services.",
      "To communicate project updates, invoices, and support information.",
      "To improve our offerings, website reliability, and customer experience.",
    ],
  },
  {
    title: "Data Sharing",
    points: [
      "We do not sell your personal information.",
      "We only share data with trusted service providers required to operate our business (hosting, analytics, communication, payment).",
      "We may disclose information when required by law or to protect legal rights.",
    ],
  },
  {
    title: "Data Security and Retention",
    points: [
      "We use reasonable technical and organizational safeguards to protect your data.",
      "Data is retained only for as long as necessary for business, legal, or contractual purposes.",
      "You can request correction or deletion of your personal information at any time.",
    ],
  },
  {
    title: "Your Rights",
    points: [
      "Request access to the data we hold about you.",
      "Request correction of inaccurate information.",
      "Request deletion, subject to legal or contractual obligations.",
    ],
  },
];

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy - TecH BuilderZ" },
      { name: "description", content: "Privacy Policy for TecH BuilderZ." },
      { name: "robots", content: "noindex, follow" },
    ],
    links: [{ rel: "canonical", href: "https://techbuilderz.in/privacy-policy" }],
  }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <main className="grain min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <div className="mb-8">
          <Link to="/" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
            ← Back to home
          </Link>
        </div>

        <div className="glass rounded-3xl p-8 md:p-12">
          <div className="text-xs uppercase tracking-[0.3em] text-accent">Legal</div>
          <h1 className="mt-4 text-4xl font-bold md:text-5xl">
            Privacy <span className="text-gradient">Policy</span>
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">Effective date: 17 May 2026</p>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            This Privacy Policy explains how TecH BuilderZ collects, uses, stores, and protects information when
            you use our website and services.
          </p>

          <div className="mt-10 space-y-8">
            {sections.map((section) => (
              <section key={section.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h2 className="text-xl font-semibold">{section.title}</h2>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
                  {section.points.map((point) => (
                    <li key={point}>• {point}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold">Contact Us</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              For privacy-related requests, contact:{" "}
              <a href="mailto:team@techbuilderz.in" className="text-accent hover:underline">
                team@techbuilderz.in
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
