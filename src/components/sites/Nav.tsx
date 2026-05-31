import { useEffect, useState, type MouseEvent } from "react";

const NAV_LINKS = [
  { label: "Capabilities", id: "capabilities" },
  { label: "Services", id: "services" },
  { label: "About", id: "about" },
  { label: "Work", id: "work" },
  { label: "Pricing", id: "pricing" },
  { label: "Contact", id: "contact" },
] as const;

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const navOffset = 96;
  const top = el.getBoundingClientRect().top + window.scrollY - navOffset;
  window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
  window.history.replaceState(null, "", `#${id}`);
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const timer = window.setTimeout(() => scrollToSection(hash), 400);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-[120] transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-background/90 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl"
          : "border-b border-white/5 bg-background/75 backdrop-blur-md md:bg-transparent md:backdrop-blur-none"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 md:px-8">
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("hero");
          }}
          className="flex min-w-0 items-center gap-2 sm:gap-3"
        >
          <svg viewBox="0 0 40 40" className="h-8 w-8 shrink-0 sm:h-9 sm:w-9" aria-hidden>
            <defs>
              <linearGradient id="lg" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--neon-blue)" />
                <stop offset="100%" stopColor="var(--neon-violet)" />
              </linearGradient>
            </defs>
            <circle cx="20" cy="20" r="16" fill="none" stroke="url(#lg)" strokeWidth="2">
              <animate attributeName="r" values="14;17;14" dur="3s" repeatCount="indefinite" />
            </circle>
            <path
              d="M12 26 L20 12 L28 26"
              fill="none"
              stroke="url(#lg)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="20" cy="20" r="2" fill="var(--neon-cyan)">
              <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
            </circle>
          </svg>
          <span className="hidden truncate text-base font-semibold tracking-tight sm:inline md:text-lg">
            TecH <span className="text-gradient">BuilderZ</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                scrollToSection(link.id);
              }}
              className="group relative transition-colors hover:text-foreground"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("contact");
          }}
          className="shimmer shrink-0 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium backdrop-blur sm:px-5 sm:py-2 sm:text-sm md:glass md:glow-pulse"
        >
          Start Project
        </a>
      </div>
    </nav>
  );
}
