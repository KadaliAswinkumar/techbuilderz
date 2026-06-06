import { createFileRoute } from "@tanstack/react-router";
import { LegalPageLayout } from "@/components/LegalPageLayout";

const sections = [
  {
    title: "Information we collect",
    points: [
      "Contact details (name, email, phone) when you submit inquiries or project briefs.",
      "Business and technical information you voluntarily share for proposals, delivery, and support.",
      "Limited usage data (pages visited, device type, performance metrics) to improve reliability and experience.",
    ],
  },
  {
    title: "How we use information",
    points: [
      "To respond to inquiries, prepare estimates, and deliver contracted professional services.",
      "To communicate project status, invoices, and support matters related to your engagement.",
      "To maintain security, prevent abuse, and improve our products, processes, and website.",
    ],
  },
  {
    title: "Sharing and processors",
    points: [
      "We do not sell personal information.",
      "We share data only with vetted processors required to operate (hosting, analytics, email, forms, payments) under contractual safeguards.",
      "We may disclose information when required by applicable law or to protect our legal rights.",
    ],
  },
  {
    title: "Security and retention",
    points: [
      "We apply reasonable technical and organizational measures appropriate to a professional product studio.",
      "Data is retained only as long as needed for delivery, support, accounting, or legal obligations.",
      "You may request access, correction, or deletion subject to contractual and legal requirements.",
    ],
  },
  {
    title: "Your rights",
    points: [
      "Request a copy of personal data we hold about you.",
      "Request correction of inaccurate information.",
      "Request deletion where no overriding legal or contractual duty applies.",
    ],
  },
];

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — TecH BuilderZ" },
      {
        name: "description",
        content: "Privacy Policy for TecH BuilderZ — product design and engineering studio.",
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "https://techbuilderz.in/privacy-policy" }],
  }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      label="Legal"
      title="Privacy"
      accent="policy."
      effectiveDate="4 June 2026"
      intro="TecH BuilderZ (“we”, “us”) is a professional product design and engineering studio based in Hyderabad, India. This policy explains how we collect, use, and protect information when you use techbuilderz.in and engage our services."
      sections={sections}
    />
  );
}
