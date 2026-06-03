
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLoader } from "@/lib/LoaderContext";

const DUR = 2200;

export default function PageLoader() {
  const { loaded, setLoaded } = useLoader();
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DUR);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else
        setTimeout(() => {
          setLoaded(true);
          setTimeout(() => setShow(false), 1100);
        }, 180);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [setLoaded]);

  const percent = Math.floor(progress * 100);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          initial={{ y: 0 }}
          animate={{ y: loaded ? "-100vh" : 0 }}
          transition={{
            duration: 1.0,
            ease: [0.76, 0, 0.24, 1],
            delay: loaded ? 0.1 : 0,
          }}
          style={{
            position: "fixed",
            inset: 0,
            background: "var(--bg)",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "3rem",
          }}
        >
          <div className="flex items-baseline gap-3 md:gap-6 flex-wrap justify-center px-4">
            <motion.div
              initial={{ scale: 0.2, opacity: 0.2 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 2.0, ease: [0.16, 1, 0.3, 1] }}
              className="font-display"
              style={{
                fontSize: "clamp(48px, 11vw, 160px)",
                color: "var(--fg)",
                lineHeight: 0.85,
              }}
            >
              TECH
            </motion.div>
            <motion.div
              initial={{ scale: 0.2, opacity: 0.2 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 2.0, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="font-display"
              style={{
                fontSize: "clamp(48px, 11vw, 160px)",
                color: "var(--accent)",
                lineHeight: 0.85,
              }}
            >
              BUILDERZ
            </motion.div>
          </div>

          <div
            style={{
              width: "clamp(220px, 36vw, 480px)",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            <div
              style={{
                height: 1,
                width: "100%",
                background: "rgba(245,241,234,0.1)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "var(--accent)",
                  transformOrigin: "left",
                  transform: `scaleX(${progress})`,
                }}
              />
            </div>
            <div
              className="flex justify-between"
              style={{
                fontFamily: "var(--font-space), sans-serif",
                fontSize: 12,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "var(--fg-muted)",
              }}
            >
              <span>Rendering tomorrow</span>
              <span>{String(percent).padStart(3, "0")}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
