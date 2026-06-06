import { writeFileSync } from "node:fs";
import { join } from "node:path";

const dir = join(import.meta.dirname, "../public/work");

const projects = [
  { slug: "cloud-cost-optimizer", title: "Cloud Cost", accent: "#4cb8ff", bg: "#0d1f33" },
  { slug: "agent-forge", title: "Agent Forge", accent: "#e8e0d8", bg: "#1a1612" },
  { slug: "techbuilderz", title: "Tech BuilderZ", accent: "#ff5b1a", bg: "#1f1208" },
  { slug: "drip-gen-z", title: "Drip Gen Z", accent: "#ff6b9d", bg: "#2a0f1a" },
  { slug: "retro-rewind-hub", title: "Retro Rewind", accent: "#d4a04a", bg: "#241808" },
  { slug: "bloom-art-nouveau", title: "Bloom", accent: "#8aa888", bg: "#142018" },
  { slug: "forge-cafe", title: "Forge Cafe", accent: "#c87a3a", bg: "#1f1408" },
];

function svg({ title, accent, bg }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${bg}"/>
      <stop offset="100%" stop-color="#0a0a0a"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="42%" r="55%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1600" height="1000" fill="url(#bg)"/>
  <rect width="1600" height="1000" fill="url(#glow)"/>
  <rect x="120" y="100" width="1360" height="780" rx="8" fill="#141414" stroke="${accent}" stroke-width="3"/>
  <rect x="120" y="100" width="1360" height="52" fill="#0a0a0a"/>
  <circle cx="156" cy="126" r="10" fill="#ff5b1a"/>
  <circle cx="188" cy="126" r="10" fill="#f5f1ea" opacity="0.35"/>
  <circle cx="220" cy="126" r="10" fill="#f5f1ea" opacity="0.35"/>
  <rect x="200" y="200" width="520" height="36" rx="4" fill="${accent}" opacity="0.85"/>
  <rect x="200" y="260" width="720" height="18" rx="2" fill="#f5f1ea" opacity="0.25"/>
  <rect x="200" y="300" width="640" height="18" rx="2" fill="#f5f1ea" opacity="0.18"/>
  <rect x="200" y="380" width="400" height="280" rx="6" fill="${accent}" opacity="0.2"/>
  <rect x="640" y="380" width="760" height="280" rx="6" fill="#f5f1ea" opacity="0.08"/>
  <rect x="200" y="700" width="280" height="120" rx="6" fill="${accent}" opacity="0.35"/>
  <rect x="520" y="700" width="280" height="120" rx="6" fill="#f5f1ea" opacity="0.1"/>
  <rect x="840" y="700" width="560" height="120" rx="6" fill="#f5f1ea" opacity="0.08"/>
  <text x="800" y="920" text-anchor="middle" fill="#f5f1ea" font-family="Impact, Arial Black, sans-serif" font-size="56" font-weight="900" letter-spacing="4">${title.toUpperCase()}</text>
</svg>`;
}

for (const p of projects) {
  writeFileSync(join(dir, `${p.slug}.svg`), svg(p));
  console.log(`wrote ${p.slug}.svg`);
}
