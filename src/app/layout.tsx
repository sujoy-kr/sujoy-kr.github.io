import type { Metadata, Viewport } from "next";
import { Hind_Siliguri, Inter, Newsreader } from "next/font/google";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Arrow } from "@/components/Icons";
import { Tx } from "@/components/Tx";
import "./globals.css";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const serif = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  style: ["normal", "italic"],
});
const bangla = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-bangla",
  display: "swap",
});

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
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f4ef" },
    { media: "(prefers-color-scheme: dark)", color: "#131615" },
  ],
};

const init = `(function(){var d=document.documentElement,t,l;try{t=localStorage.getItem("portfolio-theme");l=localStorage.getItem("portfolio-lang")}catch(e){}d.dataset.theme=t==="light"||t==="dark"?t:window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";var m=/[?&]theme=(light|dark)/.exec(location.search);if(m)d.dataset.theme=m[1];var q=/[?&]lang=(bn|en)/.exec(location.search);if(q)l=q[1];d.lang=l==="bn"?"bn":"en"})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${serif.variable} ${bangla.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: init }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          <Tx en="Skip to content" bn="মূল অংশে যান" />
        </a>
        <Header />
        {children}
        <footer className="footer">
          <div className="wrap footer-inner">
            <div className="footer-cta">
              <Link href="/contact/" className="footer-title">
                <Tx en="Let’s make it work." bn="চলুন কাজটা দাঁড় করাই।" />
                <Arrow diagonal />
              </Link>
              <a className="footer-mail" href="mailto:hello@sujoykr.com">
                hello@sujoykr.com
              </a>
            </div>
            <div className="footer-bottom">
              <span>© {new Date().getFullYear()} Sujoy Karmakar</span>
              <div>
                <a href="https://github.com/sujoy-kr" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
                <a href="https://www.linkedin.com/in/sujoykarmakar" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
