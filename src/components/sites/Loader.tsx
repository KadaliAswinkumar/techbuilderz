import { useEffect, useState } from "react";

export function Loader() {
  const [p, setP] = useState(0);
  const [done, setDone] = useState(false);
  useEffect(() => {
    let v = 0;
    const id = setInterval(() => {
      v = Math.min(100, v + Math.random() * 12 + 4);
      setP(v);
      if (v >= 100) { clearInterval(id); setTimeout(() => setDone(true), 400); }
    }, 90);
    return () => clearInterval(id);
  }, []);
  return (
    <div className={`fixed inset-0 z-[300] flex flex-col items-center justify-center bg-background transition-opacity duration-700 ${done ? "pointer-events-none opacity-0" : "opacity-100"}`}>
      <div className="relative h-24 w-24" style={{ perspective: 800 }}>
        <div className="absolute inset-0 animate-spin rounded-2xl bg-gradient-primary opacity-80 shadow-glow" style={{ animationDuration: "2s" }} />
        <div className="absolute inset-2 rounded-xl bg-background" />
        <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-gradient">N</div>
      </div>
      <div className="mt-10 h-[2px] w-64 overflow-hidden rounded-full bg-white/10">
        <div className="h-full bg-gradient-primary transition-all duration-200" style={{ width: `${p}%` }} />
      </div>
      <div className="mt-3 font-mono text-xs tracking-widest text-muted-foreground">{Math.floor(p)}%  LOADING EXPERIENCE</div>
    </div>
  );
}
