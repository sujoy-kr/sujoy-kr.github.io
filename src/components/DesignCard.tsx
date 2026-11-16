import Link from "next/link";
import Image from "next/image";
import type { Design } from "@/data/designs";

export function DesignCard({
  design: d,
  index,
}: {
  design: Design;
  index: number;
}) {
  return (
    <article className="project-card">
      <Link
        href={`/design/${d.slug}/`}
        className="project-image"
        aria-label={`View ${d.title}`}
      >
        <Image
          src={d.thumbnail.src}
          alt={`${d.title} — design preview`}
          width={d.thumbnail.width}
          height={d.thumbnail.height}
        />
      </Link>
      <div className="card-meta">
        <span>{d.category}</span>
        <span>{String(index + 1).padStart(2, "0")}</span>
      </div>
      <h3>
        <Link href={`/design/${d.slug}/`}>{d.title}</Link>
      </h3>
      <p>{d.description}</p>
    </article>
  );
}
