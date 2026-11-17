"use client";
import type { PointerEvent, ReactNode } from "react";

type Side = "left" | "right" | "top" | "bottom";

// Collapsed clip-path for each edge the fill can grow from / retract to.
const hidden: Record<Side, string> = {
  left: "inset(0 100% 0 0)",
  right: "inset(0 0 0 100%)",
  top: "inset(0 0 100% 0)",
  bottom: "inset(100% 0 0 0)",
};

// Last two pointer positions, so a fast sweep still resolves the edge it actually crossed.
let prev: { x: number; y: number; t: number } | null = null;
let cur: { x: number; y: number; t: number } | null = null;
if (typeof window !== "undefined") {
  window.addEventListener(
    "pointermove",
    (e) => {
      prev = cur;
      cur = { x: e.clientX, y: e.clientY, t: e.timeStamp };
    },
    { capture: true, passive: true },
  );
}

/** Edge of `r` crossed by the segment prev→cur; `entering` picks the first crossing, otherwise the last. */
function crossedSide(r: DOMRect, entering: boolean): Side | null {
  if (!prev || !cur) return null;
  const dx = cur.x - prev.x;
  const dy = cur.y - prev.y;
  let best: { side: Side; t: number } | null = null;
  const test = (side: Side, t: number, along: number, lo: number, hi: number) => {
    if (!isFinite(t) || t < 0 || t > 1 || along < lo || along > hi) return;
    if (!best || (entering ? t < best.t : t > best.t)) best = { side, t };
  };
  if (dx !== 0) {
    for (const [side, x] of [["left", r.left], ["right", r.right]] as const) {
      const t = (x - prev.x) / dx;
      test(side, t, prev.y + t * dy, r.top, r.bottom);
    }
  }
  if (dy !== 0) {
    for (const [side, y] of [["top", r.top], ["bottom", r.bottom]] as const) {
      const t = (y - prev.y) / dy;
      test(side, t, prev.x + t * dx, r.left, r.right);
    }
  }
  return (best as { side: Side } | null)?.side ?? null;
}

/** Animation length that follows the cursor: a fast sweep snaps (140ms), a slow drift glides (300ms). */
function durationMs(): number {
  if (!prev || !cur || cur.t <= prev.t) return 220;
  const speed = Math.hypot(cur.x - prev.x, cur.y - prev.y) / (cur.t - prev.t); // px/ms
  return Math.round(Math.min(300, Math.max(140, 300 - speed * 90)));
}

function sideOf(e: PointerEvent<HTMLElement>, entering: boolean): Side {
  const r = e.currentTarget.getBoundingClientRect();
  const crossed = crossedSide(r, entering);
  if (crossed) return crossed;
  const d: [Side, number][] = [
    ["left", e.clientX - r.left],
    ["right", r.right - e.clientX],
    ["top", e.clientY - r.top],
    ["bottom", r.bottom - e.clientY],
  ];
  return d.reduce((a, b) => (b[1] < a[1] ? b : a))[0];
}

const isFillAnim = (a: Animation) =>
  a.playState === "running" &&
  ["::before", "::after"].includes(
      (a.effect as KeyframeEffect | null)?.pseudoElement ?? "",
    );

// Pause on the fully filled card before draining after an early exit.
const HOLD_MS = 40;

// Cards left before their fill-in finished, waiting to drain; a re-enter cancels, a hand-off flushes.
const pendingLeave = new Map<HTMLElement, () => void>();

/** Card whose hover background fills in from the edge the pointer entered, and drains out through the edge it leaves. */
export function DirectionalCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const enter = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType === "touch") return;
    const el = e.currentTarget;
    pendingLeave.delete(el);
    // Moving from one card straight into another: the previous card drains right now, in
    // step with this one filling, so the lit area behaves like a single box sliding across.
    const dur = `${durationMs()}ms`;
    for (const [other, drainOther] of [...pendingLeave]) {
      pendingLeave.delete(other);
      other.style.setProperty("--fill-dur", dur);
      drainOther();
    }
    el.style.setProperty("--fill-dur", dur);
    // Re-entered while still animating: continue from the current shape instead of snapping.
    if (!el.getAnimations({ subtree: true }).some(isFillAnim)) {
      el.dataset.fill = "reset";
      el.style.setProperty("--fill-hidden", hidden[sideOf(e, true)]);
      void el.offsetWidth; // commit the start position before animating
    }
    el.dataset.fill = "on";
  };
  const leave = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType === "touch") return;
    const el = e.currentTarget;
    const exit = hidden[sideOf(e, false)];
    el.style.setProperty("--fill-dur", `${durationMs()}ms`);
    const drain = () => {
      el.style.setProperty("--fill-hidden", exit);
      el.dataset.fill = "off";
    };
    // Let a fill-in that is still running play to the end before draining.
    const filling = el.dataset.fill === "on" ? el.getAnimations({ subtree: true }).filter(isFillAnim) : [];
    if (filling.length === 0) return drain();
    const pending = () => {
      pendingLeave.delete(el);
      drain();
    };
    pendingLeave.set(el, pending);
    Promise.allSettled(filling.map((a) => a.finished)).then(() => {
      // Hold the full fill briefly so a quick flick still reads as fill → pause → drain.
      setTimeout(() => {
        if (pendingLeave.get(el) === pending) pending();
      }, HOLD_MS);
    });
  };
  return (
    <article
      className={`card card-fill ${className}`.trim()}
      onPointerEnter={enter}
      onPointerLeave={leave}
    >
      {children}
    </article>
  );
}
