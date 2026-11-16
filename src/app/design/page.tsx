import type { Metadata } from "next";
import { designs } from "@/data/designs";
import { DesignCard } from "@/components/DesignCard";
export const metadata: Metadata = {
  title: "Design",
  description:
    "UI design explorations: landing pages, product pages, dashboards and app concepts.",
};
export default function Design() {
  return (
    <main id="main" className="wrap projects-page">
      <div className="page-heading">
        <span className="eyebrow">THE DESIGNS / THE EXPLORATIONS</span>
        <h1>
          Interfaces I’ve
          <br />
          <em>designed.</em>
        </h1>
        <p>
          Landing pages, product pages, dashboards and app concepts, first
          shared on Dribbble.
        </p>
      </div>
      <div className="results-meta" role="status">
        {designs.length} designs
      </div>
      <div className="project-grid">
        {designs.map((d, i) => (
          <DesignCard key={d.slug} design={d} index={i} />
        ))}
      </div>
    </main>
  );
}
