import type { Metadata } from "next";
import { designs } from "@/data/designs";
import { DesignCard } from "@/components/DesignCard";
import { Tx } from "@/components/Tx";
import { JsonLd } from "@/components/JsonLd";
import { abs, breadcrumbs, NAME, SITE_URL, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "UI Design",
  description: `UI design by ${NAME}: landing pages, product pages, dashboards and app concepts.`,
  path: "/design/",
  image: { ...designs[0].thumbnail, alt: `${designs[0].title} — UI design by ${NAME}` },
  keywords: ["Sujoy Karmakar design", "UI design portfolio", "landing page design"],
});

export default function Design() {
  return (
    <main id="main" className="wrap page">
      <JsonLd
        data={[
          {
            "@type": "CollectionPage",
            name: `UI design by ${NAME}`,
            url: abs("/design/"),
            author: { "@id": `${SITE_URL}/#person` },
            mainEntity: {
              "@type": "ItemList",
              itemListElement: designs.map((d, i) => ({
                "@type": "ListItem",
                position: i + 1,
                url: abs(`/design/${d.slug}/`),
                name: d.title,
              })),
            },
          },
          breadcrumbs([
            { name: "Home", path: "/" },
            { name: "Design", path: "/design/" },
          ]),
        ]}
      />
      <header className="page-head">
        <h1>
          <Tx en={<>Interfaces I’ve <em>designed.</em></>} bn={<>আমার <em>ডিজাইন করা ইন্টারফেস।</em></>} />
        </h1>
        <p className="lead">
          <Tx
            en="Landing pages, product pages, dashboards and app concepts, first shared on Dribbble."
            bn="ল্যান্ডিং পেজ, প্রোডাক্ট পেজ, ড্যাশবোর্ড ও অ্যাপের ধারণা, যা প্রথমে Dribbble-এ প্রকাশ করেছিলাম।"
          />
        </p>
      </header>
      <div className="grid">
        {designs.map((d) => (
          <DesignCard key={d.slug} design={d} />
        ))}
      </div>
    </main>
  );
}
