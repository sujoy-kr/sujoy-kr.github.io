"use client";

import { useSyncExternalStore } from "react";

const key = "portfolio-theme";
function subscribe(notify: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const syncPreference = () => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(key);
    } catch {
      /* Storage may be disabled. */
    }
    document.documentElement.dataset.theme =
      saved === "light" || saved === "dark"
        ? saved
        : media.matches
          ? "dark"
          : "light";
    notify();
  };
  const onStorage = (event: StorageEvent) => {
    if (event.key === key || event.key === null) syncPreference();
  };
  window.addEventListener("portfolio-theme-change", notify);
  window.addEventListener("storage", onStorage);
  media.addEventListener("change", syncPreference);
  return () => {
    window.removeEventListener("portfolio-theme-change", notify);
    window.removeEventListener("storage", onStorage);
    media.removeEventListener("change", syncPreference);
  };
}
const getSnapshot = () =>
  document.documentElement.dataset.theme === "dark" ? "dark" : "light";
const getServerSnapshot = () => "light";

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const next = theme === "dark" ? "light" : "dark";
  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      onClick={(event) => {
        const root = document.documentElement;
        const apply = () => {
          root.dataset.theme = next;
          try {
            localStorage.setItem(key, next);
          } catch {
            /* The switch still works without persistence. */
          }
          window.dispatchEvent(new Event("portfolio-theme-change"));
        };
        if (!document.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          apply();
          return;
        }
        // Circular reveal growing from the toggle.
        const box = event.currentTarget.getBoundingClientRect();
        const x = box.left + box.width / 2;
        const y = box.top + box.height / 2;
        const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
        root.dataset.vt = "theme";
        const transition = document.startViewTransition(apply);
        void transition.ready.then(() =>
          root.animate(
            { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
            { duration: 650, easing: "cubic-bezier(0.4, 0, 0.2, 1)", pseudoElement: "::view-transition-new(root)" },
          ),
        );
        void transition.finished.finally(() => delete root.dataset.vt);
      }}
    >
      <svg
        key={theme}
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden="true"
      >
        {next === "dark" ? (
          <path d="M20.4 14A8.5 8.5 0 0 1 10 3.6 8.5 8.5 0 1 0 20.4 14Z" />
        ) : (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
          </>
        )}
      </svg>
    </button>
  );
}
