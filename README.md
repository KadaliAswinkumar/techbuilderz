# TecH BuilderZ

Marketing site for [techbuilderz.in](https://techbuilderz.in) — brutalist creative studio landing page with WebGL hero, service previews, and contact form.

## Stack

- [TanStack Start](https://tanstack.com/start) + Vite
- React 19, Tailwind CSS 4
- Three.js via React Three Fiber + GSAP + Lenis

## Develop

```bash
bun install
bun run dev
```

Open [http://localhost:8080](http://localhost:8080).

## Deploy

Pushes to `main` run `.github/workflows/deploy-pages.yml` (GitHub Pages). Custom domain: `techbuilderz.in` via `public/CNAME`.

```bash
bun run build:pages
```
