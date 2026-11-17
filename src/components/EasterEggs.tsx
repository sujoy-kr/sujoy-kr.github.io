"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
const WORDS: Record<string, string> = { hire: "hire", disco: "disco", sujoy: "sujoy" };
const COLORS = ["#3d6a5c", "#8dbaa9", "#e0b84c", "#d96b5a", "#6a8fd8", "#b07cc6"];

type Piece = { x: number; y: number; vx: number; vy: number; r: number; s: number; c: string; spin: number };

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const editable = (t: EventTarget | null) =>
  t instanceof HTMLElement && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));

/** Hidden delights: Konami confetti, type-to-trigger words, wordmark taps, theme-toggle frenzy. */
export function EasterEggs() {
  const router = useRouter();
  const canvas = useRef<HTMLCanvasElement>(null);
  const raf = useRef(0);
  const [toast, setToast] = useState<{ id: number; text: string } | null>(null);

  const say = useCallback((text: string) => setToast({ id: Date.now(), text }), []);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3400);
    return () => clearTimeout(t);
  }, [toast]);

  const confetti = useCallback((count = 160) => {
    const el = canvas.current;
    const ctx = el?.getContext("2d");
    if (!el || !ctx || reduced()) return;
    const dpr = window.devicePixelRatio || 1;
    el.width = innerWidth * dpr;
    el.height = innerHeight * dpr;
    ctx.scale(dpr, dpr);
    const pieces: Piece[] = Array.from({ length: count }, () => ({
      x: innerWidth / 2,
      y: innerHeight * 0.7,
      vx: (Math.random() - 0.5) * 18,
      vy: -8 - Math.random() * 12,
      r: Math.random() * Math.PI,
      s: 6 + Math.random() * 6,
      c: COLORS[Math.floor(Math.random() * COLORS.length)],
      spin: (Math.random() - 0.5) * 0.4,
    }));
    cancelAnimationFrame(raf.current);
    const tick = () => {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      let alive = 0;
      for (const p of pieces) {
        p.vy += 0.35;
        p.vx *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        p.r += p.spin;
        if (p.y > innerHeight + 20) continue;
        alive++;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.r);
        ctx.fillStyle = p.c;
        ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
        ctx.restore();
      }
      if (alive) raf.current = requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, innerWidth, innerHeight);
    };
    raf.current = requestAnimationFrame(tick);
  }, []);

  const disco = useCallback(
    (on?: boolean) => {
      const d = document.documentElement;
      const next = on ?? !d.hasAttribute("data-disco");
      if (next) d.setAttribute("data-disco", "");
      else d.removeAttribute("data-disco");
      say(next ? "🪩 Disco mode on. Type “disco” again to stop." : "Disco mode off.");
    },
    [say],
  );

  useEffect(() => {
    let konami = 0;
    let typed = "";
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey || editable(e.target)) return;
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      konami = k === KONAMI[konami] ? konami + 1 : k === KONAMI[0] ? 1 : 0;
      if (konami === KONAMI.length) {
        konami = 0;
        confetti(240);
        say("↑↑↓↓←→←→BA — you found the secret. Thanks for looking closely.");
      }
      if (e.key.length !== 1) return;
      typed = (typed + k).slice(-8);
      if (typed.endsWith(WORDS.hire)) {
        typed = "";
        confetti(120);
        say("Great taste. Taking you to the contact page…");
        setTimeout(() => router.push("/contact/"), 1400);
      } else if (typed.endsWith(WORDS.disco)) {
        typed = "";
        disco();
      } else if (typed.endsWith(WORDS.sujoy)) {
        typed = "";
        say("👋 That’s me. Nice to meet you.");
      }
    };
    window.addEventListener("keydown", onKey);

    let taps = 0;
    let tapTimer: ReturnType<typeof setTimeout>;
    const onClick = (e: MouseEvent) => {
      const t = e.target as Element;
      const mark = t.closest<HTMLElement>(".wordmark");
      if (mark) {
        taps = tapTimer ? taps + 1 : 1;
        clearTimeout(tapTimer);
        tapTimer = setTimeout(() => (taps = 0), 900);
        if (taps >= 5) {
          taps = 0;
          e.preventDefault();
          mark.setAttribute("data-wiggle", "");
          setTimeout(() => mark.removeAttribute("data-wiggle"), 600);
          confetti(80);
          say("Easy there — that’s a lot of clicking for one name. 😄");
        }
      }
    };
    document.addEventListener("click", onClick, true);

    const toggles: number[] = [];
    const onToggle = () => {
      const now = Date.now();
      toggles.push(now);
      while (toggles.length && now - toggles[0] > 2500) toggles.shift();
      if (toggles.length >= 6) {
        toggles.length = 0;
        say("Can’t decide between light and dark? Same. 🌗");
      }
    };
    window.addEventListener("portfolio-theme-change", onToggle);

    console.log(
      "%cHey, fellow dev 👋%c\nCurious about the code? It’s on GitHub. Try the Konami code, or type “hire” on any page.",
      "font:600 16px system-ui;color:#3d6a5c",
      "font:13px system-ui",
    );

    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("portfolio-theme-change", onToggle);
      clearTimeout(tapTimer);
      cancelAnimationFrame(raf.current);
    };
  }, [confetti, disco, router, say]);

  return (
    <>
      <canvas ref={canvas} className="egg-canvas" aria-hidden="true" />
      {toast && (
        <div key={toast.id} className="egg-toast" role="status">
          {toast.text}
        </div>
      )}
    </>
  );
}
