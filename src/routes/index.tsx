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
import SiteChatbot from "@/components/SiteChatbot";
import {
  OG_IMAGE_URL,
  SITE_DESCRIPTION,
  SITE_TITLE,
  TWITTER_SITE,
} from "@/lib/seo-meta";
import { SITE_URL } from "@/lib/site-config";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESCRIPTION },
      {
        property: "og:title",
        content: "TechBuilderz - Web Development, Mobile Apps & AI Integration Studio",
      },
      { property: "og:description", content: SITE_DESCRIPTION },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:image", content: OG_IMAGE_URL },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: TWITTER_SITE },
      { name: "twitter:title", content: SITE_TITLE },
      { name: "twitter:description", content: SITE_DESCRIPTION },
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
      <SiteChatbot />
    </main>
  );
}
