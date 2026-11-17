import type { NextConfig } from "next";

const DEFAULT_SITE_URL = "https://sujoykr.pages.dev";

/**
 * Production origin, resolved at build time so one codebase deploys to both
 * hosts. NEXT_PUBLIC_SITE_URL always wins; otherwise it is derived from the
 * build environment (GitHub Actions: `<owner>.github.io`, user/org Pages repo).
 */
function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  const [owner] = (process.env.GITHUB_REPOSITORY ?? "").split("/");
  if (process.env.GITHUB_ACTIONS && owner) {
    return `https://${owner.toLowerCase()}.github.io`;
  }
  return DEFAULT_SITE_URL;
}

const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  env: { NEXT_PUBLIC_SITE_URL: resolveSiteUrl() },
};
export default config;
