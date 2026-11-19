"use client";
import { useSyncExternalStore } from "react";
import { Tx } from "./Tx";

const subscribe = (notify: () => void) => {
  const id = setInterval(notify, 15000);
  return () => clearInterval(id);
};
const hello: Record<string, [string, string]> = {
  morning: ["Good morning", "শুভ সকাল"],
  afternoon: ["Good afternoon", "শুভ অপরাহ্ন"],
  evening: ["Good evening", "শুভ সন্ধ্যা"],
  night: ["Hello, night owl", "শুভ রাত্রি"],
};
function snapshot() {
  const now = new Date();
  const h = now.getHours();
  const part = h < 5 ? "night" : h < 12 ? "morning" : h < 17 ? "afternoon" : h < 21 ? "evening" : "night";
  const time = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone: "Asia/Dhaka" }).format(now);
  return `${part}|${time}`;
}

/** Greets by the visitor's own time of day and shows the time in Dhaka. Hidden (but space reserved) until mounted. */
export function LocalTime() {
  const value = useSyncExternalStore(subscribe, snapshot, () => "");
  const [part, time = "12:00 PM"] = (value || "evening|12:00 PM").split("|");
  const [en, bn] = hello[part];
  return (
    <span className="local-time" data-ready={value ? "" : undefined}>
      <Tx en={`${en} · ${time} in Dhaka`} bn={`${bn} · ঢাকায় এখন ${time}`} />
    </span>
  );
}
