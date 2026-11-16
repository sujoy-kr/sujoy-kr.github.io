import Link from "next/link";
import Image from "next/image";
import { featured, projects } from "@/data/projects";
import { Arrow } from "@/components/Icons";
import { ProjectCard } from "@/components/ProjectCard";
import { Tx } from "@/components/Tx";

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
              en="I’m Sujoy, a full-stack developer turning business problems into websites and applications people can actually use."
              bn="আমি সুজয়, একজন ফুল-স্ট্যাক ডেভেলপার। ব্যবসার সমস্যাকে এমন ওয়েবসাইট ও অ্যাপ্লিকেশনে রূপ দিই, যা মানুষ সত্যিই ব্যবহার করতে পারে।"
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
        <Link href="/projects/gsg/" className="hero-image" aria-label="G.S. Garments Ltd.">
          <Image
            src="/images/hero/gsg-home.webp"
            width={1920}
            height={1152}
            alt="G.S. Garments Ltd. homepage featuring its factory and clothing collections"
            priority
            sizes="(min-width: 960px) 560px, 100vw"
          />
        </Link>
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
          {featured.slice(0, 3).map((p) => (
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
