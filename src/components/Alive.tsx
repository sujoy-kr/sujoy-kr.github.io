"use client";
import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

const MAGNETIC = ".button, .theme-toggle, .menu-button, .lang-button";
const TILT = ".card";

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Site-wide life, all progressive enhancement over the static HTML: magnetic controls, card tilt,
 * image fade-in and cross-fading page transitions.
 */
export function Alive() {
  const router = useRouter();
  const pathname = usePathname();
  const settle = useRef<(() => void) | null>(null);

  // A pending page transition ends once the new route has rendered.
  useEffect(() => {
    settle.current?.();
  }, [pathname]);

  // Pointer effects (mouse only): magnetic controls, card tilt.
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let active: HTMLElement | null = null;

    const release = (node: HTMLElement) => {
      for (const p of ["--mx", "--my", "--rx", "--ry"]) node.style.removeProperty(p);
      node.removeAttribute("data-tilt");
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (reduced()) return;
      const hit = (e.target as Element).closest<HTMLElement>(`${MAGNETIC}, ${TILT}`);
      if (hit !== active) {
        if (active) release(active);
        active = hit;
      }
      if (!active) return;
      const r = active.getBoundingClientRect();
      if (active.matches(MAGNETIC)) {
        // Measure from the resting centre so the pull doesn't feed back into itself.
        const cx = r.left + r.width / 2 - (parseFloat(active.style.getPropertyValue("--mx")) || 0);
        const cy = r.top + r.height / 2 - (parseFloat(active.style.getPropertyValue("--my")) || 0);
        active.style.setProperty("--mx", `${clamp((e.clientX - cx) * 0.3, -8, 8).toFixed(1)}px`);
        active.style.setProperty("--my", `${clamp((e.clientY - cy) * 0.3, -6, 6).toFixed(1)}px`);
      } else {
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        active.setAttribute("data-tilt", "");
        active.style.setProperty("--rx", `${(-py * 4).toFixed(2)}deg`);
        active.style.setProperty("--ry", `${(px * 4).toFixed(2)}deg`);
      }
    };
    const onLeave = () => {
      if (active) release(active);
      active = null;
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      onLeave();
    };
  }, []);

  // Cross-fade between pages (View Transitions API) while keeping client-side routing.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (!document.startViewTransition || reduced()) return;
      const a = (e.target as Element).closest<HTMLAnchorElement>("a[href]");
      if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || !url.pathname.endsWith("/") || url.pathname === location.pathname) return;
      e.preventDefault();
      e.stopPropagation();
      document.startViewTransition(
        () =>
          new Promise<void>((resolve) => {
            const done = () => {
              clearTimeout(timer);
              settle.current = null;
              resolve();
            };
            const timer = setTimeout(done, 1200);
            settle.current = done;
            router.push(url.pathname + url.search + url.hash);
          }),
      );
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  // Per-page: fade lazy images in once they've loaded.
  useEffect(() => {
    const cleanups: Array<() => void> = [];
    document.querySelectorAll<HTMLImageElement>("main img[loading='lazy']").forEach((img) => {
      if (img.complete || img.getBoundingClientRect().top < innerHeight) return;
      img.setAttribute("data-loading", "");
      const done = () => {
        clearTimeout(timer);
        img.removeAttribute("data-loading");
        img.setAttribute("data-loaded", "");
      };
      const timer = setTimeout(done, 6000);
      img.addEventListener("load", done, { once: true });
      img.addEventListener("error", done, { once: true });
      cleanups.push(() => clearTimeout(timer));
    });
    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
