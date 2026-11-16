import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
const root = fileURLToPath(new URL("../", import.meta.url));
const supported = /\.(png|jpe?g|webp|avif|gif|svg)$/i;

/** Filenames are the source of truth; gallery.json only adds optional captions and attribution. */
export function scanGallery(folder, slug) {
  const files = readdirSync(folder).filter((name) => supported.test(name));
  const thumbnails = files.filter((name) => /^thumbnail\./i.test(name));
  if (thumbnails.length !== 1)
    throw new Error(`${slug}: keep exactly one thumbnail image.`);
  const numbered = files
    .filter((name) => /^image[1-9]\d*\./i.test(name))
    .sort((a, b) => Number(a.match(/\d+/)[0]) - Number(b.match(/\d+/)[0]));
  const numbers = numbered.map((name) => Number(name.match(/\d+/)[0]));
  if (new Set(numbers).size !== numbers.length)
    throw new Error(
      `${slug}: duplicate image number; use one file per number.`,
    );
  const metadataPath = path.join(folder, "gallery.json");
  const metadata = existsSync(metadataPath)
    ? JSON.parse(readFileSync(metadataPath, "utf8"))
    : {};
  const thumbnailBytes = readFileSync(path.join(folder, thumbnails[0]));
  const thumbnailSource = metadata.thumbnail?.source;
  const galleryFiles = numbered.filter((file) => {
    const source = metadata.images?.[file]?.source;
    // Imported thumbnails can have different dimensions from the same source image.
    if (thumbnailSource && source === thumbnailSource) return false;
    return !readFileSync(path.join(folder, file)).equals(thumbnailBytes);
  });
  const images = galleryFiles.map((file, i) => {
    const details = metadata.images?.[file] ?? {};
    return {
      src: `/images/${slug}/${file}`,
      caption:
        details.caption ??
        (file.endsWith(".svg")
          ? "Project artwork · not an application screenshot"
          : `Project image ${i + 1}`),
      kind: details.kind ?? "user",
      width: details.width ?? 1440,
      height: details.height ?? 1000,
      source: details.source ?? "User-maintained local asset",
    };
  });
  return {
    thumbnail: `/images/${slug}/${thumbnails[0]}`,
    thumbnailWidth: metadata.thumbnail?.width ?? 1200,
    thumbnailHeight: metadata.thumbnail?.height ?? 800,
    thumbnailOverlayBaked:
      metadata.thumbnail?.overlayBaked === true ||
      (typeof metadata.thumbnail?.overlay === "number" && metadata.thumbnail.overlay > 0),
    ...(metadata.thumbnail?.kind === "artistic-composition"
      ? { thumbnailPresentation: "artistic" }
      : {}),
    thumbnailSource:
      metadata.thumbnail?.source ?? "User-maintained local asset",
    images,
  };
}

function writeIfChanged(file, value) {
  const text = JSON.stringify(value, null, 2) + "\n";
  if (!existsSync(file) || readFileSync(file, "utf8") !== text)
    writeFileSync(file, text);
}
export function syncImages() {
  const projects = JSON.parse(
    readFileSync(path.join(root, "src/data/projects.json"), "utf8"),
  );
  const galleries = {};
  const provenance = [];
  for (const project of projects) {
    const gallery = scanGallery(
      path.join(root, "public/images", project.slug),
      project.slug,
    );
    galleries[project.slug] = gallery;
    provenance.push({
      file: gallery.thumbnail.slice(1),
      source: gallery.thumbnailSource,
    });
    for (const image of gallery.images)
      provenance.push({ file: image.src.slice(1), source: image.source });
  }
  provenance.push({
    file: "images/profile/portrait.webp",
    source: "sujoykr/assets/img/about/sujoy-karmakar.png",
  });
  provenance.push(
    {
      file: "images/hero/gsg-home.webp",
      source: "portfolio-nextjs/public/images/gsg/image1.webp · homepage crop",
    },
    {
      file: "images/hero/hood-up-workshop.webp",
      source: "portfolio-nextjs/public/images/hood-up-cse489/image4.webp · workshop screen",
    },
  );
  writeIfChanged(path.join(root, "src/data/galleries.json"), galleries);
  writeIfChanged(path.join(root, "public/asset-sources.json"), provenance);
  console.log(
    `Indexed ${projects.length} project folders and ${Object.values(galleries).reduce((n, g) => n + g.images.length, 0)} gallery images.`,
  );
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href)
  syncImages();
