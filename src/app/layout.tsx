import type { Metadata, Viewport } from "next";
import { Hind_Siliguri, Inter, Newsreader } from "next/font/google";
import Link from "next/link";
import { EasterEggs } from "@/components/EasterEggs";
import { Header } from "@/components/Header";
import { Arrow } from "@/components/Icons";
import { Tx } from "@/components/Tx";
import { JsonLd } from "@/components/JsonLd";
import { NAME, PORTRAIT, SITE_URL, PROFILES, person } from "@/lib/seo";
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

const DESCRIPTION =
  "Sujoy Karmakar is a full-stack developer from Bangladesh. Explore his websites, web applications, Android apps, backend systems and UI designs.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sujoy Karmakar — Full-stack Developer & Designer from Bangladesh",
    template: "%s — Sujoy Karmakar",
  },
  description: DESCRIPTION,
  applicationName: NAME,
  keywords: [
    "Sujoy Karmakar",
    "Sujoy Kr",
    "sujoy-kr",
    "Sujoy Karmakar portfolio",
    "full-stack developer Bangladesh",
    "Next.js developer",
    "Android developer",
    "web developer portfolio",
  ],
  authors: [{ name: NAME, url: SITE_URL }],
  creator: NAME,
  category: "technology",
  publisher: NAME,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Sujoy Karmakar — Full-stack Developer & Designer",
    description: DESCRIPTION,
    url: "/",
    siteName: NAME,
    locale: "en_US",
    alternateLocale: ["bn_BD"],
    type: "website",
    images: [{ url: PORTRAIT.src, width: PORTRAIT.width, height: PORTRAIT.height, alt: NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sujoy Karmakar — Full-stack Developer & Designer",
    description: DESCRIPTION,
    images: [PORTRAIT.src],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
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
        <JsonLd
          data={[
            person,
            {
              "@type": "WebSite",
              "@id": `${SITE_URL}/#website`,
              url: `${SITE_URL}/`,
              name: `${NAME} — Portfolio`,
              alternateName: NAME,
              inLanguage: ["en", "bn"],
              publisher: { "@id": `${SITE_URL}/#person` },
              about: { "@id": `${SITE_URL}/#person` },
            },
          ]}
        />
      </head>
      <body>
        <a className="skip-link" href="#main">
          <Tx en="Skip to content" bn="মূল অংশে যান" />
        </a>
        <div className="scroll-progress" aria-hidden="true" />
        <Header />
        <EasterEggs />
        {children}
        <footer className="footer">
          <div className="wrap footer-inner">
            <div className="footer-cta">
              <Link href="/contact/" className="footer-title">
                <Tx en="Let’s make it work." bn="চলুন কাজটা দাঁড় করাই।" />
                <Arrow diagonal />
              </Link>
              <a className="footer-mail" href="mailto:thesujoykr@gmail.com">
                thesujoykr@gmail.com
              </a>
            </div>
            <div className="footer-bottom">
              <span>© {new Date().getFullYear()} Sujoy Karmakar</span>
              <div>
                {PROFILES.filter(({ label }) => label === "GitHub" || label === "LinkedIn")
                  .map(({ label, href }) => (
                    <a key={label} href={href} target="_blank" rel="me noopener noreferrer">
                      {label}
                    </a>
                  ))}
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
