
import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Kind = "web" | "mobile" | "saas" | "design" | "ai" | "cloud";

const services: {
  num: string;
  title: string;
  blurb: string;
  bullets: string[];
  kind: Kind;
}[] = [
  {
    num: "S/01",
    title: "Web Development",
    blurb:
      "Lightning-fast websites and web apps in React, Next.js and TypeScript.",
    bullets: ["Next.js · React", "TypeScript", "SEO-safe SSR"],
    kind: "web",
  },
  {
    num: "S/02",
    title: "Mobile Apps",
    blurb:
      "Native-feel iOS and Android products built in Flutter and React Native.",
    bullets: ["Flutter", "React Native", "App Store ready"],
    kind: "mobile",
  },
  {
    num: "S/03",
    title: "SaaS Platforms",
    blurb:
      "Multi-tenant dashboards, billing, auth and analytics built for scale.",
    bullets: ["Multi-tenant", "Billing & auth", "Analytics-first"],
    kind: "saas",
  },
  {
    num: "S/04",
    title: "UI / UX Design",
    blurb:
      "Brand-led product design and motion systems that turn visitors into customers.",
    bullets: ["Design systems", "Motion", "Conversion-focused"],
    kind: "design",
  },
  {
    num: "S/05",
    title: "AI Integrations",
    blurb:
      "Embed LLMs, RAG and AI agents into your product securely and reliably.",
    bullets: ["LLM & RAG", "AI agents", "Secure by default"],
    kind: "ai",
  },
  {
    num: "S/06",
    title: "Cloud & DevOps",
    blurb:
      "CI/CD pipelines, AWS/GCP infrastructure and observability for dependable releases.",
    bullets: ["AWS / GCP", "CI/CD", "Observability"],
    kind: "cloud",
  },
];

// ────────────────────────────────────────────────────────────────────────
// 3D mini-models — each represents the service rather than an abstract shape
// ────────────────────────────────────────────────────────────────────────

const SCREEN_EMISSIVE = 0.55;

function BrowserModel() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.45;
  });
  return (
    <group ref={ref} rotation={[0.18, 0, 0]}>
      {/* Frame */}
      <mesh>
        <boxGeometry args={[1.6, 1.05, 0.08]} />
        <meshStandardMaterial color="#181818" metalness={0.5} roughness={0.4} />
      </mesh>
      {/* Screen */}
      <mesh position={[0, -0.06, 0.045]}>
        <planeGeometry args={[1.52, 0.82]} />
        <meshStandardMaterial
          color="#f5f1ea"
          emissive="#f5f1ea"
          emissiveIntensity={SCREEN_EMISSIVE}
          toneMapped={false}
        />
      </mesh>
      {/* Top bar */}
      <mesh position={[0, 0.43, 0.046]}>
        <planeGeometry args={[1.52, 0.14]} />
        <meshStandardMaterial color="#0d0c0b" />
      </mesh>
      {/* Traffic dots */}
      {[
        { x: -0.68, c: "#ff5b1a" },
        { x: -0.58, c: "#ffcf3a" },
        { x: -0.48, c: "#4cd964" },
      ].map((d, i) => (
        <mesh key={i} position={[d.x, 0.43, 0.05]}>
          <circleGeometry args={[0.028, 24]} />
          <meshStandardMaterial
            color={d.c}
            emissive={d.c}
            emissiveIntensity={0.7}
            toneMapped={false}
          />
        </mesh>
      ))}
      {/* URL bar */}
      <mesh position={[0.15, 0.43, 0.05]}>
        <planeGeometry args={[0.85, 0.06]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
      {/* Content lines */}
      {[
        { y: 0.18, w: 0.95, c: "#ff5b1a" },
        { y: 0.04, w: 0.7, c: "#7a7570" },
        { y: -0.1, w: 0.85, c: "#7a7570" },
        { y: -0.24, w: 0.55, c: "#7a7570" },
      ].map((l, i) => (
        <mesh key={i} position={[-0.22, l.y, 0.05]}>
          <planeGeometry args={[l.w, 0.04]} />
          <meshStandardMaterial color={l.c} />
        </mesh>
      ))}
    </group>
  );
}

function PhoneModel() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.5;
  });
  return (
    <group ref={ref} rotation={[0.1, 0.3, 0]} scale={1.05}>
      {/* Body */}
      <mesh>
        <boxGeometry args={[0.72, 1.45, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.25} />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 0, 0.052]}>
        <planeGeometry args={[0.64, 1.36]} />
        <meshStandardMaterial
          color="#ff5b1a"
          emissive="#ff5b1a"
          emissiveIntensity={SCREEN_EMISSIVE}
          toneMapped={false}
        />
      </mesh>
      {/* Notch */}
      <mesh position={[0, 0.62, 0.054]}>
        <planeGeometry args={[0.24, 0.05]} />
        <meshStandardMaterial color="#0a0a0a" />
      </mesh>
      {/* App grid */}
      {[0.32, 0.18, 0.04, -0.1, -0.24, -0.38].map((y, row) =>
        [-0.18, 0, 0.18].map((x, col) => (
          <mesh key={`${row}-${col}`} position={[x, y, 0.055]}>
            <planeGeometry args={[0.12, 0.12]} />
            <meshStandardMaterial
              color={(row + col) % 2 === 0 ? "#f5f1ea" : "#ffe9d6"}
              emissive={(row + col) % 2 === 0 ? "#f5f1ea" : "#ffe9d6"}
              emissiveIntensity={0.5}
              toneMapped={false}
            />
          </mesh>
        ))
      )}
      {/* Home indicator */}
      <mesh position={[0, -0.62, 0.054]}>
        <planeGeometry args={[0.18, 0.022]} />
        <meshStandardMaterial color="#0a0a0a" />
      </mesh>
    </group>
  );
}

function DashboardModel() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.4;
  });
  // Bar chart heights (variable for charm)
  const bars = [0.18, 0.36, 0.24, 0.5, 0.32, 0.42];
  return (
    <group ref={ref} rotation={[0.15, 0, 0]}>
      {/* Monitor frame */}
      <mesh>
        <boxGeometry args={[1.7, 1.0, 0.08]} />
        <meshStandardMaterial color="#181818" metalness={0.5} roughness={0.35} />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 0, 0.045]}>
        <planeGeometry args={[1.6, 0.92]} />
        <meshStandardMaterial
          color="#f5f1ea"
          emissive="#f5f1ea"
          emissiveIntensity={SCREEN_EMISSIVE}
          toneMapped={false}
        />
      </mesh>
      {/* Top stat row */}
      {[-0.55, -0.2, 0.15, 0.55].map((x, i) => (
        <group key={i} position={[x, 0.32, 0.05]}>
          <mesh>
            <planeGeometry args={[0.3, 0.18]} />
            <meshStandardMaterial color="#ffe9d6" />
          </mesh>
          <mesh position={[0, 0.04, 0.001]}>
            <planeGeometry args={[0.16, 0.04]} />
            <meshStandardMaterial color="#ff5b1a" />
          </mesh>
        </group>
      ))}
      {/* Bar chart */}
      {bars.map((h, i) => (
        <mesh
          key={i}
          position={[-0.65 + i * 0.26, -0.18 + h / 2, 0.05]}
        >
          <planeGeometry args={[0.16, h]} />
          <meshStandardMaterial
            color={i === 3 ? "#ff5b1a" : "#0d0c0b"}
            emissive={i === 3 ? "#ff5b1a" : "#000"}
            emissiveIntensity={i === 3 ? 0.4 : 0}
          />
        </mesh>
      ))}
      {/* X-axis line */}
      <mesh position={[0, -0.2, 0.05]}>
        <planeGeometry args={[1.5, 0.005]} />
        <meshStandardMaterial color="#7a7570" />
      </mesh>
      {/* Stand */}
      <mesh position={[0, -0.62, 0]}>
        <boxGeometry args={[0.35, 0.08, 0.08]} />
        <meshStandardMaterial color="#181818" metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[0.06, 0.16, 0.06]} />
        <meshStandardMaterial color="#181818" metalness={0.5} roughness={0.4} />
      </mesh>
    </group>
  );
}

function DesignLayersModel() {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.4) * 0.35;
    ref.current.rotation.x = 0.4;
  });
  // Stack of 3 cards, slightly offset
  const cards = [
    { z: -0.18, x: -0.14, y: -0.1, c: "#5a5550", e: 0 },
    { z: 0, x: 0, y: 0, c: "#ffe9d6", e: 0.3 },
    { z: 0.18, x: 0.14, y: 0.1, c: "#ff5b1a", e: 0.55 },
  ];
  return (
    <group ref={ref}>
      {cards.map((c, i) => (
        <group key={i} position={[c.x, c.y, c.z]}>
          {/* Card body */}
          <mesh>
            <boxGeometry args={[1.05, 1.35, 0.04]} />
            <meshStandardMaterial
              color={c.c}
              emissive={c.c}
              emissiveIntensity={c.e}
              metalness={0.2}
              roughness={0.5}
              toneMapped={false}
            />
          </mesh>
          {/* Frame element */}
          {i === 2 && (
            <>
              <mesh position={[0, 0.45, 0.025]}>
                <planeGeometry args={[0.85, 0.38]} />
                <meshStandardMaterial color="#0d0c0b" />
              </mesh>
              <mesh position={[-0.2, -0.05, 0.025]}>
                <planeGeometry args={[0.5, 0.045]} />
                <meshStandardMaterial color="#0d0c0b" />
              </mesh>
              <mesh position={[-0.32, -0.18, 0.025]}>
                <planeGeometry args={[0.25, 0.045]} />
                <meshStandardMaterial color="#0d0c0b" />
              </mesh>
              <mesh position={[0, -0.45, 0.025]}>
                <planeGeometry args={[0.55, 0.1]} />
                <meshStandardMaterial color="#0d0c0b" />
              </mesh>
            </>
          )}
        </group>
      ))}
    </group>
  );
}

function AIChipModel() {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.5;
    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.8;
      coreRef.current.rotation.y += delta * 1.0;
    }
  });
  // Chip pin positions on 4 sides
  const pins: { x: number; y: number; z: number }[] = [];
  for (let i = 0; i < 6; i++) {
    const o = -0.5 + i * 0.2;
    pins.push({ x: o, y: 0, z: 0.62 });
    pins.push({ x: o, y: 0, z: -0.62 });
    pins.push({ x: 0.62, y: 0, z: o });
    pins.push({ x: -0.62, y: 0, z: o });
  }
  return (
    <group ref={groupRef} rotation={[0.4, 0, 0]}>
      {/* Chip base */}
      <mesh>
        <boxGeometry args={[1.2, 0.12, 1.2]} />
        <meshStandardMaterial color="#0d0c0b" metalness={0.7} roughness={0.4} />
      </mesh>
      {/* Top etched square */}
      <mesh position={[0, 0.07, 0]}>
        <boxGeometry args={[0.85, 0.005, 0.85]} />
        <meshStandardMaterial color="#ff5b1a" emissive="#ff5b1a" emissiveIntensity={0.35} />
      </mesh>
      {/* Pins */}
      {pins.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z]}>
          <boxGeometry args={[0.06, 0.05, 0.08]} />
          <meshStandardMaterial color="#c0a070" metalness={0.9} roughness={0.3} />
        </mesh>
      ))}
      {/* Floating intelligence core */}
      <mesh ref={coreRef} position={[0, 0.55, 0]}>
        <icosahedronGeometry args={[0.32, 0]} />
        <meshStandardMaterial
          color="#ff5b1a"
          emissive="#ff5b1a"
          emissiveIntensity={0.6}
          wireframe
        />
      </mesh>
      {/* Connector beam */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.4, 8]} />
        <meshStandardMaterial
          color="#ff5b1a"
          emissive="#ff5b1a"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
}

function CloudServerModel() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.4;
  });
  const racks = [0, 1, 2, 3];
  return (
    <group ref={ref} rotation={[0.15, 0.3, 0]}>
      {racks.map((i) => (
        <group key={i} position={[0, 0.5 - i * 0.34, 0]}>
          {/* Server unit body */}
          <mesh>
            <boxGeometry args={[1.2, 0.28, 0.55]} />
            <meshStandardMaterial color="#181818" metalness={0.6} roughness={0.3} />
          </mesh>
          {/* Front face accent */}
          <mesh position={[0, 0, 0.276]}>
            <planeGeometry args={[1.18, 0.26]} />
            <meshStandardMaterial color="#0a0a0a" />
          </mesh>
          {/* LED indicators */}
          {[-0.5, -0.4, -0.3].map((x, k) => (
            <mesh key={k} position={[x, 0.04, 0.278]}>
              <circleGeometry args={[0.018, 16]} />
              <meshStandardMaterial
                color={k === 0 ? "#ff5b1a" : k === 1 ? "#ffcf3a" : "#4cd964"}
                emissive={k === 0 ? "#ff5b1a" : k === 1 ? "#ffcf3a" : "#4cd964"}
                emissiveIntensity={0.9}
                toneMapped={false}
              />
            </mesh>
          ))}
          {/* Drive slots */}
          {[-0.05, 0.15, 0.35].map((x, k) => (
            <mesh key={k} position={[x, 0, 0.278]}>
              <planeGeometry args={[0.16, 0.16]} />
              <meshStandardMaterial color="#2a2a2a" metalness={0.4} roughness={0.5} />
            </mesh>
          ))}
        </group>
      ))}
      {/* Base */}
      <mesh position={[0, -0.85, 0]}>
        <boxGeometry args={[1.3, 0.04, 0.65]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.5} roughness={0.4} />
      </mesh>
    </group>
  );
}

function ServiceModel({ kind }: { kind: Kind }) {
  switch (kind) {
    case "web":
      return <BrowserModel />;
    case "mobile":
      return <PhoneModel />;
    case "saas":
      return <DashboardModel />;
    case "design":
      return <DesignLayersModel />;
    case "ai":
      return <AIChipModel />;
    case "cloud":
      return <CloudServerModel />;
  }
}

function ServiceCanvas({ kind }: { kind: Kind }) {
  return (
    <Canvas
      camera={{ position: [0, 0.1, 2.7], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 3, 3]} intensity={1.0} />
      <pointLight position={[-2, -1, 2]} intensity={0.7} color="#ff5b1a" />
      <pointLight position={[2, 2, -2]} intensity={0.4} color="#4cb8ff" />
      <ServiceModel kind={kind} />
    </Canvas>
  );
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.0,
            ease: "power3.out",
            delay: i * 0.08,
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative w-full px-6 md:px-12 py-32 md:py-40"
      style={{ background: "var(--bg)" }}
    >
      <div className="relative mb-16 md:mb-20">
        <span
          aria-hidden
          className="absolute -top-10 -left-2 font-display select-none pointer-events-none"
          style={{
            fontSize: "clamp(120px, 18vw, 240px)",
            color: "var(--fg-muted)",
            opacity: 0.08,
          }}
        >
          02
        </span>
        <p
          style={{
            fontFamily: "var(--font-space), sans-serif",
            fontSize: 11,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "var(--accent)",
          }}
        >
          Services
        </p>
        <h2
          className="font-display text-[var(--fg)] mt-5"
          style={{ fontSize: "clamp(56px, 8vw, 140px)" }}
        >
          What we <span className="font-editorial italic">make.</span>
        </h2>
        <p
          className="mt-6 max-w-xl"
          style={{ fontSize: 15, color: "var(--fg-muted)", lineHeight: 1.7 }}
        >
          Six disciplines, one studio. Pick a single capability or hand us the
          whole stack — we ship either way.
        </p>
        <div className="mt-8" style={{ height: 1, background: "var(--line)" }} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {services.map((s, i) => (
          <div
            key={s.num}
            ref={(el) => {
              cardsRef.current[i] = el;
            }}
            data-hover
            className="svc-card group"
            style={{ background: "var(--bg-2)" }}
          >
            <div className="relative grid grid-cols-1 md:grid-cols-[1fr_220px] gap-6 p-7 md:p-10">
              <div className="flex flex-col">
                <span
                  style={{
                    fontFamily: "var(--font-space), sans-serif",
                    fontSize: 11,
                    letterSpacing: "0.32em",
                    textTransform: "uppercase",
                    color: "var(--fg-muted)",
                  }}
                >
                  {s.num}
                </span>
                <h3
                  className="font-display mt-3 text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors duration-500"
                  style={{
                    fontSize: "clamp(36px, 4.5vw, 64px)",
                    letterSpacing: "0.01em",
                  }}
                >
                  {s.title}
                </h3>
                <p
                  className="mt-4 max-w-md"
                  style={{
                    fontSize: 14,
                    color: "var(--fg-muted)",
                    lineHeight: 1.7,
                  }}
                >
                  {s.blurb}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {s.bullets.map((b) => (
                    <li
                      key={b}
                      style={{
                        fontSize: 11,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "var(--fg)",
                        padding: "0.4rem 0.7rem",
                        border: "1px solid var(--line)",
                        fontFamily: "var(--font-space), sans-serif",
                      }}
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="relative w-full h-[200px] md:h-full md:min-h-[200px] md:w-[220px]"
                style={{ background: "transparent" }}
              >
                <ServiceCanvas kind={s.kind} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
