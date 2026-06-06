
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

const links = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

const tickerCopy =
  "Booking open · Q2–Q3 2026 · Free 20-min consult · Reply within 24 hours · Hyderabad · India · ";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-[100]">
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
          background: scrolled || menuOpen ? "rgba(10,10,10,0.92)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(14px)" : "none",
          WebkitBackdropFilter: scrolled || menuOpen ? "blur(14px)" : "none",
          borderBottom:
            scrolled || menuOpen ? "1px solid var(--line)" : "1px solid transparent",
        }}
      >
        <div className="flex items-center justify-between px-6 md:px-10 py-5 gap-4">
          <a
            href="#top"
            className="flex items-center gap-3 shrink-0"
            data-hover
            onClick={closeMenu}
          >
            <img
              src="/branding/logo-mark.svg"
              alt=""
              width={32}
              height={32}
              className="shrink-0"
            />
            <span className="flex items-baseline gap-2">
              <span
                className="font-display text-[var(--fg)]"
                style={{ fontSize: 22, letterSpacing: "0.04em" }}
              >
                TECH
              </span>
              <span
                className="font-display text-[var(--accent)]"
                style={{ fontSize: 22, letterSpacing: "0.04em" }}
              >
                BUILDERZ
              </span>
            </span>
          </a>

          <div
            className="hidden md:block flex-1 mx-6"
            style={{ height: 1, background: "var(--line)" }}
          />

          <nav className="hidden md:flex items-center gap-6 md:gap-8">
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
              className="btn-brut"
              data-hover
              style={{ padding: "0.7rem 1.2rem", fontSize: 11 }}
            >
              Start project →
            </a>
          </nav>

          <button
            type="button"
            className="md:hidden flex flex-col justify-center gap-[6px] w-10 h-10"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            data-hover
          >
            <span
              style={{
                display: "block",
                height: 2,
                width: 24,
                background: "var(--fg)",
                transform: menuOpen ? "translateY(8px) rotate(45deg)" : "none",
                transition: "transform 0.3s ease",
              }}
            />
            <span
              style={{
                display: "block",
                height: 2,
                width: 24,
                background: "var(--fg)",
                opacity: menuOpen ? 0 : 1,
                transition: "opacity 0.2s",
              }}
            />
            <span
              style={{
                display: "block",
                height: 2,
                width: 24,
                background: "var(--fg)",
                transform: menuOpen ? "translateY(-8px) rotate(-45deg)" : "none",
                transition: "transform 0.3s ease",
              }}
            />
          </button>
        </div>
      </div>

      {menuOpen && (
        <>
          <button
            type="button"
            aria-label="Close menu overlay"
            className="md:hidden fixed inset-0 z-[99] top-[calc(28px+72px)]"
            style={{ background: "rgba(10,10,10,0.65)" }}
            onClick={closeMenu}
          />
          <aside
            className="md:hidden fixed top-[calc(28px+72px)] right-0 bottom-0 z-[100] w-[min(100%,320px)] flex flex-col px-8 py-10 gap-2"
            style={{
              background: "var(--bg-2)",
              borderLeft: "1px solid var(--line)",
            }}
          >
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={closeMenu}
                className="font-display text-[var(--fg)] py-4"
                style={{
                  fontSize: 36,
                  letterSpacing: "0.02em",
                  borderBottom: "1px solid var(--line)",
                }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={closeMenu}
              className="btn-brut mt-6"
              data-hover
              style={{ fontSize: 11 }}
            >
              Start project →
            </a>
            <div
              className="mt-auto pt-8 flex flex-col gap-2"
              style={{
                fontFamily: "var(--font-space), sans-serif",
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--fg-muted)",
              }}
            >
              <Link to="/privacy-policy" onClick={closeMenu}>
                Privacy
              </Link>
              <Link to="/terms-and-conditions" onClick={closeMenu}>
                Terms
              </Link>
            </div>
          </aside>
        </>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
      `}</style>
    </header>
  );
}
