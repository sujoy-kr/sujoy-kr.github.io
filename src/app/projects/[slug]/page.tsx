import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { Gallery } from "@/components/Gallery";
import { Arrow } from "@/components/Icons";
import { RepositoryLinks } from "@/components/RepositoryLinks";
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
  return {
    title: project?.title ?? "Project not found",
    description: project?.pitch,
  };
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
    <main id="main" className="wrap detail-page">
      <Link className="back-link" href="/projects/">
        ← All projects
      </Link>
      <div className="detail-heading">
        <div>
          <span className="eyebrow">
            {p.group} /{" "}
            {p.featured
              ? "SELECTED WORK"
              : p.client
                ? "CLIENT WORK"
                : "PROJECT COLLECTION"}
          </span>
          <h1>{p.title}</h1>
          <p>{p.pitch}</p>
        </div>
        <RepositoryLinks project={p} />
      </div>
      <div className="detail-facts">
        <div>
          <span>DISCIPLINE</span>
          <p>{p.group}</p>
        </div>
        {p.displayTechnologies.length > 0 && (
          <div>
            <span>BUILT WITH</span>
            <p>{p.displayTechnologies.join(" · ")}</p>
          </div>
        )}
      </div>
      <div className="project-cover">
        <Image
          className={p.thumbnailOverlayBaked ? undefined : "thumbnail-overlay"}
          src={p.thumbnail}
          alt={`${p.title} — ${p.imageKind}`}
          width={1600}
          height={1000}
          priority
        />
      </div>
      <nav className="project-nav" aria-label="Project sections">
        <a href="#overview">Overview</a>
        <a href="#engineering">
          {p.displayTechnologies.length ? "Engineering" : "Approach"}
        </a>
        {p.images.length > 0 && <a href="#gallery">Gallery</a>}
      </nav>
      <section id="overview" className="project-story">
        <div>
          <span className="eyebrow">01 / THE IDEA</span>
          <h2>
            A useful problem.
            <br />
            <em>A considered approach.</em>
          </h2>
          <div className="audience-note">
            <span>DESIGNED AROUND</span>
            <p>{p.audience}</p>
          </div>
        </div>
        <div>
          <p className="story-lead">{p.overview}</p>
          <ul className="highlights">
            {p.highlights.map((h, i) => (
              <li key={h}>
                <span>0{i + 1}</span>
                {h}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section id="engineering" className="engineering-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">02 / UNDER THE SURFACE</span>
            <h2>How it comes together.</h2>
          </div>
        </div>
        <div className="engineering-grid">
          <div className="engineering-copy">
            <h3>
              {p.displayTechnologies.length
                ? "Implementation & choices"
                : "Design & experience"}
            </h3>
            <p>{p.engineering}</p>
            {p.displayTechnologies.length > 0 && (
              <div className="tech-tags">
                {p.displayTechnologies.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
      {p.images.length > 0 && (
        <section id="gallery" className="gallery-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">03 / A CLOSER LOOK</span>
              <h2>
                The project, <em>in view.</em>
              </h2>
            </div>
            <p className="gallery-description">
              Explore the interfaces. Click any image to open the full view.
            </p>
          </div>
          <Gallery key={p.slug} project={p} />
        </section>
      )}
      <div className="project-conversation">
        <div>
          <h3>Have a similar challenge?</h3>
          <p>
            Let’s talk about what the right solution could look like for you.
          </p>
        </div>
        <Link className="button" href="/contact/">
          Start a conversation <Arrow diagonal />
        </Link>
      </div>
      <div className="next-project">
        <span className="eyebrow">NEXT IN THE COLLECTION</span>
        <Link href={`/projects/${next.slug}/`}>
          {next.title}
          <Arrow diagonal />
        </Link>
      </div>
    </main>
  );
}
