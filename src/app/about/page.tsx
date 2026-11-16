import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/Icons";
import { Tx } from "@/components/Tx";
import { JsonLd } from "@/components/JsonLd";
import { NAME, SITE_URL, abs, breadcrumbs, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: `${NAME} is a full-stack developer based in Bangladesh, working across websites, applications and backend systems. Open to freelance work and engineering roles.`,
  path: "/about/",
  type: "profile",
  keywords: ["about Sujoy Karmakar", "Sujoy Karmakar developer", "Sujoy Karmakar Bangladesh"],
});

const stack = [
  {
    en: ["Interfaces", "React, Next.js, Svelte, TypeScript and responsive CSS."],
    bn: ["ইন্টারফেস", "React, Next.js, Svelte, TypeScript এবং রেসপন্সিভ CSS।"],
  },
  {
    en: ["Applications & data", "Node.js, NestJS, Express, PHP, Python, PostgreSQL and MongoDB."],
    bn: ["অ্যাপ্লিকেশন ও ডেটা", "Node.js, NestJS, Express, PHP, Python, PostgreSQL ও MongoDB।"],
  },
  {
    en: ["Beyond the browser", "Native Android with Java, Compose and Room; local data and AI tools."],
    bn: ["ব্রাউজারের বাইরে", "Java, Compose ও Room দিয়ে নেটিভ অ্যান্ড্রয়েড; লোকাল ডেটা ও এআই টুল।"],
  },
];

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
        {stack.map((s) => (
          <div key={s.en[0]}>
            <h2>
              <Tx en={s.en[0]} bn={s.bn[0]} />
            </h2>
            <p>
              <Tx en={s.en[1]} bn={s.bn[1]} />
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}
