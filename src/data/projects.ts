import data from "./projects.json";
import galleries from "./galleries.json";
import bnData from "./projects.bn.json";

export type ProjectBn = {
  pitch: string;
  highlights: string[];
  audience: string;
  overview: string;
  engineering: string;
  details?: string[];
};
const bnBySlug = bnData as Record<string, ProjectBn>;
export type ProjectImage = {
  src: string;
  caption: string;
  kind: string;
  width: number | null;
  height: number | null;
  source: string;
};
export type Project = (typeof data)[number] & {
  thumbnail: string;
  thumbnailWidth: number;
  thumbnailHeight: number;
  thumbnailOverlayBaked: boolean;
  thumbnailPresentation?: string;
  images: ProjectImage[];
  displayTechnologies: string[];
  bn: ProjectBn;
};
export const projects: Project[] = data.map((project) => {
  const gallery = galleries[project.slug as keyof typeof galleries];
  const displayTechnologies = project.technologies.filter(
    (technology) =>
      !["html", "css", "javascript", "bootstrap"].includes(
        technology.toLowerCase(),
      ),
  );
  return {
    ...project,
    thumbnail: gallery.thumbnail,
    thumbnailWidth: gallery.thumbnailWidth,
    thumbnailHeight: gallery.thumbnailHeight,
    thumbnailOverlayBaked: gallery.thumbnailOverlayBaked,
    thumbnailPresentation: "thumbnailPresentation" in gallery
      ? gallery.thumbnailPresentation
      : undefined,
    images: gallery.images,
    displayTechnologies,
    bn: bnBySlug[project.slug] ?? {
      pitch: project.pitch,
      highlights: project.highlights,
      audience: project.audience,
      overview: project.overview,
      engineering: project.engineering,
    },
  };
});
export const featured = projects.filter((p) => p.featured);
export const groups = [
  "All work",
  "Featured",
  "Web apps",
  "Mobile",
  "Data & AI",
  "Systems & APIs",
  "Client work",
] as const;
