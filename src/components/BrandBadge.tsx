import { brandIcons } from "@/lib/brand-icons";

// Brand colours too dark to read on the dark theme fall back to the text colour.
function isDark(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.2;
}

function initials(name: string) {
  const words = name.replace(/[^\p{L}\p{N}\s]/gu, "").split(/\s+/).filter(Boolean);
  return (words.length > 1 ? words.map((w) => w[0]).join("") : words[0] ?? "").slice(0, 3).toUpperCase();
}

/** Round badge: the brand logo when we have one, otherwise initials. */
export function BrandBadge({ name, label, src }: { name: string; label?: string; src?: string }) {
  const icon = brandIcons[name];
  return (
    <span className={src ? "badge badge-logo" : "badge"} aria-hidden="true">
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" width={96} height={96} loading="lazy" />
      ) : icon ? (
        <svg viewBox="0 0 24 24" fill={isDark(icon.hex) ? "currentColor" : `#${icon.hex}`}>
          <path d={icon.path} />
        </svg>
      ) : (
        <span className="badge-initials">{initials(label ?? name)}</span>
      )}
    </span>
  );
}
