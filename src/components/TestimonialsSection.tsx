
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Quote = {
  quote: string;
  name: string;
  role: string;
  gradient: string;
  span: string;
};

const quotes: Quote[] = [
  {
    quote:
      "TecH BuilderZ understood our market quickly and gave us a polished product website in record time. It helped our sales team close demos faster.",
    name: "Ananya Reddy",
    role: "VP Product, CloudSutra",
    gradient:
      "radial-gradient(circle at 40% 30%, #4cb8ff 0%, #1a3a5a 50%, #0a0a0a 100%)",
    span: "md:col-span-4",
  },
  {
    quote:
      "From discovery to launch, communication was excellent. Every weekly update was clear, and the final design felt premium and modern.",
    name: "Rohit Sharma",
    role: "Founder, Agent Forge",
    gradient:
      "radial-gradient(circle at 60% 50%, #e8e0d8 0%, #5a5550 45%, #0a0a0a 100%)",
    span: "md:col-span-4",
  },
  {
    quote:
      "They simplified complex user journeys and improved conversion on our landing pages. We saw measurable growth within the first month.",
    name: "Priya Nair",
    role: "CMO, FinStack",
    gradient:
      "radial-gradient(circle at 30% 60%, #ff8a4a 0%, #6a2a14 45%, #0a0a0a 100%)",
    span: "md:col-span-4",
  },
  {
    quote:
      "The visual direction and frontend quality were both top-notch. The team was responsive, practical, and very easy to collaborate with.",
    name: "Arjun Mehta",
    role: "Head of Design, ScaleNest",
    gradient:
      "radial-gradient(circle at 50% 40%, #8aa888 0%, #3a5a40 45%, #0a0a0a 100%)",
    span: "md:col-span-6",
  },
  {
    quote:
      "What stood out most was reliability. No overpromises, just disciplined execution and great communication from start to finish.",
    name: "Kavya Iyer",
    role: "CTO, Emily AI",
    gradient:
      "radial-gradient(circle at 60% 50%, #ff6b9d 0%, #7a2a4a 45%, #0a0a0a 100%)",
    span: "md:col-span-6",
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);

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
            delay: (i % 3) * 0.12,
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
      ref={sectionRef}
      className="relative w-full px-6 md:px-12 py-32 md:py-40"
      style={{ background: "var(--bg-2)" }}
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
          06
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
          What clients say
        </p>
        <h2
          className="font-display text-[var(--fg)] mt-5"
          style={{ fontSize: "clamp(56px, 8vw, 140px)" }}
        >
          The <span className="font-editorial italic">receipts.</span>
        </h2>
        <div className="mt-8" style={{ height: 1, background: "var(--line)" }} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
        {quotes.map((q, i) => (
          <figure
            key={q.name}
            ref={(el) => {
              cardsRef.current[i] = el;
            }}
            className={`relative flex flex-col p-8 md:p-10 group ${q.span}`}
            style={{
              background: "var(--bg)",
              border: "1px solid var(--line)",
              minHeight: 360,
            }}
          >
            <span
              className="font-editorial"
              style={{
                fontSize: 88,
                color: "var(--accent)",
                lineHeight: 0.4,
                fontStyle: "italic",
              }}
            >
              "
            </span>

            <blockquote
              className="font-editorial italic flex-1"
              style={{
                fontSize: "clamp(18px, 1.4vw, 24px)",
                lineHeight: 1.45,
                color: "var(--fg)",
                marginTop: 8,
              }}
            >
              {q.quote}
            </blockquote>

            <figcaption
              className="mt-8 pt-6 flex items-center gap-4"
              style={{ borderTop: "1px solid var(--line)" }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  background: q.gradient,
                  flexShrink: 0,
                }}
              />
              <div className="flex flex-col">
                <span
                  className="font-display"
                  style={{
                    fontSize: 18,
                    letterSpacing: "0.04em",
                    color: "var(--fg)",
                  }}
                >
                  {q.name.toUpperCase()}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--fg-muted)",
                    fontFamily: "var(--font-space), sans-serif",
                  }}
                >
                  {q.role}
                </span>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
