import type { Metadata } from "next";
import Link from "next/link";
import { Tx } from "@/components/Tx";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main id="main" className="wrap page">
      <h1>
        <Tx en="This page wandered off." bn="পাতাটি হারিয়ে গেছে।" />
      </h1>
      <p className="lead">
        <Tx
          en="There’s plenty of work to explore back in the collection."
          bn="সংগ্রহে দেখার মতো আরও অনেক কাজ আছে।"
        />
      </p>
      <Link className="button primary" href="/projects/">
        <Tx en="Browse projects" bn="প্রকল্পগুলো দেখুন" />
      </Link>
    </main>
  );
}
