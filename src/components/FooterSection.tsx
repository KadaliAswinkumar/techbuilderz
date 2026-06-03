
const socials = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/tech-builderz/",
  },
  { label: "WhatsApp", href: "https://wa.me/919398431573" },
  { label: "Email", href: "mailto:team@techbuilderz.in" },
];

const nav = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export default function FooterSection() {
  return (
    <footer
      className="relative w-full pt-24 pb-10 px-6 md:px-12"
      style={{ background: "var(--bg)" }}
    >
      {/* Giant outlined TECH + italic BUILDERZ */}
      <div className="w-full overflow-hidden">
        <div className="flex flex-col items-stretch">
          <h2
            data-hover
            className="font-display text-outline-fg select-none text-center"
            style={{
              fontSize: "clamp(80px, 22vw, 320px)",
              letterSpacing: "0.02em",
              lineHeight: 0.85,
            }}
          >
            TECH
          </h2>
          <h2
            data-hover
            className="font-editorial italic select-none text-center"
            style={{
              fontSize: "clamp(80px, 22vw, 320px)",
              color: "var(--accent)",
              lineHeight: 0.95,
              marginTop: "-0.08em",
            }}
          >
            builderz.
          </h2>
        </div>
      </div>

      <div className="mt-12" style={{ height: 1, background: "var(--line)" }} />

      <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        {/* Brand */}
        <div className="md:col-span-4 flex flex-col gap-4">
          <p
            style={{
              fontFamily: "var(--font-space), sans-serif",
              fontSize: 11,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "var(--accent)",
            }}
          >
            TecH BuilderZ
          </p>
          <p
            className="max-w-sm"
            style={{
              fontSize: 14,
              color: "var(--fg-muted)",
              lineHeight: 1.7,
            }}
          >
            We design and engineer immersive digital experiences at the
            intersection of 3D, motion, and storytelling.
          </p>
          <a
            href="mailto:team@techbuilderz.in"
            data-hover
            className="link-underline"
            style={{
              fontSize: 14,
              color: "var(--fg)",
              fontFamily: "var(--font-space), sans-serif",
              marginTop: 8,
            }}
          >
            team@techbuilderz.in
          </a>
        </div>

        {/* Navigate */}
        <div className="md:col-span-3 flex flex-col gap-3">
          <span
            style={{
              fontSize: 11,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "var(--fg-muted)",
              fontFamily: "var(--font-space), sans-serif",
            }}
          >
            Navigate
          </span>
          {nav.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="link-underline w-fit"
              style={{
                fontFamily: "var(--font-space), sans-serif",
                fontSize: 13,
                color: "var(--fg)",
              }}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Connect */}
        <div className="md:col-span-3 flex flex-col gap-3">
          <span
            style={{
              fontSize: 11,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "var(--fg-muted)",
              fontFamily: "var(--font-space), sans-serif",
            }}
          >
            Connect
          </span>
          {socials.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline w-fit"
              style={{
                fontFamily: "var(--font-space), sans-serif",
                fontSize: 13,
                color: "var(--fg)",
              }}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Booking */}
        <div className="md:col-span-2 flex flex-col gap-3">
          <span
            style={{
              fontSize: 11,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "var(--fg-muted)",
              fontFamily: "var(--font-space), sans-serif",
            }}
          >
            Booking
          </span>
          <div className="flex items-center gap-2">
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 9999,
                background: "var(--accent)",
                animation: "pulse 1.6s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-space), sans-serif",
                fontSize: 13,
                color: "var(--fg)",
              }}
            >
              Q1 2026
            </span>
          </div>
          <span
            style={{
              fontSize: 12,
              color: "var(--fg-muted)",
              fontFamily: "var(--font-space), sans-serif",
            }}
          >
            Reply within 24h
          </span>
        </div>
      </div>

      <div
        className="mt-16 pt-8 grid grid-cols-1 md:grid-cols-3 gap-4 items-center"
        style={{ borderTop: "1px solid var(--line)" }}
      >
        <span
          style={{
            fontSize: 11,
            color: "var(--fg-muted)",
            fontFamily: "var(--font-space), sans-serif",
          }}
        >
          © 2026 TecH BuilderZ, Hyderabad, India.
        </span>
        <span
          className="text-center"
          style={{
            fontSize: 11,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "var(--fg)",
            fontFamily: "var(--font-space), sans-serif",
          }}
        >
          Designed in motion.
        </span>
        <span
          className="md:text-right"
          style={{
            fontSize: 11,
            color: "var(--fg-muted)",
            fontFamily: "var(--font-space), sans-serif",
          }}
        >
          Built with WebGL · Crafted in Hyderabad
        </span>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
      `}</style>
    </footer>
  );
}
