
const seg = "3D & WEBGL · MOTION SYSTEMS · BRAND IDENTITY · PRODUCT ENGINEERING · ";

export default function MarqueeStrip() {
  return (
    <div
      className="marquee-wrap relative w-full overflow-hidden border-y"
      style={{
        background: "var(--bg)",
        borderColor: "var(--line)",
      }}
    >
      <div
        className="marquee-track py-5 md:py-7"
        style={{
          fontFamily: "var(--font-anton), sans-serif",
          fontSize: "clamp(40px, 7vw, 88px)",
          letterSpacing: "0.04em",
          lineHeight: 1,
          textTransform: "uppercase",
        }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="px-6 whitespace-nowrap inline-flex items-center gap-6"
          >
            <span style={{ color: i % 2 === 0 ? "var(--fg)" : "var(--accent)" }}>
              {seg}
            </span>
            <span
              style={{
                width: 12,
                height: 12,
                background: "var(--accent)",
                display: "inline-block",
                transform: "rotate(45deg)",
              }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
