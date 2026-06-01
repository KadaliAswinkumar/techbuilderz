import { ArrowRight } from "lucide-react";

export function ExpeditionViewAllCard() {
  return (
    <div className="h-[340px] min-h-[340px] w-full">
      <a
        href="#contact"
        className="glass group relative flex h-full min-h-[340px] w-full flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-accent/40 bg-[rgba(20,24,45,0.85)] p-8 text-center transition-all duration-300 hover:border-accent hover:bg-[rgba(30,36,70,0.9)] hover:shadow-[0_0_48px_rgba(0,191,255,0.2)]"
        aria-label="View all work and contact us"
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[rgba(107,92,255,0.2)] via-transparent to-[rgba(0,229,255,0.15)]" />
        <div className="relative z-[1] flex flex-col items-center gap-5 px-4">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-accent">More work</div>
          <p className="max-w-[220px] text-sm leading-relaxed text-foreground/80">
            SaaS, cafes, AI products, and immersive web experiences from our studio.
          </p>
          <span className="shimmer glow-pulse inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground">
            View All
            <ArrowRight size={18} aria-hidden />
          </span>
        </div>
      </a>
    </div>
  );
}
