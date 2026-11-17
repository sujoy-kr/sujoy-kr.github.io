// Bakes the portfolio-wide 30% black veil into every thumbnail that has none yet.
// Idempotent: thumbnails whose gallery.json already says overlayBaked/overlay are skipped.
// node scripts/apply-thumbnail-overlay.mjs
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const sharp = createRequire(import.meta.url)('sharp');
const root = fileURLToPath(new URL('../public/images/', import.meta.url));
const OVERLAY = 0.3;
for (const slug of readdirSync(root)) {
  const folder = path.join(root, slug);
  const metaPath = path.join(folder, 'gallery.json');
  const file = ['thumbnail.webp', 'thumbnail.svg'].find(f => existsSync(path.join(folder, f)));
  if (!file || !existsSync(metaPath)) continue;
  const meta = JSON.parse(readFileSync(metaPath, 'utf8'));
  if (meta.thumbnail?.overlayBaked === true || meta.thumbnail?.overlay > 0) continue;
  const target = path.join(folder, file);
  if (file.endsWith('.svg')) {
    const svg = readFileSync(target, 'utf8');
    writeFileSync(target, svg.replace(/<\/svg>\s*$/, `<rect width="100%" height="100%" fill="#000" fill-opacity="${OVERLAY}"/></svg>`));
  } else {
    const { width, height } = await sharp(target).metadata();
    const veil = { create: { width, height, channels: 4, background: { r: 0, g: 0, b: 0, alpha: OVERLAY } } };
    const out = await sharp(target).composite([{ input: veil }]).webp({ quality: 95, effort: 6 }).toBuffer();
    writeFileSync(target, out);
  }
  meta.thumbnail = { ...meta.thumbnail, overlay: OVERLAY, overlayBaked: true };
  writeFileSync(metaPath, JSON.stringify(meta, null, 2) + '\n');
  console.log(`${slug}: ${OVERLAY * 100}% veil baked into ${file}`);
}
