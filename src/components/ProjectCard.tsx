import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/data/projects";
import { groupLabels, repoLabels } from "@/data/labels";
import { Arrow, Github } from "./Icons";
import { Tx } from "./Tx";

export function ProjectCard({ project: p }: { project: Project }) {
  return (
    <article className="card">
      <div className="card-media">
        <Link
          href={`/projects/${p.slug}/`}
          className="card-image"
          aria-label={p.title}
        >
          <Image
            className={
              p.thumbnailOverlayBaked ? undefined : "thumbnail-overlay"
            }
            src={p.thumbnail}
            alt={`${p.title} — ${p.imageKind}`}
            width={p.thumbnailWidth}
            height={p.thumbnailHeight}
            sizes="(min-width: 960px) 360px, (min-width: 600px) 50vw, 100vw"
          />
        </Link>
        {(p.repositories.length > 0 || p.liveUrl) && (
          <div className="card-repos">
            {p.repositories.map((r) => (
              <a
                key={r.url}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-repo"
                aria-label={`${p.title}: ${r.label} (GitHub)`}
              >
                <Github size={18} />
                <span>
                  {p.repositories.length > 1 ? (
                    <Tx en={r.label} bn={repoLabels[r.label] ?? r.label} />
                  ) : (
                    "GitHub"
                  )}
                </span>
              </a>
            ))}
            {p.liveUrl && (
              <a
                href={p.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="card-repo"
                aria-label={`${p.title}: website`}
              >
                <Tx en="Website" bn="ওয়েবসাইট" />
                <Arrow diagonal />
              </a>
            )}
          </div>
        )}
      </div>
      <div className="card-meta">
        <Tx en={p.group} bn={groupLabels[p.group] ?? p.group} />
      </div>
      <h3>
        <Link href={`/projects/${p.slug}/`}>{p.title}</Link>
      </h3>
      <p>
        <Tx en={p.pitch} bn={p.bn.pitch} />
      </p>
    </article>
  );
}
