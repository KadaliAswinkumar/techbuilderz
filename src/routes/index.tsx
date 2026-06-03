import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarqueeStrip from "@/components/MarqueeStrip";
import ServicesSection from "@/components/ServicesSection";
import WorkSection from "@/components/WorkSection";
import ProcessSection from "@/components/ProcessSection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";

const SITE_URL = "https://techbuilderz.in";
const OG_IMAGE_URL = `${SITE_URL}/og-image.svg`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "TecH BuilderZ — Beyond the Interface. Crafting Tomorrow.",
      },
      {
        name: "description",
        content:
          "We design and engineer immersive digital experiences at the intersection of 3D, motion, and storytelling. Creative studio based in Hyderabad, India.",
      },
      { property: "og:title", content: "TecH BuilderZ — Beyond the Interface" },
      {
        property: "og:description",
        content:
          "We design and engineer immersive digital experiences at the intersection of 3D, motion, and storytelling.",
      },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <main
      className="relative w-full overflow-x-hidden"
      style={{ background: "var(--bg)" }}
    >
      <Navbar />
      <HeroSection />
      <MarqueeStrip />
      <ServicesSection />
      <WorkSection />
      <ProcessSection />
      <PricingSection />
      <TestimonialsSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
