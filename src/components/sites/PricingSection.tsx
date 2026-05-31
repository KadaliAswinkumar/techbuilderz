import { Cog, Rocket, Search } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/919398431573";

const PRICING_POINTS = [
  {
    t: "Scope First",
    d: "We map your features, user flows, integrations, and outcomes before sharing a commercial estimate.",
    icon: Search,
  },
  {
    t: "Effort-Based Estimate",
    d: "Pricing is calculated from implementation effort, design depth, technical complexity, and QA needs.",
    icon: Cog,
  },
  {
    t: "Timeline & Delivery",
    d: "Faster delivery windows or phased rollout plans are priced based on team allocation and milestones.",
    icon: Rocket,
  },
] as const;

export function PricingSection() {
  return (
    <section id="pricing" className="relative scroll-mt-28 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-xs uppercase tracking-[0.3em] text-accent">/ Pricing</div>
        <h2 className="mt-4 text-3xl font-bold sm:text-5xl md:text-7xl">
          Pricing built around your <span className="text-gradient">requirements.</span>
        </h2>
        <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
          We do not use one-size-fits-all packages. Every estimate is customized based on scope,
          complexity, timeline, and delivery expectations.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PRICING_POINTS.map((item) => (
            <div key={item.t} className="fade-up glass rounded-3xl border border-white/10 bg-card/80 p-8">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-black/40 text-accent backdrop-blur">
                <item.icon size={22} />
              </div>
              <h3 className="mt-6 text-2xl font-semibold">{item.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{item.d}</p>
            </div>
          ))}
        </div>

        <div className="fade-up mt-10 rounded-3xl border border-accent/30 bg-accent/5 p-6 sm:p-8">
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            Share your project brief with us, and we will send a tailored quote with delivery milestones.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="shimmer rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
            >
              Request Custom Quote
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="shimmer glass rounded-full px-6 py-3 text-sm font-semibold"
            >
              Discuss on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
