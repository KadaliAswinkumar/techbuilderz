import { chromium } from "playwright";
import { join } from "node:path";

const outDir = join(import.meta.dirname, "../public/work");

const targets = [
  ["cloud-cost-optimizer", "https://kadaliaswinkumar.github.io/cloudcost-optimizer/"],
  ["agent-forge", "https://kadaliaswinkumar.github.io/AgentForge/"],
  ["techbuilderz", "https://techbuilderz.in/"],
  ["drip-gen-z", "https://techbuilderz.github.io/Drip-Gen-Z/"],
  ["retro-rewind-hub", "https://techbuilderz.github.io/Retro-Rewind-Hub/"],
  ["bloom-art-nouveau", "https://techbuilderz.github.io/Bloom-Art-Nouveau/"],
  ["forge-cafe", "https://techbuilderz.github.io/Forge-Cafe/"],
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });

for (const [slug, url] of targets) {
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
    await page.waitForTimeout(1500);
    await page.screenshot({
      path: join(outDir, `${slug}.jpg`),
      type: "jpeg",
      quality: 82,
      fullPage: false,
    });
    console.log(`✓ ${slug}`);
  } catch (err) {
    console.error(`✗ ${slug}:`, err.message);
  }
}

await browser.close();
