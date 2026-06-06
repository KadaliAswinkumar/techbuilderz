
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const steps = [
  {
    num: "01",
    title: "Discovery call",
    body: "Free 20-minute session. We clarify goals, users, integrations, and success criteria. You leave with a written scope outline — no obligation.",
    cta: "Book via contact →",
    href: "#contact",
  },
  {
    num: "02",
    title: "Fixed proposal",
    body: "Within 24 hours you receive a line-itemed quote: design, engineering, QA, and launch. One number, one timeline — no surprise add-ons mid-build.",
    cta: "WhatsApp us →",
    href: "https://wa.me/919398431573",
    highlight: true,
  },
  {
    num: "03",
    title: "Build & launch",
    body: "Milestone payments tied to demos. Weekly walkthroughs, staging from week one, and handover with documentation when the agreed scope is complete.",
    cta: "Send a brief →",
    href: "#contact",
  },
] as const;

const typical = [
  {
    type: "Marketing site + brand motion",
    scope: "Positioning, UI, WebGL accents, responsive build",
    timeline: "3–5 weeks",
  },
  {
    type: "Product MVP (web)",
    scope: "UX, design system, full-stack, auth & core flows",
    timeline: "6–10 weeks",
  },
  {
    type: "Mobile + backend",
    scope: "Cross-platform app, API, release support",
    timeline: "Custom (quoted)",
  },
];

export default function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.0,
            ease: "power3.out",
            delay: i * 0.12,
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative w-full px-6 md:px-12 py-32 md:py-40"
      style={{ background: "var(--bg)" }}
    >
      <div className="relative mb-16 md:mb-20">
        <span
          aria-hidden
          className="absolute -top-12 -left-2 font-display select-none pointer-events-none"
          style={{
            fontSize: "clamp(120px, 18vw, 240px)",
            color: "var(--fg-muted)",
            opacity: 0.08,
          }}
        >
          05
        </span>
        <p
          style={{
            fontFamily: "var(--font-space), sans-serif",
            fontSize: 11,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "var(--accent)",
          }}
        >
          Pricing
        </p>
        <h2
          className="font-display text-[var(--fg)] mt-5"
          style={{ fontSize: "clamp(56px, 8vw, 140px)" }}
        >
          How it <span className="font-editorial italic">works.</span>
        </h2>
        <p
          className="mt-6 max-w-2xl"
          style={{ fontSize: 15, color: "var(--fg-muted)", lineHeight: 1.7 }}
        >
          No tiered packages to guess from. Every engagement follows the same
          professional process — then a custom fixed quote shaped to your scope.
        </p>
        <div className="mt-8" style={{ height: 1, background: "var(--line)" }} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {steps.map((c, i) => (
          <div
            key={c.num}
            ref={(el) => {
              cardsRef.current[i] = el;
            }}
            className="relative flex flex-col p-8 md:p-10"
            style={{
              background: c.highlight ? "var(--accent)" : "var(--bg-2)",
              color: c.highlight ? "var(--bg)" : "var(--fg)",
              border: c.highlight
                ? "1px solid var(--accent)"
                : "1px solid var(--line)",
              minHeight: 400,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-space), sans-serif",
                fontSize: 11,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                opacity: 0.85,
              }}
            >
              Step {c.num}
            </span>
            <h3
              className="font-display mt-6"
              style={{ fontSize: "clamp(32px, 4vw, 52px)", lineHeight: 0.9 }}
            >
              {c.title.toUpperCase()}
            </h3>
            <p className="mt-6 flex-1" style={{ fontSize: 15, lineHeight: 1.7 }}>
              {c.body}
            </p>
            <a
              href={c.href}
              {...(c.href.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              data-hover
              className={`mt-8 ${c.highlight ? "" : "btn-brut-ghost"} btn-brut`}
              style={{
                background: c.highlight ? "var(--bg)" : undefined,
                color: c.highlight ? "var(--fg)" : undefined,
              }}
            >
              {c.cta}
            </a>
          </div>
        ))}
      </div>

      <div className="mt-16 md:mt-20">
        <p
          style={{
            fontFamily: "var(--font-space), sans-serif",
            fontSize: 11,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "var(--accent)",
          }}
        >
          Typical engagements (indicative)
        </p>
        <p
          className="mt-3 max-w-xl text-sm"
          style={{ color: "var(--fg-muted)", lineHeight: 1.6 }}
        >
          Ballpark timelines only — your quote depends on scope after discovery.
        </p>
        <div className="mt-8 overflow-x-auto">
          <table
            className="w-full min-w-[640px] text-left"
            style={{
              borderCollapse: "collapse",
              fontFamily: "var(--font-space), sans-serif",
              fontSize: 14,
            }}
          >
            <thead>
              <tr style={{ borderBottom: "1px solid var(--line)" }}>
                {["Engagement", "Includes", "Timeline"].map((h) => (
                  <th
                    key={h}
                    className="py-4 pr-6 font-medium"
                    style={{
                      color: "var(--fg-muted)",
                      fontSize: 11,
                      letterSpacing: "0.24em",
                      textTransform: "uppercase",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {typical.map((row) => (
                <tr key={row.type} style={{ borderBottom: "1px solid var(--line)" }}>
                  <td className="py-5 pr-6 font-display" style={{ fontSize: 18 }}>
                    {row.type.toUpperCase()}
                  </td>
                  <td className="py-5 pr-6" style={{ color: "var(--fg-muted)" }}>
                    {row.scope}
                  </td>
                  <td className="py-5" style={{ color: "var(--accent)" }}>
                    {row.timeline}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
