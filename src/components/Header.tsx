"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tx } from "./Tx";
import { LanguageSwitch } from "./LanguageSwitch";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "/projects/", en: "Work", bn: "কাজ" },
  { href: "/design/", en: "Design", bn: "ডিজাইন" },
  { href: "/about/", en: "About", bn: "পরিচিতি" },
  { href: "/contact/", en: "Contact", bn: "যোগাযোগ" },
];

export function Header() {
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);
  const header = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => setMenu(false), [pathname]);
  useEffect(() => {
    if (!menu) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setMenu(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenu(false);
        if (document.activeElement?.closest("#site-nav")) menuButton.current?.focus();
      }
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 821px)").matches) setMenu(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [menu]);
  return (
    <header
      className="header"
      data-open={menu}
      ref={header}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setMenu(false);
      }}
    >
      <div className="header-inner">
        <Link href="/" className="wordmark" aria-label="sujoykr — Sujoy Karmakar, home">
          sujoy<span>kr</span>
        </Link>
        <div className="header-actions">
          <LanguageSwitch />
          <ThemeToggle />
          <button
            type="button"
            ref={menuButton}
            className="menu-button"
            aria-expanded={menu}
            aria-controls="site-nav"
            aria-label={menu ? "Close menu" : "Open menu"}
            onClick={() => setMenu((v) => !v)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              {menu ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
        <nav id="site-nav" aria-label="Main navigation">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenu(false)}
              aria-current={
                pathname.startsWith(l.href.replace(/\/$/, ""))
                  ? "page"
                  : undefined
              }
            >
              <Tx en={l.en} bn={l.bn} />
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
