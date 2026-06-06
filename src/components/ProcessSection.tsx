
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const steps = [
  {
    n: "01",
    title: "Discover",
    summary: "Workshops, audits and roadmap.",
    desc: "We start with a working session — your goals, your users, your current product (or napkin sketch). You walk out with a written roadmap, scope, and timeline.",
    deliverable: "Roadmap + scope",
  },
  {
    n: "02",
    title: "Design",
    summary: "Brand, UX and motion prototypes.",
    desc: "Brand-led product design with motion baked in. You see real frames and prototypes, not mood boards — we agree on the look and feel before a line of production code is written.",
    deliverable: "Design + prototype",
  },
  {
    n: "03",
    title: "Build",
    summary: "Engineering with daily demos.",
    desc: "Disciplined engineering with weekly walkthroughs and a staging link from day one. React, Next.js, TypeScript, motion, 3D — whatever the project asks for, tuned to 60fps.",
    deliverable: "Staging + weekly demos",
  },
  {
    n: "04",
    title: "Launch",
    summary: "Ship, measure and iterate.",
    desc: "Domain, analytics, monitoring, search — all wired before we hand you the keys. We stay close for 30 days post-launch to fix, polish, and learn from real users.",
    deliverable: "Live site + 30-day support",
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const distance = () => track.scrollWidth - window.innerWidth;
      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
      style={{ background: "var(--bg-2)" }}
    >
      <div className="absolute top-0 left-0 right-0 z-20 px-6 md:px-12 pt-28 pb-10 md:pb-14">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <p
              style={{
                fontFamily: "var(--font-space), sans-serif",
                fontSize: 11,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "var(--accent)",
              }}
            >
              04 / Process
            </p>
            <h2
              className="font-display text-[var(--fg)] mt-4 mb-2"
              style={{ fontSize: "clamp(40px, 5vw, 72px)" }}
            >
              Four steps — <span className="font-editorial italic">no surprises.</span>
            </h2>
          </div>
          <span
            style={{
              fontSize: 11,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "var(--fg-muted)",
              fontFamily: "var(--font-space), sans-serif",
            }}
          >
            ← Scroll to advance →
          </span>
        </div>
      </div>

      <div
        ref={trackRef}
        className="absolute left-0 right-0 bottom-0 flex items-center will-change-transform"
        style={{
          width: `${steps.length * 100}vw`,
          top: "11.5rem",
        }}
      >
        {steps.map((s, i) => (
          <div
            key={s.n}
            className="relative w-screen flex items-center px-6 md:px-24"
            style={{
              height: "calc(100vh - 11.5rem)",
              borderLeft: i === 0 ? "none" : "1px solid var(--line)",
            }}
          >
            <span
              aria-hidden
              className="absolute font-display select-none pointer-events-none"
              style={{
                fontSize: "clamp(200px, 42vh, 520px)",
                color: "var(--fg-muted)",
                opacity: 0.055,
                bottom: "8%",
                right: "6%",
                lineHeight: 0.8,
                zIndex: 0,
              }}
            >
              {s.n}
            </span>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 w-full max-w-6xl mx-auto pt-4 md:pt-8">
              <div>
                <div className="flex items-center gap-4">
                  <span
                    style={{
                      width: 36,
                      height: 1,
                      background: "var(--accent)",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-space), sans-serif",
                      fontSize: 11,
                      letterSpacing: "0.32em",
                      textTransform: "uppercase",
                      color: "var(--accent)",
                    }}
                  >
                    Step {s.n}
                  </span>
                </div>
                <h3
                  className="font-display mt-6 text-[var(--fg)] relative z-[1]"
                  style={{
                    fontSize: "clamp(72px, 10vw, 180px)",
                    lineHeight: 0.9,
                  }}
                >
                  {s.title}
                </h3>
                <p
                  className="mt-6 font-editorial italic"
                  style={{
                    fontSize: 22,
                    color: "var(--fg-muted)",
                    lineHeight: 1.4,
                  }}
                >
                  {s.summary}
                </p>
              </div>

              <div className="flex flex-col gap-8 self-center">
                <p
                  style={{
                    fontSize: 17,
                    lineHeight: 1.7,
                    color: "var(--fg)",
                    maxWidth: 460,
                  }}
                >
                  {s.desc}
                </p>
                <div
                  className="flex flex-col gap-2 pt-6"
                  style={{ borderTop: "1px solid var(--line)" }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.32em",
                      textTransform: "uppercase",
                      color: "var(--fg-muted)",
                      fontFamily: "var(--font-space), sans-serif",
                    }}
                  >
                    You receive
                  </span>
                  <span
                    className="font-display text-[var(--fg)]"
                    style={{
                      fontSize: 28,
                      letterSpacing: "0.01em",
                    }}
                  >
                    {s.deliverable.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
