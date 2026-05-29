import { createFileRoute, Link } from "@tanstack/react-router";

const BLOG_CANONICAL =
  "https://techbuilderz.in/blog/how-we-built-cloud-cost-optimizer-saas";

export const Route = createFileRoute("/blog/how-we-built-cloud-cost-optimizer-saas")({
  head: () => ({
    meta: [
      {
        title:
          "How We Built a Cloud Cost Optimizer SaaS - TechBuilderz Case Study",
      },
      {
        name: "description",
        content:
          "A behind-the-scenes look at how TechBuilderz designed and engineered a Cloud Cost Optimizer SaaS platform - from discovery to launch.",
      },
      { property: "og:title", content: "How We Built a Cloud Cost Optimizer SaaS" },
      {
        property: "og:description",
        content:
          "Discover the stack, architecture decisions, and lessons from shipping a FinOps SaaS product.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: BLOG_CANONICAL },
      { property: "og:image", content: "https://techbuilderz.in/og-image.svg" },
    ],
    links: [{ rel: "canonical", href: BLOG_CANONICAL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline:
            "How We Built a Cloud Cost Optimizer SaaS - TechBuilderz Case Study",
          description:
            "A behind-the-scenes look at how TechBuilderz designed and engineered a Cloud Cost Optimizer SaaS platform - from discovery to launch.",
          datePublished: "2026-05-30",
          dateModified: "2026-05-30",
          author: {
            "@type": "Organization",
            name: "TechBuilderz Team",
          },
          publisher: {
            "@type": "Organization",
            name: "TechBuilderz",
            logo: {
              "@type": "ImageObject",
              url: "https://techbuilderz.in/branding/techbuilderz-logo.svg",
            },
          },
          mainEntityOfPage: BLOG_CANONICAL,
          keywords: [
            "SaaS",
            "Cloud",
            "FinOps",
            "React",
            "Case Study",
            "Web Development India",
          ],
        }),
      },
    ],
  }),
  component: BlogPostPage,
});

function BlogPostPage() {
  return (
    <main className="grain min-h-screen bg-background text-foreground">
      <article className="mx-auto max-w-3xl px-6 py-20">
        <div className="mb-8">
          <Link to="/blog" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
            ← Back to blog
          </Link>
        </div>

        <header>
          <p className="text-xs uppercase tracking-[0.2em] text-accent">2026-05-30 · TechBuilderz Team</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
            How We Built a Cloud Cost Optimizer SaaS - TechBuilderz Case Study
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Cloud bills are unpredictable. For growing startups, a single misconfigured AWS service can silently
            drain thousands of dollars every month.
          </p>
        </header>

        <div className="mt-10 space-y-6 text-base leading-relaxed text-muted-foreground">
          <p>
            That was the exact problem our client came to us with - and it led to one of our most rewarding builds
            to date. In this case study, we are pulling back the curtain on how TechBuilderz designed and engineered
            the Cloud Cost Optimizer, a FinOps SaaS platform that helps engineering teams understand, compare, and cut
            their cloud spend.
          </p>

          <section className="glass rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-foreground">The challenge</h2>
            <p className="mt-3">
              The client needed a product that could ingest billing exports, surface cost anomalies quickly, and make
              recommendations understandable to both engineering and leadership teams.
            </p>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-foreground">How we approached it</h2>
            <p className="mt-3">
              We started with discovery workshops, mapped the most critical cost-drain workflows, and designed a clean
              dashboard system before implementation. The frontend was built with React and TypeScript, with
              performance-first rendering and reusable UI blocks for report screens.
            </p>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-foreground">Key outcomes</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Clear multi-view comparison of service-level cloud spend.</li>
              <li>Faster identification of unusual spikes and wasteful usage patterns.</li>
              <li>Decision-ready reporting for founders and operations teams.</li>
            </ul>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-foreground">What we learned</h2>
            <p className="mt-3">
              FinOps products succeed when data clarity and decision speed are prioritized over flashy complexity.
              Strong information architecture and practical UX patterns had a bigger impact than adding more charts.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
