"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Arrow } from "./Icons";
import { ThemeToggle } from "./ThemeToggle";
export function Header() {
  const pathname = usePathname();
  return (
    <header className="header">
      <Link href="/" className="wordmark" aria-label="Sujoy Karmakar home">
        sujoy<span>kr.</span>
      </Link>
      <nav aria-label="Main navigation">
        {[
          ["/projects/", "Work"],
          ["/design/", "Design"],
          ["/about/", "About"],
          ["/contact/", "Contact"],
        ].map(([href, label]) => (
          <Link
            key={href}
            href={href}
            aria-current={
              pathname.startsWith(href.replace(/\/$/, "")) ? "page" : undefined
            }
          >
            {label}
          </Link>
        ))}
      </nav>
      <div className="header-actions">
        <ThemeToggle />
        <Link className="header-cta" href="/contact/">
          Let’s talk <Arrow diagonal />
        </Link>
      </div>
    </header>
  );
}
