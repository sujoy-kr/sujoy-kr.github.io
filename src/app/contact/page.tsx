import { GradientBackdrop } from "@/components/GradientBackdrop";
import type { Metadata } from "next";
import { Arrow } from "@/components/Icons";
import { BrandBadge } from "@/components/BrandBadge";
import { DirectionalCard } from "@/components/DirectionalCard";
import { Tx } from "@/components/Tx";
import { JsonLd } from "@/components/JsonLd";
import { NAME, PROFILES, SITE_URL, abs, breadcrumbs, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: `Get in touch with ${NAME} about a website, application or engineering role. Email, GitHub and LinkedIn.`,
  path: "/contact/",
  keywords: ["contact Sujoy Karmakar", "hire Sujoy Karmakar"],
});

export default function Contact() {
  return (
    <main id="main" className="wrap page detail">
      <GradientBackdrop />
      <JsonLd
        data={[
          {
            "@type": "ContactPage",
            url: abs("/contact/"),
            name: `Contact ${NAME}`,
            mainEntity: { "@id": `${SITE_URL}/#person` },
            isPartOf: { "@id": `${SITE_URL}/#website` },
          },
          breadcrumbs([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact/" },
          ]),
        ]}
      />
      <h1>
        <Tx
          en={<>Great work starts<br />with <em>a conversation.</em></>}
          bn={<>ভালো কাজ শুরু হয়<br /><em>একটি কথোপকথনে।</em></>}
        />
      </h1>
      <p className="lead">
        <Tx
          en="Have a business workflow to improve, a website to build, or a team I could be part of? I’d like to hear about it."
          bn="ব্যবসার কোনো ওয়ার্কফ্লো উন্নত করতে চান, ওয়েবসাইট বানাতে চান, কিংবা আপনার দলে আমাকে চান? আমি শুনতে আগ্রহী।"
        />
      </p>
      <a className="contact-email" href="mailto:thesujoykr@gmail.com">
        thesujoykr@gmail.com <Arrow diagonal />
      </a>
      <div className="contact-details">
        <div>
          <h2>
            <Tx en="Based in" bn="অবস্থান" />
          </h2>
          <p>
            <Tx en="Bangladesh" bn="বাংলাদেশ" />
          </p>
        </div>
        <div>
          <h2>
            <Tx en="Elsewhere" bn="অন্যত্র" />
          </h2>
          <ul className="profile-list">
            {PROFILES.map((profile) => (
              <li key={profile.href}>
                <DirectionalCard
                  as="a"
                  href={profile.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BrandBadge name={profile.label} />
                  {profile.label}
                </DirectionalCard>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>
            <Tx en="A helpful first message" bn="প্রথম বার্তায় যা থাকলে ভালো" />
          </h2>
          <p>
            <Tx
              en="The problem, the people it’s for, and what you’d like to achieve."
              bn="সমস্যাটি কী, কাদের জন্য, এবং আপনি কী অর্জন করতে চান।"
            />
          </p>
        </div>
      </div>
    </main>
  );
}
