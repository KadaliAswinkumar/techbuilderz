import { createFileRoute } from "@tanstack/react-router";
import { LegalPageLayout } from "@/components/LegalPageLayout";

const sections = [
  {
    title: "Engagement and scope",
    points: [
      "Services are provided under a written statement of work or proposal defining deliverables, milestones, and timelines.",
      "Work outside agreed scope requires a change request and may affect fees and schedule.",
      "We operate as a professional product studio — not as legal, tax, or investment advisors.",
    ],
  },
  {
    title: "Fees and payment",
    points: [
      "Fees follow the milestone schedule in your signed proposal or invoice.",
      "Late payments may pause work until accounts are current.",
      "Final source files and production handover occur after agreed payments for the relevant milestone are received.",
    ],
  },
  {
    title: "Client responsibilities",
    points: [
      "Timely feedback, approvals, brand assets, and third-party access you control.",
      "Accuracy of information you provide for compliance-sensitive features (e.g. payments, health, finance).",
      "Delays caused by client dependencies may shift delivery dates in good faith.",
    ],
  },
  {
    title: "Intellectual property",
    points: [
      "Your pre-existing materials remain yours.",
      "Upon full payment for the applicable milestone, custom deliverables defined in the SOW transfer to you as specified in writing.",
      "We retain rights to internal tools, libraries, and know-how unless otherwise agreed.",
    ],
  },
  {
    title: "Warranties and liability",
    points: [
      "We warrant services will be performed with professional skill and care consistent with industry standards for product studios.",
      "Except where prohibited by law, liability is limited to fees paid for the specific engagement giving rise to the claim.",
      "We are not liable for outages of third-party hosting, APIs, or force majeure events.",
    ],
  },
  {
    title: "Termination",
    points: [
      "Either party may terminate with written notice per the contract; completed work to date remains billable.",
      "We encourage good-faith resolution before formal dispute proceedings.",
      "Governing law and venue are as stated in your master services agreement or, if none, laws of India with courts in Hyderabad.",
    ],
  },
];

export const Route = createFileRoute("/terms-and-conditions")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — TecH BuilderZ" },
      {
        name: "description",
        content: "Terms and Conditions for TecH BuilderZ professional services.",
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      { rel: "canonical", href: "https://techbuilderz.in/terms-and-conditions" },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <LegalPageLayout
      label="Legal"
      title="Terms &"
      accent="conditions."
      effectiveDate="4 June 2026"
      intro="These Terms & Conditions govern use of techbuilderz.in and professional services provided by TecH BuilderZ. By engaging us, you agree to these terms together with any project-specific proposal or agreement."
      sections={sections}
    />
  );
}
