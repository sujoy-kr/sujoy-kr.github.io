import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { Gallery } from "@/components/Gallery";
import { Arrow } from "@/components/Icons";
import { Tx } from "@/components/Tx";
import { groupLabels } from "@/data/labels";
import { ReclaimReadme } from "@/components/ReclaimReadme";
import { RepositoryLinks } from "@/components/RepositoryLinks";
import { JsonLd } from "@/components/JsonLd";
import { NAME, SITE_URL, abs, breadcrumbs, pageMetadata } from "@/lib/seo";
const COMPACT_GALLERIES = new Set(["lab", "gsg", "nextset", "medikart", "dermacare", "safoyana", "p2p-file-stream", "cse302-project", "reclaim"]);
const GALLERY_COLUMNS: Record<string, number> = {
  medikart: 3,
  dermacare: 3,
  safoyana: 3,
  "cse302-project": 3,
  "p2p-file-stream": 2,
  reclaim: 4,
};

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project not found" };
  return pageMetadata({
    title: project.title,
    description: `${project.title}, a project by ${NAME}. ${project.pitch} Built with ${project.displayTechnologies.join(", ") || "HTML and CSS"}.`,
    path: `/projects/${project.slug}/`,
    type: "article",
    image: {
      src: project.thumbnail,
      width: project.thumbnailWidth,
      height: project.thumbnailHeight,
      alt: `${project.title} — project by ${NAME}`,
    },
    keywords: [project.title, `${project.title} ${NAME}`, ...project.displayTechnologies],
  });
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) notFound();
  const next = projects[(projects.indexOf(p) + 1) % projects.length];
  return (
    <main id="main" className="wrap page detail">
      <JsonLd
        data={[
          {
            "@type": "CreativeWork",
            "@id": abs(`/projects/${p.slug}/`) + "#project",
            name: p.title,
            headline: p.title,
            description: `${p.pitch} ${p.overview}`,
            url: abs(`/projects/${p.slug}/`),
            image: abs(p.thumbnail),
            thumbnailUrl: abs(p.thumbnail),
            author: { "@id": `${SITE_URL}/#person` },
            creator: { "@id": `${SITE_URL}/#person` },
            keywords: p.displayTechnologies.join(", "),
            genre: p.group,
            inLanguage: ["en", "bn"],
            isPartOf: { "@id": `${SITE_URL}/#website` },
            mainEntityOfPage: abs(`/projects/${p.slug}/`),
            ...(p.github ? { codeRepository: p.github } : {}),
            sameAs: [p.github, p.liveUrl].filter(Boolean),
          },
          breadcrumbs([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects/" },
            { name: p.title, path: `/projects/${p.slug}/` },
          ]),
        ]}
      />
      <Link className="back-link" href="/projects/">
        ← <Tx en="All projects" bn="সব প্রকল্প" />
      </Link>
      <header className="detail-head">
        <p className="eyebrow">
          <Tx en={p.group} bn={groupLabels[p.group] ?? p.group} />
        </p>
        <h1>{p.title}</h1>
        <p className="lead">
          <Tx en={p.pitch} bn={p.bn.pitch} />
        </p>
        <RepositoryLinks project={p} />
      </header>
      <Image
        className={`cover ${p.thumbnailOverlayBaked ? "" : "thumbnail-overlay"}`}
        src={p.thumbnail}
        alt={`${p.title} — ${p.imageKind}`}
        width={p.thumbnailWidth}
        height={p.thumbnailHeight}
        priority
        sizes="(min-width: 1180px) 1100px, 100vw"
      />
      <section className="story">
        <div>
          <h2>
            <Tx en="Overview" bn="সারসংক্ষেপ" />
          </h2>
          <p className="muted-note">
            <Tx en="Designed around " bn="যাদের কথা ভেবে: " />
            <Tx en={p.audience} bn={p.bn.audience} />
          </p>
        </div>
        <div>
          <p className="story-lead">
            <Tx en={p.overview} bn={p.bn.overview} />
          </p>
          <ul className="highlights">
            {p.highlights.map((h, i) => (
              <li key={h}>
                <Tx en={h} bn={p.bn.highlights[i] ?? h} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="story">
        <div>
          <h2>
            {p.displayTechnologies.length ? (
              <Tx en="Engineering" bn="ইঞ্জিনিয়ারিং" />
            ) : (
              <Tx en="Approach" bn="ভাবনা" />
            )}
          </h2>
        </div>
        <div>
          <p className="story-body">
            <Tx en={p.engineering} bn={p.bn.engineering} />
          </p>
          {p.displayTechnologies.length > 0 && (
            <ul className="tags">
              {p.displayTechnologies.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          )}
        </div>
      </section>
      {p.slug === "reclaim" && <ReclaimReadme />}
      {p.images.length > 0 && (
        <section id="gallery" className="gallery-section">
          <h2>
            <Tx en="Gallery" bn="গ্যালারি" />
          </h2>
          <Gallery key={p.slug} project={p} compact={COMPACT_GALLERIES.has(p.slug)} wideColumns={GALLERY_COLUMNS[p.slug] ?? 4} />
        </section>
      )}
      <nav className="next-project" aria-label="Next project">
        <span>
          <Tx en="Next project" bn="পরের প্রকল্প" />
        </span>
        <Link href={`/projects/${next.slug}/`}>
          {next.title}
          <Arrow />
        </Link>
      </nav>
    </main>
  );
}
