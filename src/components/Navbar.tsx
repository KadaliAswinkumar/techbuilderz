
import { useEffect, useState } from "react";

const links = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

const tickerCopy =
  "Booking Q1 2026 · Free 20-min consult · Reply within 24 hours · Hyderabad · India · ";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-[100]">
      {/* Top ticker */}
      <div
        className="overflow-hidden border-b"
        style={{
          background: "var(--accent)",
          borderColor: "var(--accent)",
          color: "var(--bg)",
          height: 28,
          display: "flex",
          alignItems: "center",
          fontFamily: "var(--font-space), sans-serif",
          fontSize: 11,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          fontWeight: 500,
        }}
      >
        <div className="ticker-track">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="px-6">
              {tickerCopy}
            </span>
          ))}
        </div>
      </div>

      <div
        className="transition-colors duration-500"
        style={{
          background: scrolled ? "rgba(10,10,10,0.78)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: scrolled
            ? "1px solid var(--line)"
            : "1px solid transparent",
        }}
      >
        <div className="flex items-center justify-between px-6 md:px-10 py-5 gap-8">
          <a
            href="#top"
            className="flex items-baseline gap-2 shrink-0"
            data-hover
          >
            <span
              className="font-display text-[var(--fg)]"
              style={{ fontSize: 26, letterSpacing: "0.04em" }}
            >
              TECH
            </span>
            <span
              className="font-display text-[var(--accent)]"
              style={{ fontSize: 26, letterSpacing: "0.04em" }}
            >
              BUILDERZ
            </span>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: 9999,
                background: "var(--accent)",
                marginLeft: 6,
                animation: "pulse 1.6s ease-in-out infinite",
              }}
            />
          </a>

          <div
            className="hidden md:block flex-1"
            style={{ height: 1, background: "var(--line)" }}
          />

          <nav className="flex items-center gap-6 md:gap-8">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="link-underline text-[var(--fg)]"
                style={{
                  fontFamily: "var(--font-space), sans-serif",
                  fontSize: 12,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              className="hidden md:inline-flex btn-brut"
              data-hover
              style={{ padding: "0.7rem 1.2rem", fontSize: 11 }}
            >
              Start project →
            </a>
          </nav>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
      `}</style>
    </header>
  );
}
