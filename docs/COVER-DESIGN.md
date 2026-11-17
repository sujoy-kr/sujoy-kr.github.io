# Reference-led artistic covers

Ten projects with actual interface captures have new covers: Safoyana, Reclaim, Notepad AI, TalenTrack, P2P File Stream, Secure Note Taking, Canteen Manager, eAppair and Car Shop Management System. The earlier covers have been restored for eleven projects without interface captures, including the scripts and API-only projects. Mobile covers, other Client work entries and the six existing collage covers remain unchanged. eAppair is the two explicitly requested Client work exceptions.

## Reference analysis

Clipping, Portability, Stay Low Key and Plaidea use asymmetric mosaics of flat, square-edged page fragments with varied sizes and clean black gutters. Landify uses bold parallel diagonal page fragments. They have no added browser frames, rounded windows, drop shadows, source-code panels or invented architecture. A single translucent black veil tones the complete image. The new covers follow those specific differences instead of repeating one tilted-card template.

## Art direction and final assets

The built-in imagegen tool produced a separate reference-led art direction for each of the original nine projects, using the user's existing cover as a style reference and the original project screenshots as supporting inserts. Generated art directions and exact prompts are saved as `docs/design/art-direction/<slug>.png` and `<slug>.json`.

The final covers were recomposed from the original screenshots at **3200 × 1800**, following those art directions, so interface text and records remain authentic. The smaller generated concept images were not enlarged into website thumbnails. Cropped screenshot plates retain original pixels; the final browser render supersamples diagonal edges. A single exact **30% black overlay** covers the entire artwork. The complete export is encoded as **lossless WebP**, preserving the PNG master's decoded pixels. Raw gallery screenshots remain clear and unchanged.

- Website assets: `public/images/<slug>/thumbnail.webp`.
- Full-resolution PNG masters and editable HTML: `docs/design/covers/`.
- Reference mapping, source crops and layouts: `scripts/cover-specs.json`.
- Native finishing layout: `scripts/cover-layout.css`.

Collection cards use each thumbnail’s original dimensions and natural aspect ratio, showing the complete image without a fixed-ratio crop or stretching. Rounded corners and hover zoom are retained.

## Reproduce the final exports

With Playwright installed in the supplied development package directory:

```sh
node scripts/render-covers.mjs --playwright-dir /path/to/node_modules
# Regenerate one finished cover:
node scripts/render-covers.mjs --playwright-dir /path/to/node_modules --slug safoyana
npm run images
npm run build
```

The renderer’s allowlist includes only the ten screenshot-backed projects. eAppair is an explicit Client work exception; other client projects and all mobile projects remain protected. It cannot regenerate the restored scripts/API covers. Rejected composition files and unused source-thumbnail backups have been removed; active cover sources and regeneration inputs are retained.

## Safoyana captures

The eighteen original application captures remain available (seventeen desktop views and one mobile catalogue). Its dashboard capture waits for CSS fade-in and Recharts animations to finish; the intentional black overlay applies only to the artistic cover.

## Finished covers and exact imagegen prompts

- reclaim: [finished WebP](../public/images/reclaim/thumbnail.webp), [exact prompt and references](design/art-direction/reclaim.json).
- p2p-file-stream: [finished WebP](../public/images/p2p-file-stream/thumbnail.webp), [exact prompt and references](design/art-direction/p2p-file-stream.json).
- secure-note-taking: [finished WebP](../public/images/secure-note-taking/thumbnail.webp), [exact prompt and references](design/art-direction/secure-note-taking.json).
- cse302-project: [finished WebP](../public/images/cse302-project/thumbnail.webp), [exact prompt and references](design/art-direction/cse302-project.json).

- eappair: [finished WebP](../public/images/eappair/thumbnail.webp), [exact prompt and references](design/art-direction/eappair.json).

## Car Shop Management System

The Java desktop app uses a native screenshot mosaic following Plaidea, with the same square-edged crops, black gutters, 30% overlay and 3200 × 1800 lossless export. Its eight lossless Swing captures remain separate in the gallery and also supply the cover renderer. This cover is composed directly from those captures without a generated concept image. See [capture provenance, reproduction and verification](CAR-SHOP.md).

## Flat mosaic covers: GSG, MediKart, Safoyana, DermaCare, Lovebird (LAB)

Rebuilt in the flat, unrotated style of Plaidea / Staylowkey / eAppair: 5–6 square-edged screenshot fragments on black with a single 30% black veil. Each fragment is a uniform-scale crop of the project's own gallery screenshot (no distortion, no generated art). Layouts and crops live in `scripts/build-cover-specs.mjs` (writes `scripts/cover-specs.json`); render with `scripts/render-covers.mjs`. GSG exports at 3200 × 1800; the others at 1600 × 900 so 960px-wide sources are never upscaled.
