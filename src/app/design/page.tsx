import type { Metadata } from "next";
import { designs } from "@/data/designs";
import { DesignCard } from "@/components/DesignCard";
import { Tx } from "@/components/Tx";

export const metadata: Metadata = {
  title: "Design",
  description:
    "UI design explorations: landing pages, product pages, dashboards and app concepts.",
};

export default function Design() {
  return (
    <main id="main" className="wrap page">
      <header className="page-head">
        <h1>
          <Tx en={<>Interfaces I’ve <em>designed.</em></>} bn={<>আমার <em>ডিজাইন করা ইন্টারফেস।</em></>} />
        </h1>
        <p className="lead">
          <Tx
            en="Landing pages, product pages, dashboards and app concepts, first shared on Dribbble."
            bn="ল্যান্ডিং পেজ, প্রোডাক্ট পেজ, ড্যাশবোর্ড ও অ্যাপের ধারণা, যা প্রথমে Dribbble-এ প্রকাশ করেছিলাম।"
          />
        </p>
      </header>
      <div className="grid">
        {designs.map((d) => (
          <DesignCard key={d.slug} design={d} />
        ))}
      </div>
    </main>
  );
}
