import { useEffect, useRef } from "react";

export function MagneticCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    let mx = 0, my = 0, rx = 0, ry = 0, raf = 0;
    let hovering = false;
    const move = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const onHoverIn = () => { hovering = true; };
    const onHoverOut = () => { hovering = false; };
    const loop = () => {
      rx += (mx - rx) * 0.15; ry += (my - ry) * 0.15;
      if (dot.current) dot.current.style.transform = `translate3d(${mx - 4}px, ${my - 4}px, 0)`;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx - 20}px, ${ry - 20}px, 0) scale(${hovering ? 1.35 : 1})`;
      }
      if (label.current) {
        label.current.style.transform = `translate3d(${rx - 16}px, ${ry - 8}px, 0)`;
        label.current.style.opacity = hovering ? "1" : "0";
      }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move);
    const targets = document.querySelectorAll("a, button");
    targets.forEach((t) => {
      t.addEventListener("mouseenter", onHoverIn);
      t.addEventListener("mouseleave", onHoverOut);
    });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", move);
      targets.forEach((t) => {
        t.removeEventListener("mouseenter", onHoverIn);
        t.removeEventListener("mouseleave", onHoverOut);
      });
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <>
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[220] h-10 w-10 rounded-full border transition-transform duration-150"
        style={{ borderColor: "#00BFFF", boxShadow: "0 0 24px rgba(0,191,255,0.7)" }}
      />
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[221] h-2 w-2 rounded-full"
        style={{ backgroundColor: "#00BFFF", boxShadow: "0 0 10px rgba(0,191,255,0.95)" }}
      />
      <div
        ref={label}
        className="pointer-events-none fixed left-0 top-0 z-[222] text-[10px] font-semibold uppercase tracking-[0.15em] text-white transition-opacity duration-150"
      >
        VIEW
      </div>
    </>
  );
}
