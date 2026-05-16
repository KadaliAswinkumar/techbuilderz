import { useEffect, useRef } from "react";
import VanillaTilt from "vanilla-tilt";

export function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    VanillaTilt.init(ref.current, { max: 12, speed: 600, glare: true, "max-glare": 0.25 });
    return () => (ref.current as any)?.vanillaTilt?.destroy();
  }, []);
  return <div ref={ref} className={className} style={{ transformStyle: "preserve-3d" }}>{children}</div>;
}
