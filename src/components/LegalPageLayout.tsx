import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

type Section = { title: string; points: string[] };

export function LegalPageLayout({
  label,
  title,
  accent,
  effectiveDate,
  intro,
  sections,
}: {
  label: string;
  title: string;
  accent: string;
  effectiveDate: string;
  intro: string;
  sections: Section[];
}) {
  return (
    <main
      className="relative min-h-screen w-full overflow-x-hidden"
      style={{ background: "var(--bg)", color: "var(--fg)" }}
    >
      <div className="grain" aria-hidden />
      <div className="mx-auto max-w-4xl px-6 md:px-12 py-28 md:py-36">
        <Link
          to="/"
          className="link-underline"
          style={{
            fontFamily: "var(--font-space), sans-serif",
            fontSize: 11,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "var(--fg-muted)",
          }}
        >
          ← Back to home
        </Link>

        <p
          className="mt-10"
          style={{
            fontFamily: "var(--font-space), sans-serif",
            fontSize: 11,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "var(--accent)",
          }}
        >
          {label}
        </p>
        <h1
          className="font-display mt-5"
          style={{ fontSize: "clamp(48px, 8vw, 96px)", lineHeight: 0.9 }}
        >
          {title}{" "}
          <span className="font-editorial italic" style={{ color: "var(--accent)" }}>
            {accent}
          </span>
        </h1>
        <p
          className="mt-4"
          style={{
            fontSize: 12,
            color: "var(--fg-muted)",
            fontFamily: "var(--font-space), sans-serif",
          }}
        >
          Effective date: {effectiveDate}
        </p>
        <p
          className="mt-8 max-w-2xl"
          style={{ fontSize: 16, lineHeight: 1.75, color: "var(--fg-muted)" }}
        >
          {intro}
        </p>

        <div className="mt-14 space-y-6">
          {sections.map((section) => (
            <section
              key={section.title}
              className="p-8 md:p-10"
              style={{ background: "var(--bg-2)", border: "1px solid var(--line)" }}
            >
              <h2
                className="font-display"
                style={{ fontSize: 28, letterSpacing: "0.02em" }}
              >
                {section.title.toUpperCase()}
              </h2>
              <ul className="mt-5 space-y-3">
                {section.points.map((point) => (
                  <li
                    key={point}
                    style={{
                      fontSize: 15,
                      lineHeight: 1.7,
                      color: "var(--fg-muted)",
                      paddingLeft: 16,
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        color: "var(--accent)",
                      }}
                    >
                      —
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <ContactBlock />
      </div>
    </main>
  );
}

function ContactBlock() {
  return (
    <section
      className="mt-10 p-8 md:p-10"
      style={{ border: "1px solid var(--line)", background: "var(--bg-2)" }}
    >
      <h2 className="font-display" style={{ fontSize: 24 }}>
        CONTACT
      </h2>
      <p className="mt-4" style={{ fontSize: 15, color: "var(--fg-muted)", lineHeight: 1.7 }}>
        TecH BuilderZ · Hyderabad, India
        <br />
        <a href="mailto:team@techbuilderz.in" className="link-underline" style={{ color: "var(--fg)" }}>
          team@techbuilderz.in
        </a>
        {" · "}
        <a href="https://wa.me/919398431573" className="link-underline" style={{ color: "var(--fg)" }}>
          WhatsApp
        </a>
      </p>
    </section>
  );
}
