import { Arrow, Github } from "./Icons";
import { Tx } from "./Tx";
import { repoLabels } from "@/data/labels";
import type { Project } from "@/data/projects";

export function RepositoryLinks({ project }: { project: Project }) {
  const isPrivate = "privateRepository" in project && project.privateRepository === true;
  if (!project.repositories.length && !project.liveUrl && !isPrivate) return null;
  const multi = project.repositories.length > 1;
  return (
    <div className="detail-links">
      {project.repositories.map((repository) => (
        <a
          key={repository.url}
          className="button primary github-button"
          href={repository.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github size={20} />
          <Tx
            en={multi ? `GitHub · ${repository.label}` : repository.label}
            bn={`${multi ? "GitHub · " : ""}${repoLabels[repository.label] ?? repository.label}`}
          />
          <Arrow diagonal />
        </a>
      ))}
      {isPrivate && (
        <p className="private-note">
          <Tx
            en="The GitHub repository is private due to a contract."
            bn="চুক্তির কারণে এই GitHub রিপোজিটরিটি প্রাইভেট।"
          />
        </p>
      )}
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
