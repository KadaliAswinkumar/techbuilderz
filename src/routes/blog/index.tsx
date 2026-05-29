import { createFileRoute, Link } from "@tanstack/react-router";

const BLOG_POSTS = [
  {
    title: "How We Built a Cloud Cost Optimizer SaaS - TechBuilderz Case Study",
    slug: "how-we-built-cloud-cost-optimizer-saas",
    date: "2026-05-30",
    description:
      "A behind-the-scenes look at how TechBuilderz designed and engineered a Cloud Cost Optimizer SaaS platform - from discovery to launch.",
    tags: ["SaaS", "Cloud", "FinOps", "React", "Case Study", "Web Development India"],
  },
];

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "TechBuilderz Blog - Web, Mobile & AI Engineering Insights" },
      {
        name: "description",
        content:
          "Case studies and engineering insights from TechBuilderz on SaaS, web development, mobile apps, and AI integrations.",
      },
    ],
    links: [{ rel: "canonical", href: "https://techbuilderz.in/blog/" }],
  }),
  component: BlogIndexPage,
});

function BlogIndexPage() {
  return (
    <main className="grain min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <div className="mb-8">
          <Link to="/" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
            ← Back to home
          </Link>
        </div>

        <header className="mb-10">
          <div className="text-xs uppercase tracking-[0.3em] text-accent">Insights</div>
          <h1 className="mt-4 text-4xl font-bold md:text-5xl">
            TechBuilderz <span className="text-gradient">Blog</span>
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Practical write-ups from our delivery work across SaaS, cloud, AI, and frontend engineering.
          </p>
        </header>

        <div className="space-y-6">
          {BLOG_POSTS.map((post) => (
            <article key={post.slug} className="glass rounded-3xl p-7">
              <div className="text-xs uppercase tracking-[0.2em] text-accent">{post.date}</div>
              <h2 className="mt-3 text-2xl font-semibold">
                <Link
                  to={`/blog/${post.slug}`}
                  className="underline-offset-4 transition-colors hover:text-accent hover:underline"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{post.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
