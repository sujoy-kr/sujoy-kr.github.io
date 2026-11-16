import type { Metadata } from "next";
import { Arrow } from "@/components/Icons";
import { Tx } from "@/components/Tx";

export const metadata: Metadata = { title: "Contact" };

export default function Contact() {
  return (
    <main id="main" className="wrap page">
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
      <a className="contact-email" href="mailto:hello@sujoykr.com">
        hello@sujoykr.com <Arrow diagonal />
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
          <p>
            <a href="https://www.linkedin.com/in/sujoykarmakar" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            {" · "}
            <a href="https://github.com/sujoy-kr" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </p>
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
