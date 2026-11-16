"use client";
import { useState } from "react";
import { groups, projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
export function ProjectExplorer() {
  const [group, setGroup] = useState<string>("All work");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("curated");
  const shown = projects
    .filter(
      (p) =>
        (group === "All work" ||
          (group === "Featured" ? p.featured : p.group === group)) &&
        `${p.title} ${p.pitch} ${p.technologies.join(" ")}`
          .toLowerCase()
          .includes(query.toLowerCase().trim()),
    )
    .sort((a, b) =>
      sort === "az"
        ? a.title.localeCompare(b.title)
        : sort === "za"
          ? b.title.localeCompare(a.title)
          : a.order - b.order,
    );
  return (
    <>
      <div className="explorer-tools">
        <div className="search-field">
          <svg
            viewBox="0 0 24 24"
            width="19"
            height="19"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <circle cx="10" cy="10" r="6" />
            <path d="m15 15 5 5" />
          </svg>
          <input
            aria-label="Search projects"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects or technologies…"
          />
        </div>
        <label className="sort-label">
          Sort by{" "}
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="curated">Recommended</option>
            <option value="az">Name: A–Z</option>
            <option value="za">Name: Z–A</option>
          </select>
        </label>
      </div>
      <div className="filters" aria-label="Filter projects by category">
        {groups.map((g) => (
          <button
            key={g}
            aria-pressed={group === g}
            onClick={() => setGroup(g)}
          >
            {g}
            {g === "All work" && <span>{projects.length}</span>}
          </button>
        ))}
      </div>
      <div className="results-meta" role="status">
        {shown.length} project{shown.length === 1 ? "" : "s"}{" "}
        <span>
          {group === "All work"
            ? "The full collection. Featured work comes first."
            : group}
        </span>
      </div>
      {shown.length ? (
        <div className="project-grid">
          {shown.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No projects found.</h2>
          <p>Try another technology or explore a different group.</p>
          <button
            className="button"
            onClick={() => {
              setQuery("");
              setGroup("All work");
              setSort("curated");
            }}
          >
            Reset filters
          </button>
        </div>
      )}
    </>
  );
}
