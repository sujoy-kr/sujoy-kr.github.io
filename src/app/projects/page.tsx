import type { Metadata } from "next";
import { ProjectExplorer } from "@/components/ProjectExplorer";
import { Tx } from "@/components/Tx";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Browse applications, client websites, Android projects, data tools and backend systems. Filter by discipline or search the technology stack.",
};

export default function Projects() {
  return (
    <main id="main" className="wrap page">
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
