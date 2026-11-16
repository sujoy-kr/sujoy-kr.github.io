import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="wrap empty">
      <span className="eyebrow">404 / NOT IN THE COLLECTION</span>
      <h1>This page wandered off.</h1>
      <p>There’s plenty of work to explore back in the collection.</p>
      <Link className="button" href="/projects/">
        Browse projects →
      </Link>
    </main>
  );
}
