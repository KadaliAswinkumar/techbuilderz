
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Variant = "default" | "hover" | "view" | "drag";

export default function CustomCursor() {
  const [variant, setVariant] = useState<Variant>("default");
  const [visible, setVisible] = useState(false);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);

  const springX = useSpring(ringX, { stiffness: 90, damping: 18, mass: 0.6 });
  const springY = useSpring(ringY, { stiffness: 90, damping: 18, mass: 0.6 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!visible) setVisible(true);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
    };

    const findVariant = (el: Element | null): Variant => {
      while (el && el !== document.body) {
        if (el.hasAttribute("data-cursor-drag")) return "drag";
        if (el.hasAttribute("data-cursor-view")) return "view";
        const tag = el.tagName;
        if (
          tag === "A" ||
          tag === "BUTTON" ||
          tag === "INPUT" ||
          tag === "SELECT" ||
          tag === "TEXTAREA" ||
          el.hasAttribute("data-hover")
        )
          return "hover";
        el = el.parentElement;
      }
      return "default";
    };

    const onOver = (e: MouseEvent) => {
      setVariant(findVariant(e.target as Element));
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [dotX, dotY, ringX, ringY, visible]);

  const variants = {
    default: {
      width: 38,
      height: 38,
      borderRadius: 9999,
      backgroundColor: "rgba(245,241,234,0)",
      borderColor: "rgba(245,241,234,0.45)",
    },
    hover: {
      width: 64,
      height: 64,
      borderRadius: 9999,
      backgroundColor: "rgba(245,241,234,0.1)",
      borderColor: "rgba(245,241,234,0.5)",
    },
    view: {
      width: 110,
      height: 38,
      borderRadius: 9999,
      backgroundColor: "rgba(255,91,26,0.95)",
      borderColor: "rgba(255,91,26,1)",
    },
    drag: {
      width: 110,
      height: 38,
      borderRadius: 9999,
      backgroundColor: "rgba(245,241,234,0.95)",
      borderColor: "rgba(245,241,234,1)",
    },
  } as const;

  return (
    <>
      <motion.div
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          border: "1px solid",
          mixBlendMode: "difference",
          pointerEvents: "none",
          zIndex: 1000,
          opacity: visible ? 1 : 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-space), sans-serif",
          fontSize: 10,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "var(--bg)",
          fontWeight: 600,
        }}
        animate={variant}
        variants={variants}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
      >
        {variant === "view" ? "View" : variant === "drag" ? "Drag" : ""}
      </motion.div>

      <motion.div
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: 6,
          height: 6,
          borderRadius: 9999,
          background: "var(--accent)",
          pointerEvents: "none",
          zIndex: 1001,
          opacity: visible && variant === "default" ? 1 : 0,
          transition: "opacity 0.2s ease",
        }}
      />
    </>
  );
}
