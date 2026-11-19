"use client";
import { createElement, type AnchorHTMLAttributes, type PointerEvent, type ReactNode } from "react";

/** Per-card fill state: the lit circle (x, y, r) eases toward its target (tx, ty, tr). */
interface Fill {
  x: number;
  y: number;
  r: number;
  tx: number;
  ty: number;
  tr: number;
  /** Pointer speed in px/ms at the last move, and when it was measured. */
  speed: number;
  moved: number;
  /** Last pointer sample, for computing speed. */
  px: number;
  py: number;
  pt: number;
  raf: number;
  last: number;
}

const fills = new WeakMap<HTMLElement, Fill>();

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Radius that lights the area around the cursor; small chips get a tight spot so the following stays visible. */
function fullRadius(el: HTMLElement): number {
  if (el.offsetHeight < 80) return el.offsetHeight * 0.9;
  return Math.max(el.offsetWidth, el.offsetHeight) * 0.6 + 40;
}

function tick(el: HTMLElement, f: Fill, now: number) {
  const dt = clamp(now - f.last, 1, 50);
  f.last = now;
  // Pointer speed fades once the pointer stops, so slow drifts stay smooth.
  const speed = f.speed * Math.exp(-(now - f.moved) / 80);
  const calm = reducedMotion();
  // Position tracks the pointer harder the faster it moves: a fast sweep is caught, never left behind.
  const tauPos = calm ? 0 : clamp(70 - speed * 45, 4, 70);
  const tauRad = calm ? 0 : clamp(130 - speed * 50, 40, 130);
  const kPos = tauPos === 0 ? 1 : 1 - Math.exp(-dt / tauPos);
  const kRad = tauRad === 0 ? 1 : 1 - Math.exp(-dt / tauRad);
  f.x += (f.tx - f.x) * kPos;
  f.y += (f.ty - f.y) * kPos;
  f.r += (f.tr - f.r) * kRad;
  const settled =
    Math.abs(f.tx - f.x) < 0.5 && Math.abs(f.ty - f.y) < 0.5 && Math.abs(f.tr - f.r) < 0.5;
  if (settled) {
    f.x = f.tx;
    f.y = f.ty;
    f.r = f.tr;
  }
  el.style.setProperty("--fx", `${f.x.toFixed(1)}px`);
  el.style.setProperty("--fy", `${f.y.toFixed(1)}px`);
  el.style.setProperty("--fr", `${f.r.toFixed(1)}px`);
  f.raf = settled ? 0 : requestAnimationFrame((t) => tick(el, f, t));
}

function kick(el: HTMLElement, f: Fill) {
  if (f.raf) return;
  f.last = performance.now();
  f.raf = requestAnimationFrame((t) => tick(el, f, t));
}

/** Records the pointer position (relative to the card) and speed, and aims the fill at it. */
function aim(e: PointerEvent<HTMLElement>, f: Fill) {
  const rect = e.currentTarget.getBoundingClientRect();
  const dt = e.timeStamp - f.pt;
  if (f.pt && dt > 0) {
    const v = Math.hypot(e.clientX - f.px, e.clientY - f.py) / dt;
    // Keep the peak of a quick burst so coalesced/sparse events still read as fast.
    f.speed = Math.max(v, f.speed * Math.exp(-(e.timeStamp - f.moved) / 80));
  }
  f.px = e.clientX;
  f.py = e.clientY;
  f.pt = e.timeStamp;
  f.moved = performance.now();
  f.tx = e.clientX - rect.left;
  f.ty = e.clientY - rect.top;
}

/** Card whose hover background grows around the cursor and follows it, faster the faster the pointer moves. */
export function DirectionalCard({
  children,
  className = "",
  as = "article",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  /** `article` for cards; `li` / `a` for pill-shaped chips and link buttons. */
  as?: "article" | "li" | "a";
} & Pick<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "target" | "rel">) {
  const enter = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType === "touch") return;
    const el = e.currentTarget;
    let f = fills.get(el);
    if (!f) {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      f = { x, y, r: 0, tx: x, ty: y, tr: 0, speed: 0, moved: 0, px: 0, py: 0, pt: 0, raf: 0, last: 0 };
      fills.set(el, f);
    }
    f.pt = 0; // a new visit: don't measure speed across the gap
    aim(e, f);
    f.speed = Math.max(f.speed, 1.5); // entering mid-sweep is treated as fast until real samples arrive
    f.tr = fullRadius(el);
    kick(el, f);
  };
  const move = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType === "touch") return;
    const f = fills.get(e.currentTarget);
    if (!f || f.tr === 0) return;
    // Coalesced samples keep the speed estimate honest when the pointer outruns the frame rate.
    aim(e, f);
    kick(e.currentTarget, f);
  };
  const leave = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType === "touch") return;
    const f = fills.get(e.currentTarget);
    if (!f) return;
    aim(e, f); // chase the exit point while shrinking, so a flyover is still caught end to end
    f.tr = 0;
    kick(e.currentTarget, f);
  };
  const base = as === "article" ? "card card-fill" : "card-fill chip-fill";
  return createElement(
    as,
    {
      ...rest,
      className: `${base} ${className}`.trim(),
      onPointerEnter: enter,
      onPointerMove: move,
      onPointerLeave: leave,
    },
    children,
  );
}
