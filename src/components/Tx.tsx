import type { ReactNode } from "react";

/**
 * Renders both languages into the static HTML. CSS (globals.css) shows the one
 * matching <html lang>, so switching language never needs a re-render or reload.
 */
export function Tx({ en, bn }: { en: ReactNode; bn: ReactNode }) {
  return (
    <>
      <span lang="en" data-l="en">
        {en}
      </span>
      <span lang="bn" data-l="bn">
        {bn}
      </span>
    </>
  );
}
