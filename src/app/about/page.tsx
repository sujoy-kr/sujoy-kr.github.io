import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/Icons";
import { BrandBadge } from "@/components/BrandBadge";
import { Tx } from "@/components/Tx";
import { education, experience, stack } from "@/data/profile";
import { JsonLd } from "@/components/JsonLd";
import { NAME, SITE_URL, abs, breadcrumbs, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: `${NAME} is a full-stack developer based in Bangladesh, working across websites, applications and backend systems. Open to freelance work and engineering roles.`,
  path: "/about/",
  type: "profile",
  keywords: ["about Sujoy Karmakar", "Sujoy Karmakar developer", "Sujoy Karmakar Bangladesh"],
});

export default function About() {
  return (
    <main id="main" className="wrap page">
      <JsonLd
        data={[
          {
            "@type": "AboutPage",
            url: abs("/about/"),
            name: `About ${NAME}`,
            mainEntity: { "@id": `${SITE_URL}/#person` },
            isPartOf: { "@id": `${SITE_URL}/#website` },
          },
          breadcrumbs([
            { name: "Home", path: "/" },
            { name: "About", path: "/about/" },
          ]),
        ]}
      />
      <div className="about-layout">
        <div>
          <h1>
            <Tx
              en={<>Hi, I’m Sujoy.<br /><em>I build things that make sense.</em></>}
              bn={<>নমস্কার, আমি সুজয়।<br /><em>আমি এমন জিনিস বানাই, যার মানে আছে।</em></>}
            />
          </h1>
          <p className="lead">
            <Tx
              en="A full-stack developer based in Bangladesh, working across websites, applications, and the systems that support them."
              bn="বাংলাদেশভিত্তিক একজন ফুল-স্ট্যাক ডেভেলপার; ওয়েবসাইট, অ্যাপ্লিকেশন ও সেগুলোর পেছনের সিস্টেম নিয়ে কাজ করি।"
            />
          </p>
          <p>
            <Tx
              en="My work ranges from business catalogues and ordering tools to Android applications and research interfaces. I enjoy connecting a clear interface with the logic, data and decisions underneath it."
              bn="ব্যবসার ক্যাটালগ ও অর্ডার টুল থেকে শুরু করে অ্যান্ড্রয়েড অ্যাপ ও গবেষণার ইন্টারফেস পর্যন্ত আমার কাজের পরিধি। একটি পরিষ্কার ইন্টারফেসকে তার নিচের যুক্তি, ডেটা ও সিদ্ধান্তের সঙ্গে জুড়ে দিতে আমার ভালো লাগে।"
            />
          </p>
          <p>
            <Tx
              en="I’m open to freelance collaborations and engineering roles: opportunities to understand a problem, work with a team, and turn an idea into useful software."
              bn="ফ্রিল্যান্স কাজ ও ইঞ্জিনিয়ারিং ভূমিকা, দুটোতেই আমি আগ্রহী; যেখানে সমস্যাটা বুঝে, দলের সঙ্গে কাজ করে একটি ভাবনাকে কাজের সফটওয়্যারে রূপ দেওয়া যায়।"
            />
          </p>
          <Link className="button primary" href="/contact/">
            <Tx en="Start a conversation" bn="কথা শুরু করি" />
            <Arrow />
          </Link>
        </div>
        <Image
          className="portrait"
          src="/images/profile/portrait.webp"
          width={700}
          height={900}
          alt="Sujoy Karmakar"
          priority
          sizes="(min-width: 960px) 420px, 100vw"
        />
      </div>
      <section className="stack">
        {stack.map((group) => (
          <div key={group.title.en}>
            <h2>
              <Tx en={group.title.en} bn={group.title.bn} />
            </h2>
            <ul className="chips">
              {group.items.map((item) => (
                <li key={item}>
                  <BrandBadge name={item} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      <section className="timeline">
        <h2>
          <Tx en="Experience" bn="অভিজ্ঞতা" />
        </h2>
        {experience.map((e) => (
          <div className="timeline-row" key={e.org}>
            <p className="timeline-when">
              <Tx en={e.when.en} bn={e.when.bn} />
            </p>
            <div>
              <h3>
                {e.org} <span>· <Tx en={e.role.en} bn={e.role.bn} /></span>
              </h3>
              <p>
                <Tx en={e.note.en} bn={e.note.bn} />
              </p>
            </div>
          </div>
        ))}
      </section>
      <section className="timeline">
        <h2>
          <Tx en="Education" bn="শিক্ষা" />
        </h2>
        {education.map((e) => (
          <div className="timeline-row" key={e.org.en}>
            <p className="timeline-when">
              <Tx en={e.detail.en} bn={e.detail.bn} />
            </p>
            <div className="edu-name">
              <BrandBadge name={e.org.en} label={e.short} src={e.logo} />
              <h3>
                <Tx en={e.org.en} bn={e.org.bn} />
              </h3>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
