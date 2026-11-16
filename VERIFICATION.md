# Website verification

Verified locally on 16 November 2026. Website changes are confined to `portfolio-nextjs/`; original project repositories remain read-only sources.

## Passed checks

- `npm run build`: production build and static export of all 47 case studies plus the main site pages.
- `npm run typecheck`: strict TypeScript checking.
- `npm test`: seven checks covering all 37 source repositories and ten earlier client entries, unique routes and substantive descriptions, GitHub-button rules, per-project folders and provenance, complete source screenshot sets, automatic image discovery/numeric ordering, duplicate filename rejection, and featured ordering.
- Actual Chrome/Playwright against the export: every project page returned HTTP 200, showed its overview/engineering content and expected source button, and loaded every image after expanding its full gallery. No broken decoded images or browser page exceptions were observed.
- Theme checks: first visit follows a dark operating-system setting; switching to light updates the page and persists across reload/navigation; subsequent operating-system changes respect the explicit choice; switching back to dark persists too.
- Gallery checks: all-image expansion, next-image button, left-arrow keyboard navigation and Escape dismissal. Social Feed exposes all 20 images; NextSet includes all 11 native captures.
- Collection checks: navigation, featured/client/mobile filters, technology search, empty-state reset and alphabetical sorting.
- Mobile checks: home, collection, about, contact, NextSet and Safoyana at 390 × 844 in both themes, plus the home page at 320px. No horizontal page overflow.
- Desktop/mobile screenshots visually inspected in both themes. Imported raster imagery inspected in labelled contact sheets. Documentation links and asset provenance are checked separately.

## Image organisation

205 gallery images across 47 project folders, each with its own `thumbnail` and numbered `image1`, `image2`, etc. The portrait is separate under `public/images/profile/`. `gallery.json` holds optional captions and provenance; generated indexes are refreshed by `npm run images` and the dev/build/test lifecycle scripts.

Screenshots, design assets, diagrams and historical research reports retain their context. Original illustrations remain explicitly labelled as artwork. Source repositories, original screenshots and client material were not overwritten. Small app icons and raw product-stock libraries are excluded from galleries because they do not document application screens.

## Verification boundaries

The browser checks verify this portfolio, not new runtime success for the applications it describes. Existing project verification and blockers are described in the case studies. No remote demos, email delivery, external AI service, deployment, business result or native emulator session was asserted or tested during this update.

The QA server was stopped after verification. Nothing was committed, pushed or deployed.

## Thumbnail-only cover update

Thumbnail matches are excluded from the lower gallery by shared original-source metadata or identical file contents. All 205 numbered source files remain available; 163 additional images are displayed after removing 42 cover duplicates. Cover-only projects omit the gallery section and gallery navigation link. Counts reflect the additional images. Eight content/regression tests and the production build passed for this change; the new regression covers resized copies, byte-identical copies and projects with no additional images.

Targeted Chrome checks passed for Safoyana, NextSet, Kyra and a cover-only project: one top cover, correct remaining gallery counts, working image dialog, no empty gallery or dangling gallery link, and no browser exceptions. The temporary test server was stopped.

## Vertical galleries and presentation update

Galleries now display every additional image in one full-width column at its natural aspect ratio. Visible image captions, screen numbers, overlays and the show-more step are removed. The expanded dialog supports 100–800% zoom, reset, double-click zoom, mouse dragging and scrolling, previous/next buttons, keyboard arrows and Escape. Closing the viewer restores page scrolling; changing projects remounts its gallery state.

Public stack labels omit HTML, CSS, JavaScript and Bootstrap. The 15 projects using only that stack now show a project focus and design/experience copy in place of stack lists. Original stack metadata remains available in the source data.

Verification: eight content tests, production build and strict TypeScript checks passed. Chrome verified all 47 pages, every additional gallery image, full-width layout/natural proportions, no visible gallery captions, and the absence of basic stack mentions on the 15 relevant detail pages. Zoom, reset, double-click, drag-to-pan, image changes and scroll restoration passed. Existing theme/filter/search checks and 12 mobile theme/layout checks passed. A separate 320px viewer check passed for zoom, next-image reset, controls fitting the dialog and closing. New desktop gallery/zoom and mobile viewer screenshots were captured for visual review.

## Project-focused presentation and masonry gallery

Removed the public scope/limitations panels, audit/evidence cards, capture-environment commentary, gallery-count facts and cover provenance captions. Project facts show discipline and, where appropriate, the technology stack. Basic frontend work continues to emphasise its design and purpose. Earlier client entries are grouped as Client work.

Project copy now describes implemented features and engineering choices directly. Notepad AI reflects the developer’s confirmation that Ollama was tested during development. Its cover uses the existing repository screenshot displaying a selected local model and an assistant response; the original image was optimised, without altering its content. Previous audit records remain separate from the public case studies.

Galleries now use two masonry columns for mixed images, three for portrait collections, and one on small screens. Regular previews preserve their proportions, phone-screen previews have a bounded height, and long pages show a compact top preview. The full source remains available in the existing expandable, zoomable viewer. Thumbnail duplicates remain excluded.

Passed: nine content/regression tests, production build, strict TypeScript, and the complete Chrome check across all 47 pages. Browser assertions cover compact previews, all gallery images, exactly the requested fact labels, absence of public audit panels/setup notes, zoom/panning/navigation, theme persistence, search/filter/sort and mobile overflow. Mixed-gallery, portrait-gallery, research-gallery and mobile screenshots were captured and visually reviewed. The QA server was stopped; no deployment or remote changes were made.

## Client-work curation and Regro capture

The collection now contains 45 case studies. Kyra, eAppair and Regro Media belong to Client work (13 entries total). The separate LAB article layout and previous portfolio case studies were removed; the related article-layout contribution is described within LAB. The Websites filter was removed, with no projects left in that category. Removed routes are absent from the static export.

Regro dependencies were installed with `npm ci --ignore-scripts`, its local SvelteKit/Vite application ran on loopback, and `npm run build` passed. Chrome captured its actual homepage at 1440 × 6334 plus a 1440 × 1000 overview, with all fourteen local images and fonts loaded and no browser page exceptions. Original PNGs are under `regro-media/docs/screenshots/`; the portfolio uses an optimised overview thumbnail and full-page `image2.webp`, preserving the earlier hero design asset. Regro source/UI was unchanged; a small `.gitignore` excludes installed/generated directories. Existing compiler accessibility warnings remain in the build log.

Nine content/regression tests, the portfolio production build and strict TypeScript passed. The full Chrome suite passed across all 45 case studies, with 13 client-filter results, no Websites filter, valid galleries and the existing theme/zoom/mobile checks. Both local preview servers were stopped. No commit, push or deployment was performed.

## Combined case studies, technical names and refreshed covers

The current collection has 42 case studies and 14 Client work entries. LAB combines the public website, related article presentation and admin interface; Medikart combines its storefront and API; DermaCare combines the cosmetics storefront and API. Both source repositories are linked on each combined page, and source-repository coverage is preserved in the metadata. Previous separate frontend/backend routes are removed from the export. Existing unused asset folders and the user's existing gallery edits are preserved.

Project names now track the repositories more closely, including Microservice Ecommerce, Instagram Clone, Medicine Data Scraper with Proxy Rotation, BDJobs Scraper, P2P File Stream, Secure Note Taking, Photo Editor Backend and the platform-specific Android entries.

GSG is in Client work and links to the supplied public website. Six real public pages (Home, Business, Products, Fabrics, About, Contact) were captured at 1440px width with fonts/images settled. The About-page counters completed naturally before the final capture. All returned HTTP 200; no visible missing images were found. Original full-page and overview PNGs plus a capture manifest are under `GSG-PHP/docs/screenshots/live-site/`. Optimised copies supplement the existing local catalogue/admin screenshots. No forms were submitted or remote data changed.

NextSet's new thumbnail is a built-in AI-generated cover composition using the original home and weekly-analysis screenshots as references. The actual Android captures remain in its gallery. The generated PNG is retained at `docs/design/nextset-cover.png`; the final prompt and tool details are in `docs/NEXTSET-COVER.md`. The website uses `public/images/nextset/thumbnail.webp`.

Passed: ten content/regression tests, production build, strict TypeScript, the complete browser suite across all 42 case studies, all 168 gallery images, repository-link assertions, category/search/sort/theme checks and existing mobile/gallery controls. Additional checks covered both links on each merged case study, the long technical title at mobile width, absence of old duplicate routes, valid SVG assets and documentation links. New featured-cover and merged-page screenshots were visually reviewed. The local QA server was stopped; nothing was committed, pushed or deployed.

## Safoyana product photography, canteen demo and Hood Up captures (2026-11-16)

- Generated six realistic fictional print-product photos with the built-in imagegen tool, saved under `Safoyana-Digital-Print/frontend/public/demo-products/`. Exact prompts and provenance are recorded in that project's `docs/DEMO-PRODUCT-IMAGES.md`. Updated the restricted local demo seed to use product, stock and category photographs. Repeat seeding was verified to preserve all eight existing demo orders.
- Ran Safoyana's actual frontend/API against a temporary loopback PostgreSQL 17 database, logged in through the UI and recaptured all six catalogue, configuration, admin and order-detail screens. Verified all six catalogue photographs decode and that the capture flow produced no browser/API errors. Both application builds and all 23 backend tests passed.
- Ran CSE302's actual React/Express application against a temporary loopback MariaDB 11.8 database populated from its fictional SQL fixtures. Added optional environment-based connection/port settings and a guarded demo seed with working bcrypt logins. Captured 13 desktop views at 1440 × 1000, including all eight reports, with no browser/API errors. Its frontend build passed. Verified seed guards reject remote/non-demo databases and missing passwords, and invalid database identifiers are rejected. Original report-query limitations are recorded in `CSE302-project/docs/DEMO.md`.
- Converted all 17 supplied Hood Up screenshots to WebP at their original dimensions. Retained every supplied screen in the gallery and used a separately encoded customer-home copy as the thumbnail. Removed obsolete illustration metadata.
- Refreshed generated gallery/provenance indexes: 42 projects and 193 additional gallery images. Portfolio tests (10), TypeScript checking and static build passed. Chrome verified all images in the three updated galleries load on desktop and mobile, gallery counts match, lightbox wraparound and theme toggles work, and there is no horizontal overflow or browser error. Asset metadata dimensions and exported files were checked against the actual WebP files.
- Preview servers and temporary demo database processes were stopped after verification. No deployment was performed.

## Hood Up cover and gallery pruning (2026-11-16)

Removed metadata for the three deleted Hood Up images (`image3.webp`, `image9.webp`, `image13.webp`). The gallery now contains 14 screenshots, with numbering preserved. Generated a 1536 × 1024 two-phone cover using NextSet’s studio composition as a style reference and Hood Up’s original home/workshop screens as screen references. Saved the generated PNG in `docs/design/hood-up-cover.png`, the optimized website cover in `public/images/hood-up-cse489/thumbnail.webp`, and the exact prompt in `docs/HOOD-UP-COVER.md`. Original gallery files were retained unchanged.

Portfolio tests (10), type checking and static build passed. Chrome verified the new cover and all 14 gallery images on desktop and mobile, working lightbox, and no overflow or browser errors. The collection card was visually reviewed. Deleted images are absent from the exported assets. The full portfolio index now contains 190 gallery images.

## Safoyana capture correction and collage covers (2026-11-16)

The dim dashboard capture was traced to screenshots taken during nested CSS fade-in and Recharts animations. Added a reusable local capture helper that waits for final CSS opacity, fonts, image decoding and chart rendering, and moves the pointer away from chart tooltips. Re-ran the actual local Next.js/NestJS/PostgreSQL demo and captured 18 populated views (17 desktop, one mobile), including twelve additional customer/admin views. The helper completed without browser or HTTP errors; the corrected dashboard and charts were visually reviewed. A fictional local artwork upload populates the cart without submitting an order. No application code or production data was changed for these captures.

Rendered eighteen code-native HTML/CSS collage covers using real screenshots, source excerpts and original project artwork. Architecture/source covers are labelled accordingly; they do not represent invented application screens. Original covers are archived with their provenance, and byte-identical old placeholder SVGs remain archived instead of appearing in galleries. Screenshot covers retain full brightness. All four mobile covers, fourteen Client work covers and six existing archived collage covers were verified byte-for-byte unchanged (24 excluded covers). Recipes and editable compositions are documented in `docs/COVER-DESIGN.md`.

Validation: portfolio content tests (10), TypeScript checking and static build passed. All eighteen new covers are 1600 × 1000 WebP files. All eighteen Safoyana image dimensions match their metadata. Chrome decoded all 42 collection thumbnails, visited all eighteen redesigned case studies and their full galleries, tested the expanded Safoyana lightbox, and checked representative mobile pages, theme switching and overflow. No broken images, page errors or HTTP errors occurred. Desktop collection/card compositions were visually reviewed. The static export contains all updated assets, with 208 gallery images overall. Local demo and preview processes were stopped after verification.

## Reference-led artistic thumbnail revision (2026-11-16)

Replaced the earlier repeated browser-window treatment with seven reference-specific artistic screenshot compositions. The built-in imagegen tool generated separate art directions from the supplied Clipping, Portability, Stay Low Key, Landify and Plaidea covers; exact prompts and inputs are recorded under `docs/design/art-direction/`. Final exports were recomposed from original screenshot plates at 3200 × 1800, using flat asymmetric mosaics or consistent diagonal strips, no added browser frames/source panels, and one exact 30% translucent black layer over the whole artwork. Raw gallery screenshots were not dimmed. Website assets use lossless WebP; decoded WebP pixels were verified identical to their PNG masters. New cards show the complete composition instead of cropping it.

Restored original covers for eleven projects without interface captures (scripts/API-only entries plus LAB, Medikart and DermaCare), verified byte-for-byte against the archived originals. All twenty-four excluded mobile, Client work and existing collage covers were verified unchanged. The finishing renderer now allows only the seven screenshot-backed projects, preventing source-only covers from being overwritten.

Validation: all 11 content/regression tests, TypeScript checking and static build passed. Browser checks passed on desktop and mobile: all 42 collection thumbnails decode, the seven artistic covers display completely at their native 3200 × 1800 dimensions, galleries retain their expected counts and full opacity, the Safoyana lightbox works, themes switch, and pages do not overflow horizontally. No browser or HTTP errors were observed. Restored SVGs are exported without stale generated WebP covers. Desktop Safoyana and Reclaim cards were visually reviewed. The portfolio retains 208 gallery images.

## Regro Media and eAppair artistic covers (2026-11-16)

Added the two explicitly requested Client work exceptions to the artistic cover allowlist. Regro Media uses Landify-inspired diagonal page strips; eAppair uses a Plaidea-inspired asymmetric mosaic. Built-in imagegen art directions and exact prompts are archived under `docs/design/art-direction/`. Final covers use native-resolution crops of the supplied full-page captures, 3200 × 1800 PNG masters, lossless WebP exports, and one 30% full-image black overlay. Original covers and metadata are archived.

All 40 other thumbnails and the three original Regro/eAppair gallery files were verified byte-for-byte unchanged. Both WebPs decode to the exact pixels of their PNG masters. All 11 tests, type checking and static build passed. Chrome desktop/mobile checks passed for complete cover presentation, original gallery counts, image decoding, lightboxes and overflow, without browser or HTTP errors. Collection cards were visually reviewed. The portfolio remains at 42 projects and 208 gallery images.

## Homepage hero and unframed project thumbnails (2026-11-16)

Replaced the homepage’s nested Safoyana collage and NextSet list screen with a dedicated GSG homepage crop (1920 × 1152) and Hood Up workshop capture (810 × 1794), with matching project links and accessible descriptions. Hero assets are listed in the generated provenance index. Browser imagery keeps its natural proportions at all breakpoints.

Removed padding, colored panels, borders, shadows, badges and arrow decoration from project thumbnail links. The images fill rounded 16:9 links directly, with a small hover zoom. Existing project navigation and gallery lightbox/zoom behavior are retained. Original project thumbnail/gallery asset files were not edited.

All 11 content tests, type checking and static builds passed. Chrome checked both themes at desktop/mobile widths: all 42 thumbnails match their link bounds without gaps, padding, borders or shadows; corners remain rounded; hover scaling, project links and gallery enlargement/zoom work. Dedicated hero checks at 390, 768, 1024 and 1440 px confirm natural image proportions and no horizontal overflow. No image decode failures, page errors or HTTP errors were observed. Hero and collection screenshots were visually reviewed.

## Natural thumbnail proportions (2026-11-16)

Removed the forced 16:9 project thumbnail frame and 100% image height. The gallery index now supplies the thumbnail’s original width and height to Next Image; CSS scales width responsively with automatic height. The existing 1200 × 800 illustration fallback matches the actual SVGs. Rounded corners, zero padding and hover zoom remain. No thumbnail assets were edited.

All 12 tests (including the new 3:2, 4:3, 16:9 and illustration-fallback regression test), type checking and static build passed. Chrome verified all 40 image render ratios and HTML dimension ratios against their natural image sizes at 320, 390, 768, 1024 and 1440 px. Thumbnail links have no gap or padding, hover zoom does not move the layout, filters and themes work, and no horizontal overflow or browser/HTTP errors were observed. Desktop collection and mobile-app cover proportions were visually reviewed.

## Complete thumbnail overlay coverage (2026-11-16)

Audited all 40 project covers. Nine artistic exports and seventeen archived collage covers already contain darkening. Recorded the archived covers’ baked-overlay status and added conditional 30% black-equivalent CSS shading to the fourteen remaining covers (two mobile covers, G.S. Garments Ltd., and eleven illustration covers). The effect applies to collection thumbnails and the corresponding main case-study cover; gallery screenshots and homepage hero images remain unaffected. Existing image assets were not edited, resized or re-encoded.

All 13 tests, including baked-overlay detection regression coverage, type checking and static build passed. Chrome desktop/mobile checks verified fourteen shaded displays and twenty-six unchanged baked-overlay displays, preserved native ratios, hover zoom, theme switching, cover shading on representative case studies, clear gallery screenshots, and no overflow or browser/HTTP errors. SHA-256 checks confirmed all forty thumbnail asset files are byte-for-byte unchanged. The updated desktop collection was visually reviewed.
