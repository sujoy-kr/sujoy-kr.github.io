import { GradientBackdrop } from "@/components/GradientBackdrop";
import type { Metadata } from "next";
import { ProjectExplorer } from "@/components/ProjectExplorer";
import { Tx } from "@/components/Tx";
import { JsonLd } from "@/components/JsonLd";
import { projects } from "@/data/projects";
import { abs, breadcrumbs, NAME, SITE_URL, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description: `Projects by ${NAME}: web applications, client websites, Android apps, data tools and backend systems, with the technology behind each one.`,
  path: "/projects/",
  keywords: ["Sujoy Karmakar projects", "Sujoy Karmakar GitHub", "full-stack projects"],
});

export default function Projects() {
  return (
    <main id="main" className="wrap page detail">
      <GradientBackdrop />
      <JsonLd
        data={[
          {
            "@type": "CollectionPage",
            name: `Projects by ${NAME}`,
            url: abs("/projects/"),
            author: { "@id": `${SITE_URL}/#person` },
            mainEntity: {
              "@type": "ItemList",
              itemListElement: projects.map((p, i) => ({
                "@type": "ListItem",
                position: i + 1,
                url: abs(`/projects/${p.slug}/`),
                name: p.title,
              })),
            },
          },
          breadcrumbs([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects/" },
          ]),
        ]}
      />
      <header className="page-head">
        <h1>
          <Tx en={<>Things I’ve <em>built.</em></>} bn={<>আমার <em>তৈরি করা কাজ।</em></>} />
        </h1>
        <p className="lead">
          <Tx
            en="Business workflows, mobile companions, and ideas explored in code."
            bn="ব্যবসার ওয়ার্কফ্লো, মোবাইল সঙ্গী, আর কোডে যাচাই করা নানা ভাবনা।"
          />
        </p>
      </header>
      <ProjectExplorer />
    </main>
  );
}
