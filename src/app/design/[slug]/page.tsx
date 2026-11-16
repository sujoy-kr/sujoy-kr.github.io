import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { designs, designBn } from "@/data/designs";
import { categoryLabels } from "@/data/labels";
import { Tx } from "@/components/Tx";
import { Gallery } from "@/components/Gallery";
import { Arrow } from "@/components/Icons";
export const dynamicParams = false;
export function generateStaticParams() {
  return designs.map((d) => ({ slug: d.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const design = designs.find((d) => d.slug === slug);
  return {
    title: design?.title ?? "Design not found",
    description: design?.description,
  };
}
export default async function DesignPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const d = designs.find((d) => d.slug === slug);
  if (!d) notFound();
  const next = designs[(designs.indexOf(d) + 1) % designs.length];
  return (
    <main id="main" className="wrap page detail">
      <Link className="back-link" href="/design/">
        ← <Tx en="All designs" bn="সব ডিজাইন" />
      </Link>
      <header className="detail-head">
        <p className="eyebrow">
          <Tx en={d.category} bn={categoryLabels[d.category] ?? d.category} />
        </p>
        <h1>{d.title}</h1>
        <p className="lead">
          <Tx en={d.description} bn={designBn[d.slug] ?? d.description} />
        </p>
      </header>
      {d.images.length > 0 ? (
        <section id="gallery" className="gallery-section no-title">
          <Gallery key={d.slug} project={d} />
        </section>
      ) : (
        <Image
          className="cover"
          src={d.thumbnail.src}
          alt={`${d.title} — design preview`}
          width={d.thumbnail.width}
          height={d.thumbnail.height}
          priority
          sizes="(min-width: 1180px) 1100px, 100vw"
        />
      )}
      <nav className="next-project" aria-label="Next design">
        <span>
          <Tx en="Next design" bn="পরের ডিজাইন" />
        </span>
        <Link href={`/design/${next.slug}/`}>
          {next.title}
          <Arrow />
        </Link>
      </nav>
    </main>
  );
}
