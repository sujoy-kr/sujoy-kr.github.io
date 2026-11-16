import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Arrow } from "@/components/Icons";
import "./globals.css";
export const metadata: Metadata = {
  title: {
    default: "Sujoy Karmakar — Full-stack developer",
    template: "%s — Sujoy Karmakar",
  },
  description:
    "Thoughtful websites, useful applications, and the engineering behind them. Explore full-stack, Android, and data projects by Sujoy Karmakar.",
  openGraph: {
    title: "Sujoy Karmakar — Full-stack developer",
    description: "Websites, applications, and the engineering behind them.",
    type: "website",
  },
  robots: { index: true, follow: true },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var theme;try{theme=localStorage.getItem("portfolio-theme")}catch(e){}document.documentElement.dataset.theme=theme==="light"||theme==="dark"?theme:window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"})()`,
          }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        {children}
        <footer className="footer">
          <div className="footer-top">
            <div>
              <span className="eyebrow">HAVE SOMETHING IN MIND?</span>
              <Link href="/contact/" className="footer-title">
                Let’s make it work.
                <Arrow diagonal />
              </Link>
            </div>
            <a className="footer-mail" href="mailto:hello@sujoykr.com">
              hello@sujoykr.com <Arrow diagonal />
            </a>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Sujoy Karmakar</span>
            <span>Built with Next.js. Made with care.</span>
            <div>
              <a
                href="https://github.com/sujoy-kr"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub ↗
              </a>
              <a
                href="https://www.linkedin.com/in/sujoykarmakar"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
