import Image from "next/image";
import { PortraitBackdrop } from "@/components/PortraitBackdrop";
import Link from "next/link";
import { projects } from "@/data/projects";
import { designs } from "@/data/designs";
import { education, experience, stack } from "@/data/profile";

const bySlug = (slugs: string[]) => slugs.flatMap((slug) => projects.filter((p) => p.slug === slug));
const spotlight = bySlug(["gsg", "medikart"]);
const homeDesigns = ["web-dashboard-ui-design", "agency-website-landing-page-design", "interior-design-website-landing-page"].flatMap(
  (slug) => designs.filter((d) => d.slug === slug),
);
const homeProjects = bySlug(["safoyana", "talentrack-ai-powered-recruitment-platform", "nextset"]);
const marqueeTech = Array.from(new Set(stack.flatMap((group) => group.items)));
import { Arrow } from "@/components/Icons";
import { BrandBadge } from "@/components/BrandBadge";
import { DesignCard } from "@/components/DesignCard";
import { DirectionalCard } from "@/components/DirectionalCard";
import { CardLinks, ProjectCard } from "@/components/ProjectCard";
import { Tx } from "@/components/Tx";
import { JsonLd } from "@/components/JsonLd";
import { groupLabels } from "@/data/labels";
import { NAME, PROFILES, SITE_URL, abs } from "@/lib/seo";
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
    <main id="main" className="backdrop-host">
      <PortraitBackdrop />
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
            <a className="button" href="mailto:thesujoykr@gmail.com">
              <Tx en="Email me" bn="ইমেইল করুন" />
            </a>
            <Link className="text-link" href="/about/">
              <Tx en="About me" bn="আমার কথা" />
            </Link>
          </div>
        </div>
      </section>

      <section className="wrap proof" aria-label="Skills">
        <div className="marquee">
          {[false, true].map((copy) => (
            <ul className="chips marquee-track" key={String(copy)} aria-hidden={copy || undefined}>
              {marqueeTech.map((t) => (
                <DirectionalCard as="li" key={t}>
                  <BrandBadge name={t} />
                  {t}
                </DirectionalCard>
              ))}
            </ul>
          ))}
        </div>
      </section>

      <section className="section wrap reveal">
        <div className="section-head">
          <h2>
            <Tx en="Selected work" bn="নির্বাচিত কাজ" />
          </h2>
          <Link className="text-link" href="/projects/">
            <Tx en={`All ${projects.length} projects`} bn={`সব ${projects.length}টি প্রকল্প`} />
            <Arrow />
          </Link>
        </div>
        <div className="spotlight">
          {spotlight.map((p) => (
            <DirectionalCard className="spotlight-card" key={p.slug}>
              <div className="card-media">
                <Link href={`/projects/${p.slug}/`} className="card-image" aria-label={p.title}>
                  <Image
                    className={p.thumbnailOverlayBaked ? undefined : "thumbnail-overlay"}
                    src={p.thumbnail}
                    alt={`${p.title} — ${p.imageKind}`}
                    width={p.thumbnailWidth}
                    height={p.thumbnailHeight}
                    sizes="(min-width: 960px) 540px, 100vw"
                  />
                </Link>
                <CardLinks project={p} />
              </div>
              <div className="card-meta">
                <Tx en={p.group} bn={groupLabels[p.group] ?? p.group} />
              </div>
              <h3>
                <Link href={`/projects/${p.slug}/`}>{p.title}</Link>
              </h3>
              <p>
                <Tx en={p.pitch} bn={p.bn.pitch} />
              </p>
              <ul className="tags">
                {p.displayTechnologies.slice(0, 5).map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </DirectionalCard>
          ))}
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

      <section className="section wrap reveal">
        <div className="section-head">
          <h2>
            <Tx en="Tools I work with" bn="যেসব টুল নিয়ে কাজ করি" />
          </h2>
          <Link className="text-link" href="/about/">
            <Tx en="Full stack" bn="পুরো তালিকা" />
            <Arrow />
          </Link>
        </div>
        <div className="stack home-stack">
          {stack.map((group) => (
            <div key={group.title.en}>
              <h3>
                <Tx en={group.title.en} bn={group.title.bn} />
              </h3>
              <ul className="chips">
                {group.items.slice(0, 6).map((item) => (
                  <DirectionalCard as="li" key={item}>
                    <BrandBadge name={item} />
                    {item}
                  </DirectionalCard>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="section wrap reveal">
        <div className="home-about">
          <div>
            <h2>
              <Tx
                en={<>A developer who cares about <em>the whole picture.</em></>}
                bn={<>যে ডেভেলপার <em>পুরো ছবিটা</em> নিয়ে ভাবে।</>}
              />
            </h2>
            <p>
              <Tx
                en="From the interface to the database and the server it runs on, I enjoy connecting the pieces so they work well together. I’m open to freelance projects and engineering roles."
                bn="ইন্টারফেস থেকে ডেটাবেস আর যে সার্ভারে সেটি চলে, সবকিছু একসঙ্গে ঠিকভাবে কাজ করানোতেই আমার আনন্দ। ফ্রিল্যান্স প্রকল্প ও ইঞ্জিনিয়ারিং ভূমিকায় আমি আগ্রহী।"
              />
            </p>
            <p className="home-edu">
              {education[0].short} · <Tx en={education[0].detail.en} bn={education[0].detail.bn} />
            </p>
            <Link className="text-link" href="/about/">
              <Tx en="More about me" bn="আমার সম্পর্কে আরও" />
              <Arrow />
            </Link>
          </div>
          <div className="timeline home-timeline">
            {experience.slice(0, 3).map((e) => (
              <div className="timeline-row" key={e.org}>
                <p className="timeline-when">
                  <Tx en={e.when.en} bn={e.when.bn} />
                </p>
                <div>
                  <h3>
                    {e.org} <span>· <Tx en={e.role.en} bn={e.role.bn} /></span>
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section wrap reveal">
        <div className="section-head">
          <h2>
            <Tx en="Design work" bn="ডিজাইনের কাজ" />
          </h2>
          <Link className="text-link" href="/design/">
            <Tx en={`All ${designs.length} designs`} bn={`সব ${designs.length}টি ডিজাইন`} />
            <Arrow />
          </Link>
        </div>
        <div className="grid">
          {homeDesigns.map((d) => (
            <DesignCard key={d.slug} design={d} />
          ))}
        </div>
      </section>

      <section className="wrap cta-band reveal">
        <h2>
          <Tx
            en={<>Have a project in mind? <em>Let’s talk.</em></>}
            bn={<>মাথায় কোনো প্রকল্প আছে? <em>কথা বলি।</em></>}
          />
        </h2>
        <div className="actions">
          <a className="button primary" href="mailto:thesujoykr@gmail.com">
            <Tx en="Send an email" bn="ইমেইল পাঠান" />
            <Arrow />
          </a>
          {PROFILES.filter((pr) => ["GitHub", "LinkedIn"].includes(pr.label)).map((pr) => (
            <a className="button" key={pr.href} href={pr.href} target="_blank" rel="noopener noreferrer">
              {pr.label}
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
