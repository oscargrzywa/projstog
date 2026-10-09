/**
 * Zrzut strony klienta w ramce przeglądarki — Server Component.
 *
 * Zrzuty to całe strony (1440 px szerokości, do 5400 px wysokości),
 * więc okno 16:10 pokazuje górę, a reszta jest do odkrycia:
 * - `hover` — po najechaniu na link-rodzica (albo fokus) zrzut przewija się
 *   do końca strony; na dotyku jedzie razem z przewijaniem,
 * - `auto`  — zrzut sam jedzie w dół i wraca, pauza pod kursorem.
 * Bez ruchu (reduced-motion) widać górę strony.
 */

import Image from "next/image";

import type { ImageRef } from "@/lib/cms/types";

import "./page-kit.css";

export function SiteShot({
  image,
  domain,
  mode = "hover",
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 60vw",
  className = "",
}: {
  image: ImageRef;
  domain: string;
  mode?: "hover" | "auto";
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const width = image.width ?? 1440;
  const height = image.height ?? 900;
  /* Czas przejazdu rośnie z długością strony: ~1.1 s na ekran. */
  const screens = height / (width * 0.625);
  const duration = mode === "auto" ? screens * 3.2 : screens * 1.1;

  return (
    <div className={`browser ${className}`}>
      <div className="browser__bar" aria-hidden="true">
        <span className="browser__dots">
          <span />
          <span />
          <span />
        </span>
        <span className="browser__url">{domain}</span>
      </div>
      <div
        className={`site-shot site-shot--${mode}`}
        style={{ "--shot-dur": `${duration.toFixed(1)}s` } as React.CSSProperties}
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={width}
          height={height}
          sizes={sizes}
          priority={priority}
          quality={70}
        />
      </div>
    </div>
  );
}
