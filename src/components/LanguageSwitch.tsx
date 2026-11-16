"use client";

import { useEffect, useRef, useState } from "react";
import { FlagBD, FlagUK } from "./Flags";
import { setLang, useLang, type Lang } from "@/lib/lang";

const options: { code: Lang; label: string; Flag: typeof FlagUK }[] = [
  { code: "en", label: "English", Flag: FlagUK },
  { code: "bn", label: "বাংলা", Flag: FlagBD },
];

export function LanguageSwitch() {
  const lang = useLang();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const current = options.find((o) => o.code === lang) ?? options[0];

  useEffect(() => {
    if (!open) return;
    const close = (e: Event) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);

  return (
    <div className="lang" ref={root}>
      <button
        type="button"
        className="lang-button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={lang === "bn" ? "ভাষা পরিবর্তন করুন" : "Change language"}
        onClick={() => setOpen((v) => !v)}
      >
        <current.Flag />
        <span>{current.label}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {open && (
        <ul className="lang-menu" role="listbox" aria-label="Language">
          {options.map(({ code, label, Flag }) => (
            <li key={code} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={code === lang}
                lang={code}
                onClick={() => {
                  setLang(code);
                  setOpen(false);
                }}
              >
                <Flag />
                <span>{label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
