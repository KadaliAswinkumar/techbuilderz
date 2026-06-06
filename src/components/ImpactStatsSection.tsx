
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IMPACT_STATS } from "@/lib/seo-meta";

export default function ImpactStatsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      IMPACT_STATS.forEach((stat, i) => {
        const el = sectionRef.current?.querySelector(
          `[data-stat-index="${i}"]`,
        ) as HTMLElement | null;
        if (!el) return;

        const target = Number(el.dataset.target ?? stat.target);
        const suffix = el.dataset.suffix ?? "";
        const pad = Number(el.dataset.pad ?? 0);
        const obj = { v: 0 };

        gsap.to(obj, {
          v: target,
          duration: 2.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
          onUpdate: () => {
            const n = Math.floor(obj.v);
            const text =
              pad > 0 ? String(n).padStart(pad, "0") : String(n);
            el.textContent = `${text}${suffix}`;
          },
          onComplete: () => {
            el.textContent = stat.value + suffix;
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="relative w-full px-6 md:px-12 py-32 md:py-40"
      style={{ background: "var(--bg-2)" }}
    >
      <div className="relative mb-16 md:mb-20 max-w-6xl mx-auto">
        <p
          style={{
            fontFamily: "var(--font-space), sans-serif",
            fontSize: 11,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "var(--accent)",
          }}
        >
          Impact
        </p>
        <h2
          className="font-display text-[var(--fg)] mt-5"
          style={{ fontSize: "clamp(48px, 7vw, 120px)" }}
        >
          Numbers that <span className="font-editorial italic">move.</span>
        </h2>
        <div className="mt-8" style={{ height: 1, background: "var(--line)" }} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
        {IMPACT_STATS.map((stat, i) => (
          <div
            key={stat.label}
            className="flex flex-col p-8 md:p-10 min-h-[180px] md:min-h-[200px]"
            style={{
              background: "var(--bg)",
              border: "1px solid var(--line)",
            }}
          >
            <span
              className="font-display text-[var(--fg)] block leading-none tabular-nums"
              data-stat-index={i}
              data-target={stat.target}
              data-suffix={stat.suffix}
              data-pad={stat.pad ?? 0}
              style={{
                fontSize: "clamp(40px, 5vw, 64px)",
                minHeight: "clamp(40px, 5vw, 64px)",
              }}
            >
              {stat.value}
              {stat.suffix}
            </span>
            <p
              className="mt-auto pt-4"
              style={{
                fontSize: 11,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "var(--fg-muted)",
                fontFamily: "var(--font-space), sans-serif",
                lineHeight: 1.4,
                minHeight: "2.8em",
              }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
