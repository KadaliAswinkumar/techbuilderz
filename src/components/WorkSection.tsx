
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Case = {
  index: string;
  client: string;
  type: string;
  href: string;
  image: string;
  gradient: string;
  className: string;
  feature?: boolean;
};

// Image URLs taken from techbuilderz.in's own portfolio.
const cases: Case[] = [
  {
    index: "01",
    client: "Cloud Cost Optimiser",
    type: "FinOps · SaaS Dashboard",
    href: "https://kadaliaswinkumar.github.io/cloudcost-optimizer/",
    image: "https://picsum.photos/id/180/1600/1000",
    gradient:
      "radial-gradient(circle at 30% 30%, #4cb8ff 0%, #1a3a5a 35%, #0a1a2a 80%, #0a0a0a 100%)",
    className: "md:col-span-8 md:h-[72vh] aspect-[4/5] md:aspect-auto",
    feature: true,
  },
  {
    index: "02",
    client: "Agent Forge",
    type: "AI Agent Platform",
    href: "https://kadaliaswinkumar.github.io/AgentForge/",
    image:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1400&q=80",
    gradient:
      "radial-gradient(circle at 60% 30%, #e8e0d8 0%, #5a5550 35%, #1a1612 80%, #0a0a0a 100%)",
    className: "md:col-span-4 md:h-[72vh] aspect-[3/4] md:aspect-auto",
  },
  {
    index: "03",
    client: "TecH BuilderZ",
    type: "SaaS · Agency Site",
    href: "https://techbuilderz.in/",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80",
    gradient:
      "radial-gradient(circle at 40% 40%, #ff8a4a 0%, #b85320 35%, #2a1810 80%, #0a0a0a 100%)",
    className: "md:col-span-4 md:h-[42vh] aspect-[4/3] md:aspect-auto",
  },
  {
    index: "04",
    client: "Drip Gen Z",
    type: "Cafe · Modern Coffee Bar",
    href: "https://techbuilderz.github.io/Drip-Gen-Z/",
    image:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1400&q=80",
    gradient:
      "radial-gradient(circle at 50% 30%, #ff6b9d 0%, #7a2a4a 40%, #1a0a1a 85%, #0a0a0a 100%)",
    className: "md:col-span-4 md:h-[42vh] aspect-[4/3] md:aspect-auto",
  },
  {
    index: "05",
    client: "Retro Rewind Hub",
    type: "Cafe · Retro Coffee House",
    href: "https://techbuilderz.github.io/Retro-Rewind-Hub/",
    image:
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1400&q=80",
    gradient:
      "radial-gradient(circle at 40% 50%, #d4a04a 0%, #6a4520 40%, #2a1a10 85%, #0a0a0a 100%)",
    className: "md:col-span-4 md:h-[42vh] aspect-[4/3] md:aspect-auto",
  },
  {
    index: "06",
    client: "Bloom Art Nouveau",
    type: "Cafe · Art Nouveau Lounge",
    href: "https://techbuilderz.github.io/Bloom-Art-Nouveau/",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1400&q=80",
    gradient:
      "radial-gradient(circle at 50% 40%, #8aa888 0%, #3a5a40 40%, #1a2a1a 85%, #0a0a0a 100%)",
    className: "md:col-span-6 md:h-[50vh] aspect-[16/10] md:aspect-auto",
  },
  {
    index: "07",
    client: "Forge Cafe",
    type: "Cafe · Artisan Roastery",
    href: "https://techbuilderz.github.io/Forge-Cafe/",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=80",
    gradient:
      "radial-gradient(circle at 50% 50%, #c87a3a 0%, #6a3a20 40%, #2a1810 85%, #0a0a0a 100%)",
    className: "md:col-span-6 md:h-[50vh] aspect-[16/10] md:aspect-auto",
  },
  {
    index: "08",
    client: "Forma Studio",
    type: "Architecture · Interiors · Urbanism",
    href: "https://techbuilderz.github.io/forma-studio/",
    image: "/work/forma-studio.jpg",
    gradient:
      "radial-gradient(circle at 45% 35%, #d8d4cc 0%, #6a6660 35%, #2a2826 80%, #0a0a0a 100%)",
    className: "md:col-span-6 md:h-[50vh] aspect-[16/10] md:aspect-auto",
  },
];

export default function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            delay: (i % 4) * 0.12,
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
      id="work"
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
          03
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
          Selected Work
        </p>
        <div className="mt-5 flex items-end justify-between flex-wrap gap-6">
          <h2
            className="font-display text-[var(--fg)]"
            style={{ fontSize: "clamp(56px, 8vw, 140px)" }}
          >
            Recent <span className="font-editorial italic">launches.</span>
          </h2>
          <a
            href="https://techbuilderz.in/"
            target="_blank"
            rel="noopener noreferrer"
            data-hover
            className="link-underline"
            style={{
              fontSize: 12,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "var(--fg)",
              fontFamily: "var(--font-space), sans-serif",
            }}
          >
            View all →
          </a>
        </div>
        <div className="mt-8" style={{ height: 1, background: "var(--line)" }} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
        {cases.map((c, i) => (
          <a
            key={c.client}
            ref={(el) => {
              cardsRef.current[i] = el;
            }}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-view
            className={`relative group cursor-none block ${c.className}`}
          >
            <div className="relative w-full h-full overflow-hidden">
              {/* Fallback gradient — visible while screenshot loads */}
              <div
                className="absolute inset-0"
                style={{ background: c.gradient }}
              />

              {/* Project image */}
              <img
                src={c.image}
                alt={`${c.client} preview`}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                style={{
                  objectPosition: "center",
                }}
                onError={(e) => {
                  // Hide image if it fails — gradient remains visible
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />

              {/* Tint to keep text readable + brand-feel */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none transition-opacity duration-700 group-hover:opacity-40"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(10,10,10,0.25) 0%, rgba(10,10,10,0.0) 30%, rgba(10,10,10,0.5) 70%, rgba(10,10,10,0.92) 100%)",
                  opacity: 0.9,
                }}
              />

              {/* Top meta */}
              <div className="absolute top-5 left-5 right-5 flex items-start justify-between text-[var(--fg)]">
                <span
                  className="px-2 py-1"
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.32em",
                    textTransform: "uppercase",
                    fontFamily: "var(--font-space), sans-serif",
                    background: "rgba(10,10,10,0.55)",
                    backdropFilter: "blur(6px)",
                    WebkitBackdropFilter: "blur(6px)",
                  }}
                >
                  {`/ ${c.index} — 0${cases.length}`}
                </span>
                <span
                  className="font-display"
                  style={{
                    fontSize: c.feature ? 60 : 38,
                    color: "var(--accent)",
                    lineHeight: 1,
                    letterSpacing: "0.04em",
                    textShadow: "0 2px 12px rgba(10,10,10,0.6)",
                  }}
                >
                  {c.index}
                </span>
              </div>

              {/* Bottom info */}
              <div className="absolute bottom-5 left-5 right-5 text-[var(--fg)]">
                <h3
                  className="font-display"
                  style={{
                    fontSize: c.feature
                      ? "clamp(40px, 5.5vw, 88px)"
                      : "clamp(24px, 2.8vw, 44px)",
                    letterSpacing: "0.01em",
                    lineHeight: 0.95,
                    textShadow: "0 2px 16px rgba(10,10,10,0.6)",
                  }}
                >
                  {c.client.toUpperCase()}
                </h3>
                <span
                  className="absolute -bottom-2 left-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    height: 1,
                    width: 120,
                    background: "var(--accent)",
                  }}
                />
                <div className="mt-4 flex items-center justify-between">
                  <span
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.28em",
                      textTransform: "uppercase",
                      color: "var(--fg)",
                      opacity: 0.85,
                      fontFamily: "var(--font-space), sans-serif",
                      textShadow: "0 1px 6px rgba(10,10,10,0.6)",
                    }}
                  >
                    {c.type}
                  </span>
                  <span
                    className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-700"
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.32em",
                      textTransform: "uppercase",
                      color: "var(--accent)",
                      fontFamily: "var(--font-space), sans-serif",
                    }}
                  >
                    Live site ↗
                  </span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
