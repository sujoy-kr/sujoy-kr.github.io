import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/data/projects";
import { groupLabels } from "@/data/labels";
import { Tx } from "./Tx";

export function ProjectCard({ project: p }: { project: Project }) {
  return (
    <article className="card">
      <Link
        href={`/projects/${p.slug}/`}
        className="card-image"
        aria-label={p.title}
      >
        <Image
          className={p.thumbnailOverlayBaked ? undefined : "thumbnail-overlay"}
          src={p.thumbnail}
          alt={`${p.title} — ${p.imageKind}`}
          width={p.thumbnailWidth}
          height={p.thumbnailHeight}
          sizes="(min-width: 960px) 360px, (min-width: 600px) 50vw, 100vw"
        />
      </Link>
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
