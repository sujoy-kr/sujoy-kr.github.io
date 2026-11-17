# AGENTS.md

Guidance for AI coding agents working on this repository. `CLAUDE.md` points here.

## Project

Personal portfolio for Sujoy Karmakar: Next.js 16 (App Router) + React 19 + TypeScript, built as a **fully static export** (`output: "export"`, `trailingSlash: true`, unoptimized images). No server runtime.

## Non-negotiable constraints

### 1. It deploys to BOTH Cloudflare Pages and GitHub Pages

Every change must work on both hosts from the same build.

- Keep the site a pure static export. No API routes, middleware, server actions, `revalidate`, runtime `headers()/cookies()`, Image Optimization, or anything needing a Node server.
- Serve from the domain root. Do not add `basePath` or `assetPrefix`. Use root-relative paths (`/images/...`), never hardcoded hosts.
- Never hardcode the site origin. Use `SITE_URL` / `abs()` from `src/lib/seo.ts`. It is resolved at build time in `next.config.ts` (`NEXT_PUBLIC_SITE_URL` > `https://<owner>.github.io` on GitHub Actions > `https://sujoykr.pages.dev`).
- Keep `trailingSlash: true` and a generated `404.html` (`src/app/not-found.tsx`). Both hosts rely on them.
- `public/_headers` only works on Cloudflare. GitHub Pages ignores it, so never make correctness depend on custom headers or redirects (do redirects client-side or avoid them).
- Keep `public/.nojekyll` (GitHub Pages would otherwise skip `_next/`).
- Build must succeed with no env vars set and in `.github/workflows/deploy.yml` (Node from `.node-version`, currently 22). Do not add build steps that need secrets, network access or untracked local files.
- The build runs `npm run images` first (`scripts/sync-images.mjs`), which regenerates `src/data/galleries.json` and `public/asset-sources.json`. Do not untrack `scripts/sync-images.mjs`.

### 2. SEO must be maximized

- Every route needs a unique `<title>`, meta description, canonical URL, Open Graph and Twitter metadata. Use `pageMetadata()` from `src/lib/seo.ts`; do not hand-roll metadata.
- Keep JSON-LD structured data (`person`, `breadcrumbs`, etc. in `seo.ts`) accurate and in sync with visible content. Add breadcrumb and relevant schema for new page types.
- New routes must appear in `src/app/sitemap.ts`; keep `robots.ts` correct.
- One `<h1>` per page, a logical heading order, semantic landmarks (`header`, `main`, `nav`, `footer`), descriptive link text, and meaningful `alt` text on every informative image (empty `alt=""` only for decorative ones).
- Prefer server-rendered, crawlable HTML. Do not hide primary content behind client-only rendering, tabs that need JS, or hash routing.
- Protect Core Web Vitals: set `width`/`height` on images (no layout shift), lazy-load below-the-fold images, preload only the LCP image, use `next/font` (already self-hosted), avoid large client bundles and render-blocking third-party scripts. Prefer WebP/AVIF.
- Keep pages accessible (contrast, focus states, keyboard use, `prefers-reduced-motion`); accessibility is part of ranking and quality.

### 3. Responsive on every screen

- Mobile-first. Everything must work and look right from ~320 px phones through tablets, laptops and ultra-wide monitors, in portrait and landscape.
- No horizontal scroll at any width. Use fluid layouts (`clamp()`, `min()`, grid/flex, `max-width`), relative units, and `aspect-ratio` for media.
- Touch targets at least 44x44 px; no hover-only interactions (hover effects such as `DirectionalCard` need a touch/keyboard equivalent). Respect `prefers-reduced-motion`, `prefers-color-scheme` where used, and safe-area insets.
- Check changes at roughly 320, 375, 768, 1024, 1440 and 1920+ px before finishing.

## Commands

```bash
npm install
npm run dev         # http://127.0.0.1:3000 (runs `npm run images` first)
npm run build       # static export to out/
npm start           # serve out/
npm run typecheck
npm test            # node --test scripts/content.test.mjs
```

Note: `npm test` has a known pre-existing failure ("the audited five projects still lead the collection"): the test's expected lead projects no longer match `projects.json`. Do not mask it; fix the test or data deliberately.

## Layout

```text
src/app/          routes, layout, sitemap.ts, robots.ts, not-found.tsx
src/components/   UI components
src/data/         projects.json (hand-edited), galleries.json (GENERATED)
src/lib/          seo.ts, brand-icons.ts, helpers
public/images/    one folder per project/design: exactly one thumbnail.* plus image1.*, image2.*, ...
scripts/          sync-images.mjs, content.test.mjs (tracked); other scripts are local-only and gitignored
```

Gitignored local-only paths (`docs/`, most of `scripts/`, `public/asset-sources.json`) must not be relied on by the build.

## Conventions

- Follow existing patterns, naming and styling; keep changes minimal and focused. No new dependencies unless clearly needed.
- Edit `src/data/projects.json` and the image folders; never edit `src/data/galleries.json` by hand (regenerate with `npm run images`).
- The repo is public: never commit secrets, credentials, `.env*`, or private client material.
- Before finishing: run `npm run typecheck` and `npm run build`, confirm routes still emit into `out/`, and check responsive behaviour for UI changes.
