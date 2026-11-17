// Regro Media thumbnail in the Studio Website style: two rounded full-page slices on a flat brand-colour ground.
// node scripts/build-regro-thumbnail.mjs
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const sharp = createRequire(import.meta.url)('sharp');
const root = fileURLToPath(new URL('../', import.meta.url));
const folder = path.join(root, 'public/images/regro-media');
const W = 2400, H = 1800, RADIUS = 34, PANEL_W = 1068, SCALE = PANEL_W / 1920;
const BACKGROUND = '#6fd498'; // Regro brand green, toned down
const slices = [{ x: 80, y: 74, top: 0 }, { x: 1252, y: 0, top: 3200 }]; // left: page top; right: continuation, bleeding off the top edge

const source = path.join(folder, 'image1.webp');
const layers = [];
for (const s of slices) {
  const height = H - s.y - (s.y === 0 ? 74 : 0);
  const crop = await sharp(source, { limitInputPixels: false })
    .extract({ left: 0, top: s.top, width: 1920, height: Math.round(height / SCALE) })
    .resize({ width: PANEL_W, height }).png().toBuffer();
  // Round only the corners that sit inside the canvas, as in the Studio Website cover.
  const top = s.y > 0, r = RADIUS;
  const d = top
    ? `M0 ${r}Q0 0 ${r} 0H${PANEL_W - r}Q${PANEL_W} 0 ${PANEL_W} ${r}V${height}H0Z`
    : `M0 0H${PANEL_W}V${height - r}Q${PANEL_W} ${height} ${PANEL_W - r} ${height}H${r}Q0 ${height} 0 ${height - r}Z`;
  const mask = Buffer.from(`<svg width="${PANEL_W}" height="${height}"><path d="${d}" fill="#fff"/></svg>`);
  layers.push({ input: await sharp(crop).composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer(), left: s.x, top: s.y });
}
await sharp({ create: { width: W, height: H, channels: 3, background: BACKGROUND } })
  .composite([...layers, { input: { create: { width: W, height: H, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0.3 } } } }]) // 30% black veil like the other covers
  .webp({ quality: 92, effort: 6 }).toFile(path.join(folder, 'thumbnail.webp'));
console.log(`regro-media thumbnail ${W}×${H}`);
