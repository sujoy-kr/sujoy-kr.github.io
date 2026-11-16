// Finish reference-led art directions using original screenshots, not compressed drafts.
// node scripts/render-covers.mjs --playwright-dir /path/to/node_modules [--slug project]
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

const root = fileURLToPath(new URL('../', import.meta.url));
const workspace = path.dirname(root);
const argument = name => { const i = process.argv.indexOf(name); return i < 0 ? undefined : process.argv[i + 1]; };
const require = createRequire(argument('--playwright-dir') ? path.resolve(argument('--playwright-dir'), 'cover-loader.cjs') : import.meta.url);
const { chromium } = require('playwright');
const specs = JSON.parse(readFileSync(path.join(root, 'scripts/cover-specs.json')));
const projects = JSON.parse(readFileSync(path.join(root, 'src/data/projects.json')));
// Explicit user-requested exceptions; other Client work covers remain protected.
const clientCoverExceptions = new Set(['regro-media', 'eappair']);
const directory = path.join(root, 'docs/design/covers');
const selected = argument('--slug');
if (selected && !specs.some(s => s.slug === selected)) throw new Error(`Unknown cover: ${selected}`);
mkdirSync(path.join(directory, 'plates'), { recursive: true });
const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

async function panel(spec, plate, index) {
  const original = path.join(workspace, plate.file);
  let source = original;
  if (plate.crop) {
    const [left, top, width, height] = plate.crop;
    source = path.join(directory, 'plates', `${spec.slug}-${index}.png`);
    await sharp(original).extract({ left, top, width, height }).png().toFile(source);
  }
  const imagePath = path.relative(directory, source).split(path.sep).map(encodeURIComponent).join('/');
  const position = spec.board ? '' : `left:${plate.x}px;top:${plate.y}px;`;
  return `<figure style="${position}width:${plate.width}px;height:${plate.height}px"><img src="${imagePath}" alt="${escape(plate.file)}"></figure>`;
}

async function composition(spec, project) {
  const fragments = (await Promise.all(spec.panels.map((plate, i) => panel(spec, plate, i)))).join('\n');
  const board = spec.board;
  const content = board ? `<div class="board" style="width:${board.width}px;grid-template-columns:repeat(${board.columns},1fr);gap:${board.gap}px;transform:translate(-50%,-50%) rotate(${board.rotation}deg)">${fragments}</div>` : fragments;
  const css = readFileSync(path.join(root, 'scripts/cover-layout.css'), 'utf8');
  return `<!doctype html><html lang="en"><meta charset="utf-8"><title>${escape(project.title)} artistic cover</title><style>${css}</style><body>${content}<div class="veil" aria-hidden="true" style="background:rgba(0,0,0,${spec.overlay})"></div></body></html>`;
}

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/usr/bin/google-chrome', headless: true, args: ['--no-sandbox'] });
try {
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 2 });
  for (const spec of specs.filter(s => !selected || s.slug === selected)) {
    const project = projects.find(p => p.slug === spec.slug);
    if (!project || project.group === 'Mobile' || (project.client && !clientCoverExceptions.has(spec.slug))) throw new Error(`Protected project: ${spec.slug}`);
    const html = path.join(directory, `${spec.slug}.html`);
    writeFileSync(html, await composition(spec, project));
    await page.goto(pathToFileURL(html).href, { waitUntil: 'load' });
    await page.locator('img').evaluateAll(images => Promise.all(images.map(image => image.decode())));
    const overlay = await page.locator('.veil').evaluate(e => getComputedStyle(e).backgroundColor);
    if (overlay !== 'rgba(0, 0, 0, 0.3)') throw new Error(`Incorrect overlay: ${spec.slug}`);
    const png = path.join(directory, `${spec.slug}.png`);
    await page.screenshot({ path: png, animations: 'disabled' });
    const folder = path.join(root, 'public/images', spec.slug);
    // Lossless encoding preserves small interface text and antialiased diagonal edges.
    await sharp(png).webp({ lossless: true, effort: 6 }).toFile(path.join(folder, 'thumbnail.webp'));
    const metadata = JSON.parse(readFileSync(path.join(folder, 'gallery.json')));
    metadata.thumbnail = {
      source: `portfolio-nextjs/docs/design/covers/${spec.slug}.html`,
      caption: `${project.title} · reference-led artistic screenshot composition`,
      kind: 'artistic-composition', width: 3200, height: 1800,
      overlay: spec.overlay,
      artDirection: `portfolio-nextjs/docs/design/art-direction/${spec.slug}.png`,
      reference: spec.reference,
    };
    writeFileSync(path.join(folder, 'gallery.json'), JSON.stringify(metadata, null, 2) + '\n');
    console.log(`Finished ${spec.slug}: 3200 × 1800, lossless WebP, 30% full-image black overlay.`);
  }
} finally { await browser.close(); }
