import { createFileRoute, Link } from "@tanstack/react-router";

const sections = [
  {
    title: "Service Scope",
    points: [
      "Project scope, deliverables, and timelines are finalized through written agreement before execution.",
      "Work outside agreed scope may require a revised quote and timeline.",
    ],
  },
  {
    title: "Payments and Billing",
    points: [
      "Payments follow the agreed milestone structure and due dates.",
      "Late payments may impact timelines and delivery commitments.",
      "Final deliverables are handed over after completion of agreed payments.",
    ],
  },
  {
    title: "Client Responsibilities",
    points: [
      "Clients are expected to provide timely feedback, approvals, and required content/assets.",
      "Delays in approvals or dependencies may affect delivery schedules.",
    ],
  },
  {
    title: "Intellectual Property",
    points: [
      "Client-owned materials remain client property.",
      "Custom deliverables are transferred as per contract after full payment.",
      "TecH BuilderZ retains rights to internal tools, frameworks, and reusable components unless agreed otherwise.",
    ],
  },
  {
    title: "Liability and Termination",
    points: [
      "We are not liable for interruptions caused by third-party services, hosting providers, or force majeure events.",
      "Either party may terminate with written notice; completed work up to termination remains billable.",
      "Both parties should attempt good-faith resolution for disputes before formal legal action.",
    ],
  },
];

export const Route = createFileRoute("/terms-and-conditions")({
  head: () => ({
    meta: [
      { title: "Terms and Conditions - TecH BuilderZ" },
      { name: "description", content: "Terms and Conditions for TecH BuilderZ." },
    ],
  }),
  component: TermsAndConditionsPage,
});

function TermsAndConditionsPage() {
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
            Terms & <span className="text-gradient">Conditions</span>
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">Effective date: 17 May 2026</p>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            These Terms and Conditions govern use of the TecH BuilderZ website and services. By engaging with our
            services, you agree to these terms.
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
              For legal/commercial queries, contact:{" "}
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
