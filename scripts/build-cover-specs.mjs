// Builds flat 16:9 mosaic specs (Plaidea / Staylowkey style) for gallery-backed covers.
// Each panel is a native-pixel crop of a gallery screenshot at a uniform scale (no distortion).
// node scripts/build-cover-specs.mjs   → merges entries into scripts/cover-specs.json
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const sharp = createRequire(import.meta.url)('sharp');
const layouts = {
  A: [[40, 35, 830, 540], [915, 35, 645, 300], [915, 375, 645, 490], [40, 615, 400, 250], [480, 615, 390, 250]],
  C: [[40, 35, 830, 830], [915, 35, 645, 400], [915, 470, 645, 395]],
  B: [[30, 60, 460, 370], [540, 40, 520, 380], [1110, 0, 490, 360], [30, 470, 360, 420], [430, 470, 560, 430], [1040, 400, 560, 500]],
};
// panel: [image, left, top, scale (css px per source px)]
const covers = {
  medikart: { layout: 'A', dpr: 1, panels: [[1, 0, 0, 0.865], [4, 0, 0, 0.672], [2, 0, 0, 0.672], [17, 0, 0, 0.417], [23, 0, 0, 0.407]] },
  dermacare: { layout: 'A', dpr: 1, panels: [[1, 0, 0, 0.865], [4, 0, 0, 0.672], [2, 0, 0, 0.672], [14, 0, 0, 0.417], [19, 0, 0, 0.407]] },
  safoyana: { layout: 'A', dpr: 1, panels: [[7, 0, 0, 0.576], [2, 0, 0, 0.448], [6, 0, 0, 0.448], [10, 0, 0, 0.4], [3, 0, 0, 0.4]] },
  gsg: { layout: 'C', dpr: 2, panels: [[1, 0, 0, 0.433], [3, 0, 150, 0.336], [7, 0, 0, 0.336]] },
  'talentrack-ai-powered-recruitment-platform': { layout: 'A', dpr: 2, panels: [[1, 0, 0, 0.434], [4, 0, 0, 0.3225], [2, 0, 0, 0.363], [5, 0, 0, 0.26], [6, 0, 0, 0.26]] },
  'notepad-ai': { layout: 'A', dpr: 1, panels: [[1, 0, 0, 0.576], [3, 0, 0, 0.336], [2, 0, 0, 0.5], [2, 0, 0, 0.28], [3, 0, 0, 0.26]] },
  lab: { layout: 'B', dpr: 1, panels: [[2, 0, 0, 0.479], [1, 0, 0, 0.542], [10, 0, 0, 0.511], [14, 0, 0, 0.375], [15, 0, 0, 0.584], [9, 0, 0, 0.584]] },
};
const file = path.join(root, 'scripts/cover-specs.json');
const specs = JSON.parse(readFileSync(file, 'utf8'));
for (const [slug, c] of Object.entries(covers)) {
  const panels = [];
  for (const [i, [image, left, top, scale]] of c.panels.entries()) {
    const [x, y, width, height] = layouts[c.layout][i];
    const f = `portfolio-nextjs/public/images/${slug}/image${image}.webp`;
    const meta = await sharp(path.join(root, 'public/images', slug, `image${image}.webp`)).metadata();
    const w = Math.round(width / scale), h = Math.round(height / scale);
    if (left + w > meta.width + 1 || top + h > meta.height + 1) throw new Error(`${slug} panel ${i}: crop ${w}x${h}@${left},${top} exceeds ${meta.width}x${meta.height}`);
    panels.push({ file: f, x, y, width, height, crop: [left, top, Math.min(w, meta.width - left), Math.min(h, meta.height - top)] });
  }
  const entry = { slug, reference: 'plaidea', dpr: c.dpr, panels, overlay: 0.3 };
  const at = specs.findIndex(s => s.slug === slug);
  at < 0 ? specs.push(entry) : (specs[at] = entry);
}
writeFileSync(file, JSON.stringify(specs, null, 2) + '\n');
