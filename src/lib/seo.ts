import type { Metadata } from "next";

/** Set NEXT_PUBLIC_SITE_URL at build time to the production origin. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sujoykarmakar.com"
).replace(/\/$/, "");
export const NAME = "Sujoy Karmakar";
export const JOB_TITLE = "Full-stack developer";
export const EMAIL = "thesujoykr@gmail.com";
export const SAME_AS = [
  "https://github.com/sujoy-kr",
  "https://www.linkedin.com/in/sujoykarmakar",
];
export const PORTRAIT = {
  src: "/images/profile/portrait.webp",
  width: 700,
  height: 900,
};

export const abs = (path: string) => `${SITE_URL}${path}`;

type Img = { src: string; width: number; height: number; alt?: string };

/** Canonical, Open Graph and Twitter metadata for one page. */
export function pageMetadata(o: {
  title: string;
  description: string;
  path: string;
  image?: Img;
  type?: "website" | "article" | "profile";
  keywords?: string[];
}): Metadata {
  const image: Img = o.image ?? PORTRAIT;
  const images = [
    { url: image.src, width: image.width, height: image.height, alt: image.alt ?? `${o.title} — ${NAME}` },
  ];
  return {
    title: o.title,
    description: o.description,
    keywords: o.keywords,
    alternates: { canonical: o.path },
    openGraph: {
      title: `${o.title} — ${NAME}`,
      description: o.description,
      url: o.path,
      siteName: NAME,
      locale: "en_US",
      type: o.type ?? "website",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: `${o.title} — ${NAME}`,
      description: o.description,
      images: images.map((i) => i.url),
    },
  };
}

export const personRef = { "@id": `${SITE_URL}/#person` };

export const person = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: NAME,
  givenName: "Sujoy",
  familyName: "Karmakar",
  alternateName: ["Sujoy Kr", "sujoy-kr"],
  jobTitle: JOB_TITLE,
  description:
    "Sujoy Karmakar is a full-stack developer from Bangladesh building websites, web applications, Android apps and backend systems.",
  url: `${SITE_URL}/`,
  image: abs(PORTRAIT.src),
  email: `mailto:${EMAIL}`,
  address: { "@type": "PostalAddress", addressCountry: "BD" },
  knowsAbout: [
    "Full-stack development",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "NestJS",
    "Android development",
    "Kotlin",
    "PostgreSQL",
    "UI design",
  ],
  sameAs: SAME_AS,
};

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}
