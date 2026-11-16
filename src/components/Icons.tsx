export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h16m-6-6 6 6-6 6"} />
    </svg>
  );
}
export function Github() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="M9 19c-4 1-4-2-6-2m12 5v-4c0-1 .1-2-.5-2.5 3-.3 6-1.5 6-6A5 5 0 0 0 19 6c.2-1 .2-2-.3-3-1 0-3 1-3 1a12 12 0 0 0-7 0S6.7 3 5.7 3C5.2 4 5.2 5 5.4 6A5 5 0 0 0 4 9.5c0 4.5 3 5.7 6 6-.6.5-.6 1.5-.5 2.5v4" />
    </svg>
  );
}
