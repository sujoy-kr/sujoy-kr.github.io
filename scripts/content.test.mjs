import test from "node:test";
import assert from "node:assert/strict";
import {
  readFileSync,
  existsSync,
  mkdtempSync,
  writeFileSync,
  rmSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { scanGallery } from "./sync-images.mjs";
const root = fileURLToPath(new URL("../", import.meta.url));
const data = JSON.parse(
  readFileSync(path.join(root, "src/data/projects.json"), "utf8"),
);
const galleries = JSON.parse(
  readFileSync(path.join(root, "src/data/galleries.json"), "utf8"),
);
const projects = data.map((p) => ({ ...p, ...galleries[p.slug] }));
test("curated collection includes the requested 41 projects and 15 client works", () => {
  const excluded = new Set(["lab-article-html", "sujoykr", "medikart-android", "DermaCare-android"]);
  const repos = readFileSync(path.join(root, "scripts/fixtures/repolist.txt"), "utf8")
    .trim()
    .split(/\r?\n/)
    .map((url) => url.split("/").at(-1))
    .filter((repo) => !excluded.has(repo));
  const repositoryProjects = projects.filter(
    (project) => !["sujoykr", "studio-website"].includes(project.repo),
  );
  assert.equal(projects.length, 41);
  assert.equal(
    repositoryProjects.flatMap((project) => project.sourceRepos).length,
    repos.length,
  );
  assert.deepEqual(
    new Set(repositoryProjects.flatMap((project) => project.sourceRepos)),
    new Set(repos),
  );
  assert.equal(projects.filter((project) => project.client).length, 15);
  for (const slug of ["kyra", "eappair", "regro-media", "gsg"]) {
    const project = projects.find((project) => project.slug === slug);
    assert.equal(project.group, "Client work");
    assert.equal(project.client, true);
  }
  assert.ok(projects.every((project) => project.group !== "Websites"));
  assert.ok(
    projects.every(
      (project) => !["lab-article-html", "sujoykr", "medikart-android", "dermacare-android"].includes(project.slug),
    ),
  );
  assert.deepEqual(
    projects.filter(project => project.group === "Mobile").map(project => project.slug),
    ["nextset", "hood-up-cse489"],
  );
});
test("unique routes have substantive overview and implementation sections", () => {
  assert.equal(new Set(projects.map((p) => p.slug)).size, projects.length);
  assert.equal(new Set(projects.map((p) => p.order)).size, projects.length);
  for (const p of projects) {
    assert.match(p.slug, /^[a-z0-9-]+$/);
    assert.ok(p.overview.length > 150, p.slug);
    assert.ok(p.engineering.length > 150, p.slug);

    assert.ok(p.highlights.length >= 2);
    assert.ok(p.technologies.length >= 2);
    assert.ok(p.audience.length > 10);
  }
});
test("only private-repo and studio projects omit public source buttons", () => {
  for (const p of projects) {
    if (["GSG-PHP", "studio-website", "LAB-Main-Svelte", "Safoyana-Digital-Print", "mapveto", "regro-media", "medikartFrontend", "cosmeticsEcom-frontend"].includes(p.repo))
      assert.equal(p.github, null);
    else assert.equal(p.github, `https://github.com/sujoy-kr/${p.repo}`);
  }
});
test("all thumbnails and numbered gallery images use their project folder and have provenance", () => {
  const sources = JSON.parse(
    readFileSync(path.join(root, "public/asset-sources.json"), "utf8"),
  );
  for (const p of projects) {
    assert.match(
      p.thumbnail,
      new RegExp(
        `^/images/${p.slug}/thumbnail\\.(webp|png|jpg|jpeg|svg|avif|gif)$`,
      ),
    );
    assert.ok(existsSync(path.join(root, "public", p.thumbnail)));
    assert.ok(
      p.images.every((image) => image.source !== p.thumbnailSource),
      p.slug,
    );
    for (const im of p.images) {
      assert.match(
        im.src,
        new RegExp(
          `^/images/${p.slug}/image[1-9][0-9]*\\.(webp|png|jpg|jpeg|svg|avif|gif)$`,
        ),
      );
      assert.ok(existsSync(path.join(root, "public", im.src)), im.src);
      assert.ok(
        sources.some((s) => "/" + s.file === im.src),
        im.src,
      );
      if (im.kind === "artwork" || im.kind === "asset")
        assert.match(im.caption, /not an application screenshot/);
    }
  }
});
test("all available screenshot sets are included, rather than the earlier partial galleries", () => {
  const expected = {
    safoyana: 19,
    nextset: 12,
    gsg: 10,
    "cse302-project": 14,
    "hood-up-cse489": 15,
    reclaim: 19,
    "notepad-ai": 4,
    "p2p-file-stream": 5,
    "secure-note-taking": 5,
    "talentrack-ai-powered-recruitment-platform": 7,
    "instagram-clone": 20,
    clipping: 9,
    landify: 7,
    staylowkey: 8,
  };
  for (const [slug, count] of Object.entries(expected))
    assert.equal(
      new Set([
        galleries[slug].thumbnailSource,
        ...galleries[slug].images.map((image) => image.source),
      ]).size,
      count,
      slug,
    );
});
test("new image files are discovered in numeric order without editing project data", () => {
  const folder = mkdtempSync(path.join(tmpdir(), "portfolio-gallery-"));
  try {
    for (const name of [
      "thumbnail.jpg",
      "image10.png",
      "image2.webp",
      "image1.jpg",
    ])
      writeFileSync(path.join(folder, name), name);
    const g = scanGallery(folder, "test-project");
    assert.deepEqual(
      g.images.map((i) => path.basename(i.src)),
      ["image1.jpg", "image2.webp", "image10.png"],
    );
    writeFileSync(path.join(folder, "image3.png"), "test");
    assert.equal(scanGallery(folder, "test-project").images.length, 4);
    writeFileSync(path.join(folder, "image1.png"), "test");
    assert.throws(
      () => scanGallery(folder, "test-project"),
      /duplicate image number/,
    );
    rmSync(path.join(folder, "image1.png"));
    writeFileSync(path.join(folder, "thumbnail.png"), "test");
    assert.throws(
      () => scanGallery(folder, "test-project"),
      /exactly one thumbnail/,
    );
  } finally {
    rmSync(folder, { recursive: true, force: true });
  }
});
test("the audited five projects still lead the collection", () => {
  assert.deepEqual(
    projects.filter((p) => p.featured).map((p) => p.slug),
    ["gsg", "nextset", "safoyana", "reclaim", "notepad-ai"],
  );
});

test("artistic covers retain original screenshots and opt into uncropped presentation", () => {
  const folder = mkdtempSync(path.join(tmpdir(), "portfolio-artistic-"));
  try {
    writeFileSync(path.join(folder, "thumbnail.webp"), "artistic-cover");
    writeFileSync(path.join(folder, "image1.webp"), "original-screen");
    const metadata = {
      thumbnail: { kind: "artistic-composition", source: "cover.html" },
      images: { "image1.webp": { source: "original-screen.png" } },
    };
    writeFileSync(path.join(folder, "gallery.json"), JSON.stringify(metadata));
    const gallery = scanGallery(folder, "artistic");
    assert.equal(gallery.thumbnailPresentation, "artistic");
    assert.deepEqual(gallery.images.map(image => image.src), ["/images/artistic/image1.webp"]);
    metadata.thumbnail.kind = "existing";
    writeFileSync(path.join(folder, "gallery.json"), JSON.stringify(metadata));
    assert.equal(scanGallery(folder, "standard").thumbnailPresentation, undefined);
  } finally {
    rmSync(folder, { recursive: true, force: true });
  }
});

test("thumbnail dimensions preserve each cover's original aspect ratio", () => {
  const folder = mkdtempSync(path.join(tmpdir(), "portfolio-thumbnail-ratio-"));
  try {
    writeFileSync(path.join(folder, "thumbnail.webp"), "cover");
    for (const [width, height] of [[1536, 1024], [1440, 1080], [3200, 1800]]) {
      writeFileSync(
        path.join(folder, "gallery.json"),
        JSON.stringify({ thumbnail: { width, height } }),
      );
      const gallery = scanGallery(folder, "different-ratios");
      assert.equal(gallery.thumbnailWidth, width);
      assert.equal(gallery.thumbnailHeight, height);
    }
    writeFileSync(
      path.join(folder, "gallery.json"),
      JSON.stringify({ thumbnail: { width: null, height: null } }),
    );
    const fallback = scanGallery(folder, "illustration");
    assert.equal(fallback.thumbnailWidth, 1200);
    assert.equal(fallback.thumbnailHeight, 800);
  } finally {
    rmSync(folder, { recursive: true, force: true });
  }
});

test("existing thumbnail overlays are recognized so they are not applied twice", () => {
  const folder = mkdtempSync(path.join(tmpdir(), "portfolio-overlay-"));
  try {
    writeFileSync(path.join(folder, "thumbnail.webp"), "cover");
    for (const [thumbnail, expected] of [
      [{ overlay: 0.3 }, true],
      [{ overlayBaked: true }, true],
      [{ overlay: 0 }, false],
      [{}, false],
    ]) {
      writeFileSync(path.join(folder, "gallery.json"), JSON.stringify({ thumbnail }));
      assert.equal(scanGallery(folder, "overlay").thumbnailOverlayBaked, expected);
    }
  } finally {
    rmSync(folder, { recursive: true, force: true });
  }
});

test("thumbnail duplicates stay out of galleries, including thumbnail-only projects", () => {
  const folder = mkdtempSync(path.join(tmpdir(), "portfolio-cover-"));
  try {
    writeFileSync(path.join(folder, "thumbnail.webp"), "cover");
    assert.deepEqual(scanGallery(folder, "cover-only").images, []);
    writeFileSync(path.join(folder, "image1.webp"), "cover");
    writeFileSync(path.join(folder, "image2.webp"), "different-sized-cover");
    writeFileSync(path.join(folder, "image3.webp"), "additional-screen");
    writeFileSync(
      path.join(folder, "gallery.json"),
      JSON.stringify({
        thumbnail: { source: "original-cover.png" },
        images: { "image2.webp": { source: "original-cover.png" } },
      }),
    );
    assert.deepEqual(
      scanGallery(folder, "test").images.map((image) =>
        path.basename(image.src),
      ),
      ["image3.webp"],
    );
  } finally {
    rmSync(folder, { recursive: true, force: true });
  }
});

test("public content describes the projects without portfolio setup audit notes", () => {
  for (const p of projects) {
    assert.equal(p.note, undefined);
    assert.equal(p.verification, undefined);
    assert.doesNotMatch(
      p.overview + p.engineering,
      /unavailable during capture|not verified|lint failures|scope & limitations/i,
    );
  }
  assert.match(
    projects.find((p) => p.slug === "notepad-ai").engineering,
    /Ollama integration was tested during development/,
  );
});

test("frontend/backend pairs are combined and record both source repos but hide private links", () => {
  const pairs = {
    lab: ["LAB-Main-Svelte", "LAB-admin-panel"],
    medikart: ["medikartFrontend", "MedikartBackend"],
    dermacare: ["cosmeticsEcom-frontend", "cosmeticEcom"],
  };
  for (const [slug, repos] of Object.entries(pairs)) {
    const p = projects.find((project) => project.slug === slug);
    assert.deepEqual(p.sourceRepos, repos);
    // Private repositories: no public source buttons.
    assert.deepEqual(p.repositories, []);
    assert.equal(p.github, null);
  }
  const renamed = {
    "microservice-ecommerce": "Microservice Ecommerce",
    "instagram-clone": "Instagram Clone",
    dermacare: "DermaCare",
    "medicine-data-scraper-with-proxy-rotation":
      "Medicine Data Scraper with Proxy Rotation",
  };
  for (const [slug, title] of Object.entries(renamed))
    assert.equal(projects.find((p) => p.slug === slug).title, title);
  assert.ok(
    projects.every(
      (p) =>
        ![
          "lab-admin-panel",
          "lab-main-svelte",
          "medikartfrontend",
          "medikartbackend",
          "cosmeticecom",
          "cosmeticsecom-frontend",
        ].includes(p.slug),
    ),
  );
});
