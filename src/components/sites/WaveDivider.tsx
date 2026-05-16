import { useEffect, useRef } from "react";

export function WaveDivider({ flip = false }: { flip?: boolean }) {
  const path = useRef<SVGPathElement>(null);
  useEffect(() => {
    let raf = 0; const start = performance.now();
    const loop = () => {
      const t = (performance.now() - start) / 1000;
      const pts: string[] = [];
      for (let i = 0; i <= 20; i++) {
        const x = (i / 20) * 1440;
        const y = 60 + Math.sin(i * 0.5 + t) * 18 + Math.cos(i * 0.3 + t * 1.2) * 10;
        pts.push(`${i === 0 ? "M" : "L"}${x},${y}`);
      }
      path.current?.setAttribute("d", `${pts.join(" ")} L1440,120 L0,120 Z`);
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <svg viewBox="0 0 1440 120" className={`block h-16 w-full ${flip ? "rotate-180" : ""}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="wg" x1="0" x2="1">
          <stop offset="0%" stopColor="var(--neon-blue)" stopOpacity="0.4" />
          <stop offset="50%" stopColor="var(--neon-violet)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--neon-cyan)" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <path ref={path} fill="url(#wg)" />
    </svg>
  );
}
