# CLAUDE.md

Read and follow [AGENTS.md](./AGENTS.md); it is the source of truth for this repo.

Three requirements apply to every change:

1. **Dual hosting.** The site is a static export deployed to both Cloudflare Pages and GitHub Pages from the same build. Nothing may require a server, a `basePath`, host-specific headers/redirects, or a hardcoded origin (use `SITE_URL`/`abs()` from `src/lib/seo.ts`).
2. **Maximize SEO.** Unique titles/descriptions, canonicals, Open Graph/Twitter, accurate JSON-LD, sitemap entries, semantic HTML, alt text, and strong Core Web Vitals on every page.
3. **Responsive everywhere.** Mobile-first; works from ~320 px to ultra-wide, no horizontal scroll, touch-friendly, no hover-only interactions.

Verify with `npm run typecheck` and `npm run build` before finishing.
