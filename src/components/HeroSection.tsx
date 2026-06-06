
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { useLoader } from "@/lib/LoaderContext";
import { HERO_STATS } from "@/lib/site-config";
import { SceneEnvironment, ThreeCanvas } from "@/components/ThreeCanvas";

const EASE = [0.16, 1, 0.3, 1] as const;

function ChromeBlob({
  mouse,
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.12;
    ref.current.rotation.y += delta * 0.18;

    const tx = mouse.current.x * 0.7;
    const ty = -mouse.current.y * 0.5;
    ref.current.position.x += (tx - ref.current.position.x) * 0.04;
    ref.current.position.y += (ty - ref.current.position.y) * 0.04;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={ref}>
        <sphereGeometry args={[1.5, 196, 196]} />
        <MeshDistortMaterial
          color="#2e2e2e"
          metalness={0.95}
          roughness={0.12}
          envMapIntensity={2.2}
          distort={0.48}
          speed={1.8}
        />
      </mesh>
    </Float>
  );
}

function OrbitingShard({
  radius,
  speed,
  size,
  yOffset,
}: {
  radius: number;
  speed: number;
  size: number;
  yOffset: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * speed;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
    ref.current.position.y = yOffset + Math.sin(t * 1.4) * 0.2;
    ref.current.rotation.x = t * 0.6;
    ref.current.rotation.y = t * 0.4;
  });
  return (
    <mesh ref={ref}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial
        color="#ff5b1a"
        metalness={0.8}
        roughness={0.2}
        emissive="#ff5b1a"
        emissiveIntensity={0.45}
      />
    </mesh>
  );
}

export default function HeroSection() {
  const mouse = useRef({ x: 0, y: 0 });
  const { loaded } = useLoader();

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // 4 lines for headline
  const lines = [
    { text: "BEYOND THE", italic: false, accent: false },
    { text: "interface.", italic: true, accent: false },
    { text: "CRAFTING", italic: false, accent: false },
    { text: "TOMORROW.", italic: false, accent: true },
  ];

  return (
    <section
      id="top"
      className="relative w-full min-h-[100svh] overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Canvas backdrop */}
      <div className="absolute inset-0 z-0 min-h-[100svh] h-full w-full">
        <ThreeCanvas
          camera={{ position: [0, 0, 5], fov: 42 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.45} />
          <directionalLight position={[5, 5, 5]} intensity={1.1} />
          <pointLight position={[-4, 2, 3]} intensity={1.6} color="#ff5b1a" />
          <pointLight position={[4, -2, 2]} intensity={1.0} color="#4cb8ff" />
          <SceneEnvironment />
          <ChromeBlob mouse={mouse} />
          <OrbitingShard radius={2.6} speed={0.4} size={0.22} yOffset={0.6} />
          <OrbitingShard radius={2.9} speed={-0.3} size={0.16} yOffset={-0.4} />
          <OrbitingShard radius={2.3} speed={0.6} size={0.12} yOffset={-1.0} />
        </ThreeCanvas>
      </div>

      {/* Vignette overlay */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(10,10,10,0) 40%, rgba(10,10,10,0.55) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col w-full min-h-[100svh] pt-32 md:pt-40 px-6 md:px-12 pb-12">
        {/* Top meta row */}
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.0, ease: EASE, delay: 0.4 }}
            className="flex items-center gap-3"
          >
            <span
              style={{
                width: 28,
                height: 1,
                background: "var(--accent)",
              }}
            />
            <span
              style={{
                fontSize: 11,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "var(--fg-muted)",
                fontFamily: "var(--font-space), sans-serif",
              }}
            >
              Creative Studio · Est. 2026 · Hyderabad, India
            </span>
          </motion.div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={loaded ? { opacity: 1 } : {}}
            transition={{ duration: 1.0, ease: EASE, delay: 0.6 }}
            className="hidden md:inline"
            style={{
              fontSize: 11,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "var(--fg-muted)",
              fontFamily: "var(--font-space), sans-serif",
            }}
          >
            (01) Hero
          </motion.span>
        </div>

        {/* Hero headline */}
        <div className="flex-1 flex items-center mt-12 md:mt-0">
          <div className="w-full max-w-7xl">
            <h1
              className="font-display"
              style={{
                fontSize: "clamp(64px, 12.5vw, 220px)",
                lineHeight: 0.85,
                letterSpacing: "0.005em",
              }}
            >
              {lines.map((line, i) => (
                <span key={i} className="block overflow-hidden">
                  <motion.span
                    initial={{ y: 200, opacity: 0 }}
                    animate={loaded ? { y: 0, opacity: 1 } : {}}
                    transition={{
                      duration: 1.2,
                      ease: EASE,
                      delay: 0.2 + i * 0.1,
                    }}
                    className="block"
                    style={{
                      color: line.accent ? "var(--accent)" : "var(--fg)",
                      fontStyle: line.italic
                        ? ("italic" as const)
                        : ("normal" as const),
                      fontFamily: line.italic
                        ? "var(--font-instrument), serif"
                        : "var(--font-anton), sans-serif",
                      fontWeight: 400,
                      textTransform: line.italic ? "none" : "uppercase",
                    }}
                  >
                    {line.text}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.0, ease: EASE, delay: 1.0 }}
              className="mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8 max-w-5xl"
            >
              <p
                className="max-w-md font-editorial italic"
                style={{
                  fontSize: "clamp(18px, 2vw, 24px)",
                  color: "var(--fg-muted)",
                  lineHeight: 1.4,
                }}
              >
                We design and engineer immersive digital experiences at the
                intersection of 3D, motion, and storytelling.
              </p>

              <div className="flex items-center gap-4">
                <a href="#work" data-hover className="btn-brut">
                  Explore our work
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                    <path d="M9 1l4 4-4 4M0 5h13" stroke="currentColor" />
                  </svg>
                </a>
                <a href="#contact" data-hover className="btn-brut btn-brut-ghost">
                  Start project
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ duration: 1.0, ease: EASE, delay: 1.3 }}
          className="mt-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="flex items-end gap-8 md:gap-12">
            {HERO_STATS.map((s) => (
              <div
                key={s.label}
                className="flex flex-col gap-2 min-w-[5.5rem] md:min-w-[6.5rem]"
              >
                <span
                  className="font-display tabular-nums leading-none"
                  style={{
                    fontSize: "clamp(28px, 3vw, 44px)",
                    color: "var(--fg)",
                    minHeight: "clamp(28px, 3vw, 44px)",
                  }}
                >
                  {s.n}
                </span>
                <span
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: "var(--fg-muted)",
                    fontFamily: "var(--font-space), sans-serif",
                    lineHeight: 1.4,
                    minHeight: "2.8em",
                  }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 text-[var(--fg-muted)]">
            <span
              style={{
                fontSize: 11,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                fontFamily: "var(--font-space), sans-serif",
              }}
            >
              Scroll
            </span>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{
                duration: 1.6,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            >
              ↓
            </motion.span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
