export function FlagUK({ size = 18 }: { size?: number }) {
  return (
    <svg
      className="flag"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <defs>
        <clipPath id="flag-uk-c">
          <circle cx="12" cy="12" r="12" />
        </clipPath>
      </defs>
      <g clipPath="url(#flag-uk-c)">
        <rect width="24" height="24" fill="#1f3a8a" />
        <path d="M0 0 24 24M24 0 0 24" stroke="#fff" strokeWidth="4.5" />
        <path d="M0 0 24 24M24 0 0 24" stroke="#c8102e" strokeWidth="1.6" />
        <path d="M12 0v24M0 12h24" stroke="#fff" strokeWidth="7" />
        <path d="M12 0v24M0 12h24" stroke="#c8102e" strokeWidth="4" />
      </g>
    </svg>
  );
}
export function FlagBD({ size = 18 }: { size?: number }) {
  return (
    <svg
      className="flag"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <defs>
        <clipPath id="flag-bd-c">
          <circle cx="12" cy="12" r="12" />
        </clipPath>
      </defs>
      <g clipPath="url(#flag-bd-c)">
        <rect width="24" height="24" fill="#006a4e" />
        <circle cx="11" cy="12" r="6" fill="#f42a41" />
      </g>
    </svg>
  );
}
