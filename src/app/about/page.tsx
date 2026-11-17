import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/Icons";
import { BrandBadge } from "@/components/BrandBadge";
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
    title: { en: "Interfaces", bn: "ইন্টারফেস" },
    items: ["React", "Next.js", "Svelte", "TypeScript", "HTML", "CSS", "Tailwind CSS", "Bootstrap", "Figma"],
  },
  {
    title: { en: "Backend & real-time", bn: "ব্যাকএন্ড ও রিয়েল-টাইম" },
    items: ["Node.js", "Express", "NestJS", "FastAPI", "PHP", "Python", "ASP.NET Core", "Socket.IO"],
  },
  {
    title: { en: "Data & search", bn: "ডেটা ও সার্চ" },
    items: ["PostgreSQL", "MongoDB", "MariaDB", "MySQL", "SQLite", "Redis", "Elasticsearch", "Prisma", "Sequelize", "Mongoose", "Firebase"],
  },
  {
    title: { en: "Security & quality", bn: "নিরাপত্তা ও মান" },
    items: ["JWT", "Passport.js", "Jest", "Swagger"],
  },
  {
    title: { en: "Infrastructure", bn: "ইনফ্রাস্ট্রাকচার" },
    items: ["Docker", "Nginx", "Let’s Encrypt", "RabbitMQ", "GitHub Actions", "PM2", "Prometheus", "Grafana", "Linux", "Vultr", "Heroku"],
  },
  {
    title: { en: "Beyond the browser", bn: "ব্রাউজারের বাইরে" },
    items: ["Puppeteer", "Cheerio", "Sharp", "Java", "Kotlin", "Android", "Jetpack Compose", "pandas", "scikit-learn", "Streamlit", "Ollama"],
  },
];

const experience = [
  {
    when: { en: "Oct 2024 – Present", bn: "অক্টোবর ২০২৪ – বর্তমান" },
    org: "MediKart BD",
    role: { en: "Backend developer", bn: "ব্যাকএন্ড ডেভেলপার" },
    note: {
      en: "Built and deployed SvelteKit and PostgreSQL e-commerce sites on a VPS with Nginx, SSL, automated backups, caching, CI/CD and web scraping. SEO work led to about 20,000 pages indexed on Google Search Console.",
      bn: "VPS-এ Nginx, SSL, স্বয়ংক্রিয় ব্যাকআপ, ক্যাশিং, CI/CD ও ওয়েব স্ক্র্যাপিং সহ SvelteKit ও PostgreSQL ভিত্তিক ই-কমার্স সাইট বানিয়ে ডেপ্লয় করেছি। SEO কাজের ফলে Google Search Console-এ প্রায় ২০,০০০ পেজ ইনডেক্স হয়েছে।",
    },
  },
  {
    when: { en: "Mar 2024 – Jan 2025", bn: "মার্চ ২০২৪ – জানুয়ারি ২০২৫" },
    org: "ITooso",
    role: { en: "Full-stack developer", bn: "ফুল-স্ট্যাক ডেভেলপার" },
    note: {
      en: "Built member management systems, article and event platforms and admin panels, with image hosting, payments and secure authentication.",
      bn: "মেম্বার ম্যানেজমেন্ট সিস্টেম, আর্টিকেল ও ইভেন্ট প্ল্যাটফর্ম এবং অ্যাডমিন প্যানেল বানিয়েছি; সঙ্গে ছিল ইমেজ হোস্টিং, পেমেন্ট ও নিরাপদ অথেনটিকেশন।",
    },
  },
  {
    when: { en: "Jan 2022 – Jul 2022", bn: "জানুয়ারি ২০২২ – জুলাই ২০২২" },
    org: "Angular Esports Ltd",
    role: { en: "Backend developer", bn: "ব্যাকএন্ড ডেভেলপার" },
    note: {
      en: "Built Node.js backends for esports tournaments and news, including a Map Veto app for Valorant, and mentored an intern developer.",
      bn: "এসপোর্টস টুর্নামেন্ট ও নিউজের জন্য Node.js ব্যাকএন্ড বানিয়েছি, যার মধ্যে Valorant-এর Map Veto অ্যাপ ছিল; একজন ইন্টার্ন ডেভেলপারকে গাইডও করেছি।",
    },
  },
  {
    when: { en: "Aug 2019 – Present", bn: "আগস্ট ২০১৯ – বর্তমান" },
    org: "Self-employed",
    role: { en: "Full-stack developer", bn: "ফুল-স্ট্যাক ডেভেলপার" },
    note: {
      en: "Worked with clients in the US, Spain, India, Pakistan, Mexico, Portugal and elsewhere to turn their ideas into working web applications.",
      bn: "যুক্তরাষ্ট্র, স্পেন, ভারত, পাকিস্তান, মেক্সিকো, পর্তুগাল ও অন্যান্য দেশের ক্লায়েন্টদের ভাবনাকে কাজের ওয়েব অ্যাপ্লিকেশনে রূপ দিয়েছি।",
    },
  },
];

const education = [
  {
    short: "EWU",
    logo: "/images/education/ewu.webp",
    org: { en: "East West University", bn: "ইস্ট ওয়েস্ট ইউনিভার্সিটি" },
    detail: { en: "BSc in Computer Science and Engineering", bn: "কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং-এ বিএসসি" },
  },
  {
    short: "GSC",
    logo: "/images/education/gsc.webp",
    org: { en: "Govt. Science College, Tejgaon, Dhaka", bn: "সরকারি বিজ্ঞান কলেজ, তেজগাঁও, ঢাকা" },
    detail: { en: "College", bn: "কলেজ" },
  },
  {
    short: "CIT",
    logo: "/images/education/cit.webp",
    org: { en: "Creative IT Institute", bn: "ক্রিয়েটিভ আইটি ইনস্টিটিউট" },
    detail: { en: "Certification in Responsive Web Design", bn: "রেসপন্সিভ ওয়েব ডিজাইনে সার্টিফিকেশন" },
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
