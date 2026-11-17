# Sujoy Karmakar — Portfolio

Source for my personal portfolio: a statically exported Next.js site showing my projects, UI designs, and background.

- Live: https://sujoy-kr.github.io/ (mirror: https://sujoykr.pages.dev)
- Author: [Sujoy Karmakar](https://www.linkedin.com/in/sujoykarmakar), full-stack developer, Dhaka, Bangladesh

## Stack

- [Next.js](https://nextjs.org/) 16 (App Router, `output: "export"`) and React 19
- TypeScript, plain CSS (`src/app/globals.css`)
- [simple-icons](https://simpleicons.org/) for technology logos
- Node's built-in test runner for content validation
- Hosted as static files on GitHub Pages and Cloudflare Pages

## Pages

| Route | Content |
| --- | --- |
| `/` | Introduction and featured projects |
| `/projects/` and `/projects/[slug]/` | Project list and a case study per project |
| `/design/` | UI and landing-page design work |
| `/about/` | Background, skills and experience |
| `/contact/` | Contact details and profiles |

It also generates `sitemap.xml`, `robots.txt`, canonical and Open Graph metadata, and JSON-LD structured data.

## Getting started

Requires Node 22 (see `.node-version`).

```bash
npm install
npm run dev        # http://127.0.0.1:3000
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Static export to `out/` |
| `npm start` | Serve `out/` locally |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Validate project data and image folders |
| `npm run images` | Rebuild `src/data/galleries.json` from `public/images/` (runs automatically before dev, build and test) |

## Project structure

```text
src/app/          Routes, layout, sitemap, robots
src/components/   UI components
src/data/         projects.json and generated galleries.json
src/lib/          SEO helpers, brand icons, utilities
public/images/    One folder per project: thumbnail.* and image1.*, image2.*, ...
scripts/          Image sync, cover rendering and content tests
```

### Adding a project

1. Add an entry to `src/data/projects.json` (a unique `slug`, title, pitch, technologies, highlights).
2. Create `public/images/<slug>/` with exactly one `thumbnail.*` and numbered `image1.*`, `image2.*`, ... files. Optional `gallery.json` adds captions.
3. Run `npm test` to validate it, then `npm run dev`.

## Deployment

The site is a fully static export with no server runtime and no `basePath`, so it must be served from a domain root. The same build deploys to both hosts. The canonical site URL is resolved at build time in `next.config.ts`:

1. `NEXT_PUBLIC_SITE_URL`, if set (use this for a custom domain)
2. `https://<owner>.github.io` on GitHub Actions
3. `https://sujoykr.pages.dev` otherwise

**GitHub Pages:** the repo must be named `<owner>.github.io`. Set Settings → Pages → Source to "GitHub Actions"; `.github/workflows/deploy.yml` builds and deploys on every push to `main`. `public/.nojekyll` keeps `_next/` from being ignored.

**Cloudflare Pages:** framework preset "Next.js (Static HTML Export)", build command `npm run build`, output directory `out`, Node 22. `public/_headers` supplies security and cache headers (GitHub Pages ignores this file).

## Content and licensing

Code is available to read and learn from. The writing, design work, screenshots and project imagery are mine; please don't reuse them without permission. Client-work screenshots use fictional demo data.

## Contact

- Email: thesujoykr@gmail.com
- LinkedIn: https://www.linkedin.com/in/sujoykarmakar
- GitHub: https://github.com/sujoy-kr
- Dribbble: https://dribbble.com/sujoykr
