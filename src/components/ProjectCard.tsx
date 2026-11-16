import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/data/projects";
import { Github } from "./Icons";
export function ProjectCard({
  project: p,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  return (
    <article className="project-card">
      <Link
        href={`/projects/${p.slug}/`}
        className="project-image"
        aria-label={`View ${p.title} case study`}
      >
        <Image
          className={p.thumbnailOverlayBaked ? undefined : "thumbnail-overlay"}
          src={p.thumbnail}
          alt={`${p.title} — ${p.imageKind}`}
          width={p.thumbnailWidth}
          height={p.thumbnailHeight}
        />
      </Link>
      <div className="card-meta">
        <span>{p.group}</span>
        <span>{String(index + 1).padStart(2, "0")}</span>
      </div>
      <h3>
        <Link href={`/projects/${p.slug}/`}>{p.title}</Link>
      </h3>
      <p>{p.pitch}</p>
      <div className="card-bottom">
        <span>
          {p.displayTechnologies.length
            ? p.displayTechnologies.slice(0, 3).join(" / ")
            : p.highlights[0]}
        </span>
        {p.github && (
          <a
            href={p.github}
            target="_blank"
            rel="noopener noreferrer"
            className="source"
            aria-label={`${p.title} on GitHub`}
          >
            <Github />
            <span>GitHub</span>
            <span className="sr-only"> (opens a new tab)</span>
          </a>
        )}
      </div>
    </article>
  );
}
