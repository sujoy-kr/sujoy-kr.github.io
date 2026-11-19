"use client";
import { useEffect, useState } from "react";
import { Tx } from "./Tx";

const roles = [
  { en: "Full-stack developer", bn: "ফুল-স্ট্যাক ডেভেলপার" },
  { en: "Android app builder", bn: "অ্যান্ড্রয়েড অ্যাপ নির্মাতা" },
  { en: "Backend engineer", bn: "ব্যাকএন্ড ইঞ্জিনিয়ার" },
  { en: "UI designer", bn: "ইউআই ডিজাইনার" },
];

/** Cycles through roles in place. Every role is in the HTML (stacked in one grid cell), so layout never shifts. */
export function RoleRotator() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      if (!document.hidden) setI((n) => (n + 1) % roles.length);
    }, 2800);
    return () => clearInterval(id);
  }, []);
  return (
    <p className="role-line">
      {roles.map((r, n) => (
        <span key={r.en} className="role" data-on={n === i || undefined} aria-hidden={n === i ? undefined : true}>
          <Tx en={r.en} bn={r.bn} />
        </span>
      ))}
    </p>
  );
}
