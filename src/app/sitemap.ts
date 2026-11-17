import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { designs } from "@/data/designs";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (
    path: string,
    priority: number,
    changeFrequency: "weekly" | "monthly",
    image?: string,
  ) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
    ...(image ? { images: [`${SITE_URL}${image}`] } : {}),
  });
  return [
    entry("/", 1, "weekly"),
    entry("/about/", 0.9, "monthly"),
    entry("/projects/", 0.9, "weekly"),
    entry("/design/", 0.8, "weekly"),
    entry("/contact/", 0.7, "monthly"),
    ...projects.map((p) => entry(`/projects/${p.slug}/`, 0.8, "monthly", p.thumbnail)),
    ...designs.map((d) => entry(`/design/${d.slug}/`, 0.6, "monthly", d.thumbnail.src)),
  ];
}
