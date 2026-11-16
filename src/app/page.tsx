import Link from "next/link";
import Image from "next/image";
import { featured, projects } from "@/data/projects";
import { Arrow } from "@/components/Icons";
import { ProjectCard } from "@/components/ProjectCard";
export default function Home() {
  return (
    <main id="main">
      <section className="hero wrap">
        <div className="hero-copy">
          <div className="availability">
            <i /> Open to projects & opportunities
          </div>
          <h1>
            Good ideas.
            <br />
            Thoughtful code.
            <br />
            <em>Useful things.</em>
          </h1>
          <p>
            I’m Sujoy, a full-stack developer turning business problems into
            websites and applications people can actually use.
          </p>
          <div className="hero-actions">
            <Link className="button" href="/projects/">
              Explore my work <Arrow diagonal />
            </Link>
            <Link className="text-link" href="/about/">
              A little about me <Arrow />
            </Link>
          </div>
          <div className="hero-location">
            <span>BASED IN BANGLADESH</span>
            <span>BUILDING FOR THE WEB & BEYOND</span>
          </div>
        </div>
        <div className="hero-canvas">
          <div className="canvas-top">
            <span>FROM THE WORKBENCH</span>
            <span>↗</span>
          </div>
          <div className="canvas-ring" />
          <Link href="/projects/gsg/" className="hero-browser">
            <div className="browser-bar">
              <span>● ● ●</span>
              <span>G.S. Garments Ltd.</span>
              <Arrow diagonal />
            </div>
            <Image
              src="/images/hero/gsg-home.webp"
              width={1920}
              height={1152}
              alt="G.S. Garments Ltd. homepage featuring its factory and clothing collections"
              priority
            />
          </Link>
          <Link href="/projects/hood-up-cse489/" className="hero-phone">
            <Image
              src="/images/hero/hood-up-workshop.webp"
              width={810}
              height={1794}
              alt="Hood Up Android app showing a workshop, vehicle-service prices and booking options"
              priority
            />
          </Link>
          <div className="canvas-note">
            <span className="star">✳</span>
            <span>
              Built for real workflows.
              <br />
              Considered down to the details.
            </span>
          </div>
          <div className="canvas-foot">
            <span>WEB / MOBILE / DATA</span>
            <span>SELECTED EXPLORATIONS — 01</span>
          </div>
        </div>
      </section>
      <div className="skills-strip">
        <span>FULL-STACK DEVELOPMENT</span>
        <b>✳</b>
        <span>BUSINESS WEBSITES</span>
        <b>✳</b>
        <span>ANDROID APPLICATIONS</span>
        <b>✳</b>
        <span>DATA & AI</span>
      </div>
      <section className="section wrap">
        <div className="section-heading">
          <div>
            <span className="eyebrow">01 / SELECTED WORK</span>
            <h2>
              Different problems.
              <br />
              <em>The same care.</em>
            </h2>
          </div>
          <div className="section-intro">
            <p>
              A selection of business tools, native apps, and research projects.
              Follow the interfaces through to the engineering behind them.
            </p>
            <Link className="text-link" href="/projects/">
              All {projects.length} projects <Arrow diagonal />
            </Link>
          </div>
        </div>
        <div className="project-grid home-grid">
          {featured.slice(0, 3).map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
        <Link href="/projects/" className="collection-link">
          Explore the full collection{" "}
          <span>
            Web apps, systems, experiments & earlier client work <Arrow />
          </span>
        </Link>
      </section>
      <section className="approach-section">
        <div className="wrap approach">
          <div>
            <span className="eyebrow">02 / HOW I CAN HELP</span>
            <h2>
              Useful to your business.
              <br />
              <em>Clear to your team.</em>
            </h2>
            <p>
              I work across the interface and the systems behind it, keeping the
              business workflow in view.
            </p>
            <Link className="text-link" href="/contact/">
              Tell me what you’re building <Arrow diagonal />
            </Link>
          </div>
          <div className="services">
            {[
              [
                "01",
                "Websites that communicate",
                "Clear, responsive sites for businesses, services and campaigns.",
              ],
              [
                "02",
                "Applications that organise",
                "Catalogues, admin tools and workflows that bring information together.",
              ],
              [
                "03",
                "Engineering with intention",
                "Readable code, explicit system boundaries, and practical verification.",
              ],
            ].map(([n, t, d]) => (
              <div key={n}>
                <span>{n}</span>
                <div>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
                <Arrow diagonal />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="wrap about-teaser">
        <span className="eyebrow">THE PERSON BEHIND THE PROJECTS</span>
        <p>
          Curious about the problem.
          <br />
          Careful with the implementation.
          <br />
          <em>Always learning from the next build.</em>
        </p>
        <Link className="text-link" href="/about/">
          Meet Sujoy <Arrow diagonal />
        </Link>
      </section>
    </main>
  );
}
