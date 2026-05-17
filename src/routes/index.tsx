import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Boxes, Sparkles, Palette, Package, Mail, Phone, Linkedin, MessageCircle, X, Send } from "lucide-react";
import { Hero3D } from "@/components/sites/Hero3D";
import { MagneticCursor } from "@/components/sites/Cursor";
import { Loader } from "@/components/sites/Loader";
import { Nav } from "@/components/sites/Nav";
import { WaveDivider } from "@/components/sites/WaveDivider";
import { TiltCard } from "@/components/sites/TiltCard";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TecH BuilderZ — Immersive Digital Experiences" },
      { name: "description", content: "Award-winning creative studio crafting next-generation 3D web experiences, motion design, and futuristic interfaces." },
      { property: "og:title", content: "TecH BuilderZ — Immersive Digital Experiences" },
      { property: "og:description", content: "Award-winning creative studio crafting next-generation 3D web experiences." },
    ],
  }),
  component: Index,
});

const HEADLINE = "Beyond the Interface.";
const SUB = "Crafting Tomorrow.";
const CONTACT_EMAIL = "kadaliaswinkumar@gmail.com";
const WHATSAPP_NUMBER = "+91 9398431573";
const WHATSAPP_LINK = "https://wa.me/919398431573";
const LINKEDIN_LINK = "https://www.linkedin.com/company/tech-builderz/";

const CHATBOT_RESPONSES: Record<string, string> = {
  services:
    "We help with product websites, branding, UI/UX, frontend engineering, and launch-ready SaaS experiences.",
  timeline:
    "Most projects are delivered in 2-6 weeks depending on scope, feedback cycles, and integrations.",
  pricing:
    "Pricing is based on requirements. Share your scope and we can provide a custom estimate quickly.",
  contact:
    `You can reach us at ${CONTACT_EMAIL} or WhatsApp ${WHATSAPP_NUMBER}.`,
};

function Index() {
  const horizontalRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{ role: "bot" | "user"; text: string }>>([
    {
      role: "bot",
      text: "Hi, I am TecH BuilderZ assistant. Ask about services, timeline, pricing, or contact.",
    },
  ]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Character reveal
      gsap.from(".reveal-char", {
        y: 80, opacity: 0, rotateX: -90, stagger: 0.03, duration: 1, ease: "expo.out", delay: 1.4,
      });
      gsap.from(".hero-sub", { y: 30, opacity: 0, duration: 1, delay: 2.2, ease: "expo.out" });
      gsap.from(".hero-cta", { scale: 0.6, opacity: 0, duration: 1, delay: 2.5, ease: "back.out(2)" });

      // Section fade-ups
      gsap.utils.toArray<HTMLElement>(".fade-up").forEach((el) => {
        gsap.from(el, {
          y: 80, opacity: 0, duration: 1.1, ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      // Horizontal scroll
      if (horizontalRef.current && trackRef.current) {
        const track = trackRef.current;
        const dist = () => track.scrollWidth - window.innerWidth;
        gsap.to(track, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: horizontalRef.current,
            start: "top top",
            end: () => `+=${dist()}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
      }

      // Counters
      ScrollTrigger.create({
        trigger: "#stats",
        start: "top 70%",
        once: true,
        onEnter: () => {
          const targets = [12, 2, 4, 12];
          targets.forEach((target, i) => {
            const obj = { v: 0 };
            gsap.to(obj, {
              v: target, duration: 2.4, ease: "power2.out",
              onUpdate: () => setCounts(prev => { const n = [...prev]; n[i] = Math.floor(obj.v); return n; }),
            });
          });
        },
      });

      // Parallax hero layers
      gsap.to(".par-fg", { yPercent: -20, ease: "none", scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".par-mg", { yPercent: -40, ease: "none", scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true } });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="grain relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Loader />
      <MagneticCursor />
      <Nav />

      {/* HERO */}
      <section id="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <div className="par-mg absolute inset-0">
          <Hero3D />
        </div>
        <div className="par-mg pointer-events-none absolute inset-0 bg-radial" />
        <div className="par-fg relative z-10 mx-auto max-w-5xl px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" /> Creative Studio · Est. 2026
          </div>
          <h1 className="text-balance text-6xl font-bold leading-[1.05] md:text-8xl">
            <span className="block">
              {HEADLINE.split("").map((c, i) => (
                <span key={i} className="reveal-char inline-block" style={{ transformOrigin: "bottom" }}>
                  {c === " " ? "\u00A0" : c}
                </span>
              ))}
            </span>
            <span className="mt-2 block text-gradient">
              {SUB.split("").map((c, i) => (
                <span key={i} className="reveal-char inline-block" style={{ transformOrigin: "bottom" }}>
                  {c === " " ? "\u00A0" : c}
                </span>
              ))}
            </span>
          </h1>
          <p className="hero-sub mx-auto mt-8 max-w-xl text-balance text-base text-muted-foreground md:text-lg">
            We design and engineer immersive digital experiences at the intersection of 3D, motion, and storytelling.
          </p>
          <div className="hero-cta mt-10 flex items-center justify-center gap-4">
            <button className="shimmer glow-pulse rounded-full bg-gradient-primary px-8 py-4 text-sm font-semibold text-primary-foreground">
              Explore Our Work
            </button>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          <div className="mb-2 h-10 w-px animate-pulse bg-gradient-to-b from-transparent via-foreground/40 to-transparent" />
          Scroll
        </div>
      </section>

      <WaveDivider />

      {/* HORIZONTAL FEATURES */}
      <section ref={horizontalRef} id="about" className="relative h-screen overflow-hidden">
        <div ref={trackRef} className="absolute left-0 top-0 flex h-full items-center gap-8 pl-[10vw]">
          <div className="w-[40vw] shrink-0">
            <div className="text-xs uppercase tracking-[0.3em] text-accent">/ Capabilities</div>
            <h2 className="mt-4 text-5xl font-bold leading-tight md:text-7xl">
              Built with <span className="text-gradient">obsessive</span> craft.
            </h2>
            <p className="mt-6 max-w-md text-muted-foreground">
              Four disciplines, one studio. We blend strategy, design, motion, and engineering into singular digital products.
            </p>
          </div>
          {[
            {
              t: "3D & WebGL",
              d: "Real-time graphics, generative geometry, and immersive scenes built on Three.js & WebGPU.",
              n: "01",
              icon: Boxes,
              img: "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?auto=format&fit=crop&w=1200&q=80",
            },
            {
              t: "Motion Systems",
              d: "Choreographed timelines, scroll narratives, and micro-interactions tuned to 60fps perfection.",
              n: "02",
              icon: Sparkles,
              img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80",
            },
            {
              t: "Brand Identity",
              d: "Typographic systems, kinetic logos, and editorial design that scales across surfaces.",
              n: "03",
              icon: Palette,
              img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80",
            },
            {
              t: "Product Engineering",
              d: "Performant React applications, design systems, and infrastructure for ambitious teams.",
              n: "04",
              icon: Package,
              img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
            },
          ].map((c) => (
            <TiltCard key={c.n} className="w-[28vw] shrink-0">
              <div className="glass relative h-[60vh] rounded-3xl p-8">
                <img
                  src={c.img}
                  alt={`${c.t} capability visual`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full rounded-3xl object-cover opacity-40 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-black/20 via-black/50 to-black/85" />
                <div className="font-mono text-xs text-accent">{c.n} / 04</div>
                <div className="mt-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-black/30 text-accent backdrop-blur">
                  <c.icon size={24} />
                </div>
                <div className="absolute inset-x-8 bottom-8 z-10">
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-foreground/30 to-transparent" />
                  <h3 className="mt-6 text-3xl font-semibold">{c.t}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{c.d}</p>
                </div>
                <div className="absolute right-8 top-8 h-16 w-16 rounded-full bg-gradient-primary opacity-30 blur-2xl" />
              </div>
            </TiltCard>
          ))}
          <div className="w-[10vw] shrink-0" />
        </div>
      </section>

      <WaveDivider flip />

      {/* STATS */}
      <section id="stats" className="relative py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="fade-up max-w-2xl">
            <div className="text-xs uppercase tracking-[0.3em] text-accent">/ Impact</div>
            <h2 className="mt-4 text-5xl font-bold md:text-6xl">Numbers that <span className="text-gradient">move</span>.</h2>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { v: counts[0], s: "", l: "Projects shipped" },
              { v: counts[1], s: "", l: "Awards won" },
              { v: counts[2], s: "", l: "Industries served" },
              { v: counts[3], s: "", l: "Client retention" },
            ].map((s, i) => (
              <div key={i} className="fade-up glass rounded-2xl p-8">
                <div className="text-5xl font-bold text-gradient md:text-6xl">{i === 1 ? String(s.v).padStart(2, "0") : s.v}{s.s}</div>
                <div className="mt-3 text-sm text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SHOWCASE GRID */}
      <section id="work" className="relative scroll-mt-28 py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="fade-up flex items-end justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-accent">/ Selected Work</div>
              <h2 className="mt-4 text-5xl font-bold md:text-6xl">Recent <span className="text-gradient">expeditions</span>.</h2>
            </div>
            <a href="#contact" className="hidden text-sm text-muted-foreground underline-offset-4 hover:underline md:block">Start your project →</a>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[
              {
                t: "Cloud Cost Optimiser",
                c: "FinOps · SaaS",
                h: "h-[340px]",
                g: "from-[#6b5cff] to-[#00e5ff]",
                img: "https://picsum.photos/id/180/1400/900",
                url: "https://kadaliaswinkumar.github.io/cloudcost-optimizer/compare",
              },
              {
                t: "Agent Forge",
                c: "AI Agent Platform",
                h: "h-[340px]",
                g: "from-[#ff5cb1] to-[#6b5cff]",
                img: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1400&q=80",
                url: "https://kadaliaswinkumar.github.io/AgentForge/",
              },
              {
                t: "TecH BuilderZ",
                c: "SaaS Product Website Agency",
                h: "h-[340px]",
                g: "from-[#00e5ff] to-[#6bff9e]",
                img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80",
                url: "#hero",
              },
              {
                t: "Emily",
                c: "AI Companion",
                h: "h-[340px]",
                g: "from-[#ffae00] to-[#ff5cb1]",
                img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1400&q=80",
                url: null,
              },
              {
                t: "Portfolio",
                c: "Personal Website for People",
                h: "h-[340px]",
                g: "from-[#6b5cff] to-[#ff5cb1]",
                img: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1400&q=80",
                url: "https://kadaliaswinkumar.github.io/kadaliaswinkumar.in/",
              },
            ].map((p, i) => (
              <TiltCard key={i} className={`fade-up group ${p.h}`}>
                <div className="glass relative block h-full overflow-hidden rounded-3xl p-7">
                  <img
                    src={p.img}
                    alt={`${p.t} project preview`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${p.g} opacity-0 transition-opacity duration-500 group-hover:opacity-40`} />
                  <div className="relative">
                    <div className="font-mono text-xs text-muted-foreground">0{i + 1}</div>
                  </div>
                  <div className="absolute inset-x-7 bottom-7 flex items-end justify-between gap-4">
                    <div>
                      <div className="text-xs uppercase tracking-widest text-muted-foreground">{p.c}</div>
                      <div className="mt-1 text-2xl font-semibold">{p.t}</div>
                    </div>
                    {p.url ? (
                      <a
                        href={p.url}
                        target={p.url.startsWith("http") ? "_blank" : undefined}
                        rel={p.url.startsWith("http") ? "noreferrer" : undefined}
                        className="grid h-10 w-10 place-items-center rounded-full glass transition-transform group-hover:rotate-45"
                        aria-label={`Open ${p.t}`}
                      >
                        ↗
                      </a>
                    ) : (
                      <span className="rounded-full glass px-3 py-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                        Coming Soon
                      </span>
                    )}
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS MARQUEE */}
      <section className="relative py-32">
        <div className="mx-auto mb-12 max-w-6xl px-6">
          <div className="fade-up text-xs uppercase tracking-[0.3em] text-accent">/ Praise</div>
          <h2 className="fade-up mt-4 text-5xl font-bold md:text-6xl">Words from <span className="text-gradient">collaborators</span>.</h2>
        </div>
        <div className="scroll-x overflow-hidden">
          <div className="animate-marquee flex gap-6 pl-6" style={{ width: "max-content" }}>
            {[...Array(2)].flatMap((_, k) => [
              {
                q: "TecH BuilderZ understood our market quickly and gave us a polished product website in record time. It helped our sales team close demos faster.",
                a: "Ananya Reddy",
                r: "VP Product, CloudSutra",
                img: "https://i.pravatar.cc/80?img=32",
              },
              {
                q: "From discovery to launch, communication was excellent. Every weekly update was clear, and the final design felt premium and modern.",
                a: "Rohit Sharma",
                r: "Founder, Agent Forge",
                img: "https://i.pravatar.cc/80?img=67",
              },
              {
                q: "They simplified complex user journeys and improved conversion on our landing pages. We saw measurable growth within the first month.",
                a: "Priya Nair",
                r: "CMO, FinStack",
                img: "https://i.pravatar.cc/80?img=47",
              },
              {
                q: "The visual direction and frontend quality were both top-notch. The team was responsive, practical, and very easy to collaborate with.",
                a: "Arjun Mehta",
                r: "Head of Design, ScaleNest",
                img: "https://i.pravatar.cc/80?img=13",
              },
              {
                q: "What stood out most was reliability. No overpromises, just disciplined execution and great communication from start to finish.",
                a: "Kavya Iyer",
                r: "CTO, Emily AI",
                img: "https://i.pravatar.cc/80?img=5",
              },
            ].map((t, i) => (
              <div key={`${k}-${i}`} className="glass w-[400px] shrink-0 rounded-2xl p-8">
                <div className="text-3xl text-gradient">"</div>
                <p className="mt-2 text-base leading-relaxed">{t.q}</p>
                <div className="mt-6 flex items-center gap-3">
                  <img src={t.img} alt={`${t.a} avatar`} loading="lazy" className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <div className="text-sm font-semibold">{t.a}</div>
                    <div className="text-xs text-muted-foreground">{t.r}</div>
                  </div>
                </div>
              </div>
            )))}
          </div>
        </div>
      </section>

      <WaveDivider />

      {/* CTA */}
      <section id="contact" className="relative overflow-hidden py-32">
        <FloatingParticles />
        <div className="absolute inset-0 bg-gradient-primary opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        <motion.div
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative mx-auto max-w-4xl px-6 text-center"
        >
          <h2 className="text-5xl font-bold md:text-7xl">
            Let's build the <span className="text-gradient">unforgettable</span>.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
            Have a project worth obsessing over? We're booking ambitious collaborations for Q3.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button className="shimmer glow-pulse rounded-full bg-gradient-primary px-8 py-4 text-sm font-semibold text-primary-foreground">
              Start a Project →
            </button>
            <a href={`mailto:${CONTACT_EMAIL}`} className="shimmer glass rounded-full px-8 py-4 text-sm font-semibold">
              {CONTACT_EMAIL}
            </a>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-border/50 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center">
          <div className="text-sm text-muted-foreground">
            © 2026 TecH BuilderZ. Designed in motion.
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <a
              href="/privacy-policy"
              className="shimmer glass rounded-full px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy Policy
            </a>
            <a
              href="/terms-and-conditions"
              className="shimmer glass rounded-full px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Terms & Conditions
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="shimmer glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail size={14} />
              {CONTACT_EMAIL}
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="shimmer glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <Phone size={14} />
              {WHATSAPP_NUMBER}
            </a>
            <a
              href={LINKEDIN_LINK}
              target="_blank"
              rel="noreferrer"
              className="shimmer glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <Linkedin size={14} />
              LinkedIn
            </a>
          </div>
        </div>
      </footer>

      {/* CHATBOT */}
      <div className="fixed bottom-5 left-4 right-4 z-[250] flex flex-col items-end gap-3 sm:left-auto sm:right-6">
        {chatOpen && (
          <div className="w-full rounded-3xl border border-white/10 bg-background/95 p-5 shadow-2xl backdrop-blur sm:w-[420px] md:w-[460px]">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-[22px] font-semibold leading-none">TecH BuilderZ Assistant</div>
              <button
                onClick={() => setChatOpen(false)}
                className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>
            <div className="mb-4 max-h-56 space-y-2 overflow-y-auto">
              {chatMessages.map((m, i) => (
                <div key={`${m.role}-${i}`} className={`rounded-xl px-3 py-2 text-xs ${m.role === "bot" ? "bg-white/10 text-foreground" : "bg-gradient-primary text-primary-foreground"}`}>
                  {m.text}
                </div>
              ))}
            </div>
            <div className="mb-3 flex flex-wrap gap-2">
              {["services", "timeline", "pricing", "contact"].map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    setChatMessages((prev) => [
                      ...prev,
                      { role: "user", text: q },
                      { role: "bot", text: CHATBOT_RESPONSES[q] },
                    ]);
                  }}
                  className="rounded-full border border-white/10 px-2 py-1 text-[10px] uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
                >
                  {q}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const raw = chatInput.trim();
                if (!raw) return;
                const key = raw.toLowerCase();
                const answer =
                  CHATBOT_RESPONSES[key] ??
                  "Thanks for your message. Please email kadaliaswinkumar@gmail.com for custom queries.";
                setChatMessages((prev) => [...prev, { role: "user", text: raw }, { role: "bot", text: answer }]);
                setChatInput("");
              }}
              className="flex items-center gap-3"
            >
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask a quick question..."
                className="h-12 w-full rounded-full border border-white/10 bg-white/5 px-4 text-base outline-none focus:border-accent"
              />
              <button
                type="submit"
                className="grid h-12 w-12 place-items-center rounded-full bg-gradient-primary text-primary-foreground"
                aria-label="Send message"
              >
                <Send size={20} />
              </button>
            </form>
          </div>
        )}
        <button
          onClick={() => setChatOpen((prev) => !prev)}
          className="shimmer glow-pulse inline-flex items-center gap-3 rounded-full bg-gradient-primary px-6 py-4 text-lg font-semibold text-primary-foreground sm:text-xl"
        >
          <MessageCircle size={24} />
          Chat
        </button>
      </div>
    </div>
  );
}

function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0">
      {Array.from({ length: 24 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-white/70"
          style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%`, boxShadow: "0 0 8px var(--neon-cyan)" }}
          animate={{ y: [-20, 20, -20], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 4 + (i % 5), repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
