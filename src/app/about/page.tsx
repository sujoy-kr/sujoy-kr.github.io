import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/Icons";
export const metadata: Metadata = { title: "About" };
export default function About() {
  return (
    <main id="main" className="wrap about-page">
      <span className="eyebrow">A LITTLE ABOUT ME</span>
      <div className="about-layout">
        <div>
          <h1>
            Hi, I’m Sujoy.
            <br />
            <em>
              I build things
              <br />
              that make sense.
            </em>
          </h1>
          <p className="lead">
            A full-stack developer based in Bangladesh, working across websites,
            applications, and the systems that support them.
          </p>
          <p>
            My work ranges from business catalogues and ordering tools to
            Android applications and research interfaces. I enjoy connecting a
            clear interface with the logic, data and decisions underneath it.
          </p>
          <p>
            I’m interested in both freelance collaborations and engineering
            roles: opportunities to understand a problem, work with a team, and
            turn an idea into useful software.
          </p>
          <Link className="button" href="/contact/">
            Let’s start a conversation <Arrow diagonal />
          </Link>
        </div>
        <figure className="portrait">
          <Image
            src="/images/profile/portrait.webp"
            width={700}
            height={900}
            alt="Sujoy Karmakar"
          />
          <figcaption>SUJOY KARMAKAR / BANGLADESH</figcaption>
        </figure>
      </div>
      <section className="about-capabilities">
        <span className="eyebrow">ACROSS THE STACK</span>
        {[
          [
            "Interfaces",
            "React, Next.js, Svelte, TypeScript and responsive CSS.",
          ],
          [
            "Applications & data",
            "Node.js, NestJS, Express, PHP, Python, PostgreSQL and MongoDB.",
          ],
          [
            "Beyond the browser",
            "Native Android with Kotlin, Compose and Room; local data and AI tools.",
          ],
        ].map(([t, d]) => (
          <div key={t}>
            <h2>{t}</h2>
            <p>{d}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
