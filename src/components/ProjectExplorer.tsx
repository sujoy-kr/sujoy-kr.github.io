"use client";
import { useState } from "react";
import { groups, projects } from "@/data/projects";
import { groupLabels } from "@/data/labels";
import { useLang } from "@/lib/lang";
import { ProjectCard } from "./ProjectCard";
import { Tx } from "./Tx";

export function ProjectExplorer() {
  const lang = useLang();
  const [group, setGroup] = useState<string>("All work");
  const [query, setQuery] = useState("");
  const shown = projects.filter(
    (p) =>
      (group === "All work" ||
        (group === "Featured" ? p.featured : p.group === group)) &&
      `${p.title} ${p.pitch} ${p.bn.pitch} ${p.technologies.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase().trim()),
  );
  return (
    <>
      <div className="explorer-tools">
        <div className="filters" role="group" aria-label="Filter projects">
          {groups.map((g) => (
            <button key={g} aria-pressed={group === g} onClick={() => setGroup(g)}>
              <Tx en={g} bn={groupLabels[g]} />
            </button>
          ))}
        </div>
        <input
          type="search"
          className="search"
          aria-label={lang === "bn" ? "প্রকল্প খুঁজুন" : "Search projects"}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={
            lang === "bn" ? "প্রকল্প বা প্রযুক্তি খুঁজুন…" : "Search projects or technologies…"
          }
        />
      </div>
      <p className="results-meta" role="status">
        {lang === "bn"
          ? `${shown.length}টি প্রকল্প`
          : `${shown.length} project${shown.length === 1 ? "" : "s"}`}
      </p>
      {shown.length ? (
        <div className="grid">
          {shown.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>
            <Tx en="No projects found." bn="কোনো প্রকল্প পাওয়া যায়নি।" />
          </h2>
          <button
            className="button"
            onClick={() => {
              setQuery("");
              setGroup("All work");
            }}
          >
            <Tx en="Reset filters" bn="ফিল্টার রিসেট করুন" />
          </button>
        </div>
      )}
    </>
  );
}
