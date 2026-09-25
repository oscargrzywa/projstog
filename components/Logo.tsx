/**
 * Znak PROJSTOG — „rising stack" / stóg.
 *
 * Trzy warstwy o rosnącej szerokości: stóg układany od góry, a zarazem
 * wykres w górę. Najjaśniejsza jest warstwa górna — to jedyne miejsce
 * w nawigacji, gdzie pojawia się Voltage.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect x="9" y="4" width="6" height="4" rx="1" fill="var(--color-voltage)" />
      <rect x="5.5" y="10" width="13" height="4" rx="1" fill="var(--color-signal)" />
      <rect x="2" y="16" width="20" height="4" rx="1" fill="var(--color-hairline)" />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={`font-display text-lg font-semibold tracking-tight text-bone ${className ?? ""}`}
    >
      PROJSTOG
    </span>
  );
}
