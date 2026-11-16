import Link from "next/link";
import Image from "next/image";
import { designBn, type Design } from "@/data/designs";
import { categoryLabels } from "@/data/labels";
import { Tx } from "./Tx";

export function DesignCard({ design: d }: { design: Design }) {
  return (
    <article className="card">
      <Link href={`/design/${d.slug}/`} className="card-image" aria-label={d.title}>
        <Image
          src={d.thumbnail.src}
          alt={`${d.title} — design preview`}
          width={d.thumbnail.width}
          height={d.thumbnail.height}
          sizes="(min-width: 960px) 360px, (min-width: 600px) 50vw, 100vw"
        />
      </Link>
      <div className="card-meta">
        <Tx en={d.category} bn={categoryLabels[d.category] ?? d.category} />
      </div>
      <h3>
        <Link href={`/design/${d.slug}/`}>{d.title}</Link>
      </h3>
      <p>
        <Tx en={d.description} bn={designBn[d.slug] ?? d.description} />
      </p>
    </article>
  );
}
