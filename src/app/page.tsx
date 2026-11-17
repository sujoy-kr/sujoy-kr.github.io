import Link from "next/link";
import { featured, projects } from "@/data/projects";

const EXTRA_HOME_SLUGS = ["talentrack-ai-powered-recruitment-platform", "medikart", "lab"];
const homeProjects = [
  ...featured.slice(0, 3),
  ...EXTRA_HOME_SLUGS.flatMap((slug) => projects.filter((p) => p.slug === slug)),
];
import { Arrow } from "@/components/Icons";
import { ProjectCard } from "@/components/ProjectCard";
import { Tx } from "@/components/Tx";
import { JsonLd } from "@/components/JsonLd";
import { NAME, SITE_URL, abs } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Sujoy Karmakar — Full-stack Developer & Designer from Bangladesh" },
  description:
    "Sujoy Karmakar is a full-stack developer from Bangladesh. Explore his websites, web applications, Android apps, backend systems and UI designs.",
  alternates: { canonical: "/" },
};

const services = [
  {
    en: ["Websites that communicate", "Clear, responsive sites for businesses, services and campaigns."],
    bn: ["যে ওয়েবসাইট কথা বলে", "ব্যবসা, সেবা ও ক্যাম্পেইনের জন্য পরিষ্কার ও রেসপন্সিভ সাইট।"],
  },
  {
    en: ["Applications that organise", "Catalogues, admin tools and workflows that bring information together."],
    bn: ["যে অ্যাপ্লিকেশন গুছিয়ে দেয়", "ক্যাটালগ, অ্যাডমিন টুল ও ওয়ার্কফ্লো, যা তথ্যকে এক জায়গায় আনে।"],
  },
  {
    en: ["Engineering with intention", "Readable code, explicit system boundaries, and practical verification."],
    bn: ["ভেবেচিন্তে করা ইঞ্জিনিয়ারিং", "পাঠযোগ্য কোড, স্পষ্ট সিস্টেম-সীমানা এবং বাস্তবসম্মত যাচাই।"],
  },
];

export default function Home() {
  return (
    <main id="main">
      <JsonLd
        data={{
          "@type": "ProfilePage",
          "@id": `${SITE_URL}/#webpage`,
          url: `${SITE_URL}/`,
          name: `${NAME} — Full-stack Developer & Designer`,
          mainEntity: { "@id": `${SITE_URL}/#person` },
          isPartOf: { "@id": `${SITE_URL}/#website` },
          primaryImageOfPage: abs("/images/profile/portrait.webp"),
          hasPart: homeProjects.map((p) => ({
            "@type": "CreativeWork",
            name: p.title,
            url: abs(`/projects/${p.slug}/`),
          })),
        }}
      />
      <section className="hero wrap">
        <div className="hero-copy">
          <p className="availability">
            <i />
            <Tx en="Open to projects & opportunities" bn="নতুন প্রকল্প ও সুযোগের জন্য প্রস্তুত" />
          </p>
          <h1>
            <Tx
              en={<>Good ideas.<br />Thoughtful code.<br /><em>Useful things.</em></>}
              bn={<>ভালো ভাবনা।<br />যত্নের কোড।<br /><em>কাজের জিনিস।</em></>}
            />
          </h1>
          <p className="hero-lead">
            <Tx
              en="I’m Sujoy Karmakar, a full-stack developer turning business problems into websites and applications people can actually use."
              bn="আমি সুজয় কর্মকার (Sujoy Karmakar), একজন ফুল-স্ট্যাক ডেভেলপার। ব্যবসার সমস্যাকে এমন ওয়েবসাইট ও অ্যাপ্লিকেশনে রূপ দিই, যা মানুষ সত্যিই ব্যবহার করতে পারে।"
            />
          </p>
          <div className="actions">
            <Link className="button primary" href="/projects/">
              <Tx en="Explore my work" bn="আমার কাজ দেখুন" />
              <Arrow />
            </Link>
            <Link className="text-link" href="/about/">
              <Tx en="About me" bn="আমার কথা" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section wrap">
        <div className="section-head">
          <h2>
            <Tx en="Selected work" bn="নির্বাচিত কাজ" />
          </h2>
          <Link className="text-link" href="/projects/">
            <Tx en={`All ${projects.length} projects`} bn={`সব ${projects.length}টি প্রকল্প`} />
            <Arrow />
          </Link>
        </div>
        <div className="grid">
          {homeProjects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      <section className="section wrap">
        <div className="section-head">
          <h2>
            <Tx en="How I can help" bn="যেভাবে সাহায্য করতে পারি" />
          </h2>
        </div>
        <div className="services">
          {services.map((s) => (
            <div key={s.en[0]}>
              <h3>
                <Tx en={s.en[0]} bn={s.bn[0]} />
              </h3>
              <p>
                <Tx en={s.en[1]} bn={s.bn[1]} />
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
