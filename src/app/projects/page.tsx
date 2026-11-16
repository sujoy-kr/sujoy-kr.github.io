import type { Metadata } from "next";
import { ProjectExplorer } from "@/components/ProjectExplorer";
export const metadata: Metadata = {
  title: "Projects",
  description:
    "Browse applications, client websites, Android projects, data tools and backend systems. Filter by discipline or search the technology stack.",
};
export default function Projects() {
  return (
    <main id="main" className="wrap projects-page">
      <div className="page-heading">
        <span className="eyebrow">THE WORK / THE EXPLORATIONS</span>
        <h1>
          A collection of
          <br />
          <em>things I’ve built.</em>
        </h1>
        <p>
          Business workflows, mobile companions, and ideas explored in code.
          Start with the featured projects, or find the work that’s relevant to
          you.
        </p>
      </div>
      <ProjectExplorer />
    </main>
  );
}
