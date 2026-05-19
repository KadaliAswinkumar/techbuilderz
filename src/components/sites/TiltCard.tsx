import { useEffect, useRef } from "react";
import VanillaTilt from "vanilla-tilt";

type TiltElement = HTMLDivElement & { vanillaTilt?: { destroy: () => void } };

export function TiltCard({
  children,
  className = "",
  glare = true,
}: {
  children: React.ReactNode;
  className?: string;
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarsePointer) return;

    VanillaTilt.init(el, {
      max: 12,
      speed: 600,
      glare,
      "max-glare": glare ? 0.18 : 0,
    });
    return () => (el as TiltElement).vanillaTilt?.destroy();
  }, [glare]);

  return (
    <div ref={ref} className={className} style={{ transformStyle: "preserve-3d" }}>
      {children}
    </div>
  );
}
