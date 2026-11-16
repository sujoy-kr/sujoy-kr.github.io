import { Arrow, Github } from "./Icons";
import { Tx } from "./Tx";
import type { Project } from "@/data/projects";

const repoLabels: Record<string, string> = {
  "View on GitHub": "GitHub-এ দেখুন",
  Frontend: "ফ্রন্টএন্ড",
  "Backend API": "ব্যাকএন্ড API",
  "Public website": "পাবলিক ওয়েবসাইট",
  "Admin panel": "অ্যাডমিন প্যানেল",
};

export function RepositoryLinks({ project }: { project: Project }) {
  if (!project.repositories.length && !project.liveUrl) return null;
  return (
    <div className="detail-links">
      {project.repositories.map((repository) => (
        <a
          key={repository.url}
          className="button"
          href={repository.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github />
          <Tx en={repository.label} bn={repoLabels[repository.label] ?? repository.label} />
          <Arrow diagonal />
        </a>
      ))}
      {project.liveUrl && (
        <a
          className="button"
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Tx en="Visit website" bn="ওয়েবসাইট দেখুন" />
          <Arrow diagonal />
        </a>
      )}
    </div>
  );
}
