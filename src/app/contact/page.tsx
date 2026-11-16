import type { Metadata } from "next";
import { Arrow } from "@/components/Icons";
export const metadata: Metadata = { title: "Contact" };
export default function Contact() {
  return (
    <main id="main" className="wrap contact-page">
      <span className="eyebrow">
        FREELANCE PROJECT / ENGINEERING OPPORTUNITY / A GOOD IDEA
      </span>
      <h1>
        Great work starts
        <br />
        with <em>a conversation.</em>
      </h1>
      <p className="lead">
        Have a business workflow to improve, a website to build, or a team I
        could be part of? I’d like to hear about it.
      </p>
      <a className="contact-email" href="mailto:hello@sujoykr.com">
        hello@sujoykr.com <Arrow diagonal />
      </a>
      <div className="contact-details">
        <div>
          <span className="eyebrow">BASED IN</span>
          <p>Bangladesh</p>
        </div>
        <div>
          <span className="eyebrow">FIND ME ELSEWHERE</span>
          <a
            href="https://www.linkedin.com/in/sujoykarmakar"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn ↗
          </a>
          <a
            href="https://github.com/sujoy-kr"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub ↗
          </a>
        </div>
        <div>
          <span className="eyebrow">A HELPFUL FIRST MESSAGE</span>
          <p>
            The problem, the people it’s for,
            <br />
            and what you’d like to achieve.
          </p>
        </div>
      </div>
    </main>
  );
}
