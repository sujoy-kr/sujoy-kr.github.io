"use client";

import { useSyncExternalStore } from "react";

export type Lang = "en" | "bn";
export const LANG_KEY = "portfolio-lang";
const EVENT = "portfolio-lang-change";

function subscribe(notify: () => void) {
  window.addEventListener(EVENT, notify);
  return () => window.removeEventListener(EVENT, notify);
}
const getSnapshot = (): Lang =>
  document.documentElement.lang === "bn" ? "bn" : "en";
const getServerSnapshot = (): Lang => "en";

export function useLang(): Lang {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function setLang(lang: Lang) {
  document.documentElement.lang = lang;
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch {
    /* The switch still works without persistence. */
  }
  window.dispatchEvent(new Event(EVENT));
}
