import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { designs } from "@/data/designs";
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
    <main id="main" className="wrap detail-page">
      <Link className="back-link" href="/design/">
        ← All designs
      </Link>
      <div className="detail-heading">
        <div>
          <span className="eyebrow">{d.category.toUpperCase()} / DESIGN</span>
          <h1>{d.title}</h1>
          <p>{d.description}</p>
        </div>
      </div>
      <div className="project-cover">
        <Image
          src={d.thumbnail.src}
          alt={`${d.title} — design preview`}
          width={d.thumbnail.width}
          height={d.thumbnail.height}
          priority
        />
      </div>
      {d.images.length > 0 && (
        <section id="gallery" className="gallery-section">
          <Gallery key={d.slug} project={d} />
        </section>
      )}
      <div className="next-project">
        <span className="eyebrow">NEXT DESIGN</span>
        <Link href={`/design/${next.slug}/`}>
          {next.title}
          <Arrow diagonal />
        </Link>
      </div>
    </main>
  );
}
