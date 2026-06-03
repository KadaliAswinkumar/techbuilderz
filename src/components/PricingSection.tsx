
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Card = {
  num: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  highlight?: boolean;
};

const cards: Card[] = [
  {
    num: "P/01",
    title: "Scope First",
    body: "We map your features, user flows, integrations, and outcomes before sharing a commercial estimate. No surprise add-ons mid-build.",
    cta: "Start a brief →",
    href: "#contact",
  },
  {
    num: "P/02",
    title: "Effort Based",
    body: "Pricing is calculated from implementation effort, design depth, technical complexity, and QA needs — never copy-pasted from a template.",
    cta: "Discuss on WhatsApp →",
    href: "https://wa.me/919398431573",
    highlight: true,
  },
  {
    num: "P/03",
    title: "Custom Quote",
    body: "Tell us what you're building. We reply within 24 hours with a clear, fixed proposal — line-itemed so you know exactly what each rupee buys.",
    cta: "Request quote →",
    href: "#contact",
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
          }
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
          Scope <span className="font-editorial italic">first.</span>
        </h2>
        <p
          className="mt-6 max-w-xl"
          style={{ fontSize: 15, color: "var(--fg-muted)", lineHeight: 1.7 }}
        >
          No off-the-shelf packages. We map the work, then send a fixed
          line-itemed quote. You pay for value, not boilerplate.
        </p>
        <div className="mt-8" style={{ height: 1, background: "var(--line)" }} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {cards.map((c, i) => (
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
              minHeight: 420,
            }}
          >
            {c.highlight && (
              <span
                className="absolute"
                style={{
                  top: -1,
                  right: -1,
                  background: "var(--bg)",
                  color: "var(--accent)",
                  padding: "0.4rem 0.7rem",
                  fontFamily: "var(--font-space), sans-serif",
                  fontSize: 10,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                Preferred
              </span>
            )}

            <div className="flex items-baseline justify-between">
              <span
                style={{
                  fontFamily: "var(--font-space), sans-serif",
                  fontSize: 11,
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  opacity: 0.8,
                }}
              >
                {c.num}
              </span>
              <span
                style={{
                  fontSize: 10,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  opacity: 0.7,
                  fontFamily: "var(--font-space), sans-serif",
                }}
              >
                ({i === 0 ? "stage" : i === 1 ? "principle" : "outcome"})
              </span>
            </div>

            <h3
              className="font-display mt-8"
              style={{
                fontSize: "clamp(40px, 4.5vw, 64px)",
                lineHeight: 0.9,
                letterSpacing: "0.02em",
              }}
            >
              {c.title.toUpperCase()}
            </h3>

            <p
              className="mt-8 flex-1"
              style={{
                fontSize: 15,
                lineHeight: 1.7,
                opacity: c.highlight ? 0.9 : 1,
                color: c.highlight ? "var(--bg)" : "var(--fg)",
              }}
            >
              {c.body}
            </p>

            <a
              href={c.href}
              {...(c.href.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              data-hover
              className={`mt-10 ${c.highlight ? "" : "btn-brut-ghost"} btn-brut`}
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
    </section>
  );
}
