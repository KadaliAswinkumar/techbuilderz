import { useEffect, useRef } from "react";

export function MagneticCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0, raf = 0;
    const move = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const loop = () => {
      rx += (mx - rx) * 0.15; ry += (my - ry) * 0.15;
      if (dot.current) dot.current.style.transform = `translate3d(${mx - 4}px, ${my - 4}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx - 22}px, ${ry - 22}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);
  return (
    <>
      <div ref={ring} className="pointer-events-none fixed left-0 top-0 z-[200] h-11 w-11 rounded-full border border-primary/60 mix-blend-difference" style={{ boxShadow: "0 0 20px var(--neon-violet)" }} />
      <div ref={dot} className="pointer-events-none fixed left-0 top-0 z-[200] h-2 w-2 rounded-full bg-white" />
    </>
  );
}
