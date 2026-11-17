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

// Strongest, most business-relevant work first.
const DISPLAY_ORDER = [
  "web-dashboard-ui-design",
  "finance-website-ui-design",
  "real-estate-landing-page",
  "agency-website-landing-page-design",
  "ios-weather-app-design",
  "interior-design-website-landing-page",
  "veloce-bike-home-page",
  "honda-cbr-landing-page",
  "apex-footwear-ltd-landing-page-design",
  "csgo-knife-marketplace-concept-design",
  "pottery-website-product-page",
  "jack-daniels-whisky-product-page",
  "white-slate-cube-product-page-ui-design",
  "prothom-alo-landing-page",
  "mv-agusta-rush-motorcycle-product-page",
  "apple-iphone-13-alpine-green-product-page-ui-design",
  "headphone-product-page-ui-design",
  "unique-404-error-page-design",
];
const ordered = [...designs].sort(
  (a, b) => DISPLAY_ORDER.indexOf(a.slug) - DISPLAY_ORDER.indexOf(b.slug),
);

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
              itemListElement: ordered.map((d, i) => ({
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
        {ordered.map((d) => (
          <DesignCard key={d.slug} design={d} />
        ))}
      </div>
    </main>
  );
}
