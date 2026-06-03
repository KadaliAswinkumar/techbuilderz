import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { LoaderProvider } from "@/lib/LoaderContext";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import PageLoader from "@/components/PageLoader";

const FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Anton&family=Instrument+Serif:ital@0;1&family=Space+Grotesk:wght@300;400;500;600;700&display=swap";

function NotFoundComponent() {
  return (
    <div
      className="flex min-h-screen items-center justify-center px-4"
      style={{ background: "var(--bg)", color: "var(--fg)" }}
    >
      <div className="max-w-md text-center">
        <h1 className="font-display" style={{ fontSize: "clamp(80px, 20vw, 160px)" }}>
          404
        </h1>
        <p className="mt-4" style={{ color: "var(--fg-muted)" }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link to="/" className="btn-brut mt-8 inline-flex">
          Go home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4"
      style={{ background: "var(--bg)", color: "var(--fg)" }}
    >
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl">This page didn&apos;t load</h1>
        <p className="mt-2" style={{ color: "var(--fg-muted)" }}>
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-brut"
          >
            Try again
          </button>
          <a href="/" className="btn-brut btn-brut-ghost">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        title: "TecH BuilderZ — Beyond the Interface. Crafting Tomorrow.",
      },
      {
        name: "description",
        content:
          "We design and engineer immersive digital experiences at the intersection of 3D, motion, and storytelling. Creative studio based in Hyderabad, India.",
      },
      { name: "author", content: "TechBuilderz" },
      { name: "robots", content: "index, follow" },
      { name: "theme-color", content: "#0a0a0a" },
      { property: "og:site_name", content: "TechBuilderz" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_IN" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: FONTS_URL },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="antialiased">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <LoaderProvider>
        <SmoothScroll />
        <CustomCursor />
        <PageLoader />
        <div className="grain" aria-hidden />
        <Outlet />
      </LoaderProvider>
    </QueryClientProvider>
  );
}
