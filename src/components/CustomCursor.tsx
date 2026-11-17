"use client";
import { useEffect, useRef } from "react";

const INTERACTIVE = "a, button, [role='button'], summary, label, select";
const TEXT = "input, textarea, [contenteditable='true']";

/** Custom pointer: an accent-coloured arrow that replaces the system cursor and reacts to what's underneath. */
export function CustomCursor() {
  const arrow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const root = document.documentElement;
    const el = arrow.current!;
    let seen = false;

    const state = (t: EventTarget | null) => {
      const n = t instanceof Element ? t : null;
      root.dataset.cursor = !n
        ? ""
        : n.closest(TEXT)
          ? "text"
          : getComputedStyle(n).cursor === "zoom-in"
            ? "zoom"
            : n.closest(INTERACTIVE)
              ? "link"
              : "";
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      el.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`;
      if (!seen) {
        seen = true;
        root.classList.add("cursor-on");
      }
      state(e.target);
    };
    const down = () => root.classList.add("cursor-down");
    const up = () => root.classList.remove("cursor-down");
    const leave = () => {
      seen = false;
      root.classList.remove("cursor-on");
    };

    addEventListener("pointermove", move, { passive: true });
    addEventListener("pointerdown", down);
    addEventListener("pointerup", up);
    root.addEventListener("mouseleave", leave);
    return () => {
      removeEventListener("pointermove", move);
      removeEventListener("pointerdown", down);
      removeEventListener("pointerup", up);
      root.removeEventListener("mouseleave", leave);
      root.classList.remove("cursor-on", "cursor-down");
      delete root.dataset.cursor;
    };
  }, []);

  return (
    <div ref={arrow} className="cursor-arrow" aria-hidden="true">
      <svg className="cursor-dart" width="31" height="31" viewBox="0 0 24 24">
        <path d="M2 2 L20 9.5 L11.2 12 L8.6 21 Z" />
      </svg>
      <svg className="cursor-finger" width="30" height="30" viewBox="0 0 24 24">
        <path d="M9.5 2C8.3 2 7.5 2.9 7.5 4V12.2L5.6 10.6C4.8 9.9 3.6 10 3 10.9C2.5 11.6 2.7 12.6 3.4 13.2L8 18.2C9.2 19.5 10.9 20.5 13 20.5H14.5C18 20.5 20.5 18 20.5 14.5V10.8C20.5 9.8 19.7 9 18.7 9C18.4 9 18.1 9.1 17.9 9.2C17.6 8.4 16.9 7.9 16 7.9C15.6 7.9 15.2 8 14.9 8.2C14.6 7.5 13.9 7 13.1 7C12.7 7 12.4 7.1 11.5 7.4V4C11.5 2.9 10.7 2 9.5 2Z" />
        <path className="cursor-finger-lines" d="M14.9 8.2V12.5M17.9 9.2V12.5M11.5 7.4V12.5" />
      </svg>
    </div>
  );
}
