"use client";

/**
 * Przycisk „Kopiuj" przy NIP / REGON — mała wyspa kliencka.
 *
 * Sama wartość jest w HTML-u z serwera (obok przycisku), tu jest tylko
 * schowek. Potwierdzenie trafia do czytnika ekranu przez osobny region
 * `role="status"` — etykieta przycisku zostaje stała („Kopiuj NIP").
 */

import { useEffect, useRef, useState } from "react";

export function CopyValue({
  value,
  label,
  copyLabel,
  copiedLabel,
}: {
  value: string;
  /** Nazwa wartości do etykiety dostępności, np. „NIP". */
  label: string;
  copyLabel: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      /* Brak uprawnień do schowka — wartość i tak jest na stronie do zaznaczenia. */
      return;
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        aria-label={`${copyLabel} ${label}`}
        data-copied={copied ? "" : undefined}
        className="copy-value"
      >
        <svg viewBox="0 0 16 16" aria-hidden="true">
          {copied ? (
            <path d="M3 8.5L6.5 12L13 4.5" />
          ) : (
            <>
              <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
              <path d="M10.5 3.5V3A1.5 1.5 0 0 0 9 1.5H4A1.5 1.5 0 0 0 2.5 3V8A1.5 1.5 0 0 0 4 9.5H4.5" />
            </>
          )}
        </svg>
        <span aria-hidden="true">{copied ? copiedLabel : copyLabel}</span>
      </button>
      <span role="status" className="sr-only">
        {copied ? `${label}: ${copiedLabel}` : ""}
      </span>
    </>
  );
}
