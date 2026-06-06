
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const quotes = [
  {
    quote:
      "The team understood our product vision quickly and delivered a polished experience our leadership was proud to demo.",
    name: "Rakesh Reddy Sir",
    role: "Director · Enterprise Platforms",
    gradient: "radial-gradient(circle at 40% 30%, #4cb8ff 0%, #1a3a5a 50%, #0a0a0a 100%)",
    span: "md:col-span-4",
  },
  {
    quote:
      "Communication was disciplined and respectful throughout — weekly updates were clear and the final build felt premium.",
    name: "K. Prasad Sir",
    role: "Founder · Product Studio Client",
    gradient: "radial-gradient(circle at 60% 50%, #e8e0d8 0%, #5a5550 45%, #0a0a0a 100%)",
    span: "md:col-span-4",
  },
  {
    quote:
      "They simplified complex flows without dumbing down the brand. Our stakeholders noticed the difference immediately.",
    name: "K. Satyanarayana Sir",
    role: "Chief Technology Officer",
    gradient: "radial-gradient(circle at 30% 60%, #ff8a4a 0%, #6a2a14 45%, #0a0a0a 100%)",
    span: "md:col-span-4",
  },
  {
    quote:
      "Reliable execution — no overpromising, just steady craft, motion, and engineering that matched the brief.",
    name: "Baskar Rao Sir",
    role: "Head of Product",
    gradient: "radial-gradient(circle at 50% 40%, #8aa888 0%, #3a5a40 45%, #0a0a0a 100%)",
    span: "md:col-span-6",
  },
  {
    quote:
      "What stood out was professionalism end to end: discovery, design reviews, and a launch we could hand to operations.",
    name: "Selvamani Iyer Sir",
    role: "Operations Lead",
    gradient: "radial-gradient(circle at 60% 50%, #ff6b9d 0%, #7a2a4a 45%, #0a0a0a 100%)",
    span: "md:col-span-6",
  },
  {
    quote:
      "The visual direction and frontend quality were both excellent — responsive, fast, and aligned with our brand standards.",
    name: "Manisha Rathore Ma'am",
    role: "Design & Brand Lead",
    gradient: "radial-gradient(circle at 40% 35%, #ffe9d6 0%, #6a5548 45%, #0a0a0a 100%)",
    span: "md:col-span-6",
  },
  {
    quote:
      "We appreciated the straight answers on scope and timeline. The engagement felt like working with a serious product partner.",
    name: "Keshav Reddy Sir",
    role: "Founder · Technology Venture",
    gradient: "radial-gradient(circle at 45% 50%, #c87a3a 0%, #4a3018 45%, #0a0a0a 100%)",
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
            delay: (i % 3) * 0.1,
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
              minHeight: 340,
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
                    fontSize: 16,
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
