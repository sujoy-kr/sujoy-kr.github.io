import { Arrow, Github } from "./Icons";
import type { Project } from "@/data/projects";
export function RepositoryLinks({ project }: { project: Project }) {
  return (
    <div className="project-source-links">
      {project.repositories.map((repository) => (
        <a
          key={repository.url}
          className="button"
          href={repository.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github />
          {repository.label}
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
          Visit website
          <Arrow diagonal />
        </a>
      )}
    </div>
  );
}
